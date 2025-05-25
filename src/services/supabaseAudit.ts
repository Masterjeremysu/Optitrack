import { supabase } from '../lib/supabase'

export async function enregistrerAuditLogistique({
  total,
  conformes,
  anomalies,
  score,
  colisDormants,
  poidsIncoherent,
  valeurNulle,
  statutInvalide
}: {
  total: number
  conformes: number
  anomalies: number
  score: number
  colisDormants: number
  poidsIncoherent: number
  valeurNulle: number
  statutInvalide: number
}) {
  const { error } = await supabase.from('audits_logistiques').insert({
    total,
    conformes,
    anomalies,
    score,
    colis_dormants: colisDormants,
    poids_incoherent: poidsIncoherent,
    valeur_nulle: valeurNulle,
    statut_invalide: statutInvalide
  })

  if (error) {
    throw new Error(error.message)
  }
}
