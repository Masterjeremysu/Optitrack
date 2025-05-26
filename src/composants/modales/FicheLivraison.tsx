import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Livraison } from '../../hooks/useFiltrageLivraisons'
import { useCorrectionsHistorique } from '../../hooks/useCorrectionsHistorique'

type Props = {
  livraison: Livraison
  onClose: () => void
}

export default function FicheLivraison({ livraison, onClose }: Props) {
  const { corrections, loading } = useCorrectionsHistorique(livraison.id)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-xl font-semibold text-gray-800">
              📦 Détail du colis : <span className="text-blue-600">{livraison.id}</span>
            </h2>
            <button onClick={onClose} aria-label="Fermer" className="text-gray-600 hover:text-red-500 transition">
              <X size={24} />
            </button>
          </div>

          {/* Contenu */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto text-sm text-gray-800">
            {/* Infos */}
            <div className="grid grid-cols-2 gap-4">
              <Info label="Client" value={livraison.client} />
              <Info label="Pays" value={livraison.pays_destination} />
              <Info label="Date" value={new Date(livraison.date_expedition).toLocaleDateString()} />
              <Info label="Poids" value={`${livraison.poids} kg`} />
              <Info label="Valeur" value={`${livraison.valeur} €`} />
              <Info label="Statut" value={livraison.statut} color="blue" />
            </div>

            {/* Historique IA */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">🧠 Historique des corrections IA</h3>
              {loading ? (
                <p className="text-xs italic text-gray-500">Chargement en cours...</p>
              ) : corrections.length === 0 ? (
                <p className="text-xs italic text-gray-400">Aucune correction pour ce colis.</p>
              ) : (
                <ul className="space-y-1 border-l-2 border-yellow-300 pl-4 text-xs">
                  {corrections.map((c) => (
                    <li key={c.id}>
                      <span className="font-medium text-gray-700 capitalize">{c.champ_corrige}</span> :{' '}
                      <span className="line-through text-gray-500">{c.ancienne_valeur}</span> →{' '}
                      <span className="text-green-700">{c.nouvelle_valeur}</span>
                      <br />
                      <span className="block text-[11px] text-gray-400">
                        {c.source === 'manuel' ? '✅ Manuel' : '🧠 IA'} – {c.justification ?? 'sans justification'} ({c.date})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-6 py-3 border-t bg-gray-50 text-sm">
            <span className="text-gray-400">📅 Dernière maj : aujourd’hui à 15:42</span>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">📄 PDF</button>
              <button className="bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-600">📬 Notifier</button>
              <button className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">✅ Marquer traité</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Info({ label, value, color = 'gray' }: { label: string; value: string | number; color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' }) {
  const colorMap: Record<'gray' | 'blue' | 'green' | 'red' | 'yellow', string> = {
    gray: 'text-gray-800',
    blue: 'text-blue-700',
    green: 'text-green-700',
    red: 'text-red-600',
    yellow: 'text-yellow-700'
  }

  const textColor = colorMap[color]

  return (
    <div className="flex flex-col">
      <span className="text-[11px] uppercase text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${textColor}`}>{value}</span>
    </div>
  )
}
