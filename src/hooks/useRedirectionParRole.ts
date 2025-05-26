import { useEffect, useState } from 'react'
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/supabase'
import { useNavigate, useLocation } from 'react-router-dom'

export function useRedirectionParRole() {
  const session = useSession()
  const user = useUser()
  const navigate = useNavigate()
  const location = useLocation()
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
        console.warn("🔴 Impossible de récupérer le rôle", error)
        return
      }

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

      console.log('✅ Rôle récupéré :', role)
      console.log('🧭 Page actuelle :', location.pathname)
      console.log('➡️ Destination :', destinationFinale)

      // 💥 Évite les redirections vers la même page
      if (destinationFinale && location.pathname !== destinationFinale) {
        setDejaRedirige(true)
        navigate(destinationFinale)
      }
    }

    chargerRoleEtRediriger()
  }, [session, user, dejaRedirige, navigate, location])
}
