import { supabase } from '../lib/supabase'


export async function updateStatutLivraison(id: string, nouveauStatut: string) {
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('expeditions')
    .update({
      statut: nouveauStatut,
      modifie_par: user?.email || 'Système',
      date_modification: new Date().toISOString()
    })
    .eq('id', id)

  if (error) throw error
}
