import { useProfilConnecte } from '../../hooks/useProfilConnecte'
import { Link, useLocation } from 'react-router-dom'

export default function MenuLatéral() {
  const { role } = useProfilConnecte()
  const location = useLocation()

  const menus: Record<
    string,
    { label: string; lien: string; icon?: string }[]
  > = {
    interimaire: [{ label: 'Scanner', lien: '/espaces/interimaire', icon: '📦' }],
    chauffeur: [{ label: 'Livraisons', lien: '/espaces/chauffeur', icon: '🚚' }],
    rex: [
      { label: 'Carte', lien: '/espaces/rex', icon: '🗺️' },
      { label: 'Rapports', lien: '/espaces/rex/rapports', icon: '📈' },
      { label: 'Audit logistique', lien: '/audit/logistique', icon: '📄' },
      { label: 'Historique audits', lien: '/audit/historique', icon: '📚' }
    ],
    qhse: [{ label: 'Incidents', lien: '/espaces/qhse', icon: '⚠️' }],
    directeur: [
      { label: 'Vision globale', lien: '/espaces/directeur', icon: '📊' },
      { label: 'Historique audits', lien: '/audit/historique', icon: '📚' }
    ],
    admin: [{ label: 'Utilisateurs', lien: '/espaces/admin', icon: '👥' }]
  }

  return (
    <aside className="w-64 bg-white border-r shadow-sm h-screen sticky top-0 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-blue-600 mb-6">OptiTrack</h2>
      <nav className="flex flex-col gap-1">
        {menus[role || '']?.map((item) => (
          <Link
            key={item.lien}
            to={item.lien}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition font-medium ${
              location.pathname === item.lien
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
