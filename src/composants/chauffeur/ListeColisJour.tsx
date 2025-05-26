import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { LivraisonChauffeur } from '../../hooks/useLivraisonsChauffeur'

export default function ListeColisJour() {
  const [colis, setColis] = useState<LivraisonChauffeur[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const chargerColis = async () => {
      setChargement(true)
      const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .eq('statut', 'en cours')
        .order('date_expedition', { ascending: true })

      if (!error && data) setColis(data)
      setChargement(false)
    }

    chargerColis()
  }, [])

  return (
    <div className="space-y-2 text-sm">
      {chargement ? (
        <p className="italic text-gray-500">Chargement...</p>
      ) : colis.length === 0 ? (
        <p className="text-gray-500">Aucun colis à livrer aujourd’hui.</p>
      ) : (
        <ul className="space-y-1">
          {colis.map((c) => (
            <li
              key={c.id}
              className="border rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="font-semibold text-gray-800">{c.client}</div>
              <div className="text-xs text-gray-500">
                {c.pays_destination} • {c.valeur} € • {c.poids} kg
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
