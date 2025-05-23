// src/composants/CartePoints.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import L from 'leaflet'

// Fix icône défaut Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function CartePoints({ rafraichi }: { rafraichi: boolean }) {
  const [points, setPoints] = useState<any[]>([])

  const chargerPoints = async () => {
    const { data, error } = await supabase.from('points').select('*')
    if (!error && data) setPoints(data)
  }

  useEffect(() => {
    chargerPoints()
  }, [rafraichi])

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={5} className="h-[500px] w-full rounded-xl shadow-md z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]}>
          <Popup>
            <strong>{point.nom}</strong> <br />
            Type : {point.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
