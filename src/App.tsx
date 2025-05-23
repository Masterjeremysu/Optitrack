// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Rex from './pages/espaces/Rex'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/espaces/rex" element={<Rex />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
