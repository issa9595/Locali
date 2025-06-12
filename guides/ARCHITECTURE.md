# 🏗️ Architecture Locali - Plateforme d'Analyse Territoriale

## 📋 Vue d'ensemble

Locali est une plateforme d'intelligence territoriale destinée aux **collectivités** et **entrepreneurs** pour l'analyse de zones géographiques et la prise de décision stratégique.

## 🎯 Utilisateurs Cibles

- **🏛️ Collectivités** : Villes, départements, régions (zones à revitaliser)
- **🏢 Entrepreneurs** : Choix d'implantation, étude de marché local
- **📊 Analystes** : Consultants en développement territorial

## 🧱 Stack Technique

- **Frontend** : React 18 + Vite + TailwindCSS + React Router
- **Cartographie** : Mapbox GL JS + react-map-gl
- **Backend/BDD** : Supabase (PostgreSQL + Realtime + Auth)
- **APIs Externes** : INSEE, SIRENE, DVF (prix immobilier)
- **Déploiement** : Vercel/Netlify + Supabase Edge Functions

## 📂 Structure des Dossiers

```
src/
├── 🎯 features/           # Modules métier par domaine
│   ├── auth/              # Authentification & rôles
│   ├── territories/       # Gestion des territoires
│   ├── demographics/      # Données démographiques
│   ├── enterprises/       # Données entreprises
│   ├── real-estate/       # Immobilier & prix
│   ├── scoring/           # Algorithmes de notation
│   ├── reports/           # Génération rapports
│   └── map/               # Cartographie avancée
│
├── 🔧 shared/             # Code partagé
│   ├── api/               # Clients API (INSEE, SIRENE...)
│   ├── hooks/             # Hooks React réutilisables
│   ├── utils/             # Fonctions utilitaires
│   ├── constants/         # Constantes globales
│   ├── types/             # Types TypeScript
│   └── config/            # Configuration
│
├── 🎨 components/         # Composants UI génériques
│   ├── ui/                # Design system (Button, Input...)
│   ├── layout/            # Layout components
│   ├── charts/            # Graphiques réutilisables
│   └── forms/             # Formulaires
│
├── 📄 pages/              # Pages principales
│   ├── HomePage/
│   ├── DashboardPage/
│   ├── MapPage/
│   ├── ReportsPage/
│   └── AdminPage/
│
├── 🎨 assets/             # Ressources statiques
├── 🎯 styles/             # Styles globaux
└── 📱 App.jsx             # Application racine
```

## 🔄 Architecture en Couches

### 1. **Data Layer** (API + Cache)
- **Supabase Client** : Base de données principale
- **External APIs** : INSEE, SIRENE, DVF
- **Cache Strategy** : React Query pour optimisation

### 2. **Business Layer** (Services + Hooks)
- **Services** : Logique métier pure
- **Hooks** : État React + API calls
- **Stores** : État global (Zustand/Context)

### 3. **Presentation Layer** (Components + Pages)
- **Pages** : Conteneurs de haut niveau
- **Features** : Composants métier
- **UI Components** : Design system

## 🎯 Modules Métier Principaux

### 📊 **Territories** (Zones géographiques)
```
features/territories/
├── api/
│   ├── territoriesApi.js
│   └── inseeSync.js
├── hooks/
│   ├── useTerritories.js
│   ├── useTerritoriesRealtime.js
│   └── useTerritoryDetails.js
├── components/
│   ├── TerritoryCard.jsx
│   ├── TerritoryList.jsx
│   └── TerritorySelector.jsx
├── services/
│   ├── territoryService.js
│   └── territoryScoring.js
└── types/
    └── Territory.types.js
```

### 🗺️ **Map** (Cartographie)
```
features/map/
├── components/
│   ├── InteractiveMap.jsx
│   ├── MapLayers/
│   ├── MapControls/
│   └── MapPopups/
├── hooks/
│   ├── useMapData.js
│   ├── useMapFilters.js
│   └── useMapInteractions.js
├── services/
│   ├── mapboxService.js
│   └── geoDataService.js
└── utils/
    ├── mapHelpers.js
    └── geoCalculations.js
```

### 📈 **Scoring** (Intelligence territoriale)
```
features/scoring/
├── algorithms/
│   ├── attractivenessScore.js
│   ├── economicPotential.js
│   └── competitivenessIndex.js
├── components/
│   ├── ScoreCard.jsx
│   ├── ScoreComparison.jsx
│   └── ScoreVisualization.jsx
├── hooks/
│   ├── useScoring.js
│   └── useScoreComparison.js
└── services/
    └── scoringService.js
```

## 🔐 Authentification & Rôles

```typescript
// Types de rôles
enum UserRole {
  ADMIN = 'admin',
  COLLECTIVITY = 'collectivity', 
  ENTREPRENEUR = 'entrepreneur',
  ANALYST = 'analyst'
}

// Permissions par fonctionnalité
const permissions = {
  'territories:read': ['*'],
  'territories:write': ['admin', 'collectivity'],
  'reports:generate': ['collectivity', 'entrepreneur', 'analyst'],
  'admin:panel': ['admin']
}
```

## 📊 Modèle de Données

### Tables Principales
- **territories** : Communes, départements, régions
- **demographics** : Population, revenus, emploi
- **enterprises** : Données SIRENE, secteurs d'activité
- **real_estate** : Prix, transactions, disponibilité
- **scores** : Indices de performance calculés
- **reports** : Rapports générés par utilisateur

## 🚀 Prochaines Étapes

1. **Migration progressive** des fichiers existants
2. **Création des features** une par une
3. **Implémentation du scoring** territorial
4. **Tests unitaires** par module
5. **Documentation** technique

---

**Cette architecture garantit :**
- ✅ **Scalabilité** : Ajout facile de nouvelles fonctionnalités
- ✅ **Maintenabilité** : Code organisé et modulaire
- ✅ **Réutilisabilité** : Composants et hooks partagés
- ✅ **Testabilité** : Isolation des responsabilités
- ✅ **Performance** : Optimisations par module 