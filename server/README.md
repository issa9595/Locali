# Serveur d'authentification

Micro-backend Express pour gérer l'authentification avec cookies httpOnly sécurisés.

## Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine du projet (ou `.env.local`) avec :

```env
# Supabase
SUPABASE_URL=https://votre-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (clé service role, PAS la clé anon)
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (clé anon)

# Serveur
PORT=8787
FRONTEND_ORIGIN=http://localhost:5173
AUTH_CALLBACK_URL=http://localhost:8787/auth/callback

# Environnement
NODE_ENV=development
```

**Important** : `SUPABASE_SERVICE_ROLE_KEY` doit être la clé "service_role" (trouvable dans Supabase Dashboard > Settings > API), pas la clé "anon" publique.

## Démarrage

### Développement

```bash
# Terminal 1 : Démarrer le serveur Express
yarn dev:server
# ou
node server/index.js

# Terminal 2 : Démarrer Vite
yarn dev
```

Ou utiliser `yarn dev:all` pour démarrer les deux en parallèle (Windows PowerShell).

### Production

```bash
NODE_ENV=production node server/index.js
```

## Configuration Supabase

### 1. Créer la table `profiles`

Exécuter le script SQL dans Supabase Dashboard > SQL Editor :

```bash
cat server/sql/create-profiles-table.sql
```

Copier-coller le contenu dans l'éditeur SQL et exécuter.

### 2. Activer OAuth (Google, Apple)

1. Aller dans Supabase Dashboard > Authentication > Providers
2. Activer Google :
   - Client ID et Client Secret (obtenus depuis Google Cloud Console)
   - Redirect URL : `http://localhost:8787/auth/callback` (dev) / `https://votre-domaine.com/auth/callback` (prod)
3. Activer Apple :
   - Services ID, Team ID, Key ID, Private Key (obtenus depuis Apple Developer)
   - Redirect URL : idem

### 3. Créer le premier super_admin

Après avoir créé un compte utilisateur, exécuter dans Supabase SQL Editor :

```sql
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE user_id = 'uuid-du-utilisateur-ici';
```

## Endpoints

- `POST /auth/email/signin` - Connexion email/password
- `POST /auth/email/signup` - Inscription email/password
- `GET /auth/oauth/:provider` - Démarrage OAuth (google, apple)
- `GET /auth/callback` - Callback OAuth (redirection automatique)
- `GET /auth/user` - Récupérer l'utilisateur actuel
- `POST /auth/refresh` - Rafraîchir la session
- `POST /auth/signout` - Déconnexion

## Dépannage

### Erreur 500 sur `/auth/user`

1. Vérifier que le serveur est démarré : `yarn dev:server`
2. Vérifier les variables d'environnement (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
3. Vérifier que la table `profiles` existe (le serveur fonctionne sans mais le rôle sera toujours 'user')

### Proxy Vite ne fonctionne pas

Vérifier `vite.config.js` contient :
```js
server: {
  proxy: {
    '/auth': {
      target: 'http://localhost:8787',
      changeOrigin: true
    }
  }
}
```

### Cookies ne sont pas envoyés

Vérifier que les requêtes incluent `credentials: 'include'` et que CORS est configuré avec `credentials: true`.

