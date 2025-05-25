import { useState } from 'react'
import type { Livraison } from '../../types/livraison'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'

type Props = {
  livraisons: Livraison[]
}

const zones = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1'] // exemple statique pour démo

export default function CarteEntrepot({ livraisons }: Props) {
  const [zoneActive, setZoneActive] = useState<string | null>(null)
  const [filtrerAnomalies, setFiltrerAnomalies] = useState(false)

  const { anomalies } = useAnalyseLivraisons(livraisons)

  const compterParZone = (zone: string) =>
    livraisons.filter((l) => l.entrepot === zone)

  return (
    <div className="mt-4">
      {/* Bouton filtre anomalies */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold text-gray-800">Carte de l’entrepôt</h3>
        <button
          onClick={() => setFiltrerAnomalies(!filtrerAnomalies)}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          {filtrerAnomalies ? '🔄 Voir toutes les zones' : '⚠ Zones avec anomalies'}
        </button>
      </div>

      {/* Grille des zones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-gray-50 p-6 rounded-lg border">
        {zones
          .filter((zone) => {
            if (!filtrerAnomalies) return true
            const anomaliesZone = anomalies.colisDormants
              .concat(
                anomalies.poidsIncoherent,
                anomalies.valeurNulle,
                anomalies.statutInvalide
              )
              .filter((a) => a.entrepot === zone)
            return anomaliesZone.length > 0
          })
          .map((zone) => {
            const colis = compterParZone(zone)

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
                onClick={() => setZoneActive(zone)}
                className={`rounded p-4 text-center shadow cursor-pointer transition-all hover:scale-105 ${
                  colis.length === 0
                    ? 'bg-gray-200'
                    : anomaliesZone.length > 0
                    ? 'bg-red-200'
                    : 'bg-green-100'
                }`}
              >
                <h4 className="font-bold text-lg mb-1">Zone {zone}</h4>
                <p>{colis.length} colis</p>
                {anomaliesZone.length > 0 && (
                  <p className="text-sm text-red-600 mt-1">
                    ⚠ {anomaliesZone.length} anomalie
                    {anomaliesZone.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )
          })}
      </div>

      {/* Détail d’une zone */}
      {zoneActive && (
        <div className="mt-6 p-4 border rounded bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-bold text-gray-800">
              📦 Détail de la zone {zoneActive}
            </h3>
            <button
              onClick={() => setZoneActive(null)}
              className="text-sm text-gray-500 underline"
            >
              Fermer
            </button>
          </div>
          <ul className="text-sm text-gray-700 space-y-1 max-h-60 overflow-y-auto">
            {livraisons
              .filter((l) => l.entrepot === zoneActive)
              .map((l) => (
                <li key={l.id} className="border-b py-1">
                  {l.client} – {l.pays_destination} – {l.statut} – {l.poids}kg –{' '}
                  {l.valeur}€
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
