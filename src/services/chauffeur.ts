// src/services/chauffeur.ts
import { supabase } from '../lib/supabase'

/**
 * 🔄 Récupère les colis à livrer aujourd’hui pour un chauffeur donné
 */
export async function chargerColisDuJour(chauffeurId: string) {
  const { data, error } = await supabase
    .from('expeditions')
    .select('*')
    .eq('chauffeur_id', chauffeurId)
    .eq('statut', 'en cours')
    .gte('date_expedition', new Date().toISOString().split('T')[0])
    .order('date_expedition', { ascending: true })

  if (error) throw new Error('❌ Erreur chargement des colis du jour')
  return data
}

/**
 * 📍 Récupère les points GPS de la tournée du jour
 */
export async function chargerPointsTournee(chauffeurId: string) {
  const { data, error } = await supabase
    .from('expeditions')
    .select('id, client, adresse, lat, lon, statut')
    .eq('chauffeur_id', chauffeurId)
    .gte('date_expedition', new Date().toISOString().split('T')[0])

  if (error) throw new Error('❌ Erreur chargement des points de tournée')
  return data
}

/**
 * ⏳ Récupère l’historique des livraisons (max 50)
 */
export async function chargerHistoriqueLivraisons(chauffeurId: string) {
  const { data, error } = await supabase
    .from('expeditions')
    .select('*')
    .eq('chauffeur_id', chauffeurId)
    .order('date_livraison', { ascending: false })
    .limit(50)

  if (error) throw new Error('❌ Erreur chargement de l’historique')
  return data
}

/**
 * 🚨 Permet de signaler un problème sur un colis
 */
export async function signalerColis(expedition_id: string, commentaire: string) {
  const { error } = await supabase
    .from('signalements')
    .insert({ expedition_id, commentaire })

  if (error) throw new Error("❌ Erreur lors de l'envoi du signalement")
}

/**
 * 🔍 Recherche un colis par son ID (scanner ou saisie manuelle)
 */
export async function rechercherColis(idColis: string) {
  const { data, error } = await supabase
    .from('expeditions')
    .select('*')
    .eq('id', idColis)
    .single()

  if (error) throw new Error('❌ Colis introuvable')
  return data
}
