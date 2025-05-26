import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { LivraisonChauffeur } from '../../hooks/useLivraisonsChauffeur'
import FicheColis from './FicheColis'

export default function ListeColisJour() {
  const [colis, setColis] = useState<LivraisonChauffeur[]>([])
  const [chargement, setChargement] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [colisActif, setColisActif] = useState<LivraisonChauffeur | null>(null)

  useEffect(() => {
    const chargerColis = async () => {
      setChargement(true)
      const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .eq('statut', 'en cours')
        .order('date_expedition', { ascending: true })

      if (!error && data) setColis(data)
      setChargement(false)
    }

    chargerColis()
  }, [refresh])

  return (
    <div className="space-y-2 text-sm">
      {chargement ? (
        <p className="italic text-gray-500">Chargement...</p>
      ) : colis.length === 0 ? (
        <p className="text-gray-500">Aucun colis à livrer aujourd’hui.</p>
      ) : (
        <ul className="space-y-1">
          {colis.map((c) => (
            <li
              key={c.id}
              onClick={() => setColisActif(c)}
              className="border rounded px-3 py-2 bg-gray-50 hover:bg-blue-50 transition cursor-pointer"
            >
              <div className="font-semibold text-gray-800">{c.client}</div>
              <div className="text-xs text-gray-500">
                {c.pays_destination} • {c.valeur} € • {c.poids} kg
              </div>
              <div className="text-[11px] text-gray-400">ID : {c.id}</div>
            </li>
          ))}
        </ul>
      )}

      {colisActif && (
        <FicheColis
          colis={colisActif}
          onClose={() => setColisActif(null)}
          onLivraisonEffectuée={() => {
            setColisActif(null)
            setRefresh((r) => r + 1)
          }}
        />
      )}
    </div>
  )
}
