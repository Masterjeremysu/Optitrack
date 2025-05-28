import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { useProfilConnecte } from '../useProfilConnecte'

type Tournee = {
  id: string
  chauffeur_id: string
  heure_depart: string
  heure_retour?: string | null
  checklist?: Record<string, boolean>
}

export function useTournee() {
  const { profil } = useProfilConnecte()
  const [tourneeEnCours, setTourneeEnCours] = useState<Tournee | null>(null)
  const [chargement, setChargement] = useState(true)

  // ✅ Chargement avec useCallback pour stabilité
  const chargerTournee = useCallback(async () => {
    if (!profil?.id) return
    setChargement(true)

    const { data, error } = await supabase
      .from('tournees_chauffeur')
      .select('*')
      .eq('chauffeur_id', profil.id)
      .is('heure_retour', null)
      .order('heure_depart', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('❌ Erreur lors du chargement de la tournée :', error.message)
    } else {
      setTourneeEnCours(data)
    }

    setChargement(false)
  }, [profil?.id])

  // 🚀 Démarre une nouvelle tournée
  const demarrerTournee = useCallback(async () => {
    if (!profil?.id) return

    const { error } = await supabase
      .from('tournees_chauffeur')
      .insert({ chauffeur_id: profil.id })

    if (error) {
      console.error('❌ Erreur lors de la création de la tournée :', error.message)
    } else {
      await chargerTournee()
    }
  }, [profil?.id, chargerTournee])

  // 🏁 Termine la tournée
  const terminerTournee = useCallback(async () => {
    if (!tourneeEnCours) return

    const { error } = await supabase
      .from('tournees_chauffeur')
      .update({ heure_retour: new Date().toISOString() })
      .eq('id', tourneeEnCours.id)

    if (error) {
      console.error('❌ Erreur lors de la clôture de la tournée :', error.message)
    } else {
      setTourneeEnCours(null)
    }
  }, [tourneeEnCours])

  // 🔁 Auto-charge à la connexion du profil
  useEffect(() => {
    chargerTournee()
  }, [chargerTournee])

  return {
    tourneeEnCours,
    chargement,
    chargerTournee,
    demarrerTournee,
    terminerTournee,
  }
}
