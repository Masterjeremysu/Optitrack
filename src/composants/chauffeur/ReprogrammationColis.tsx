import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReprogrammationColis() {
  const [expeditionId, setExpeditionId] = useState('')
  const [motif, setMotif] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [envoi, setEnvoi] = useState(false)

  const motifs = [
    'Client absent',
    'Accès impossible',
    'Adresse incorrecte',
    'Refus de réception',
  ]

  const handleSubmit = async () => {
    if (!expeditionId || !motif || !date) {
      setMessage('Merci de remplir tous les champs.')
      return
    }

    setEnvoi(true)

    const { error } = await supabase
      .from('expeditions')
      .update({
        statut: 'non_livre',
        reprogramme_pour: date,
        commentaire: `Reprogrammé - Motif : ${motif}`,
      })
      .eq('id', expeditionId)

    setMessage(error ? "❌ Erreur lors de la reprogrammation." : "✅ Colis reprogrammé avec succès.")
    setEnvoi(false)
  }

  return (
    <div className="space-y-3 text-sm">
      <label htmlFor="expedition-id" className="block font-medium">ID de l’expédition</label>
      <input
        id="expedition-id"
        type="text"
        placeholder="ID du colis"
        value={expeditionId}
        onChange={(e) => setExpeditionId(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        aria-label="Identifiant de l’expédition"
      />

      <label htmlFor="motif" className="block font-medium">Motif de non livraison</label>
      <select
        id="motif"
        title="Motif de reprogrammation"
        value={motif}
        onChange={(e) => setMotif(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">-- Sélectionner un motif --</option>
        {motifs.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <label htmlFor="date" className="block font-medium">Nouvelle date de livraison</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        aria-label="Date de reprogrammation"
      />

      <button
        onClick={handleSubmit}
        disabled={envoi}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Reprogrammer la livraison
      </button>

      {message && <p className="text-gray-600">{message}</p>}
    </div>
  )
}
