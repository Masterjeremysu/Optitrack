import { useEffect, useState } from 'react'

export default function ModeNuit() {
  const [actif, setActif] = useState(false)

  useEffect(() => {
    const heure = new Date().getHours()
    if (heure >= 18 || heure <= 6) {
      activerModeNuit()
    }
  }, [])

  const activerModeNuit = () => {
    document.documentElement.classList.add('dark')
    setActif(true)
  }

  const desactiverModeNuit = () => {
    document.documentElement.classList.remove('dark')
    setActif(false)
  }

  return (
    <div className="text-sm text-gray-700 dark:text-gray-300">
      <span className="mr-2">🌙 Mode nuit :</span>
      <button
        onClick={actif ? desactiverModeNuit : activerModeNuit}
        className="px-2 py-1 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {actif ? 'Désactiver' : 'Activer'}
      </button>
    </div>
  )
}
