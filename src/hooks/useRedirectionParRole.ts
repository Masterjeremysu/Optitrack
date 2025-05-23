import { useEffect } from 'react'
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export function useRedirectionParRole() {
  const session = useSession()
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('🧪 Hook useRedirectionParRole appelé')

    if (!session || !user) return

    const chargerRoleEtRediriger = async () => {
      const { data, error } = await supabase
  .from('profils')
  .select('role')
  .eq('id', user.id)
  .single()

console.log('✅ Résultat Supabase :', { data, error, id: user.id })

      const destinationMap = {
        intérimaire: '/espaces/interimaire',
        chauffeur: '/espaces/chauffeur',
        chef_equipe: '/espaces/chef',
        rex: '/espaces/rex',
        qhse: '/espaces/qhse',
        directeur: '/espaces/directeur',
        admin: '/espaces/admin',
      }

      const role = data?.role as keyof typeof destinationMap
      const destinationFinale = destinationMap[role]

      console.log('🧭 Destination :', destinationFinale)

      if (destinationFinale) {
        navigate(destinationFinale)
      }
    }

    chargerRoleEtRediriger()
  }, [session, user, navigate])
}
