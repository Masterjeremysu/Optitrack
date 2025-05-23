// src/composants/rex/FiltresLivraisons.tsx
type Props = {
  filtres: {
    statut: string
    pays: string
    dateMin: string
    dateMax: string
  }
  onChange: (nouveauxFiltres: Props['filtres']) => void
  onReinitialiser: () => void
}

export default function FiltresLivraisons({ filtres, onChange, onReinitialiser }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">Statut</label>
        {/* STATUT */}
<label htmlFor="filtre-statut" className="block text-sm font-medium mb-1">Statut</label>
<select
  id="filtre-statut"
  title="Filtrer par statut"
  className="w-full border border-gray-300 rounded px-2 py-1"
  value={filtres.statut}
  onChange={(e) => onChange({ ...filtres, statut: e.target.value })}
>
  <option value="">Tous</option>
  <option value="en cours">En cours</option>
  <option value="livré">Livré</option>
  <option value="retard">Retard</option>
  <option value="annulé">Annulé</option>
</select>

      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pays</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={filtres.pays}
          onChange={(e) => onChange({ ...filtres, pays: e.target.value })}
          placeholder="France, Italie..."
        />
      </div>

      <div>
        {/* DATE MIN */}
<label htmlFor="filtre-dateMin" className="block text-sm font-medium mb-1">Date min</label>
<input
  id="filtre-dateMin"
  type="date"
  title="Date minimum d’expédition"
  className="w-full border border-gray-300 rounded px-2 py-1"
  value={filtres.dateMin}
  onChange={(e) => onChange({ ...filtres, dateMin: e.target.value })}
/>
    
      </div>

      <div>
        {/* DATE MAX */}
<label htmlFor="filtre-dateMax" className="block text-sm font-medium mb-1">Date max</label>
<input
  id="filtre-dateMax"
  type="date"
  title="Date maximum d’expédition"
  className="w-full border border-gray-300 rounded px-2 py-1"
  value={filtres.dateMax}
  onChange={(e) => onChange({ ...filtres, dateMax: e.target.value })}
/>

      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onChange(filtres)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filtrer
        </button>
        <button
          onClick={onReinitialiser}
          className="text-sm text-gray-500 underline"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  )
}
