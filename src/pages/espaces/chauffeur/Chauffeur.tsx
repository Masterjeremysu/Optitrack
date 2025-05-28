import { useState } from 'react'

import { useProfilConnecte } from '../../../hooks/useProfilConnecte'
import LayoutRole from '../../../composants/layout/LayoutRole'
import CarteTournee from '../../../composants/chauffeur/CarteTournee'
import ScannerColis from '../../../composants/chauffeur/ScannerColis'
import ListeColisJour from '../../../composants/chauffeur/ListeColisJour'
import HistoriqueLivraisons from '../../../composants/chauffeur/HistoriqueLivraisons'
import SignalementColis from '../../../composants/chauffeur/SignalementColis'
import TitrePage from '../../../ui/typographie/TitrePage'
import { useRedirectionSiDeconnecte } from '../../../hooks/useRedirectionSiDeconnecte'

// 🆕 Nouveaux composants à créer progressivement
import GestionTournee from '../../../composants/chauffeur/GestionTournee'

import ChecklistVehicule from '../../../composants/chauffeur/ChecklistVehicule'
import PhotoLivraison from '../../../composants/chauffeur/PhotoLivraison'
import SignatureClient from '../../../composants/chauffeur/SignatureClient'
import InstructionsClient from '../../../composants/chauffeur/InstructionsClient'
import ReprogrammationColis from '../../../composants/chauffeur/ReprogrammationColis'
import RappelPrioritaires from '../../../composants/chauffeur/RappelPrioritaires'
import ModeNuit from '../../../composants/chauffeur/ModeNuit'
import BoutonUrgence from '../../../composants/chauffeur/BoutonUrgence'
import ModeHorsLigne from '../../../composants/chauffeur/ModeHorsLigne'

export default function Chauffeur() {
  const { profil } = useProfilConnecte()
  const [colisActif, setColisActif] = useState<{ id: string } | null>(null)

  useRedirectionSiDeconnecte()

  return (
    <LayoutRole>
      <TitrePage>{`🚚 Interface Chauffeur – Bonjour ${profil?.prenom || 'chauffeur'}`}</TitrePage>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🕒 Départ de tournée</h2>
          <GestionTournee />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🔧 Checklist véhicule</h2>
          <ChecklistVehicule />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🗺️ Tournée du jour</h2>
          <CarteTournee />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📦 Scanner un colis</h2>
          <ScannerColis onColisDetecte={setColisActif} />

        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">✅ Colis à livrer aujourd’hui</h2>
          <ListeColisJour />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📋 Instructions client</h2>
          <InstructionsClient />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📷 Preuve de livraison</h2>
          <PhotoLivraison />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🖊 Signature client</h2>
          <SignatureClient expeditionId={colisActif?.id} />

        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🔁 Reprogrammation</h2>
          <ReprogrammationColis />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🚨 Prioritaires à livrer</h2>
          <RappelPrioritaires />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">🛑 Problème rencontré</h2>
          <SignalementColis />
        </div>

        <div className="col-span-full bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">📊 Historique de la journée</h2>
          <HistoriqueLivraisons />
        </div>

        <div className="col-span-full flex justify-between items-center p-4">
          <BoutonUrgence />
          <ModeHorsLigne />
          <ModeNuit />
        </div>
      </div>
    </LayoutRole>
  )
}
