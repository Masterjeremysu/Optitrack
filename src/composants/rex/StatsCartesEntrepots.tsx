import type { Livraison } from '../../types/livraison'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'

const zones = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1']

type Props = {
  livraisons: Livraison[]
}

export default function StatsCartesEntrepots({ livraisons }: Props) {
  const { anomalies } = useAnalyseLivraisons(livraisons)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {zones.map((zone) => {
        const colis = livraisons.filter((l) => l.entrepot === zone)

        const anomaliesZone = anomalies.colisDormants
          .concat(
            anomalies.poidsIncoherent,
            anomalies.valeurNulle,
            anomalies.statutInvalide
          )
          .filter((a) => a.entrepot === zone)

        return (
          <div
            key={zone}
            className={`rounded-xl p-4 shadow border transition-all hover:scale-[1.02] ${
              anomaliesZone.length > 0 ? 'bg-red-50 border-red-300' : 'bg-white'
            }`}
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2">Zone {zone}</h4>
            <p className="text-sm text-gray-600">{colis.length} colis</p>
            {anomaliesZone.length > 0 ? (
              <div className="mt-2 text-sm text-red-600">
                ⚠ {anomaliesZone.length} anomalie{anomaliesZone.length > 1 ? 's' : ''}
                <ul className="list-disc list-inside text-xs mt-1">
                  {anomaliesZone.some((l) => typeof l.poids === 'number' && (l.poids <= 0 || l.poids > 500)) && (
                        <li>Poids incohérent</li>
                        )}

                        {anomaliesZone.some((l) => typeof l.valeur === 'number' && l.valeur <= 0) && (
                        <li>Valeur nulle</li>
                        )}

                  {anomaliesZone.some(
                    (l) => !['en cours', 'livré', 'retard', 'annulé'].includes(l.statut)
                  ) && <li>Statut non reconnu</li>}
                  {anomaliesZone.some((l) => {
                    const date = new Date(l.date_expedition)
                    const now = new Date()
                    return l.statut === 'en cours' && now.getTime() - date.getTime() > 5 * 86400000
                  }) && <li>Colis dormant</li>}
                </ul>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mt-2 italic">Aucune anomalie</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
