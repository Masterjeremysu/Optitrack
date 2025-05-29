# 🚚 OptiTrack – Supervision logistique augmentée

**OptiTrack** est une application SaaS ultra moderne de supervision logistique, conçue pour les entrepôts, les transporteurs et les équipes terrain.  
Pensée **par un pro du métier**, développée **avec des outils puissants**, et designée **avec précision**, elle offre une cartographie logistique interactive, une gestion multi-rôles, et une réactivité temps réel.

---

## ✨ Fonctionnalités principales

### 🔍 Supervision REX
- Vue globale des livraisons avec filtres par statut, client, pays, date, poids, valeur…
- Tri intelligent + recherches avancées
- Anomalies détectées automatiquement (⚠)

### 🧭 Carte monde & entrepôt interactive
- Visualisation 2D/3D des colis livrés / à livrer
- Carte entrepôt avec zoom, filtres, détection visuelle des alertes
- Points animés + interface tactile friendly

### 📦 Interface Chauffeur
- Démarrage / Clôture de tournée
- Scan colis + validation
- Signature client + photo de livraison
- Historique de la journée
- Signalement d’incident & reprogrammation

### 📊 Audit Logistique
- Analyse automatique des colis inactifs ou incohérents
- Suggestions de corrections IA validables
- Archivage & PDF téléchargeables
- Historique des audits comparables

### 🔐 Authentification Supabase
- Gestion multi-rôles sécurisée :
  `chauffeur`, `chef_d_equipe`, `REX`, `QHSE`, `directeur`, `intérimaire`, `admin`
- Redirections intelligentes et accès restreints

---

## 🧱 Stack technique

- **Frontend** : React + TypeScript + TailwindCSS 3.4.2
- **Backend** : Supabase (Auth, BDD PostgreSQL, Storage, RLS)
- **PDF** : `@react-pdf/renderer`
- **Cartographie** : Leaflet + Supabase GeoJSON
- **Emailing** : Resend (à venir)
- **Déploiement** : Vercel (frontend) + Supabase (backend)

---

## 🚀 Démarrer le projet

```bash
# 1. Cloner le repo
git clone https://github.com/TON_NOM/OptiTrack.git
cd optitrack

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm run dev
📁 Renomme .env.example en .env.local et configure :

env
Copier
Modifier
VITE_SUPABASE_URL=https://<TON_INSTANCE>.supabase.co
VITE_SUPABASE_ANON_KEY=...
📁 Arborescence du projet
bash
Copier
Modifier
optitrack/
├─ src/
│  ├─ pages/              # Pages React (admin, client, chauffeur...)
│  ├─ composants/         # Composants UI modulaires par rôle
│  ├─ hooks/              # Hooks métier (useTournee, useAudit...)
│  ├─ lib/                # Connexion Supabase
│  ├─ pdf/                # Générateurs PDF
│  ├─ styles/             # Tailwind + animations


💡 À venir
🔁 Sync offline avec IndexedDB pour les tournées hors réseau

🧠 IA embarquée pour optimiser les tournées

📱 PWA installable sur terminaux Zebra

🛰 Vue Géo live des livraisons en cours

🧑‍💻 Développeur

👤 Jeremy
Créateur de solutions métiers réelles, fondées sur la performance terrain.

“Je crée des outils concrets, rapides, et conçus pour durer.”

⭐️ Tu aimes ce projet ?

N'hésite pas à :

🌟 Laisser une étoile

🐛 Proposer une issue ou une amélioration

🤝 Me contacter pour des projets logistiques sur mesure

OptiTrack – Quand la logistique devient intelligente.
