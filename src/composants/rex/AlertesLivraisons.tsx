import type { Livraison } from '../../types/livraison'

import { format } from 'date-fns'

type Props = {
  livraisons: Livraison[]
}

export default function AlertesLivraisons({ livraisons }: Props) {
  const alertes = livraisons.filter(l => {
    if (l.statut === 'Livré') return false
    const date = new Date(l.date_expedition)
    const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 3
  })

  const exporterCSV = () => {
    const lignes = [
      ['ID', 'Date expédition', 'Statut', 'Pays', 'Client'],
      ...alertes.map(l => [
        l.id,
        format(new Date(l.date_expedition), 'yyyy-MM-dd'),
        l.statut,
        l.pays || '',
        l.client || ''
      ])
    ]

    const contenu = lignes.map(l => l.join(',')).join('\n')
    const blob = new Blob([contenu], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'alertes_livraisons.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-bold text-red-800 mb-4">
        ⚠️ {alertes.length} colis inactifs détectés
      </h3>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-red-100 text-red-800">
              <th className="text-left px-2 py-1">ID</th>
              <th className="text-left px-2 py-1">Date</th>
              <th className="text-left px-2 py-1">Statut</th>
              <th className="text-left px-2 py-1">Pays</th>
              <th className="text-left px-2 py-1">Client</th>
            </tr>
          </thead>
          <tbody>
            {alertes.map(l => (
              <tr key={l.id} className="border-b">
                <td className="px-2 py-1">{l.id}</td>
                <td className="px-2 py-1">{format(new Date(l.date_expedition), 'yyyy-MM-dd')}</td>
                <td className="px-2 py-1">{l.statut}</td>
                <td className="px-2 py-1">{l.pays}</td>
                <td className="px-2 py-1">{l.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={exporterCSV}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        >
          📤 Exporter CSV
        </button>
        <button
          onClick={() => alert('Fonction notifier à venir')}
          className="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
        >
          📨 Notifier
        </button>
      </div>
    </div>
  )
}
