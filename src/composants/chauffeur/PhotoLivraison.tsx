import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'

export default function PhotoLivraison() {
  const { profil } = useProfilConnecte()
  const [photo, setPhoto] = useState<File | null>(null)
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [envoi, setEnvoi] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!photo) return

    setEnvoi(true)
    const fileName = `${profil?.id}_${Date.now()}.jpg`

    const { error: uploadError } = await supabase.storage
      .from('preuves-livraison')
      .upload(fileName, photo)

    if (uploadError) {
      setMessage("❌ Erreur lors de l'upload.")
      setEnvoi(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('preuves-livraison')
      .getPublicUrl(fileName)

    setUrl(urlData.publicUrl)
    setMessage('✅ Photo enregistrée avec succès.')

    // Exemple : lier à un colis spécifique ici si besoin
    // await lierPhotoAColis(expeditionId, urlData.publicUrl)

    setEnvoi(false)
  }

  return (
    <div className="space-y-3">
      <label htmlFor="photo-upload" className="text-sm font-medium">
        📷 Ajouter une preuve photo :
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
        aria-label="Uploader une photo de preuve"
      />

      <button
        onClick={handleUpload}
        disabled={!photo || envoi}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer la photo
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}

      {url && (
        <div className="mt-2">
          <img src={url} alt="Preuve de livraison" className="w-48 rounded shadow" />
        </div>
      )}
    </div>
  )
}
