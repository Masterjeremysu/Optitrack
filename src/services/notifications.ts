import { supabase } from '../lib/supabase'

export async function notifierAdminLivraison(colis: {
  id: string
  client: string
  adresse: string
  valeur: number
  poids: number
}) {
  const { error } = await supabase.from('notifications').insert({
    type: 'livraison',
    message: `✅ Livraison confirmée pour ${colis.client} (${colis.id})`,
    donnees: JSON.stringify(colis),
    date: new Date().toISOString()
  })

  if (error) console.error('Erreur envoi notif admin :', error)
}
