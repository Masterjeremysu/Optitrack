// src/hooks/useHistoriqueLivraisons.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useProfilConnecte } from './useProfilConnecte'

export type LivraisonHistorique = {
  id: string
  client: string
  adresse: string
  statut: string
  valeur: number
  poids: number
  date_expedition: string
  date_livraison: string
}

export function useHistoriqueLivraisons() {
  const { profil } = useProfilConnecte()
  const [livraisons, setLivraisons] = useState<LivraisonHistorique[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const charger = async () => {
      if (!profil?.id) return

      setChargement(true)

      const { data, error } = await supabase
        .from('expeditions')
        .select('id, client, adresse, statut, valeur, poids, date_expedition, date_livraison')
        .eq('chauffeur_id', profil.id)
        .order('date_livraison', { ascending: false })
        .limit(50)

      if (error) {
        console.error('❌ Erreur chargement historique :', error.message)
        setLivraisons([])
      } else {
        setLivraisons(data as LivraisonHistorique[])
      }

      setChargement(false)
    }

    charger()
  }, [profil?.id])

  return { livraisons, chargement }
}
