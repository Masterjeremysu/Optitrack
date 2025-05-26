import { useState } from 'react'
import { useRechercheColis } from '../../hooks/useRechercheColis'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

export default function ScannerColis() {
  const [code, setCode] = useState('')
  const { colis, chercher, loading } = useRechercheColis()

  const valider = async () => {
    if (!colis) return
    const { error } = await supabase
      .from('expeditions')
      .update({ statut: 'livré', date_livraison: new Date().toISOString() })
      .eq('id', colis.id)

    if (error) {
      toast.error("Erreur de mise à jour")
    } else {
      toast.success("Colis marqué comme livré")
      setCode('')
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">📷 Scanner un colis</h2>

      <input
        type="text"
        className="w-full border rounded px-4 py-2 text-sm"
        placeholder="Scan ou ID colis"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && chercher(code)}
      />

      {loading && <p className="text-sm text-gray-500">Recherche en cours…</p>}

      {colis && (
        <div className="border rounded p-3 bg-gray-50">
          <p className="text-sm"><strong>Client :</strong> {colis.client}</p>
          <p className="text-sm"><strong>Adresse :</strong> {colis.adresse}</p>
          <p className="text-sm"><strong>Poids :</strong> {colis.poids} kg</p>
          <p className="text-sm"><strong>Valeur :</strong> {colis.valeur} €</p>
          <p className="text-sm"><strong>Statut :</strong> {colis.statut}</p>

          <div className="flex gap-2 mt-4">
            <button onClick={valider} className="bg-green-600 text-white px-4 py-1.5 rounded">✅ Livré</button>
            <button className="bg-red-600 text-white px-4 py-1.5 rounded">❌ Problème</button>
          </div>
        </div>
      )}
    </div>
  )
}
