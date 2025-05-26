import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/supabase'

export type ProfilConnecte = {
  id: string
  nom: string
  prenom: string
  role: string
}

export function useProfilConnecte(): {
  profil: ProfilConnecte | null
  role: string | null
  chargement: boolean
} {
  const user = useUser()
  const [profil, setProfil] = useState<ProfilConnecte | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const chargerProfil = async () => {
      if (!user?.id) {
        setChargement(false)
        return
      }

      const { data, error } = await supabase
        .from('profils')
        .select('id, nom, prenom, role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Erreur chargement profil connecté:', error)
        setProfil(null)
      } else {
        setProfil(data as ProfilConnecte)
      }

      setChargement(false)
    }

    chargerProfil()
  }, [user])

  return {
    profil,
    role: profil?.role || null,
    chargement
  }
}
