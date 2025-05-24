// src/composants/rex/CarteMonde.tsx
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import SelectDate from '../../ui/formulaire/SelectDate'
import type { FiltresLivraison } from '../../hooks/useFiltrageLivraisons'

type Pays = {
  pays: string
  count: number
  lat: number
  lng: number
}

type Props = {
  mois: string
  annee: string
  filtres: FiltresLivraison
  onChangeDate: (mois: string, annee: string) => void
}

export default function CarteMonde({ mois, annee, filtres, onChangeDate }: Props) {
  const [points, setPoints] = useState<Pays[]>([])

  useEffect(() => {
    const charger = async () => {
      let query = supabase.from('expeditions').select('pays_destination, date_expedition, statut')

      if (filtres.statut) query = query.eq('statut', filtres.statut)
      if (filtres.pays) query = query.ilike('pays_destination', `%${filtres.pays}%`)
      if (filtres.dateMin) query = query.gte('date_expedition', filtres.dateMin)
      if (filtres.dateMax) query = query.lte('date_expedition', filtres.dateMax)

      const { data, error } = await query

      if (error) {
        console.error('❌ Erreur Supabase', error.message)
        return
      }

      const geoRef: Record<string, { lat: number; lng: number }> = {
        France: { lat: 46.603354, lng: 1.888334 },
        Allemagne: { lat: 51.1657, lng: 10.4515 },
        Italie: { lat: 41.8719, lng: 12.5674 },
        Espagne: { lat: 40.4637, lng: -3.7492 },
        Belgique: { lat: 50.5039, lng: 4.4699 },
        RoyaumeUni: { lat: 55.3781, lng: -3.436 },
        ÉtatsUnis: { lat: 37.0902, lng: -95.7129 },
        Canada: { lat: 56.1304, lng: -106.3468 },
        Brésil: { lat: -14.235, lng: -51.9253 },
        Japon: { lat: 36.2048, lng: 138.2529 },
        Australie: { lat: -25.2744, lng: 133.7751 },
        Chine: { lat: 35.8617, lng: 104.1954 },
        Inde: { lat: 20.5937, lng: 78.9629 },
        Russie: { lat: 61.524, lng: 105.3188 },
        AfriqueDuSud: { lat: -30.5595, lng: 22.9375 },
        Mexique: { lat: 23.6345, lng: -102.5528 },
        Argentine: { lat: -38.4161, lng: -63.6167 },
        Turquie: { lat: 38.9637, lng: 35.2433 },
        CoréeDuSud: { lat: 35.9078, lng: 127.7669 },
        Indonésie: { lat: -0.7893, lng: 113.9213 },
        Colombie: { lat: 4.5709, lng: -74.2973 },
        Égypte: { lat: 26.8206, lng: 30.8025 },
        Vietnam: { lat: 14.0583, lng: 108.2772 },
        Pologne: { lat: 51.9194, lng: 19.1451 },
        Suède: { lat: 60.1282, lng: 18.6435 },
        Norvège: { lat: 60.472, lng: 8.4689 },
        Suisse: { lat: 46.8182, lng: 8.2275 },
        PaysBas: { lat: 52.1326, lng: 5.2913 },
        Danemark: { lat: 56.2639, lng: 9.5018 },
        Finlande: { lat: 61.9241, lng: 25.7482 },
        Autriche: { lat: 47.5162, lng: 14.5501 },
        Grèce: { lat: 39.0742, lng: 21.8243 },
        Portugal: { lat: 39.3999, lng: -8.2245 },
        Irlande: { lat: 53.4129, lng: -8.2439 },
        Hongrie: { lat: 47.1625, lng: 19.5033 },
        Tchéquie: { lat: 49.8175, lng: 15.473 },
        Roumanie: { lat: 45.9432, lng: 24.9668 },
        Bulgarie: { lat: 42.7339, lng: 25.4858 },
        Croatie: { lat: 45.1, lng: 15.2 }
      }

      const comptage: Record<string, number> = {}

      data?.forEach((row) => {
        const pays = row.pays_destination
        const date = new Date(row.date_expedition)
        const moisRow = String(date.getMonth() + 1).padStart(2, '0')
        const anneeRow = String(date.getFullYear())

        const matchMois = !mois || moisRow === mois
        const matchAnnee = !annee || anneeRow === annee

        if (pays && matchMois && matchAnnee) {
          comptage[pays] = (comptage[pays] || 0) + 1
        }
      })

      const resultat: Pays[] = Object.entries(comptage)
        .map(([pays, count]) => ({
          pays,
          count,
          lat: geoRef[pays]?.lat ?? 0,
          lng: geoRef[pays]?.lng ?? 0,
        }))
        .filter((p) => p.lat !== 0 && p.lng !== 0)

      setPoints(resultat)
    }

    charger()
  }, [mois, annee, filtres])

  return (
    <div className="rounded-lg overflow-hidden shadow mb-8">
      <SelectDate mois={mois} annee={annee} onChange={onChangeDate} />

      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((pt, idx) => (
          <CircleMarker
            key={idx}
            center={[pt.lat, pt.lng]}
            radius={5 + pt.count}
            pathOptions={{ color: 'blue', fillOpacity: 0.6 }}
          >
            <Tooltip>{pt.pays} – {pt.count} expéditions</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
