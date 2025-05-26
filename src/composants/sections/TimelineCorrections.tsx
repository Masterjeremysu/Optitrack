type Correction = {
  id: string
  champ_corrige: string
  ancienne_valeur: string
  nouvelle_valeur: string
  justification?: string
  source?: 'ia' | 'manuel'
  date?: string
}

type Props = {
  corrections: Correction[]
}

export default function TimelineCorrections({ corrections }: Props) {
  return (
    <ul className="border-l-2 border-yellow-300 pl-4 space-y-4 text-sm">
      {corrections.map((c, i) => (
        <li key={i} className="relative pl-2">
          <div className="absolute -left-[11px] top-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm" />
          <div className="text-xs text-gray-400 mb-0.5">{c.date ?? '📅 Date inconnue'}</div>
          <div>
            <strong className="capitalize">{c.champ_corrige}</strong>{' '}
            : <span className="line-through text-gray-500">{c.ancienne_valeur}</span>{' '}
            → <span className="text-green-700 font-semibold">{c.nouvelle_valeur}</span>
          </div>
          <div className="text-xs italic text-gray-500 mt-0.5">
            {c.source === 'manuel' ? '✅ Correction manuelle' : '🧠 IA'} – {c.justification || 'sans justification'}
          </div>
        </li>
      ))}
    </ul>
  )
}
