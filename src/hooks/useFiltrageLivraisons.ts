// src/hooks/useFiltrageLivraisons.ts
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export type Livraison = {
  id: string
  pays_destination: string
  statut: string
  client: string
  valeur: number
  poids: number
  date_expedition: string
}

export type FiltresLivraison = {
  statut: string
  pays: string
  dateMin: string
  dateMax: string
}

export function useFiltrageLivraisons(
  filtres: FiltresLivraison,
  mois?: string,
  annee?: string
) {
  const [livraisons, setLivraisons] = useState<Livraison[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const charger = async () => {
      setChargement(true)

      let requete = supabase
        .from('expeditions')
        .select('id, pays_destination, statut, client, valeur, poids, date_expedition')
        .order('date_expedition', { ascending: false })

      if (filtres.statut) {
        requete = requete.eq('statut', filtres.statut)
      }
      if (filtres.pays) {
        requete = requete.ilike('pays_destination', `%${filtres.pays}%`)
      }
      if (filtres.dateMin) {
        requete = requete.gte('date_expedition', filtres.dateMin)
      }
      if (filtres.dateMax) {
        requete = requete.lte('date_expedition', filtres.dateMax)
      }

      const { data, error } = await requete

      if (error) {
        console.error('❌ Erreur chargement livraisons filtrées :', error.message)
        setLivraisons([])
      } else {
        // 🧠 On filtre aussi côté JS selon le mois et l'année si fournis
        const filtré = (data || []).filter((row) => {
          const date = new Date(row.date_expedition)
          const moisRow = String(date.getMonth() + 1).padStart(2, '0')
          const anneeRow = String(date.getFullYear())

          const matchMois = !mois || moisRow === mois
          const matchAnnee = !annee || anneeRow === annee

          return matchMois && matchAnnee
        })

        setLivraisons(filtré)
      }

      setChargement(false)
    }

    charger()
  }, [filtres, mois, annee])

  return { livraisons, chargement }
}
