import { useEffect, useState } from 'react'
import LayoutRole from '../../composants/layout/LayoutRole'
import TitrePage from '../../ui/typographie/TitrePage'
import { supabase } from '../../lib/supabase'

type Audit = {
  id: string
  date_audit: string
  total: number
  conformes: number
  anomalies: number
  score: number
}

export default function HistoriqueAudit() {
  const [audits, setAudits] = useState<Audit[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const chargerAudits = async () => {
      const { data, error } = await supabase
        .from('audits_logistiques')
        .select('*')
        .order('date_audit', { ascending: false })

      if (error) {
        console.error('❌ Erreur chargement audits :', error.message)
      } else {
        setAudits(data || [])
      }

      setChargement(false)
    }

    chargerAudits()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <LayoutRole>
      <TitrePage>📚 Historique des Audits Logistiques</TitrePage>

      <div className="bg-white rounded shadow border p-4">
        {chargement ? (
          <p className="text-gray-500">Chargement en cours...</p>
        ) : audits.length === 0 ? (
          <p className="text-gray-400 italic">Aucun audit enregistré pour l’instant.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-600 uppercase border-b">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Total</th>
                <th className="py-2">Conformes</th>
                <th className="py-2">Anomalies</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    {new Date(audit.date_audit).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-2">{audit.total}</td>
                  <td className="py-2">{audit.conformes}</td>
                  <td className="py-2 text-red-600">{audit.anomalies}</td>
                  <td className={`py-2 font-semibold ${getScoreColor(audit.score)}`}>
                    {audit.score} / 100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </LayoutRole>
  )
}
