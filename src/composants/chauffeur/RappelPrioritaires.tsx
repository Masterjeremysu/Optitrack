import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type ColisUrgent = {
  id: string
  client_nom?: string
  instructions_client?: string
}

export default function RappelPrioritaires() {
  const [colisUrgents, setColisUrgents] = useState<ColisUrgent[]>([])
  const [heureActuelle, setHeureActuelle] = useState(new Date())

  // ⏰ Met à jour l'heure toutes les 60 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setHeureActuelle(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // 📦 Charge les colis urgents si l'heure est >= 14h
  useEffect(() => {
    const chargerColisUrgents = async () => {
      const { data, error } = await supabase
        .from('expeditions')
        .select('id, client_nom, instructions_client')
        .eq('prioritaire', true)
        .neq('statut', 'livré')
        .is('reprogramme_pour', null)

      if (!error && data) {
        setColisUrgents(data)
      }
    }

    if (heureActuelle.getHours() >= 14) {
      chargerColisUrgents()
    }
  }, [heureActuelle])

  if (heureActuelle.getHours() < 14) return null

  return (
    <div className="border border-red-500 bg-red-50 p-4 rounded text-sm text-red-800">
      <h3 className="font-bold mb-2">⏰ Rappel : colis urgents non livrés</h3>
      {colisUrgents.length === 0 ? (
        <p>Aucun colis prioritaire en attente pour aujourd’hui.</p>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          {colisUrgents.map((colis) => (
            <li key={colis.id}>
              <strong>ID :</strong> {colis.id} — {colis.client_nom || 'Client inconnu'}
              {colis.instructions_client && (
                <div className="text-xs italic text-gray-600">
                  {colis.instructions_client}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
