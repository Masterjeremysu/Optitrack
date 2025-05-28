import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { supabase } from '../../lib/supabase'
import { useProfilConnecte } from '../../hooks/useProfilConnecte'

type Props = {
  expeditionId: string | undefined
}

export default function SignatureClient({ expeditionId }: Props) {
  const { profil } = useProfilConnecte()
  const sigCanvas = useRef<SignatureCanvas | null>(null)
  const [message, setMessage] = useState('')
  const [envoi, setEnvoi] = useState(false)

  const clear = () => {
    sigCanvas.current?.clear()
    setMessage('')
  }

  const saveSignature = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      setMessage('Merci de signer avant de valider.')
      return
    }

    if (!expeditionId) {
      setMessage('❌ Aucune expédition liée.')
      return
    }

    setEnvoi(true)

    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    const fileName = `${profil?.id}_signature_${Date.now()}.png`

    const response = await fetch(dataUrl)
    const blob = await response.blob()

    const { error: uploadError } = await supabase.storage
      .from('signatures-client')
      .upload(fileName, blob)

    if (uploadError) {
      setMessage('❌ Erreur lors de l’enregistrement.')
      setEnvoi(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('signatures-client')
      .getPublicUrl(fileName)

    if (urlData?.publicUrl) {
      const { error: updateError } = await supabase
        .from('expeditions')
        .update({ signature_client: urlData.publicUrl })
        .eq('id', expeditionId)

      if (updateError) {
        setMessage("⚠️ Signature enregistrée mais non liée à l'expédition.")
      } else {
        setMessage('✅ Signature enregistrée avec succès.')
      }
    }

    setEnvoi(false)
  }

  return (
    <div className="space-y-2">
      <label htmlFor="signature-canvas" className="text-sm font-medium">
        ✍️ Signature du client :
      </label>
      <div id="signature-canvas" className="border border-gray-300 rounded bg-white">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 300, height: 150, className: 'bg-white rounded' }}
          ref={sigCanvas}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={saveSignature}
          disabled={envoi}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Enregistrer la signature
        </button>
        <button
          onClick={clear}
          className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
        >
          Effacer
        </button>
      </div>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )
}
