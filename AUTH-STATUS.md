# État d'avancement du système d'authentification

## ✅ Ce qui est EN PLACE

### 🔐 Backend (Serveur Express)

**Fichier** : `server/index.js`

**Fonctionnalités implémentées** :
- ✅ Serveur Express sur le port 8787 (configurable via `PORT`)
- ✅ Gestion des cookies httpOnly sécurisés (`sb-access-token`, `sb-refresh-token`)
- ✅ Intégration Supabase Auth avec clé service_role
- ✅ CORS configuré pour le frontend (`http://localhost:5173`)

**Endpoints disponibles** :
- ✅ `POST /auth/email/signin` - Connexion email/mot de passe
- ✅ `POST /auth/email/signup` - Inscription email/mot de passe
- ✅ `GET /auth/oauth/:provider` - Démarrage OAuth (google, apple)
- ✅ `GET /auth/callback` - Callback OAuth (redirection vers `/dashboard`)
- ✅ `GET /auth/user` - Récupérer l'utilisateur actuel + rôle
- ✅ `POST /auth/refresh` - Rafraîchir la session
- ✅ `POST /auth/signout` - Déconnexion

**Sécurité** :
- ✅ Cookies httpOnly (non accessibles depuis JavaScript)
- ✅ Cookies secure en production
- ✅ SameSite: 'lax' pour protection CSRF
- ✅ Gestion d'erreur robuste (table `profiles` optionnelle)

---

### 🎨 Frontend (React)

#### 1. **Context d'authentification**

**Fichier** : `src/auth/AuthContext.jsx`

**Fonctionnalités** :
- ✅ `AuthProvider` qui encapsule l'application
- ✅ État global : `user`, `role`, `loading`
- ✅ Fonction `fetchUser()` pour récupérer l'utilisateur au chargement
- ✅ Méthodes disponibles :
  - `loginEmail(email, password)` - Connexion email
  - `registerEmail(payload)` - Inscription email
  - `loginWithProvider(provider)` - OAuth (google, apple)
  - `logout()` - Déconnexion
- ✅ Gestion d'erreur robuste (parse JSON sécurisé)

#### 2. **Pages d'authentification**

**Fichiers** :
- ✅ `src/components/auth/Login.jsx` - Page de connexion
- ✅ `src/components/auth/Register.jsx` - Page d'inscription

**Fonctionnalités Login** :
- ✅ Formulaire email/mot de passe
- ✅ Checkbox CGU (obligatoire)
- ✅ Checkbox newsletter (optionnel)
- ✅ Boutons OAuth Google et Apple
- ✅ Lien vers inscription

**Fonctionnalités Register** :
- ✅ Formulaire complet : nom, prénom, statut, email, secteur, téléphone
- ✅ Champs mot de passe + confirmation
- ✅ Checkbox CGU (obligatoire)
- ✅ Checkbox newsletter (optionnel)
- ✅ Boutons OAuth Google et Apple
- ✅ Lien vers connexion

**Hooks** :
- ✅ `src/components/auth/useLoginHandlers.js` - Logique de connexion
- ✅ `src/components/auth/useRegisterHandlers.js` - Logique d'inscription

#### 3. **Protection des routes**

**Fichiers** :
- ✅ `src/routes/PrivateRoute.jsx` - Route protégée (nécessite authentification)
- ✅ `src/routes/AdminRoute.jsx` - Route admin (nécessite rôle `super_admin`)

**Fonctionnalités** :
- ✅ Redirection automatique vers `/connexion` si non authentifié
- ✅ Vérification du rôle pour les routes admin
- ✅ Gestion de l'état de chargement

#### 4. **Page Dashboard**

**Fichier** : `src/pages/Dashboard.jsx`

**Fonctionnalités** :
- ✅ Page protégée (accessible uniquement si connecté)
- ✅ Affichage de l'email de l'utilisateur
- ✅ Affichage du rôle (user/super_admin)
- ✅ Route : `/dashboard`

#### 5. **Intégration dans l'application**

**Fichier** : `src/App.jsx`

**Fonctionnalités** :
- ✅ `AuthProvider` enveloppe toute l'application
- ✅ Route `/dashboard` protégée avec `PrivateRoute`
- ✅ Routes publiques : `/`, `/offres`, `/contact`, etc.
- ✅ Routes auth : `/connexion`, `/inscription`

---

### 🗄️ Base de données (Supabase)

**Fichier SQL** : `server/sql/create-profiles-table.sql`

**Schéma** :
- ✅ Table `profiles` avec colonnes :
  - `id` (UUID, primary key)
  - `user_id` (UUID, référence `auth.users`, unique)
  - `role` (TEXT, 'super_admin' ou 'user', défaut: 'user')
  - `first_name`, `last_name`, `statut`, `secteur`, `telephone`
  - `newsletter` (BOOLEAN)
  - `accepted_tos` (BOOLEAN)
  - `created_at`, `updated_at` (TIMESTAMPTZ)

**Sécurité (RLS)** :
- ✅ Row Level Security activé
- ✅ Policy : utilisateurs peuvent lire/mettre à jour leur propre profil
- ✅ Policy : super_admin peuvent lire/mettre à jour tous les profils

**Automatisation** :
- ✅ Trigger : création automatique d'un profil à l'inscription
- ✅ Trigger : mise à jour automatique de `updated_at`
- ✅ Index sur `user_id` et `role` pour performances

**Note** : Le script SQL est prêt mais doit être exécuté manuellement dans Supabase Dashboard > SQL Editor.

---

### ⚙️ Configuration

#### 1. **Variables d'environnement**

**Fichier** : `.env` ou `.env.local` (à créer)

**Variables requises** :
```env
# Supabase
SUPABASE_URL=https://votre-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (clé service_role, PAS anon)
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (clé anon)

# Serveur
PORT=8787
FRONTEND_ORIGIN=http://localhost:5173
AUTH_CALLBACK_URL=http://localhost:8787/auth/callback

# Environnement
NODE_ENV=development
```

#### 2. **Proxy Vite**

**Fichier** : `vite.config.js`

**Configuration** :
- ✅ Proxy `/auth` → `http://localhost:8787`
- ✅ Permet au frontend d'appeler le backend sans CORS

#### 3. **Dépendances**

**Fichier** : `package.json`

**Dépendances ajoutées** :
- ✅ `express` - Serveur HTTP
- ✅ `cookie-parser` - Gestion des cookies
- ✅ `cors` - Gestion CORS

**Scripts ajoutés** :
- ✅ `dev:server` - Démarrer le serveur Express
- ✅ `dev:all` - Démarrer serveur + Vite (Windows PowerShell)

---

### 📚 Documentation

**Fichiers créés** :
- ✅ `server/README.md` - Guide complet du serveur (configuration, démarrage, dépannage)
- ✅ `server/sql/create-profiles-table.sql` - Script SQL commenté
- ✅ `AUTH-STATUS.md` (ce fichier) - État d'avancement

---

## ⚠️ Ce qui reste À FAIRE

### 🔴 Priorité haute

1. **Créer la table `profiles` dans Supabase**
   - Exécuter `server/sql/create-profiles-table.sql` dans Supabase Dashboard > SQL Editor
   - **Sans cette table** : le système fonctionne mais tous les utilisateurs auront le rôle 'user' par défaut

2. **Configurer OAuth dans Supabase**
   - Aller dans Supabase Dashboard > Authentication > Providers
   - Activer Google :
     - Ajouter Client ID et Client Secret (Google Cloud Console)
     - Configurer Redirect URL : `http://localhost:8787/auth/callback`
   - Activer Apple :
     - Ajouter Services ID, Team ID, Key ID, Private Key (Apple Developer)
     - Configurer Redirect URL : `http://localhost:8787/auth/callback`

3. **Créer le premier super_admin**
   - Après avoir créé un compte utilisateur, exécuter dans Supabase SQL Editor :
   ```sql
   UPDATE public.profiles 
   SET role = 'super_admin' 
   WHERE user_id = 'uuid-du-utilisateur-ici';
   ```

4. **Ajouter liens dans Header**
   - Afficher "Connexion" si non connecté
   - Afficher "Déconnexion" + "Dashboard" si connecté
   - Afficher "Admin" si rôle = `super_admin`

### 🟡 Priorité moyenne

5. **Gestion d'erreur dans les formulaires**
   - Afficher les messages d'erreur retournés par le serveur
   - Validation côté client (format email, force mot de passe, etc.)

6. **Page de profil utilisateur**
   - Permettre de modifier ses informations
   - Afficher l'historique des actions

7. **Page admin**
   - Liste des utilisateurs
   - Gestion des rôles
   - Statistiques

### 🟢 Priorité basse

8. **RGPD**
   - Page politique de confidentialité
   - Fonctionnalité "Supprimer mon compte"
   - Export des données utilisateur

9. **Améliorations UX**
   - Loading states dans les formulaires
   - Messages de succès après inscription/connexion
   - Mot de passe oublié / réinitialisation

10. **Tests**
    - Tests unitaires pour les hooks
    - Tests d'intégration pour les endpoints
    - Tests E2E pour les flux d'authentification

---

## 🚀 Comment démarrer

### 1. Installation des dépendances

```bash
yarn install
```

### 2. Configuration des variables d'environnement

Créer `.env.local` à la racine avec les variables listées ci-dessus.

### 3. Créer la table `profiles`

Exécuter `server/sql/create-profiles-table.sql` dans Supabase Dashboard > SQL Editor.

### 4. Démarrer le serveur

```bash
# Terminal 1 : Serveur Express
yarn dev:server

# Terminal 2 : Frontend Vite
yarn dev
```

Ou utiliser `yarn dev:all` pour démarrer les deux en parallèle (Windows).

### 5. Tester

- Aller sur `http://localhost:5173/inscription`
- Créer un compte
- Vérifier la redirection vers `/dashboard`
- Vérifier que les cookies sont créés (DevTools > Application > Cookies)

---

## 📝 Notes importantes

- **Le serveur Express doit être démarré** pour que l'authentification fonctionne
- **La table `profiles` est optionnelle** : le système fonctionne sans mais tous les utilisateurs auront le rôle 'user'
- **OAuth nécessite une configuration** dans Supabase Dashboard (Google/Apple)
- **Les cookies sont httpOnly** : ils ne sont pas accessibles depuis JavaScript côté client
- **En production** : configurer `NODE_ENV=production` et `secure: true` pour les cookies HTTPS

---

## 🔍 Dépannage

### Erreur 500 sur `/auth/user`
- Vérifier que le serveur Express est démarré : `yarn dev:server`
- Vérifier les variables d'environnement (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
- Vérifier les logs du serveur pour plus de détails

### Cookies ne sont pas envoyés
- Vérifier que les requêtes incluent `credentials: 'include'`
- Vérifier que CORS est configuré avec `credentials: true`
- Vérifier que le proxy Vite est configuré correctement

### OAuth ne fonctionne pas
- Vérifier que les providers sont activés dans Supabase Dashboard
- Vérifier que les Redirect URLs sont correctement configurées
- Vérifier que `AUTH_CALLBACK_URL` correspond à la configuration Supabase

---

**Dernière mise à jour** : 2025-01-XX

