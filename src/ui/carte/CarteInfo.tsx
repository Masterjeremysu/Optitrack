// src/ui/carte/CarteInfo.tsx
import type { ReactNode } from 'react'



type Props = {
  titre: string
  icone?: ReactNode
  contenu: ReactNode
  accent?: 'gris' | 'bleu' | 'vert' | 'rouge' | 'orange'

}

export default function CarteInfo({ titre, icone, contenu, accent = 'gris' }: Props) {
  const couleurs = {
    gris: 'bg-gray-100 text-gray-800',
    bleu: 'bg-blue-100 text-blue-800',
    vert: 'bg-green-100 text-green-800',
    rouge: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
  }

  return (
    <div className={`p-4 border rounded-xl shadow-sm ${couleurs[accent]}`}>
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 font-medium">
        {icone}
        {titre}
      </div>
      <div className="text-xl font-bold text-gray-800">{contenu}</div>
    </div>
  )
}
