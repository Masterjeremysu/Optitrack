import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import type { Livraison } from './useFiltrageLivraisons'

type Correction = {
  id: string
  champ: keyof Livraison
  ancienneValeur: string | number | null
  valeurProposee: string | number
  justification: string
  confiance: number
}



export function useCorrectionsIntelligentes(livraisons: Livraison[]) {
  const [corrections, setCorrections] = useState<Correction[]>([])

  useEffect(() => {
    if (!livraisons.length) return

    const statutValides = ['En transit', 'Livré', 'En attente', 'Bloqué']
    const fuse = new Fuse(statutValides, { includeScore: true, threshold: 0.4 })

    const moyennesParClient = calculeMoyennes(livraisons)

    const propositions: Correction[] = []

    for (const l of livraisons) {
      // 1. Statuts invalides
      if (!statutValides.includes(l.statut)) {
        const match = fuse.search(l.statut)[0]
        if (match) {
          propositions.push({
            id: l.id,
            champ: 'statut',
            ancienneValeur: l.statut,
            valeurProposee: match.item,
            justification: `Statut inconnu corrigé par fuzzy match (score ${Math.round((1 - match.score!) * 100)}%)`,
            confiance: Math.round((1 - match.score!) * 100)
          })
        }
      }

      // 2. Poids incohérent ou nul
      if (!l.poids || l.poids <= 0 || l.poids > 10000) {
        const poidsClient = moyennesParClient[l.client]?.poids || 1.2
        propositions.push({
          id: l.id,
          champ: 'poids',
          ancienneValeur: l.poids,
          valeurProposee: poidsClient,
          justification: `Poids incohérent : estimé via moyenne client (${poidsClient} kg)`,
          confiance: 90
        })
      }

      // 3. Valeur incohérente
      if (!l.valeur || l.valeur <= 0 || l.valeur > 100000) {
        const valClient = moyennesParClient[l.client]?.valeur || 75
        propositions.push({
          id: l.id,
          champ: 'valeur',
          ancienneValeur: l.valeur,
          valeurProposee: valClient,
          justification: `Valeur estimée par client (${valClient} €)`,
          confiance: 85
        })
      }

      // 4. Colis dormant
      const age = (Date.now() - new Date(l.date_expedition).getTime()) / 1000 / 60 / 60 / 24
      if (l.statut === 'En transit' && age > 5) {
        propositions.push({
          id: l.id,
          champ: 'statut',
          ancienneValeur: l.statut,
          valeurProposee: 'Bloqué',
          justification: `Colis dormant détecté (expédié depuis ${Math.round(age)}j)`,
          confiance: 95
        })
      }
    }

    setCorrections(propositions)
  }, [livraisons])

  return { corrections }
}

// Moyennes par client pour poids + valeur
function calculeMoyennes(livraisons: Livraison[]) {
  const regroupement: Record<string, { poids: number[], valeur: number[] }> = {}

  for (const l of livraisons) {
    if (!regroupement[l.client]) regroupement[l.client] = { poids: [], valeur: [] }
    if (l.poids && l.poids > 0 && l.poids < 10000) regroupement[l.client].poids.push(l.poids)
    if (l.valeur && l.valeur > 0 && l.valeur < 100000) regroupement[l.client].valeur.push(l.valeur)
  }

  const moyennes: Record<string, { poids: number, valeur: number }> = {}
  for (const [client, data] of Object.entries(regroupement)) {
    const moyenne = (arr: number[]) =>
      arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100 : 0
    moyennes[client] = {
      poids: moyenne(data.poids),
      valeur: moyenne(data.valeur)
    }
  }

  return moyennes
}
