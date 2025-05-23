// src/composants/rex/TopDestinations.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Destination = {
  pays: string
  total: number
}

type Props = {
  mois: string
  annee: string
}

export default function TopDestinations({ mois, annee }: Props) {
  const [top, setTop] = useState<Destination[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const charger = async () => {
      setChargement(true)

      const { data, error } = await supabase
        .from('expeditions')
        .select('pays_destination, date_expedition')

      if (error) {
        console.error('❌ Erreur Supabase', error.message)
        return
      }

      const comptage: Record<string, number> = {}

      data?.forEach((row) => {
        const pays = row.pays_destination
        const date = new Date(row.date_expedition)
        const moisRow = String(date.getMonth() + 1).padStart(2, '0')
        const anneeRow = String(date.getFullYear())

        const matchMois = !mois || moisRow === mois
        const matchAnnee = !annee || anneeRow === annee

        if (pays && matchMois && matchAnnee) {
          comptage[pays] = (comptage[pays] || 0) + 1
        }
      })

      const trié: Destination[] = Object.entries(comptage)
        .map(([pays, total]) => ({ pays, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10)

      setTop(trié)
      setChargement(false)
    }

    charger()
  }, [mois, annee])

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full md:w-[400px]">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">🏆 Top 10 destinations</h2>

      {chargement ? (
        <p className="text-gray-500">Chargement...</p>
      ) : top.length === 0 ? (
        <p className="text-gray-400 italic">Aucune expédition trouvée</p>
      ) : (
        <ul className="space-y-2">
          {top.map((p, i) => (
            <li key={p.pays} className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{i + 1}. {p.pays}</span>
              <span className="text-blue-600">{p.total} expéditions</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
