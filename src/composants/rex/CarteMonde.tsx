// src/composants/rex/CarteMonde.tsx
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import SelectDate from '../../ui/formulaire/SelectDate'

type Pays = {
  pays: string
  count: number
  lat: number
  lng: number
}

type Props = {
  mois: string
  annee: string
  onChangeDate: (mois: string, annee: string) => void
}

export default function CarteMonde({ mois, annee, onChangeDate }: Props) {
  const [points, setPoints] = useState<Pays[]>([])

  useEffect(() => {
    const charger = async () => {
      const requete = supabase
        .from('expeditions')
        .select('pays_destination, date_expedition')

      const { data, error } = await requete

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
        // Ajoute d'autres pays si besoin
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
  }, [mois, annee])

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
