import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'

export default function SignalementColis() {
  const [idColis, setIdColis] = useState('')
  const [commentaire, setCommentaire] = useState('')
  const [chargement, setChargement] = useState(false)

  const handleEnvoyer = async () => {
    if (!idColis || !commentaire) {
      toast.warning('Merci de remplir les deux champs')
      return
    }

    setChargement(true)
    const { error } = await supabase.from('signalements').insert({
      expedition_id: idColis,
      commentaire
    })

    setChargement(false)

    if (error) {
      toast.error("Erreur lors de l'envoi")
    } else {
      toast.success('Signalement transmis ✅')
      setIdColis('')
      setCommentaire('')
    }
  }

  return (
    <div className="space-y-2 text-sm">
      <input
        type="text"
        placeholder="ID du colis"
        value={idColis}
        onChange={(e) => setIdColis(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Description du problème"
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button
        disabled={chargement}
        onClick={handleEnvoyer}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        🚨 Envoyer le signalement
      </button>
    </div>
  )
}
