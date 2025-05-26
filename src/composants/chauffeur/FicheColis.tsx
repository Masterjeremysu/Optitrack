import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import type { LivraisonChauffeur } from '../../hooks/useLivraisonsChauffeur'

type Props = {
  colis: LivraisonChauffeur
  onClose: () => void
  onLivraisonEffectuée?: () => void
}

export default function FicheColis({ colis, onClose, onLivraisonEffectuée }: Props) {
  const [chargement, setChargement] = useState(false)

  const marquerCommeLivré = async () => {
    setChargement(true)

    const { error } = await supabase
      .from('expeditions')
      .update({ statut: 'livré', date_livraison: new Date().toISOString() })
      .eq('id', colis.id)

    setChargement(false)

    if (error) {
      toast.error("❌ Erreur lors de la mise à jour")
    } else {
      toast.success("✅ Colis marqué comme livré")
      onClose()
      onLivraisonEffectuée?.() // ↩️ déclenche le refresh parent (ex: ListeColisJour)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-3 text-sm">
        <h2 className="text-lg font-bold text-gray-700">📦 Colis {colis.id}</h2>
        <p><strong>Client :</strong> {colis.client}</p>
        <p><strong>Adresse :</strong> {colis.adresse}</p>
        <p><strong>Valeur :</strong> {colis.valeur} €</p>
        <p><strong>Poids :</strong> {colis.poids} kg</p>
        <p><strong>Statut actuel :</strong> <span className="font-medium text-blue-600">{colis.statut}</span></p>

        <div className="flex gap-2 pt-3">
          <button
            onClick={marquerCommeLivré}
            disabled={chargement}
            className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 disabled:opacity-50"
          >
            ✅ Marquer comme livré
          </button>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
