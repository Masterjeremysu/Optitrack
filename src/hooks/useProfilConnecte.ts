import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/supabase'

export function useProfilConnecte() {
  const user = useUser()
  const [role, setRole] = useState<string | null>(null)
  const [nom, setNom] = useState<string | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    if (!user) return

    const chargerProfil = async () => {
      const { data } = await supabase
        .from('profils')
        .select('nom, role')
        .eq('id', user.id)
        .single()

      if (data) {
        setNom(data.nom)
        setRole(data.role)
      }

      setChargement(false)
    }

    chargerProfil()
  }, [user])

  return { role, nom, chargement }
}
