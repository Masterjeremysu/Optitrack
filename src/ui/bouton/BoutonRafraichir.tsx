import { RotateCw } from 'lucide-react'
import { useState } from 'react'

type Props = {
  onRefresh: () => void
  label?: string
  className?: string
}

export default function BoutonRafraichir({ onRefresh, label = 'Rafraîchir', className = '' }: Props) {
  const [enCours, setEnCours] = useState(false)

  const handleClick = async () => {
    setEnCours(true)
    try {
      await onRefresh()
    } finally {
      setTimeout(() => setEnCours(false), 800) // pour animation visible
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={enCours}
      className={`flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm transition ${className}`}
    >
      <RotateCw className={`w-4 h-4 ${enCours ? 'animate-spin' : ''}`} />
      {label}
    </button>
  )
}
