import { useEffect, useState } from 'react'
import type { Livraison } from '../types/livraison'

import { differenceInDays } from 'date-fns'

export function useAnalyseLivraisons(livraisons: Livraison[]) {
  const [actives, setActives] = useState(0)
  const [entrepots, setEntrepots] = useState(0)
  const [inactifs, setInactifs] = useState(0)
  const [incoherents, setIncoherents] = useState(0)

  useEffect(() => {
    const actifs = livraisons.filter(l => l.statut !== 'Livré')
    setActives(actifs.length)

    const entrepotsUniques = new Set(livraisons.map(l => l.entrepot_id)).size
    setEntrepots(entrepotsUniques)

    const inactifsTrouvés = livraisons.filter(l => {
      const date = new Date(l.date_expedition)
      return l.statut !== 'Livré' && differenceInDays(new Date(), date) > 3
    }).length
    setInactifs(inactifsTrouvés)

    const incoherentsTrouvés = livraisons.filter(l => {
      return l.statut === 'Livré' && !l.date_livraison
    }).length
    setIncoherents(incoherentsTrouvés)
  }, [livraisons])

  return { actives, entrepots, inactifs, incoherents }
}
