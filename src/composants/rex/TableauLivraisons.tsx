import type { Livraison } from '../../hooks/useFiltrageLivraisons'
import { saveAs } from 'file-saver'
import { updateStatutLivraison } from '../../services/supabaseLivraisons'
import { toast } from 'sonner'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'

type Props = {
  livraisons: Livraison[]
  chargement: boolean
  onRefresh?: () => void
}

export default function TableauLivraisons({ livraisons, chargement, onRefresh }: Props) {
  const { anomalies } = useAnalyseLivraisons(livraisons)

  const exporterCSV = () => {
    const lignes = [
      ['Client', 'Pays', 'Statut', 'Poids (kg)', 'Valeur (€)', 'Date'],
      ...livraisons.map((l) => [
        l.client,
        l.pays_destination,
        l.statut,
        l.poids.toString(),
        l.valeur.toFixed(2),
        new Date(l.date_expedition).toLocaleDateString(),
      ]),
    ]

    const csv = lignes.map((ligne) => ligne.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `livraisons_${Date.now()}.csv`)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Livraisons récentes</h2>

      <button
        onClick={exporterCSV}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
      >
        📁 Exporter en CSV
      </button>

      {chargement ? (
        <p className="text-gray-500">Chargement en cours...</p>
      ) : livraisons.length === 0 ? (
        <p className="text-gray-400 italic">Aucune livraison ne correspond aux filtres.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Pays</th>
              <th className="px-3 py-2">Statut</th>
              <th className="px-3 py-2">Poids</th>
              <th className="px-3 py-2">Valeur (€)</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Actions</th>
              <th className="px-2 py-2 text-center">⚠</th>
            </tr>
          </thead>
          <tbody>
            {livraisons.map((l) => {
              const estAnormal =
                anomalies.colisDormants.some((c) => c.id === l.id) ||
                anomalies.poidsIncoherent.some((c) => c.id === l.id) ||
                anomalies.valeurNulle.some((c) => c.id === l.id) ||
                anomalies.statutInvalide.some((c) => c.id === l.id)

              return (
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{l.client}</td>
                  <td className="px-3 py-2">{l.pays_destination}</td>
                  <td className="px-3 py-2">{l.statut}</td>
                  <td className="px-3 py-2">{l.poids} kg</td>
                  <td className="px-3 py-2">
  {typeof l.valeur === 'number' ? (
    l.valeur.toFixed(2)
  ) : (
    <span className="text-red-500 italic">Non renseignée</span>
  )}
</td>


                  <td className="px-3 py-2">
                    {new Date(l.date_expedition).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <select
                        aria-label="Modifier le statut"
                        defaultValue={l.statut}
                        onChange={async (e) => {
                          const nouveauStatut = e.target.value
                          try {
                            await updateStatutLivraison(l.id, nouveauStatut)
                            toast.success(`Statut mis à jour vers "${nouveauStatut}"`)
                            onRefresh?.()
                          } catch (err) {
                            console.error(err)
                            toast.error('Erreur lors de la mise à jour')
                          }
                        }}
                        className="text-xs border px-1 py-0.5 rounded"
                      >
                        <option value="En transit">En transit</option>
                        <option value="Livré">Livré</option>
                        <option value="En attente">En attente</option>
                        <option value="Bloqué">Bloqué</option>
                      </select>
                      <button
                        onClick={() => alert(`📝 Voir fiche expédition : ${l.id}`)}
                        className="text-xs bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        📝 Voir
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center text-lg">
                    {estAnormal ? '⚠' : ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
