// src/hooks/useRedirectionParRole.ts
import { useEffect, useState } from 'react'
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export function useRedirectionParRole() {
  const session = useSession()
  const user = useUser()
  const navigate = useNavigate()
  const [dejaRedirige, setDejaRedirige] = useState(false)

  useEffect(() => {
    console.log('✅ useRedirectionParRole déclenché')
    console.log('🧩 Session :', session)
    console.log('🧑‍💻 User :', user)

    if (!session || !user || dejaRedirige) {
      console.log('⛔ Pas de redirection (pas de session, user ou déjà redirigé)')
      return
    }

    const chargerRoleEtRediriger = async () => {
      console.log('📡 Requête vers Supabase pour récupérer le rôle...')

      const { data, error } = await supabase
        .from('profils')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        console.error('❌ Erreur récupération du rôle :', error)
        return
      }

      console.log('✅ Rôle récupéré :', data.role)

      const destinationMap = {
        intérimaire: '/espaces/interimaire',
        chauffeur: '/espaces/chauffeur',
        chef_equipe: '/espaces/chef',
        rex: '/espaces/rex',
        qhse: '/espaces/qhse',
        directeur: '/espaces/directeur',
        admin: '/espaces/admin'
      }

      const role = data.role as keyof typeof destinationMap
      const destinationFinale = destinationMap[role]

      if (destinationFinale) {
        console.log('➡️ Redirection vers :', destinationFinale)
        setDejaRedirige(true)
        navigate(destinationFinale)
      } else {
        console.warn('⚠️ Aucun chemin défini pour ce rôle :', data.role)
      }
    }

    chargerRoleEtRediriger()
  }, [session, user, dejaRedirige, navigate])
}
