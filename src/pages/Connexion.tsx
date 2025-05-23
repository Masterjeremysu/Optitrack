// src/pages/Connexion.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import BoutonPrincipal from '../ui/bouton/BoutonPrincipal'

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [nom, setNom] = useState('')
  const [role, setRole] = useState('intérimaire')
  const [mode, setMode] = useState<'connexion' | 'inscription'>('connexion')
  const [erreur, setErreur] = useState<string | null>(null)
  const navigate = useNavigate()

  const gererConnexion = async (e: React.FormEvent) => {
    e.preventDefault()
    setErreur(null)

    if (mode === 'inscription') {
      const { data, error: err1 } = await supabase.auth.signUp({
        email,
        password: motDePasse,
      })

      if (err1) return setErreur('Erreur inscription : ' + err1.message)

      const id = data.user?.id
      if (id) {
        const { data: profilExistant, error: errCheck } = await supabase
          .from('profils')
          .select('id')
          .eq('id', id)

        if (!errCheck && (!profilExistant || profilExistant.length === 0)) {
          const { error: err2 } = await supabase.from('profils').insert([
            { id, nom, role },
          ])
          if (err2) return setErreur('Erreur profil : ' + err2.message)
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: motDePasse,
      })

      if (error) return setErreur('Erreur connexion : ' + error.message)

      const id = data.user?.id
      if (id) {
        const { data: profilExistant, error: errCheck } = await supabase
          .from('profils')
          .select('id')
          .eq('id', id)

        if (!errCheck && (!profilExistant || profilExistant.length === 0)) {
          await supabase.from('profils').insert([
            {
              id,
              nom: 'Utilisateur inconnu',
              role: 'intérimaire',
            },
          ])
        }
      }
    }

    setTimeout(() => navigate('/'), 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          {mode === 'connexion' ? 'Connexion' : 'Créer un compte'}
        </h1>

        {erreur && (
          <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded border border-red-300">
            {erreur}
          </div>
        )}

        <form onSubmit={gererConnexion} className="space-y-4">
          {mode === 'inscription' && (
            <>
              <input
                type="text"
                placeholder="Nom complet"
                className="champ"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
              <div>
                <label htmlFor="role" className="text-sm text-gray-600 block mb-1 font-medium">
                  Rôle dans l’organisation
                </label>
                <select
                  id="role"
                  className="champ"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="intérimaire">Intérimaire</option>
                  <option value="chauffeur">Chauffeur</option>
                  <option value="chef_equipe">Chef d'équipe</option>
                  <option value="rex">Responsable exploitation (REX)</option>
                  <option value="qhse">QHSE</option>
                  <option value="directeur">Directeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Adresse e-mail professionnelle"
            className="champ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe sécurisé"
            className="champ"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />

          <BoutonPrincipal type="submit">
            {mode === 'connexion' ? 'Se connecter' : 'Créer mon compte'}
          </BoutonPrincipal>
        </form>

        <div className="text-center text-sm text-gray-500">
          {mode === 'connexion' ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => setMode('inscription')} className="text-blue-600 font-medium">
                Créer un compte
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button onClick={() => setMode('connexion')} className="text-blue-600 font-medium">
                Connexion
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
