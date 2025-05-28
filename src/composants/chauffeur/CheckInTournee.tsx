import { useState, useEffect } from 'react'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'
import { useTournee } from '../../hooks/chauffeur/useTournee'


export default function CheckInTournee() {
  useProfilConnecte()
  const { tourneeEnCours, demarrerTournee, terminerTournee, chargement } = useTournee()
  const [enCours, setEnCours] = useState(false)

  useEffect(() => {
    setEnCours(!!tourneeEnCours)
  }, [tourneeEnCours])

  console.log('tourneeEnCours :', tourneeEnCours)

  if (chargement) return <p>Chargement...</p>

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        {enCours
          ? `Tournée en cours depuis ${new Date(tourneeEnCours?.heure_depart ?? '').toLocaleTimeString()}`

          : "Aucune tournée active aujourd’hui"}
          
      </p>

      {enCours ? (
        <button
          onClick={terminerTournee}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ Terminer la tournée
        </button>
      ) : (
        <button
          onClick={demarrerTournee}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📍 Démarrer la tournée
        </button>
      )}
    </div>
  )
}
