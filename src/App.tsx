import { Routes, Route, Navigate } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Rex from './pages/espaces/Rex'
import AuditLogistique from './pages/audit/AuditLogistique'
import HistoriqueAudit from './pages/audit/HistoriqueAudit'
import Chauffeur from './pages/espaces/chauffeur/Chauffeur'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/espaces/rex" element={<Rex />} />
      <Route path="/espaces/chauffeur" element={<Chauffeur />} />
      <Route path="/audit/logistique" element={<AuditLogistique/>} />
      <Route path="/audit/historique" element={<HistoriqueAudit />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
