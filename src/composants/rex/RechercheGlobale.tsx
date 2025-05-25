import { useState } from 'react'
import { useRechercheGlobale } from '../../hooks/useRechercheGlobale'
import type { Livraison } from '../../types/livraison'
import type { FiltresLivraison } from '../../hooks/useFiltrageLivraisons'

type Props = {
  livraisons: Livraison[]
  onFiltrer: (filtres: FiltresLivraison) => void
}

export default function RechercheGlobale({ livraisons, onFiltrer }: Props) {
  const { suggestions, filtrerParSuggestion } = useRechercheGlobale(livraisons)
  const [texte, setTexte] = useState('')
  const [suggestionsFiltrees, setSuggestionsFiltrees] = useState(suggestions)

  const handleChange = (val: string) => {
    setTexte(val)
    const lower = val.toLowerCase()
    setSuggestionsFiltrees(
      suggestions.filter((s) => s.valeur.toLowerCase().includes(lower))
    )
  }

  const handleSelection = (valeur: string) => {
    const suggestion = suggestions.find((s) => s.valeur === valeur)
    if (suggestion) {
      const filtres = filtrerParSuggestion(suggestion)
      onFiltrer(filtres as FiltresLivraison)
      setTexte('')
      setSuggestionsFiltrees([])
    }
  }

  return (
    <div className="relative mb-6 max-w-md">
      <input
        value={texte}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="🔍 Rechercher un pays, client, ID, statut..."
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {texte && suggestionsFiltrees.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-60 overflow-y-auto">
          {suggestionsFiltrees.map((s, i) => (
            <li
              key={`${s.type}-${i}`}
              onClick={() => handleSelection(s.valeur)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {s.valeur} <span className="text-gray-400">({s.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
