import { useSession } from '@supabase/auth-helpers-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRedirectionParRole } from '../hooks/useRedirectionParRole'

export default function Accueil() {
  const session = useSession()
  const navigate = useNavigate()

  useRedirectionParRole()

  useEffect(() => {
    if (!session) {
      navigate('/connexion')
    }
  }, [session, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Redirection en cours...</p>
    </div>
  )
}
