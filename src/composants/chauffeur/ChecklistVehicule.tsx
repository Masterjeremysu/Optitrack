import { useState } from 'react'
import { useTournee } from '../../hooks/chauffeur/useTournee'
import { supabase } from '../../lib/supabase'


const checklistItems = [
  { id: 'pneus', label: 'État des pneus' },
  { id: 'feux', label: 'Fonctionnement des feux' },
  { id: 'gilet', label: 'Présence du gilet jaune' },
  { id: 'triangle', label: 'Présence du triangle' },
  { id: 'carburant', label: 'Niveau de carburant suffisant' },
]

export default function ChecklistVehicule() {
  const { tourneeEnCours, chargerTournee } = useTournee()
  const [etat, setEtat] = useState<{ [key: string]: boolean }>({})
  const [message, setMessage] = useState('')
  const [envoi, setEnvoi] = useState(false)

  if (!tourneeEnCours) return <p className="text-gray-500 text-sm">Démarrer une tournée pour valider la checklist.</p>

  const handleChange = (id: string) => {
    setEtat((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = async () => {
    const complet = checklistItems.every(item => etat[item.id])
    if (!complet) {
      setMessage("Merci de valider tous les points de sécurité.")
      return
    }

    setEnvoi(true)
    const { error } = await supabase
      .from('tournees_chauffeur')
      .update({ checklist: etat })
      .eq('id', tourneeEnCours.id)

    if (error) {
      setMessage("❌ Erreur lors de l'enregistrement.")
    } else {
      setMessage("✅ Checklist enregistrée.")
      await chargerTournee()
    }
    setEnvoi(false)
  }

  return (
    <div className="space-y-3">
      {checklistItems.map((item) => (
        <label key={item.id} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!etat[item.id]}
            onChange={() => handleChange(item.id)}
          />
          {item.label}
        </label>
      ))}

      <button
        onClick={handleSubmit}
        disabled={envoi}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer la checklist
      </button>

      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  )
}
