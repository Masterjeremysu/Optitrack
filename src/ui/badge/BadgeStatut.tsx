// src/ui/badge/BadgeStatut.tsx
type Props = {
  statut: 'actif' | 'archivé' | 'en attente'
}

export default function BadgeStatut({ statut }: Props) {
  const couleurs: Record<string, string> = {
    actif: 'bg-green-100 text-green-700',
    archivé: 'bg-gray-200 text-gray-500',
    'en attente': 'bg-yellow-100 text-yellow-700',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${couleurs[statut]}`}>
      {statut}
    </span>
  )
}
