import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type PointTournee = {
  id: string
  statut: string
  client: string
  lat: number
  lon: number
  adresse: string
}

export function useTourneeChauffeur(userId: string) {
  const [points, setPoints] = useState<PointTournee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const charger = async () => {
      setLoading(true)

      const today = new Date().toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('expeditions')
        .select('id, statut, client, lat, lon, adresse')
        .eq('chauffeur_id', userId)
        .gte('date_expedition', today)

      if (error) {
        console.error('Erreur chargement tournée chauffeur :', error.message)
        setPoints([])
      } else {
        setPoints(data as PointTournee[]) // ✅ assertion explicite
      }

      setLoading(false)
    }

    if (userId) {
      charger()
    }
  }, [userId])

  return { points, loading }
}
