// src/composants/rex/TableauLivraisons.tsx
import type { Livraison } from '../../hooks/useFiltrageLivraisons'
import { saveAs } from 'file-saver'



type Props = {
  livraisons: Livraison[]
  chargement: boolean
}

export default function TableauLivraisons({ livraisons, chargement }: Props) {
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
            </tr>
          </thead>
          <tbody>
            {livraisons.map((l) => (
              <tr key={l.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{l.client}</td>
                <td className="px-3 py-2">{l.pays_destination}</td>
                <td className="px-3 py-2">{l.statut}</td>
                <td className="px-3 py-2">{l.poids} kg</td>
                <td className="px-3 py-2">{l.valeur.toFixed(2)}</td>
                <td className="px-3 py-2">{new Date(l.date_expedition).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
