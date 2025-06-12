/**
 * Fichier d'exemple de configuration d'environnement
 * 
 * Copiez ce fichier vers .env.local à la racine du projet
 * et remplissez les valeurs avec vos vraies clés
 */

export const ENV_EXAMPLE = `
# ===========================================
# Configuration Supabase
# ===========================================
# URL de votre projet Supabase (trouvable dans Settings > API)
VITE_SUPABASE_URL=https://votre-project-id.supabase.co

# Clé publique anonyme de Supabase (trouvable dans Settings > API)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===========================================
# Configuration API INSEE
# ===========================================
# Client ID pour l'API INSEE (à obtenir sur https://api.insee.fr)
# 1. Créer un compte sur api.insee.fr
# 2. Créer une application
# 3. Sélectionner les APIs "Géo" et "Sirene" si nécessaire
VITE_INSEE_CLIENT_ID=votre_client_id_insee

# Client Secret INSEE (généré lors de la création de l'application)
VITE_INSEE_CLIENT_SECRET=votre_client_secret_insee

# ===========================================
# Configuration optionnelle
# ===========================================
# Environnement de développement/production
NODE_ENV=development

# URL de base pour l'API INSEE (optionnel, par défaut: https://api.insee.fr)
# VITE_INSEE_BASE_URL=https://api.insee.fr

# ===========================================
# Instructions pour obtenir les clés INSEE
# ===========================================
# 1. Aller sur https://api.insee.fr/catalogue/
# 2. Créer un compte si nécessaire
# 3. Aller dans "Mes applications" -> "Créer une application"
# 4. Sélectionner les APIs nécessaires :
#    - "API Géo" pour les données géographiques (communes, départements...)
#    - "API Sirene" pour les données d'entreprises
# 5. Copier le Client ID et Client Secret généré
# 6. Les coller dans ce fichier

# ===========================================
# Instructions Supabase
# ===========================================
# 1. Aller sur https://supabase.com/dashboard
# 2. Créer un nouveau projet si nécessaire
# 3. Aller dans Settings > API
# 4. Copier l'URL du projet et la clé "anon/public"
# 5. Les coller dans ce fichier
# 6. Créer la table zones avec le SQL fourni dans syncZones.js

# ===========================================
# Sécurité
# ===========================================
# IMPORTANT: Ne jamais commiter ce fichier avec de vraies clés !
# Ajouter .env.local au .gitignore
# Pour la production, utiliser les variables d'environnement du serveur
`

console.log('📋 Pour créer votre fichier .env.local:')
console.log('1. Créez un fichier .env.local à la racine du projet')
console.log('2. Copiez le contenu ci-dessus')
console.log('3. Remplacez les valeurs par vos vraies clés')
console.log(ENV_EXAMPLE) 