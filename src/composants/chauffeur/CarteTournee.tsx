import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { useTourneeChauffeur } from '../../hooks/useTourneeChauffeur'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'

export default function CarteTournee() {
  const { profil } = useProfilConnecte()
  const { points, loading } = useTourneeChauffeur(profil?.id || '')

  if (loading) return <p className="text-sm text-gray-500">Chargement de la tournée...</p>
  if (points.length === 0) return <p className="text-sm text-gray-400">Aucune livraison prévue aujourd’hui</p>

  const center: [number, number] = [
    points[0]?.lat ?? 0,
    points[0]?.lon ?? 0
  ]

  const itineraire: [number, number][] = points.map(p => [p.lat, p.lon])

  return (
    <MapContainer center={center} zoom={12} className="h-[500px] w-full rounded shadow">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {points.map((p) => (
  <Marker
  key={p.id}
  position={[p.lat, p.lon]}
  icon={L.icon({
    iconUrl: p.statut === 'livré' ? '/marker-vert.png' : '/marker-bleu.png',
    iconSize: [30, 41],
    iconAnchor: [15, 41],
  })}
>
  <Popup>
    <strong>📦 {p.client}</strong><br />
    {p.adresse}<br />
    <span className="text-xs">Statut : {p.statut}</span>
  </Popup>
</Marker>
))}

      <Polyline positions={itineraire} color="blue" />
    </MapContainer>
  )
}
