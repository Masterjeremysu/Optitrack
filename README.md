# 🚀 OptiTrack

[![CI/CD](https://github.com/Masterjeremysu/optitrack/actions/workflows/main.yml/badge.svg)](https://github.com/Masterjeremysu/optitrack/actions)
[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

**OptiTrack** est un **SaaS logistique professionnel** conçu pour la **supervision intelligente des flux d’expédition**, à destination des entrepôts et plateformes de distribution.  
Il s’adresse aux métiers du transport, de la gestion des flux, de la qualité, et de l’exploitation.

---

## 🧠 Objectif

Fournir une **interface unifiée, fluide et proactive** pour :
- Visualiser l’état des expéditions en temps réel
- Auditer automatiquement la qualité logistique
- Corriger les anomalies avec intelligence assistée
- Piloter les entrepôts et flux par rôle métier

---

## 🧱 Technologies utilisées

| Domaine        | Outils                                             |
|----------------|----------------------------------------------------|
| **Frontend**   | React, TypeScript, TailwindCSS (v3.4.2)            |
| **Backend**    | Supabase (PostgreSQL + Auth + RLS + Storage)       |
| **Cartographie** | Leaflet (expéditions mondiales) + Carte SVG interne |
| **PDF / IA**   | `@react-pdf/renderer`, moteur de correction IA métier |
| **Déploiement**| Vercel                                             |

---

## 👥 Architecture multi-rôles

| Rôle             | Accès et permissions clés |
|------------------|---------------------------|
| 🧑‍🏭 Intérimaire   | Accès limité aux expéditions assignées |
| 🚛 Chauffeur      | Visualisation + confirmation livraisons |
| 🧭 REX            | Dashboard complet, carte, audit, correction |
| 🧑‍💼 Directeur     | Supervision stratégique, reporting |
| 🛡️ QHSE           | Données qualité et conformité |
| 👨‍💻 Admin         | Gestion globale, structure, utilisateurs |

---

## ✅ Fonctionnalités intégrées

### 🔐 Authentification
- Auth Supabase sécurisée
- Redirection dynamique selon rôle

### 📁 Layouts dynamiques
- Layout Public / Client / Admin

### 📂 Menu contextuel
- Affichage conditionnel des pages selon le rôle

### 🗺️ Carte entrepôt interactive
- Zones colorées selon les anomalies
- Zoom zone / filtre anomalies

### 🌍 Carte monde (Leaflet)
- Points animés par livraison
- Filtres : mois, année, statut, pays

### 📦 Tableau des expéditions
- Recherche, tri, édition
- Export CSV
- Badge ⚠️ pour colis suspects

### 📋 Audit logistique
- Score logistique + détails d’anomalies
- Suggestions IA
- Correction intelligente semi-automatisée
- Historique `audits_logistiques`

---

## 📚 Historique des audits

- Visualisation des audits passés
- À venir :
  - Téléchargement PDF
  - Filtres date / score
  - Comparateur entre audits

---

## 🛠️ Prochaines évolutions

- [ ] Application réelle des corrections (✅/❌ puis "Appliquer")
- [ ] Fiche produit enrichie pour chaque colis
- [ ] Moteur de recherche globale intelligente
- [ ] Notifications automatiques (email / Slack)
- [ ] Editeur de règles IA no-code
- [ ] Génération automatique de rapports PDF
- [ ] Archivage automatique des colis dormants
- [ ] Simulation IA auto-apprenante sur les données

---

## 🚧 Installation locale

```bash
# 1. Cloner le projet
git clone https://github.com/Masterjeremysu/optitrack.git

# 2. Installer les dépendances
cd optitrack
npm install

# 3. Lancer l’environnement de dev
npm run dev
