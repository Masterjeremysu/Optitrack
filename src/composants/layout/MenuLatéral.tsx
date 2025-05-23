import { useProfilConnecte } from '../../hooks/useProfilConnecte'
import { Link } from 'react-router-dom'

export default function MenuLatéral() {
  const { role } = useProfilConnecte()

  const menus: Record<string, { label: string, lien: string }[]> = {
    interimaire: [
      { label: 'Scanner', lien: '/espaces/interimaire' },
    ],
    chauffeur: [
      { label: 'Livraisons', lien: '/espaces/chauffeur' },
    ],
    rex: [
      { label: 'Carte', lien: '/espaces/rex' },
      { label: 'Rapports', lien: '/espaces/rex/rapports' },
    ],
    qhse: [
      { label: 'Incidents', lien: '/espaces/qhse' },
    ],
    directeur: [
      { label: 'Vision globale', lien: '/espaces/directeur' },
    ],
    admin: [
      { label: 'Utilisateurs', lien: '/espaces/admin' },
    ],
  }

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4 text-blue-600">OptiTrack</h2>
      <nav className="flex flex-col gap-3">
        {menus[role || '']?.map((item) => (
          <Link
            key={item.lien}
            to={item.lien}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
