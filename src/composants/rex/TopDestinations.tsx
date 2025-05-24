import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { FiltresLivraison } from '../../hooks/useFiltrageLivraisons'

type Props = {
  mois: string
  annee: string
  filtres: FiltresLivraison
}

type Destination = {
  pays_destination: string
  count: number
}

export default function TopDestinations({ mois, annee, filtres }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    const charger = async () => {
      let query = supabase
        .from('expeditions')
        .select('pays_destination, date_expedition, statut')

      // 📦 Ajout des filtres dynamiques
      if (filtres.statut) {
        query = query.eq('statut', filtres.statut)
      }
      if (filtres.pays) {
        query = query.ilike('pays_destination', `%${filtres.pays}%`)
      }
      if (filtres.dateMin) {
        query = query.gte('date_expedition', filtres.dateMin)
      }
      if (filtres.dateMax) {
        query = query.lte('date_expedition', filtres.dateMax)
      }

      const { data, error } = await query

      if (error) {
        console.error('Erreur chargement destinations:', error.message)
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

      const tri = Object.entries(comptage)
        .map(([pays_destination, count]) => ({ pays_destination, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      setDestinations(tri)
    }

    charger()
  }, [mois, annee, filtres])

  return (
    <div className="bg-white rounded shadow p-4 w-full md:w-72 mt-6 md:mt-0">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">🏆 Top 10 destinations</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {destinations.map((d, i) => (
          <li key={d.pays_destination}>
            {i + 1}. {d.pays_destination} — {d.count} expéditions
          </li>
        ))}
      </ul>
    </div>
  )
}
