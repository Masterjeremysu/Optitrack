// src/composants/FormulairePoint.tsx
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function FormulairePoint({ rafraichir }: { rafraichir: () => void }) {
  const [nom, setNom] = useState('')
  const [type, setType] = useState('entrepôt')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const ajouterPoint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nom || !latitude || !longitude) return alert('Tous les champs sont requis.')

    const { error } = await supabase.from('points').insert({
      nom,
      type,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    })

    if (error) {
      alert('Erreur lors de l’ajout.')
      console.error(error)
    } else {
      setNom('')
      setLatitude('')
      setLongitude('')
      rafraichir()
    }
  }

  return (
    <form onSubmit={ajouterPoint} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4 text-center">Ajouter un point</h2>

      <input type="text" placeholder="Nom du point" value={nom} onChange={e => setNom(e.target.value)} className="champ" />
      
      <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1 block">
  Type de point
</label>
<select
  id="type"
  aria-label="Type de point"
  value={type}
  onChange={e => setType(e.target.value)}
  className="champ"
>
  <option value="entrepôt">Entrepôt</option>
  <option value="livraison">Livraison</option>
</select>


      
      <input type="number" step="any" placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} className="champ" />
      
      <input type="number" step="any" placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)} className="champ" />
      
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
        Enregistrer
      </button>
    </form>
  )
}
