import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type CorrectionHistorique = {
  id: string
  champ_corrige: string
  ancienne_valeur: string
  nouvelle_valeur: string
  justification?: string
  source?: 'ia' | 'manuel'
  date: string
}

export function useCorrectionsHistorique(expeditionId: string | null) {
  const [corrections, setCorrections] = useState<CorrectionHistorique[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!expeditionId) return

    const fetch = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('corrections_appliquees')
        .select('*')
        .eq('expedition_id', expeditionId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Erreur chargement corrections :', error)
        setCorrections([])
      } else {
        const formatées = (data || []).map((c) => ({
          id: c.id,
          champ_corrige: c.champ_corrige,
          ancienne_valeur: c.ancienne_valeur,
          nouvelle_valeur: c.nouvelle_valeur,
          justification: c.justification,
          source: c.source,
          date: new Date(c.created_at).toLocaleString()
        }))
        setCorrections(formatées)
      }

      setLoading(false)
    }

    fetch()
  }, [expeditionId])

  return { corrections, loading }
}
