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
    if (!session || !user || dejaRedirige) return

    const chargerRoleEtRediriger = async () => {
      console.log('🧠 Vérification du rôle en cours pour user ID :', user.id)

      const { data, error } = await supabase
        .from('profils')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        console.warn('🚨 Erreur récupération rôle utilisateur :', error)
        return
      }

      const roleNormalisé = data.role?.toLowerCase?.().trim()

      const destinationMap = {
        intérimaire: '/espaces/interimaire',
        chauffeur: '/espaces/chauffeur',
        chef_equipe: '/espaces/chef',
        rex: '/espaces/rex',
        qhse: '/espaces/qhse',
        directeur: '/espaces/directeur',
        admin: '/espaces/admin'
      } as const

      const destinationFinale = destinationMap[roleNormalisé as keyof typeof destinationMap]

      if (destinationFinale) {
        console.log(`✅ Redirection vers "${destinationFinale}" pour rôle "${roleNormalisé}"`)
        setDejaRedirige(true)
        navigate(destinationFinale)
      } else {
        console.warn(`❌ Rôle "${roleNormalisé}" non reconnu dans la destinationMap.`)
      }
    }

    chargerRoleEtRediriger()
  }, [session, user, dejaRedirige, navigate])
}
