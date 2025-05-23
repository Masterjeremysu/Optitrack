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
import { PDFDownloadLink } from '@react-pdf/renderer'
import RapportLivraisons from '../../pdf/RapportLivraisons'



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

  const { livraisons, chargement } = useFiltrageLivraisons(filtres, mois, annee)


  return (
    <LayoutRole>
      <TitrePage>Responsable Exploitation – Carte & Statistiques</TitrePage>

      {/* Statistiques visuelles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CarteInfo titre="Livraisons actives" contenu="46" accent="bleu" />
        <CarteInfo titre="Entrepôts actifs" contenu="8" accent="vert" />
        <CarteInfo titre="Zones en alerte" contenu="2" accent="gris" />
      </div>

      {/* Choix de vue */}
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

      {/* Affichage cartes + top 10 */}
      {vueMonde ? (
        <div className="md:flex md:gap-6 mb-6">
          <div className="flex-1">
            <CarteMonde mois={mois} annee={annee} onChangeDate={gererChangementDate} />
          </div>
          <TopDestinations mois={mois} annee={annee} />
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

      {/* Tableau filtré */}
      <div className="flex justify-end mb-4">
  <PDFDownloadLink
  document={
    <RapportLivraisons
      livraisons={livraisons}
      mois={mois}
      annee={annee}
    />
  }
  fileName={`rapport_livraisons_${mois}_${annee}.pdf`}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
>
  📄 Télécharger le rapport PDF
</PDFDownloadLink>

</div>

      <TableauLivraisons livraisons={livraisons} chargement={chargement} />
    </LayoutRole>
  )
}
