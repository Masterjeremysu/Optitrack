import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { Livraison } from '../../types/livraison'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'

type Props = {
  livraisons: Livraison[]
}

const zones = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1']


export default function GraphiqueAnomaliesParZone({ livraisons }: Props) {
  const { anomalies } = useAnalyseLivraisons(livraisons)

  const data = zones.map((zone) => {
    const count = anomalies.colisDormants
      .concat(anomalies.poidsIncoherent, anomalies.valeurNulle, anomalies.statutInvalide)
      .filter((a) => a.entrepot === zone).length

    return {
      zone,
      anomalies: count,
    }
  })

  return (
    <div className="bg-white border rounded p-4 shadow mb-6">
      <h3 className="text-md font-semibold text-gray-800 mb-2">
        📊 Anomalies détectées par zone
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="zone" />
          <Tooltip />
          <Bar dataKey="anomalies" fill="#ef4444">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.anomalies > 0 ? '#ef4444' : '#10b981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
