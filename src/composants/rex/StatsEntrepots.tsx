import type { Livraison } from '../../types/livraison'

type Props = {
  livraisons: Livraison[]
}

const zones = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1']

export default function StatsEntrepots({ livraisons }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {zones.map((zone) => {
        const colis = livraisons.filter((l) => l.entrepot === zone)
        const anomalies = colis.filter(
          (l) =>
            typeof l.poids === 'number' && (l.poids <= 0 || l.poids > 500) ||
            typeof l.valeur === 'number' && l.valeur <= 0 ||
            !['en cours', 'livré', 'retard', 'annulé'].includes(l.statut)
        )

        return (
          <div key={zone} className="bg-white rounded border p-3 shadow">
            <h4 className="font-semibold text-gray-700 mb-1">Zone {zone}</h4>
            <p className="text-sm text-gray-600">{colis.length} colis</p>
            {anomalies.length > 0 && (
              <p className="text-sm text-red-600">⚠ {anomalies.length} anomalies</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
