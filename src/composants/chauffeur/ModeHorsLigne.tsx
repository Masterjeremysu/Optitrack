import { useEffect, useState } from 'react'

export default function ModeHorsLigne() {
  const [enLigne, setEnLigne] = useState(true)

  useEffect(() => {
    const handleOnline = () => setEnLigne(true)
    const handleOffline = () => setEnLigne(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setEnLigne(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className={`text-sm px-3 py-1 rounded ${enLigne ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
      {enLigne ? '🟢 Connexion active' : '🔴 Hors ligne – les actions seront synchronisées plus tard'}
    </div>
  )
}
