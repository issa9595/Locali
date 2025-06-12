### Exemple :

## [1.x.x]

- [ADD]
- [FIX]
- [REFACTOR]

## [1.0.1]

### Ajouté
- Page Analyses Territoriales complète (`/analyses`)
- Hero section avec card interactive et image de fond
- Section données interactives avec sélecteur de villes (Nantes + 7 autres)
- Métriques premium avec modal d'abonnement (Entreprises par secteur, Population et ménages)
- Section avantages avec 5 icônes et texte "Pourquoi l'utiliser ?"
- Composants carte interactive avec hero section et avantages
- Logo Locali dans le header avec taille optimisée

### Modifié
- Harmonisation des styles entre hero sections (taille cards, couleurs, polices)
- Boutons alignés à droite dans toutes les cards
- Couleurs cohérentes (fond violet, éléments blancs, badges premium)
- Modal avec fond transparent flouté
- Architecture atomique renforcée pour les analyses

### Technique
- Nouveaux composants : `Web-Analyses-*`, `Web-Interactive-*`
- Données fictives Nantes pour démonstration
- Système de métriques premium avec gestion d'état
- Exports et imports organisés par dossiers


## [1.0.0]

- [ADD] Carte interactive : ajout d'un fond de carte détaillé via MapTiler, permettant d'afficher les villes, routes, bâtiments et points d'intérêt.
- [ADD] Configuration : possibilité de configurer la clé API MapTiler via une variable d'environnement (`VITE_MAPTILER_KEY`).
- [ADD] UI : amélioration de l'interface de la carte interactive avec un panneau latéral, un champ de recherche, des boutons de couches thématiques et un avatar utilisateur.
- [ADD] Compatibilité : passage à MapLibre pour la gestion de la carte, assurant une solution open source et moderne.

## [0.1.0] - 2025-05-22

- [ADD] Initialisation du projet : création du dépôt, configuration de base (README, .gitignore, package.json, etc.) 