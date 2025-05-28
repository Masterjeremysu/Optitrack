import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function InstructionsClient() {
  const [expeditionId, setExpeditionId] = useState('')
  const [instructions, setInstructions] = useState('')
  const [message, setMessage] = useState('')

  const chargerInstructions = async () => {
    const { data, error } = await supabase
      .from('expeditions')
      .select('instructions_client')
      .eq('id', expeditionId)
      .single()

    if (error) {
      setMessage('❌ Erreur de chargement.')
    } else {
      setInstructions(data.instructions_client || 'Aucune instruction disponible.')
    }
  }

  useEffect(() => {
    const fetchInstructions = async () => {
      if (expeditionId) await chargerInstructions()
    }
    fetchInstructions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expeditionId])

  return (
    <div className="space-y-3 text-sm">
      <input
        type="text"
        placeholder="ID de l’expédition"
        value={expeditionId}
        onChange={(e) => setExpeditionId(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        aria-label="Identifiant de l’expédition"
      />

      <div className="border border-yellow-400 bg-yellow-50 rounded p-3 text-gray-800">
        {instructions || '—'}
      </div>

      {message && <p className="text-red-500">{message}</p>}
    </div>
  )
}
