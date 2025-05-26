// src/hooks/useRedirectionSiDeconnecte.ts
import { useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useNavigate } from 'react-router-dom'

export function useRedirectionSiDeconnecte() {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (session === null) {
      navigate('/connexion')
    }
  }, [session, navigate])
}
