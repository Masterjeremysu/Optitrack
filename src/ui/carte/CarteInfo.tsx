// src/ui/carte/CarteInfo.tsx
import { ReactNode } from 'react' // ❌



type Props = {
  titre: string
  icone?: ReactNode
  contenu: ReactNode
  accent?: 'bleu' | 'vert' | 'gris'
}

export default function CarteInfo({ titre, icone, contenu, accent = 'gris' }: Props) {
  const couleurs: Record<string, string> = {
    bleu: 'border-blue-200 bg-blue-50',
    vert: 'border-green-200 bg-green-50',
    gris: 'border-gray-200 bg-gray-50',
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
