import { useHistoriqueLivraisons } from '../../hooks/useHistoriqueLivraisons'

export default function HistoriqueLivraisons() {
  const { livraisons, chargement } = useHistoriqueLivraisons()

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Historique de mes livraisons</h3>

      {chargement ? (
        <p className="text-sm text-gray-500">Chargement...</p>
      ) : livraisons.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Aucune livraison récente</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2">Date</th>
              <th>Client</th>
              <th>Valeur</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {livraisons.map((l) => (
              <tr key={l.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-1">{new Date(l.date_livraison).toLocaleDateString()}</td>
                <td>{l.client}</td>
                <td>{l.valeur} €</td>
                <td>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      l.statut === 'livré'
                        ? 'bg-green-100 text-green-700'
                        : l.statut === 'refusé'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {l.statut}
                  </span>
                </td>
                <td>
                  <button className="text-blue-600 text-xs hover:underline">🔍 Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
