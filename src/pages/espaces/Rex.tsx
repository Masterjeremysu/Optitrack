import { useState } from 'react'
import LayoutRole from '../../composants/layout/LayoutRole'
import TitrePage from '../../ui/typographie/TitrePage'
import FiltresLivraisons from '../../composants/rex/FiltresLivraisons'
import TableauLivraisons from '../../composants/rex/TableauLivraisons'
import { useFiltrageLivraisons } from '../../hooks/useFiltrageLivraisons'
import type { FiltresLivraison } from '../../hooks/useFiltrageLivraisons'
import CarteMonde from '../../composants/rex/CarteMonde'
import TopDestinations from '../../composants/rex/TopDestinations'
import CarteEntrepot from '../../composants/rex/CarteEntrepot'
import { useAnalyseLivraisons } from '../../hooks/useAnalyseLivraisons'
import AlertesLivraisons from '../../composants/rex/AlertesLivraisons'
import { telechargerPDF } from '../../utils/pdfRapport'
import RechercheGlobale from '../../composants/rex/RechercheGlobale'
import StatsCartesEntrepots from '../../composants/rex/StatsCartesEntrepots'
import CarteInfo from '../../ui/carte/CarteInfo'
import GraphiqueAnomaliesParZone from '../../composants/rex/GraphiqueAnomaliesParZone'


export default function Rex() {
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
    entrepot: ''
  })

  const [cleRafraichissement, setCleRafraichissement] = useState(0)

  const { livraisons, chargement } = useFiltrageLivraisons(
    filtres,
    mois,
    annee,
    cleRafraichissement
  )

  const {
  actives,
  inactifs,
  entrepots,
  anomalies: {
    colisDormants,
    poidsIncoherent,
    valeurNulle,
    statutInvalide
  }
} = useAnalyseLivraisons(livraisons)



  return (
    <LayoutRole>
      <TitrePage>Responsable Exploitation – Carte & Statistiques</TitrePage>

      <RechercheGlobale
        livraisons={livraisons}
        onFiltrer={(nouveauxFiltres) => setFiltres(nouveauxFiltres)}
      />

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
  titre="Colis dormants"
  contenu={colisDormants.length.toString()}
  accent={colisDormants.length > 0 ? 'orange' : 'gris'}
/>
<CarteInfo
  titre="Poids incohérents"
  contenu={poidsIncoherent.length.toString()}
  accent={poidsIncoherent.length > 0 ? 'orange' : 'gris'}
/>
<CarteInfo
  titre="Valeurs nulles"
  contenu={valeurNulle.length.toString()}
  accent={valeurNulle.length > 0 ? 'orange' : 'gris'}
/>
<CarteInfo
  titre="Statuts non reconnus"
  contenu={statutInvalide.length.toString()}
  accent={statutInvalide.length > 0 ? 'orange' : 'gris'}
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

      {/* Statistiques par entrepôt */}
      {!vueMonde && <StatsCartesEntrepots livraisons={livraisons} />}
{!vueMonde && <GraphiqueAnomaliesParZone livraisons={livraisons} />}
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
        <CarteEntrepot livraisons={livraisons} />
      )}

      {/* Filtres dynamiques */}
      <FiltresLivraisons
        filtres={filtres}
        onChange={setFiltres}
        onReinitialiser={() =>
          setFiltres({ statut: '', pays: '', dateMin: '', dateMax: '', entrepot: '' })
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
      <div id="tableau-livraisons">
        <TableauLivraisons
          livraisons={livraisons}
          chargement={chargement}
          onRefresh={() => setCleRafraichissement(Date.now())}
        />
      </div>

      {/* Alertes */}
      <AlertesLivraisons livraisons={livraisons} />
    </LayoutRole>
  )
}
