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
  entrepot?: string
}

export type FiltresLivraison = {
  statut: string
  pays: string
  dateMin: string
  dateMax: string
  entrepot?: string
}

export function useFiltrageLivraisons(
  filtres: FiltresLivraison,
  mois: string,
  annee: string,
  cleRafraichissement: number = 0
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

      if (filtres.entrepot) {
        requete = requete.eq('entrepot', filtres.entrepot)
      }

      // Nettoyage des filtres
      const statut = filtres.statut.trim().toLowerCase()
      const pays = filtres.pays.trim().toLowerCase()

      if (statut) {
        requete = requete.ilike('statut', statut)
      }
      if (pays) {
        requete = requete.ilike('pays_destination', `%${pays}%`)
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
        // Filtrage JS sur mois + année
        const filtré = (data || []).filter((row) => {
          const date = new Date(row.date_expedition)
          const moisRow = String(date.getMonth() + 1).padStart(2, '0')
          const anneeRow = String(date.getFullYear())
          return (!mois || moisRow === mois) && (!annee || anneeRow === annee)
        })

        // Ajout temporaire de l’entrepôt (à remplacer plus tard)
        const avecEntrepots = filtré.map((l, i) => ({
          ...l,
          entrepot: ['A1', 'A2', 'A3', 'B1', 'B2', 'C1'][i % 6]
        }))

        setLivraisons(avecEntrepots)
        console.log(`📦 ${filtré.length} livraisons chargées (refresh ${cleRafraichissement})`)
      }

      setChargement(false)
    }

    charger()
  }, [filtres, mois, annee, cleRafraichissement])

  return { livraisons, chargement }
}
