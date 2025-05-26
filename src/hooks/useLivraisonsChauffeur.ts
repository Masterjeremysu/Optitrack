import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useProfilConnecte } from './useProfilConnecte'

export type LivraisonChauffeur = {
  id: string
  client: string
  adresse: string
  statut: string
  poids: number
  valeur: number
  date_expedition: string
  pays_destination: string 
 entrepot: string | null
  coords?: [number, number]
}


export function useLivraisonsChauffeur() {
  const { profil } = useProfilConnecte()
  const [livraisons, setLivraisons] = useState<LivraisonChauffeur[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const chargerLivraisons = async () => {
      if (!profil?.id) return

      setLoading(true)

      const { data, error } = await supabase
        .from('expeditions')
        .select('id, client, adresse, statut, poids, valeur, date_expedition, coords')
        .eq('chauffeur_id', profil.id)
        .order('date_expedition', { ascending: true })

      if (error) {
        console.error('❌ Erreur chargement livraisons chauffeur :', error.message)
        setLivraisons([])
      } else {
        setLivraisons(data as LivraisonChauffeur[])
      }

      setLoading(false)
    }

    chargerLivraisons()
  }, [profil?.id])

  return { livraisons, loading }
}
