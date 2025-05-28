import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { useTourneeChauffeur } from '../../hooks/useTourneeChauffeur'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'

export default function CarteTournee() {
  const { profil } = useProfilConnecte()
  const chauffeurId = profil?.id

  const { points, loading } = useTourneeChauffeur(chauffeurId || '')

  if (loading) {
    return <p className="text-sm text-gray-500">Chargement de la tournée...</p>
  }

  if (!points || points.length === 0) {
    return <p className="text-sm text-gray-400">Aucune livraison prévue aujourd’hui.</p>
  }

  const center: [number, number] = [points[0].lat, points[0].lon]
  const itineraire: [number, number][] = points.map((p) => [p.lat, p.lon])

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-[400px] w-full rounded shadow"
      scrollWheelZoom={false}
    >
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
            <div className="space-y-1">
              <div><strong>📦 {p.client}</strong></div>
              <div className="text-xs">{p.adresse}</div>
              <div className="text-xs text-gray-500">Statut : {p.statut}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={itineraire} color="blue" />
    </MapContainer>
  )
}
