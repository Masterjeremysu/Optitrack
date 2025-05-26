import { useProfilConnecte } from '../../../hooks/useProfilConnecte'
import LayoutRole from '../../../composants/layout/LayoutRole'
import CarteTournee from '../../../composants/chauffeur/CarteTournee'
import ScannerColis from '../../../composants/chauffeur/ScannerColis'
import ListeColisJour from '../../../composants/chauffeur/ListeColisJour'
import HistoriqueLivraisons from '../../../composants/chauffeur/HistoriqueLivraisons'
import SignalementColis from '../../../composants/chauffeur/SignalementColis'
import TitrePage from '../../../ui/typographie/TitrePage'

export default function Chauffeur() {
  const { profil } = useProfilConnecte()

  return (
    <LayoutRole>
      <TitrePage>{`🚚 Interface Chauffeur – Bonjour ${profil?.prenom || 'chauffeur'}`}</TitrePage>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🗺️ Tournée du jour</h2>
          <CarteTournee />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📦 Scanner un colis</h2>
          <ScannerColis />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">✅ Colis à livrer aujourd’hui</h2>
          <ListeColisJour />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Signaler un problème</h2>
          <SignalementColis />
        </div>

        <div className="col-span-full bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">⏳ Historique de la journée</h2>
          <HistoriqueLivraisons />
        </div>
      </div>
    </LayoutRole>
  )
}
