## Historique des actions

- 2025-10-31
  - Refactor SOLID (itération 1) et règle « une seule fonction par composant » appliquée aux notifications et à l’authentification.
    - Scission de `src/components/UpdateNotification.jsx` en composants unitaires:
      - `src/components/update/UpdateNotification.jsx` (composant principal)
      - `src/components/update/UpdateToast.jsx`
      - `src/components/update/UpdateBanner.jsx`
      - `src/components/update/UpdateStatusIndicator.jsx`
      - `src/components/update/UpdateControlPanel.jsx`
    - Extraction des handlers dans `src/components/update/useUpdateNotificationHandlers.js`.
    - Conservation d’un fichier de compatibilité `src/components/UpdateNotification.jsx` ne contenant que des ré-exports vers les nouveaux composants (aucune fonction définie dans ce fichier).
    - Aucun import existant n’a été cassé (les usages étaient commentés).
    - Bénéfices SOLID: SRP par composant, séparation claire des responsabilités (UI vs logique), meilleure testabilité.
    
    - Authentification: déplacement des handlers internes vers des hooks dédiés pour respecter « une seule fonction par composant »:
      - `src/components/auth/useLoginHandlers.js` consommé par `src/components/auth/Login.jsx`.
      - `src/components/auth/useRegisterHandlers.js` consommé par `src/components/auth/Register.jsx`.
      - `Register.jsx` utilise désormais `onChange` provenant du hook pour la mise à jour du state.
    - Bénéfices SOLID: SRP des composants d’UI, injection de dépendances via paramètres des hooks, meilleure réutilisabilité.

  - Intégration EmailJS côté front.
  - Suppression de tous les émojis dans le code et l’UI (boutons, titres, logs, commentaires) pour conformité graphique et homogénéité. Fichiers principaux modifiés: `src/components/update/*`, `src/components/CommunesDemo.jsx`, `src/components/ZonesMap.jsx`, `src/components/CarteTerritoriale.jsx`, `src/pages/ExempleInsee.jsx`, `src/pages/HomePage.jsx`, `src/features/territories/*`, `src/hooks/useZonesRealtime.js`, `src/services/*`, `src/shared/index.js`.

  - Refactor SOLID (itération 2) — Découpage de `src/components/CarteTerritoriale.jsx` (>500 lignes) en sous-composants et hooks unitaires:
    - Composants (1 fonction/composant):
      - `src/components/carte/Toolbar.jsx` (en-tête + bouton Actualiser)
      - `src/components/carte/InfoAlert.jsx` (alerte d’info)
      - `src/components/carte/FiltersPanel.jsx` (filtres + tri)
      - `src/components/carte/StatsSummary.jsx` (tuiles de stats)
      - `src/components/carte/RemarkableCommunes.jsx` (communes remarquables)
      - `src/components/carte/CommunesTable.jsx` (tableau)
      - `src/components/carte/PaginationControls.jsx` (pagination)
    - Hooks:
      - `src/hooks/carte/useFilteredCommunes.js`
      - `src/hooks/carte/useCommunesStats.js`
    - `CarteTerritoriale.jsx` ne contient plus que l’orchestration et l’état UI; suppression des émojis restants.

  - Architecture dossiers (barrels) pour une importation claire et stable:
    - `src/components/carte/index.js` (exporte Toolbar, InfoAlert, FiltersPanel, StatsSummary, RemarkableCommunes, CommunesTable, PaginationControls)
    - `src/components/update/index.js` (exporte UpdateNotification, UpdateToast, UpdateBanner, UpdateStatusIndicator, UpdateControlPanel, useUpdateNotificationHandlers)
    - `src/components/index.js` (regroupe exports majeurs, sous-espaces `carte`, `update`, et re-exports `auth`/`form`)
    - `src/hooks/carte/index.js` (exporte useFilteredCommunes, useCommunesStats)
  - Ajout `src/services/emailService.js` avec `sendContactEmail(formData)` utilisant `@emailjs/browser` et les variables d’environnement.
  - Mise à jour `src/components/form/ContactForm.jsx` pour appeler le service, gérer états d’envoi/succès/erreur et désactiver le bouton.
  - Enrichissement de `src/config/env.example.js` avec `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
  - Ajout d’un système de toasts conforme à la charte (vert succès, violet foncé erreur): `ToastProvider` + `useToast` dans `src/hooks/useToast.js`, intégré dans `src/main.jsx`, utilisé dans `ContactForm`.

### Configuration requise
1. Installer la dépendance:
   - npm: `npm i @emailjs/browser`
   - yarn: `yarn add @emailjs/browser`
2. Créer `.env.local` à la racine avec:
   - `VITE_EMAILJS_SERVICE_ID=...`
   - `VITE_EMAILJS_TEMPLATE_ID=...`
   - `VITE_EMAILJS_PUBLIC_KEY=...`
3. Dans EmailJS, définir le template avec ces variables: `nom`, `prenom`, `email`, `telephone`, `sujet`, `message`.
4. Redémarrer le serveur Vite si nécessaire pour charger les variables.

### Notes
- Les champs du formulaire sont déjà mappés 1:1 avec EmailJS.
- Un message de feedback utilisateur affiche l’état (succès/erreur).

