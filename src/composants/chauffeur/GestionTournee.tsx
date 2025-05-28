import { useState } from 'react'
import { useTournee } from '../../hooks/chauffeur/useTournee'



export default function GestionTournee() {
  const {
    tourneeEnCours,
    chargement,
    chargerTournee,
    demarrerTournee,
    terminerTournee,
  } = useTournee()

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [enCours, setEnCours] = useState(false)

  const handleAction = async (action: () => Promise<void>, messageOK: string, messageKO: string) => {
    try {
      setEnCours(true)
      await action()
      setMessage({ type: 'success', text: messageOK })
    } catch (err) {
  console.error(err)
  setMessage({ type: 'error', text: messageKO })
}
 finally {
      setEnCours(false)
    }
  }

  return (
    <div className="p-4 border border-blue-300 rounded bg-blue-50 shadow-md space-y-4">
      <h2 className="text-blue-800 font-bold text-lg">📋 Gestion de la tournée</h2>

      {message && (
        <div
          className={`p-2 text-sm rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {chargement ? (
        <p className="text-sm text-gray-500">Chargement en cours...</p>
      ) : tourneeEnCours ? (
        <div className="text-sm space-y-1">
          <p><strong>🆔 ID :</strong> {tourneeEnCours.id}</p>
          <p>
            <strong>🚚 Départ :</strong>{' '}
            {new Date(tourneeEnCours.heure_depart).toLocaleString()}
          </p>
          <p className="text-green-700 font-semibold">✅ Tournée en cours</p>
        </div>
      ) : (
        <p className="text-sm text-red-600">Aucune tournée en cours actuellement.</p>
      )}

      <div className="flex flex-wrap gap-3">
        {!tourneeEnCours && (
          <button
            onClick={() =>
              handleAction(
                demarrerTournee,
                '✅ Tournée démarrée avec succès',
                '❌ Erreur lors du démarrage de la tournée'
              )
            }
            disabled={enCours}
            className={`px-4 py-2 rounded text-white transition ${
              enCours ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            🚀 Démarrer une tournée
          </button>
        )}

        {tourneeEnCours && (
          <button
            onClick={() =>
              handleAction(
                terminerTournee,
                '✅ Tournée clôturée avec succès',
                '❌ Erreur lors de la clôture de la tournée'
              )
            }
            disabled={enCours}
            className={`px-4 py-2 rounded text-white transition ${
              enCours ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            ✅ Clôturer la tournée
          </button>
        )}

        <button
          onClick={() =>
            handleAction(
              chargerTournee,
              '🔄 Tournée rechargée',
              '❌ Erreur lors du rechargement'
            )
          }
          disabled={enCours}
          className={`px-4 py-2 rounded transition ${
            enCours ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          🔄 Rafraîchir
        </button>
      </div>
    </div>
  )
}
