export type Livraison = {
  id: string
  statut: string
  date_expedition: string
  date_livraison?: string
  entrepot_id?: string
  client?: string
  pays?: string 
    poids?: number
    valeur?: number
    pays_destination?: string
    modifie_par?: string
    date_modification?: string
    date_creation?: string
   
  // ... autres champs si besoin
}
