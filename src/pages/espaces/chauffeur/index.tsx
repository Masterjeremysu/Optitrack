import { useState } from 'react'
import CarteTournee from '../../../composants/chauffeur/CarteTournee'
import ScannerColis from '../../../composants/chauffeur/ScannerColis'
import HistoriqueLivraisons from '../../../composants/chauffeur/HistoriqueLivraisons'
import SignatureClient from '../../../composants/chauffeur/SignatureClient'

export default function EspaceChauffeur() {
  const [colisActif, setColisActif] = useState<{ id: string } | null>(null)

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-gray-800">🚚 Espace Chauffeur</h1>
      <CarteTournee />
      <ScannerColis onColisDetecte={setColisActif} />
      {colisActif && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <p className="text-sm text-gray-600 mb-2">
            📦 Colis actif : <strong>{colisActif.id}</strong>
          </p>
          <SignatureClient expeditionId={colisActif.id} />
        </div>
      )}
      <HistoriqueLivraisons />
    </div>
  )
}
