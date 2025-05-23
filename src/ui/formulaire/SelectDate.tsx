// src/ui/formulaire/SelectDate.tsx
type Props = {
  mois: string
  annee: string
  onChange: (mois: string, annee: string) => void
}

export default function SelectDate({ mois, annee, onChange }: Props) {
  const moisOptions = [
    { value: '', label: 'Tous les mois' },
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' },
  ]

  const annees = Array.from({ length: 6 }, (_, i) => (2020 + i).toString())

  return (
    <div className="flex gap-4 items-center mb-4">
      <label htmlFor="mois-select" className="sr-only">
        Mois
      </label>
      <select
        id="mois-select"
        aria-label="Mois"
        value={mois}
        onChange={(e) => onChange(e.target.value, annee)}
        className="border px-3 py-2 rounded"
      >
        {moisOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        id="annee-select"
        aria-label="Année"
        value={annee}
        onChange={(e) => onChange(mois, e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Toutes les années</option>
        {annees.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}
