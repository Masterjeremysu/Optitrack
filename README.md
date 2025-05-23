# 🚀 OptiTrack – Cartographie Logistique Intelligente

Bienvenue dans **OptiTrack**, une solution SaaS complète et ultra professionnelle conçue pour **visualiser, suivre et optimiser les flux logistiques** en temps réel.

🔗 [Demo à venir] – Contactez-nous pour un accès privé

---

## 🧭 Présentation

**OptiTrack** permet de :

- Visualiser les livraisons sur une **carte mondiale interactive**
- Gérer les expéditions, les clients, les entrepôts et les statuts
- Suivre les performances par pays, statut, période ou client
- Générer des rapports PDF ultra stylés pour chaque expédition
- Sécuriser l'accès selon le **rôle métier** (intérimaire, REX, QHSE…)

---

## 🛠️ Stack technique

| Frontend           | Backend              | Données & Auth        | Cartographie        | PDF |
|--------------------|----------------------|------------------------|----------------------|-----|
| React + TypeScript | Supabase             | Supabase Auth + Postgres | Leaflet (`react-leaflet`) | `@react-pdf/renderer` |
| Tailwind CSS       | Supabase Storage     | Row-Level Security (RLS) | Vue entrepôt + mondiale | Téléchargement direct |

---

## 📌 Fonctionnalités déjà en place

✅ Authentification sécurisée avec rôles  
✅ Interface multi-layouts (Public / Client / Admin)  
✅ Carte interactive : entrepôt + monde (filtrable mois/année)  
✅ Top destinations & stats connectées  
✅ Tableau de bord dynamique filtrable (statut, pays, client, période)  
✅ Export PDF professionnel (logo, signature, totaux, tableau, footer)

---

## 📦 Roadmap à venir

- [ ] Recherche intelligente globale (multi-champs, flou)
- [ ] Alertes colis inactifs (+ e-mail automatique)
- [ ] Journal d’activité (logs utilisateurs)
- [ ] Dashboard analytique (recharts/nivo)
- [ ] Timeline par expédition + fiche détaillée
- [ ] Mode PWA partiel (scan hors-ligne pour intérimaires)
- [ ] Droits d’accès ultra-fins par rôle
- [ ] Archivage automatique après X jours

---

## 🎨 Aperçu UI/UX

| Carte mondiale        | Tableau des livraisons     | Export PDF |
|-----------------------|----------------------------|------------|
| ![map preview](https://via.placeholder.com/300x150) | ![table preview](https://via.placeholder.com/300x150) | ![pdf preview](https://via.placeholder.com/300x150) |

---

## ⚙️ Démarrer le projet

```bash
git clone https://github.com/Masterjeremysu/Optitrack.git
cd optitrack
npm install
npm run dev
