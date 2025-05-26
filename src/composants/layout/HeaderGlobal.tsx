// src/composants/layout/HeaderGlobal.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'
import { supabase } from '../../lib/supabase'
import logo from '../../assets/logo.png'

export default function HeaderGlobal() {
  const { profil, role } = useProfilConnecte()
  const navigate = useNavigate()

  const seDeconnecter = async () => {
    await supabase.auth.signOut()
    navigate('/connexion')
  }

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* 👤 Logo + Marque */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="OptiTrack" className="h-8 w-auto" />
        <span className="text-2xl font-bold text-blue-600 tracking-wide">OptiTrack</span>
      </Link>

      {/* 🔗 Menu de navigation */}
      <nav className="flex gap-6 text-gray-700 font-medium">
        <Link to="/">Carte</Link>
        <Link to="/tableau">Tableau de bord</Link>
        <Link to="/paramètres">Paramètres</Link>
      </nav>

      {/* 👤 Utilisateur connecté */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        👤 <span className="font-medium">{profil?.nom || 'Invité'}</span>
        {role && <span className="text-gray-400">({role})</span>}
        {profil && (
          <button
            onClick={seDeconnecter}
            className="text-blue-600 font-semibold hover:underline ml-2"
          >
            Se déconnecter
          </button>
        )}
      </div>
    </header>
  )
}
