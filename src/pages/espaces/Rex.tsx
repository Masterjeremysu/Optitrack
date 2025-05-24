import { useState } from 'react'
import LayoutRole from '../../composants/layout/LayoutRole'
import TitrePage from '../../ui/typographie/TitrePage'
import CarteInfo from '../../ui/carte/CarteInfo'
import CartePoints from '../../composants/carte/CartePoints'
import FiltresLivraisons from '../../composants/rex/FiltresLivraisons'
import TableauLivraisons from '../../composants/rex/TableauLivraisons'
import { useFiltrageLivraisons } from '../../hooks/useFiltrageLivraisons'
import type { FiltresLivraison } from '../../hooks/useFiltrageLivraisons'
import CarteMonde from '../../composants/rex/CarteMonde'
import TopDestinations from '../../composants/rex/TopDestinations'

import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'
import AlertesLivraisons from '../../composants/rex/AlertesLivraisons'
import { telechargerPDF } from '../../utils/pdfRapport'

export default function Rex() {
  const [rafraichi] = useState(false)
  const [vueMonde, setVueMonde] = useState(true)
  const [mois, setMois] = useState('')
  const [annee, setAnnee] = useState('')

  const gererChangementDate = (m: string, y: string) => {
    setMois(m)
    setAnnee(y)
  }

  const [filtres, setFiltres] = useState<FiltresLivraison>({
    statut: '',
    pays: '',
    dateMin: '',
    dateMax: '',
  })

  const [cleRafraichissement, setCleRafraichissement] = useState(0)

  const { livraisons, chargement } = useFiltrageLivraisons(
    filtres,
    mois,
    annee,
    cleRafraichissement
  )

  const { actives, entrepots, inactifs, incoherents } =
    useAnalyseLivraisons(livraisons)

  return (
    <LayoutRole>
      <TitrePage>Responsable Exploitation – Carte & Statistiques</TitrePage>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <CarteInfo titre="Livraisons actives" contenu={actives.toString()} accent="bleu" />
        <CarteInfo titre="Entrepôts actifs" contenu={entrepots.toString()} accent="vert" />
        <CarteInfo
          titre="Colis inactifs"
          contenu={inactifs.toString()}
          accent={inactifs > 0 ? 'rouge' : 'gris'}
        />
        <CarteInfo
          titre="Statuts incohérents"
          contenu={incoherents.toString()}
          accent={incoherents > 0 ? 'orange' : 'gris'}
        />
      </div>

      {/* Changement de vue */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-gray-700">
          {vueMonde ? '🌍 Vue Carte Monde' : '🏭 Vue Carte Entrepôt'}
        </h3>
        <button
          onClick={() => setVueMonde(!vueMonde)}
          className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
        >
          {vueMonde ? 'Passer à la vue entrepôt' : 'Passer à la carte du monde'}
        </button>
      </div>

      {/* Carte */}
      {vueMonde ? (
        <div className="md:flex md:gap-6 mb-6">
          <div className="flex-1">
            <CarteMonde
              mois={mois}
              annee={annee}
              filtres={filtres}
              onChangeDate={gererChangementDate}
            />
          </div>
          <TopDestinations mois={mois} annee={annee} filtres={filtres} />
        </div>
      ) : (
        <CartePoints rafraichi={rafraichi} />
      )}

      {/* Filtres dynamiques */}
      <FiltresLivraisons
        filtres={filtres}
        onChange={setFiltres}
        onReinitialiser={() =>
          setFiltres({ statut: '', pays: '', dateMin: '', dateMax: '' })
        }
      />

      {/* Bouton PDF */}
      {livraisons.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => telechargerPDF(livraisons, mois, annee)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            📄 Télécharger le rapport PDF
          </button>
        </div>
      )}

      {/* Tableau */}
      <TableauLivraisons
        livraisons={livraisons}
        chargement={chargement}
        onRefresh={() => setCleRafraichissement(Date.now())}
      />

      {/* Alertes */}
      <AlertesLivraisons livraisons={livraisons} />
    </LayoutRole>
  )
}
