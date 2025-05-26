import CarteTournee from '../../../composants/chauffeur/CarteTournee'
import ScannerColis from '../../../composants/chauffeur/ScannerColis'
import HistoriqueLivraisons from '../../../composants/chauffeur/HistoriqueLivraisons'

export default function EspaceChauffeur() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-gray-800">🚚 Espace Chauffeur</h1>
      <CarteTournee />
      <ScannerColis />
      <HistoriqueLivraisons />
    </div>
  )
}
