// src/hooks/useRechercheGlobale.ts

import { useMemo } from 'react'
import type { Livraison } from '../types/livraison'

type Suggestion = {
  type: 'pays' | 'client' | 'id' | 'statut'
  valeur: string
}

export function useRechercheGlobale(livraisons: Livraison[]) {
  const suggestions: Suggestion[] = useMemo(() => {
  const unique = <T extends keyof Livraison>(champ: T): string[] =>
    [...new Set(livraisons.map((l) => l[champ]).filter(Boolean))] as string[]

  return [
    ...unique('pays_destination').map((val) => ({ type: 'pays' as const, valeur: val })),
    ...unique('client').map((val) => ({ type: 'client' as const, valeur: val })),
    ...unique('id').map((val) => ({ type: 'id' as const, valeur: val })),
    ...unique('statut').map((val) => ({ type: 'statut' as const, valeur: val })),
  ]
}, [livraisons])


  const filtrerParSuggestion = (sugg: Suggestion) => {
    switch (sugg.type) {
      case 'pays':
        return { statut: '', pays: sugg.valeur, dateMin: '', dateMax: '' }
      case 'client':
        return { client: sugg.valeur } // à enrichir si nécessaire
      case 'id':
        return { id: sugg.valeur }
      case 'statut':
        return { statut: sugg.valeur, pays: '', dateMin: '', dateMax: '' }
    }
  }

  return { suggestions, filtrerParSuggestion }
}
