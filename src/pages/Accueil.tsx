import { useRedirectionParRole } from '../hooks/useRedirectionParRole'

export default function Accueil() {
  useRedirectionParRole()

  console.log('✅ Accueil monté')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Redirection en cours...</p>
      
    </div>
  )
}
