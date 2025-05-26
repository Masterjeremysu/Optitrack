// src/services/supabaseCorrections.ts
import { supabase } from '../lib/supabase'
import type { Livraison } from '../hooks/useFiltrageLivraisons'

// Ajoute aussi des lignes dans corrections_appliquees ou corrections_proposees
export async function injecterCorrectionsTest(livraisons: Livraison[]) {
  const corrections = []

  for (const l of livraisons.slice(0, 10)) {
    corrections.push({
      id: crypto.randomUUID(),
      expedition_id: l.id,
      champ_corrige: 'statut',
      ancienne_valeur: l.statut,
      nouvelle_valeur: 'en cours',
      justification: 'Test IA – statut incohérent',
      source: 'ia',
      date: new Date().toISOString()
    })

    corrections.push({
      id: crypto.randomUUID(),
      expedition_id: l.id,
      champ_corrige: 'valeur',
      ancienne_valeur: l.valeur,
      nouvelle_valeur: 100 + Math.floor(Math.random() * 50),
      justification: 'Test IA – estimation valeur',
      source: 'ia',
      date: new Date().toISOString()
    })
  }

  const { error } = await supabase.from('corrections_appliquees').insert(corrections)

  if (error) throw error
}
