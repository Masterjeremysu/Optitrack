// src/pages/index.tsx
import { useState } from 'react'
import FormulairePoint from '../composants/formulaire/FormulairePoint'
import CartePoints from '../composants/carte/CartePoints'

export default function Accueil() {
  const [rafraichi, setRafraichi] = useState(false)
  const rafraichir = () => setRafraichi(!rafraichi)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">🗺️ OptiTrack – Carte Logistique</h1>
      <FormulairePoint rafraichir={rafraichir} />
      <CartePoints rafraichi={rafraichi} />
    </div>
  )
}
