import type { Livraison } from '../../types/livraison'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'

type Props = {
  livraisons: Livraison[]
}

export default function AlertesLivraisons({ livraisons }: Props) {
  const { anomalies } = useAnalyseLivraisons(livraisons)

  const totalAnomalies =
    anomalies.colisDormants.length +
    anomalies.poidsIncoherent.length +
    anomalies.valeurNulle.length +
    anomalies.statutInvalide.length

  if (totalAnomalies === 0) return null

  return (
    <div className="bg-red-50 border border-red-300 rounded-lg p-4 mt-6">
      <h3 className="text-red-700 font-semibold text-lg mb-2">⚠️ Anomalies détectées</h3>

      <ul className="text-sm text-red-800 space-y-1">
        {anomalies.colisDormants.length > 0 && (
          <li>
            • {anomalies.colisDormants.length} colis inactifs depuis plus de 5 jours
          </li>
        )}
        {anomalies.poidsIncoherent.length > 0 && (
          <li>
  • {anomalies.poidsIncoherent.length} colis avec un poids incohérent (≤0kg ou &gt;500kg)
</li>

        )}
        {anomalies.valeurNulle.length > 0 && (
          <li>
            • {anomalies.valeurNulle.length} colis avec une valeur manquante ou nulle
          </li>
        )}
        {anomalies.statutInvalide.length > 0 && (
          <li>
            • {anomalies.statutInvalide.length} colis avec un statut non reconnu
          </li>
        )}
      </ul>

      <p className="mt-3 text-xs text-red-500 italic">
        Ces anomalies peuvent affecter le suivi logistique et nécessitent une action manuelle.
      </p>
    </div>
  )
}
