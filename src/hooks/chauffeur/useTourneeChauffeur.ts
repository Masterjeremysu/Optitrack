import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type PointLivraison = {
  id: string
  lat: number
  lon: number
  client: string
  adresse: string
  statut: string
}

export function useTourneeChauffeur(chauffeurId: string) {
  const [points, setPoints] = useState<PointLivraison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const charger = async () => {
      if (!chauffeurId) return

      setLoading(true)

      // 🗓 Filtre du jour
      const aujourdHui = new Date().toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('expeditions')
        .select('id, lat, lon, client, adresse, statut')
        .eq('chauffeur_id', chauffeurId)
        .eq('statut', 'en cours')
        .gte('date_expedition', aujourdHui)
        .lte('date_expedition', aujourdHui) // optionnel selon format date
        .not('lat', 'is', null)
        .not('lon', 'is', null)
        .order('date_expedition', { ascending: true })

      if (error) {
        console.error('Erreur chargement tournée chauffeur :', error.message)
        setPoints([])
      } else {
        setPoints(data || [])
      }

      setLoading(false)
    }

    charger()
  }, [chauffeurId])

  return { points, loading }
}
