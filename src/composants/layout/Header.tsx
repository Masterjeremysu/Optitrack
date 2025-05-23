import { useProfilConnecte } from '../../hooks/useProfilConnecte'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function HeaderGlobal() {
  const { nom, role } = useProfilConnecte()
  const navigate = useNavigate()

  const seDeconnecter = async () => {
    await supabase.auth.signOut()
    navigate('/connexion')
  }

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
      <div className="text-sm text-gray-600">
        Connecté en tant que <strong>{nom}</strong> ({role})
      </div>
      <button
        onClick={seDeconnecter}
        className="text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Se déconnecter
      </button>
    </header>
  )
}
