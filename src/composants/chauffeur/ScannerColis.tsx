import { useState } from 'react'
import { useRechercheColis } from '../../hooks/useRechercheColis'
import FicheColis from './FicheColis'

type Props = {
  onColisDetecte: (colis: { id: string }) => void
}

export default function ScannerColis({ onColisDetecte }: Props) {
  const [code, setCode] = useState('')
  const { colis, chercher, loading } = useRechercheColis()
  const [afficherFiche, setAfficherFiche] = useState(false)

  const lancerRecherche = async () => {
  await chercher(code)
  if (colis) {
    onColisDetecte(colis) // ✅ remonte à Chauffeur.tsx
    setAfficherFiche(true)
  }
}


  return (
    <div className="space-y-2 text-sm">
      <input
        type="text"
        placeholder="Scanner ou saisir l’ID du colis"
        className="champ"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={lancerRecherche}
        disabled={loading || !code}
        className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
      >
        🔎 Rechercher
      </button>

      {afficherFiche && colis && (
        <FicheColis
          colis={colis}
          onClose={() => {
            setAfficherFiche(false)
            setCode('')
          }}
          onLivraisonEffectuée={() => {
            setAfficherFiche(false)
            setCode('')
          }}
        />
      )}
    </div>
  )
}
