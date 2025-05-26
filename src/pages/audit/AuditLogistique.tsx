import { useState } from 'react'
import { toast } from 'sonner'
import { useFiltrageLivraisons, type Livraison } from '../../hooks/useFiltrageLivraisons'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'
import { useCorrectionsIntelligentes } from '../../hooks/useCorrectionsIntelligentes'
import { enregistrerAuditLogistique } from '../../services/supabaseAudit'
import { injecterCorrectionsTest } from '../../services/supabaseCorrections'
import { supabase } from '../../lib/supabase'

import LayoutRole from '../../composants/layout/LayoutRole'
import TitrePage from '../../ui/typographie/TitrePage'
import BoutonRafraichir from '../../ui/bouton/BoutonRafraichir'
import FicheLivraison from '../../composants/modales/FicheLivraison'

export default function AuditLogistique() {
  const [filtres] = useState({
    statut: '',
    pays: '',
    dateMin: '',
    dateMax: '',
    entrepot: ''
  })

  const [refresh, setRefresh] = useState(0)
  const [livraisonFocus, setLivraisonFocus] = useState<Livraison | null>(null)

  const { livraisons } = useFiltrageLivraisons(filtres, '', '', refresh)
  const { corrections } = useCorrectionsIntelligentes(livraisons)
  const {
    entrepots,
    anomalies: { colisDormants, poidsIncoherent, valeurNulle, statutInvalide }
  } = useAnalyseLivraisons(livraisons)

  const total = livraisons.length
  const totalAnomalies = colisDormants.length + poidsIncoherent.length + valeurNulle.length + statutInvalide.length
  const conformes = total - totalAnomalies
  const score = total > 0 ? Math.round((conformes / total) * 100) : 0
  const [correctionsAppliquees, setCorrectionsAppliquees] = useState<string[]>([])

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-500'
    return 'text-red-600'
  }

  async function handleApplyCorrections() {
    if (corrections.length === 0) {
      toast.warning("Aucune correction à appliquer")
      return
    }

    try {
      let compteur = 0
      const appliquées: string[] = []

      for (const c of corrections) {
        const { error: updateError } = await supabase
          .from('expeditions')
          .update({ [c.champ]: c.valeurProposee })
          .eq('id', c.id)

        if (updateError) continue

        const { error: insertError } = await supabase
          .from('corrections_appliquees')
          .insert({
            expedition_id: c.id,
            champ_corrige: c.champ,
            ancienne_valeur: c.ancienneValeur,
            nouvelle_valeur: c.valeurProposee
          })

        if (!insertError) {
          compteur++
          appliquées.push(c.id)
        }
      }

      setCorrectionsAppliquees(appliquées)
      setRefresh((r) => r + 1)
      toast.success(`✅ ${compteur} correction${compteur > 1 ? 's' : ''} appliquée${compteur > 1 ? 's' : ''} avec succès`)
    } catch (err) {
      console.error(err)
      toast.error("Erreur lors de l'application des corrections")
    }
  }

  return (
    <LayoutRole>
      <TitrePage>📄 Audit Logistique Global</TitrePage>

      <BoutonRafraichir label="🔁 Recharger les livraisons" onRefresh={() => setRefresh((r) => r + 1)} />

      <div className="grid md:grid-cols-5 gap-6 my-6 text-sm text-gray-800">
        <StatBox label="Total analysé" value={`${total} livraisons`} />
        <StatBox label="Conformes" value={conformes} color="green" />
        <StatBox label="Anomalies détectées" value={totalAnomalies} color="red" />
        <StatBox label="Entrepôts actifs" value={entrepots} color="blue" />
        <StatBox label="Score global" value={`${score} / 100`} colorClass={getScoreColor()} />
      </div>

      <div className="bg-white rounded shadow border p-4 mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3">📊 Détails des anomalies</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Type</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">%</th>
              <th className="py-2">Gravité</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Colis dormants (+5j)', value: colisDormants.length },
              { label: 'Poids incohérent', value: poidsIncoherent.length },
              { label: 'Valeur manquante/nulle', value: valeurNulle.length },
              { label: 'Statuts non reconnus', value: statutInvalide.length }
            ].map((a, i) => {
              const pourcent = total ? Math.round((a.value / total) * 100) : 0
              const gravite = a.value > 5 ? '🚨 Élevée' : a.value > 0 ? '⚠ Moyenne' : '✅ Aucune'
              return (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-1">{a.label}</td>
                  <td className="py-1">{a.value}</td>
                  <td className="py-1">{pourcent}%</td>
                  <td className="py-1">{gravite}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded border p-4 shadow text-sm text-gray-700 space-y-4">
        <h3 className="font-semibold">✅ Actions suggérées</h3>

        <div className="flex gap-2 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">📄 Exporter le rapport</button>
          <button onClick={() => toast.info("Simulation de correction intelligente activée")} className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700">🧠 Corriger automatiquement</button>
          <button className="bg-orange-500 text-white px-4 py-1.5 rounded hover:bg-orange-600">📬 Notifier l’équipe</button>
          <button onClick={async () => {
            try {
              await enregistrerAuditLogistique({
                total,
                conformes,
                anomalies: totalAnomalies,
                score,
                colisDormants: colisDormants.length,
                poidsIncoherent: poidsIncoherent.length,
                valeurNulle: valeurNulle.length,
                statutInvalide: statutInvalide.length
              })
              toast.success('Audit enregistré avec succès ✅')
            } catch (err) {
              toast.error('Erreur lors de l’enregistrement')
              console.error(err)
            }
          }} className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700">💾 Enregistrer l’audit</button>
          <button onClick={async () => {
            try {
              await injecterCorrectionsTest(livraisons)
              toast.success('Suggestions de correction injectées 🔧')
            } catch (err) {
              console.error(err)
              toast.error("Erreur lors de l'injection des suggestions")
            }
          }} className="bg-gray-700 text-white px-4 py-1.5 rounded hover:bg-gray-800">📤 Injecter des suggestions (test)</button>
          <button onClick={handleApplyCorrections} className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700">✅ Appliquer les corrections validées</button>
        </div>

        {corrections.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mt-4">
            <h4 className="text-md font-semibold text-yellow-800 mb-3">🧠 Corrections proposées par l'IA logistique</h4>
            <ul className="space-y-2 text-sm">
              {corrections.map((c, i) => {
                const dejaCorrigee = correctionsAppliquees.includes(c.id)
                return (
                  <li key={i} className="border-b pb-2 flex items-start justify-between gap-4">
                    <div>
                      <strong>{c.champ}</strong> – <span className="line-through text-gray-500">{String(c.ancienneValeur)}</span> → <span className="text-green-700 font-medium">{String(c.valeurProposee)}</span>
                      <br />
                      <span className="text-xs text-gray-600 italic">{c.justification} ({c.confiance}%)</span>
                    </div>
                    {dejaCorrigee && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">🟢 Corrigé</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {livraisonFocus && (
        <FicheLivraison livraison={livraisonFocus} onClose={() => setLivraisonFocus(null)} />
      )}
    </LayoutRole>
  )
}

function StatBox({
  label,
  value,
  color,
  colorClass
}: {
  label: string
  value: string | number
  color?: 'green' | 'red' | 'blue'
  colorClass?: string
}) {
  const colorMap: Record<'green' | 'red' | 'blue', string> = {
    green: 'text-green-600',
    red: 'text-red-600',
    blue: 'text-blue-600'
  }

  const finalColor = colorClass || (color ? colorMap[color] : '')

  return (
    <div className="bg-white border rounded p-4 shadow">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-xl font-bold ${finalColor}`}>{value}</p>
    </div>
  )
}
