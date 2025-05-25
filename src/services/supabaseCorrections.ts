// src/services/supabaseCorrections.ts
import { supabase } from '../lib/supabase'
import type { Livraison } from '../hooks/useFiltrageLivraisons'

export async function injecterCorrectionsTest(livraisons: Livraison[]) {
  const exemples = livraisons.slice(0, 3).map((l, i) => {
    return {
      livraison_id: l.id,
      champ: i === 0 ? 'statut' : i === 1 ? 'poids' : 'valeur',
      valeur_actuelle:
        i === 0 ? l.statut : i === 1 ? String(l.poids) : String(l.valeur),
      valeur_suggeree:
        i === 0 ? 'En transit' : i === 1 ? '2.4' : '150.00',
    }
  })

  const { error } = await supabase.from('corrections_suggerees').insert(exemples)

  if (error) throw error
}
