// src/hooks/useRechercheColis.ts
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export type Colis = {
  id: string
  client: string
  adresse: string
  statut: string
  poids: number
  valeur: number
  date_expedition: string
  date_livraison?: string | null
  chauffeur_id?: string | null
  entrepot: string | null
  lat?: number | null
  lon?: number | null
   pays_destination: string
}

export function useRechercheColis() {
  const [colis, setColis] = useState<Colis | null>(null)
  const [loading, setLoading] = useState(false)

  const chercher = async (code: string) => {
    setLoading(true)

    const { data, error } = await supabase
      .from('expeditions')
      .select('id, client, adresse, statut, poids, valeur, date_expedition, date_livraison, chauffeur_id, entrepot, lat, lon, pays_destination')
      .eq('id', code)
      .single()

    if (error) {
      console.error('❌ Colis introuvable :', error.message)
      setColis(null)
    } else {
      setColis(data as Colis)
    }

    setLoading(false)
  }

  return { colis, chercher, loading }
}
