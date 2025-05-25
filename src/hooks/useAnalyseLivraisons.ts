import type { Livraison } from '../types/livraison'

export function useAnalyseLivraisons(livraisons: Livraison[]) {
  const actives = livraisons.filter((l) => l.statut === 'en cours').length
  const inactifs = livraisons.filter((l) => l.statut === 'en cours' && estInactif(l)).length
  const incoherents = livraisons.filter((l) => !['en cours', 'livré', 'retard', 'annulé'].includes(l.statut)).length

  const entrepotsUniques = new Set(livraisons.map((l) => l.entrepot).filter(Boolean))
  const entrepots = entrepotsUniques.size

  const anomalies = {
  colisDormants: livraisons.filter(estInactif),
  poidsIncoherent: livraisons.filter(
    (l) => typeof l.poids === 'number' && (l.poids <= 0 || l.poids > 500)
  ),
  valeurNulle: livraisons.filter(
    (l) => typeof l.valeur === 'number' && l.valeur <= 0
  ),
  statutInvalide: livraisons.filter(
    (l) => !['en cours', 'livré', 'retard', 'annulé'].includes(l.statut)
  ),
}


  return {
    actives,
    inactifs,
    incoherents,
    entrepots,
    anomalies,
  }
}

function estInactif(livraison: Livraison): boolean {
  const dateExp = new Date(livraison.date_expedition)
  const now = new Date()
  const ecartJours = Math.floor((now.getTime() - dateExp.getTime()) / (1000 * 60 * 60 * 24))
  return livraison.statut === 'en cours' && ecartJours >= 5
}
