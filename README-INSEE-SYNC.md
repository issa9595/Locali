# 🇫🇷 Système de Synchronisation INSEE - Supabase

Système complet de synchronisation automatique entre l'API INSEE et Supabase avec mise à jour en temps réel côté React.

## 🎯 Objectifs

- ✅ Récupérer les données géographiques INSEE (communes, population, contours)
- ✅ Stocker et maintenir ces données dans Supabase
- ✅ Synchronisation automatique périodique
- ✅ Mise à jour temps réel de l'interface React
- ✅ Gestion robuste des erreurs et notifications

## 📁 Architecture du Système

```
src/
├── services/
│   ├── inseeService.js       # Interface avec l'API INSEE
│   ├── syncZones.js          # Logique de synchronisation
│   └── syncScheduler.js      # Planification et automatisation
├── hooks/
│   └── useZonesRealtime.js   # Hook React temps réel
├── components/
│   └── ZonesMap.jsx          # Composant d'exemple
└── config/
    └── env.example.js        # Configuration d'environnement

sync-insee-cron.js            # Script pour cron jobs
```

## 🚀 Installation et Configuration

### 1. Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Supabase
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# INSEE API
VITE_INSEE_CLIENT_ID=votre_client_id_insee
VITE_INSEE_CLIENT_SECRET=votre_client_secret_insee

# Optionnel - Configuration du cron
SYNC_LOG_LEVEL=info
SYNC_BATCH_SIZE=100
SYNC_FORCE_REFRESH=false
SYNC_MAX_RETRIES=3
SYNC_RETRY_DELAY=60000
SYNC_WEBHOOK_URL=https://votre-webhook.com/notify
```

### 2. Obtenir les Clés INSEE

1. Aller sur [api.insee.fr](https://api.insee.fr/catalogue/)
2. Créer un compte et une application
3. Sélectionner l'API "Géo" pour les données géographiques
4. Copier le Client ID et Client Secret

### 3. Configuration Supabase

#### A. Créer la Table `zones`

Exécutez ce SQL dans l'éditeur Supabase :

```sql
-- Table principale pour les zones
CREATE TABLE zones (
  id TEXT PRIMARY KEY,
  nom TEXT NOT NULL,
  code_insee TEXT NOT NULL,
  population INTEGER,
  surface NUMERIC,
  geometrie JSONB,
  centre_lat NUMERIC,
  centre_lng NUMERIC,
  derniere_mise_a_jour TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_zones_code_insee ON zones(code_insee);
CREATE INDEX idx_zones_nom ON zones(nom);
CREATE INDEX idx_zones_population ON zones(population);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_zones_updated_at
  BEFORE UPDATE ON zones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### B. Activer Realtime

Dans le dashboard Supabase :
1. Aller dans "Database" > "Replication"
2. Activer la réplication pour la table `zones`

### 4. Installation des Dépendances

Si `dotenv` n'est pas installé pour le cron :

```bash
npm install dotenv
```

## 🔧 Utilisation

### 1. Synchronisation Manuelle

```javascript
import { runFullSync } from './src/services/syncZones.js'

// Synchronisation complète
const result = await runFullSync({
  batchSize: 100,
  forceRefresh: false
})

console.log('Résultat:', result)
```

### 2. Hook React Temps Réel

```jsx
import { useZonesRealtime } from './src/hooks/useZonesRealtime'

function MonComposant() {
  const { zones, loading, error, connectionStatus } = useZonesRealtime({
    autoFetch: true,
    onInsert: (zone) => console.log('Nouvelle zone:', zone.nom),
    onUpdate: (zone) => console.log('Zone mise à jour:', zone.nom),
    onDelete: (zone) => console.log('Zone supprimée:', zone.nom)
  })

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div>
      <p>Statut: {connectionStatus}</p>
      <p>{zones.length} zones chargées</p>
      {zones.map(zone => (
        <div key={zone.id}>{zone.nom} - {zone.population} hab.</div>
      ))}
    </div>
  )
}
```

### 3. Synchronisation Automatique Côté Client

```javascript
import { startAutoSync, stopAutoSync } from './src/services/syncScheduler.js'

// Démarrer la synchronisation automatique (toutes les 24h)
const scheduler = startAutoSync({
  interval: 24 * 60 * 60 * 1000, // 24h
  onSuccess: (result) => console.log('Sync réussie:', result),
  onError: (error) => console.error('Sync échouée:', error)
})

// Arrêter la synchronisation
stopAutoSync()
```

## ⚙️ Automatisation Production

### 1. Cron Job Unix/Linux

```bash
# Rendre le script exécutable
chmod +x sync-insee-cron.js

# Ajouter au crontab (crontab -e)
# Synchronisation quotidienne à 2h du matin
0 2 * * * cd /path/to/your/project && node sync-insee-cron.js >> /var/log/insee-sync.log 2>&1

# Ou toutes les 6 heures
0 */6 * * * cd /path/to/your/project && node sync-insee-cron.js >> /var/log/insee-sync.log 2>&1
```

### 2. Supabase Edge Function

Créez `supabase/functions/sync-insee/index.ts` :

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    console.log('🚀 Démarrage sync INSEE via Edge Function')
    
    // Votre code de synchronisation adapté pour Deno
    const result = await runSyncForDeno()
    
    return new Response(JSON.stringify({ 
      success: true, 
      result 
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

Puis déployez :
```bash
supabase functions deploy sync-insee
```

### 3. GitHub Actions

Créez `.github/workflows/insee-sync.yml` :

```yaml
name: Synchronisation INSEE

on:
  schedule:
    - cron: '0 2 * * *'  # Tous les jours à 2h UTC
  workflow_dispatch:     # Déclenchement manuel

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run INSEE sync
      env:
        VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
        VITE_INSEE_CLIENT_ID: ${{ secrets.INSEE_CLIENT_ID }}
        VITE_INSEE_CLIENT_SECRET: ${{ secrets.INSEE_CLIENT_SECRET }}
      run: node sync-insee-cron.js
```

## 🛡️ Robustesse et Gestion d'Erreurs

### 1. Retry Automatique

Le système intègre un mécanisme de retry automatique :
- **3 tentatives** par défaut
- **Délai exponentiel** entre les tentatives
- **Gestion spécifique** des erreurs rate limit (429)

### 2. Logging Complet

```javascript
// Logs détaillés avec horodatage
logger.info('🚀 Démarrage de la synchronisation')
logger.error('❌ Erreur lors de la requête:', error)
logger.success('✅ Synchronisation réussie')
```

### 3. Notifications

Configurez `SYNC_WEBHOOK_URL` pour recevoir des notifications :

```javascript
// Notification automatique en cas de succès/échec
{
  "type": "success",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "duration": 120,
  "stats": {
    "totalFetched": 34965,
    "updated": 152,
    "errors": 0
  }
}
```

### 4. Monitoring des Connexions

Le hook React surveille l'état de la connexion temps réel :

```jsx
const { connectionStatus } = useZonesRealtime()

// connectionStatus peut être:
// - 'CONNECTING': Connexion en cours
// - 'SUBSCRIBED': Connecté et actif
// - 'CHANNEL_ERROR': Erreur de connexion
// - 'CLOSED': Connexion fermée
```

## 🎛️ Configuration Avancée

### Variables d'Environnement Optionnelles

```bash
# Logging
SYNC_LOG_LEVEL=info          # info, warn, error, silent

# Performance
SYNC_BATCH_SIZE=100          # Taille des batches
SYNC_FORCE_REFRESH=false     # Force la mise à jour complète

# Retry
SYNC_MAX_RETRIES=3           # Nombre max de tentatives
SYNC_RETRY_DELAY=60000       # Délai entre tentatives (ms)

# Notifications
SYNC_WEBHOOK_URL=https://...  # URL webhook pour notifications
```

### Filtrage des Données

```javascript
// Hook avec filtres
const { zones } = useZonesRealtime({
  filter: {
    population: [1000, 50000], // Entre 1k et 50k habitants
    // ou
    code_insee: ['75001', '75002'] // Codes spécifiques
  },
  orderBy: { column: 'population', ascending: false }
})
```

## 🧪 Tests et Développement

### Mode Dry-Run

```javascript
// Test sans modification de la base
const result = await runFullSync({
  dryRun: true
})
// Retourne les statistiques sans faire l'upsert
```

### Test de Synchronisation

```bash
# Test manuel
node sync-insee-cron.js

# Avec variables spécifiques
SYNC_LOG_LEVEL=info SYNC_BATCH_SIZE=10 node sync-insee-cron.js
```

## 📊 Métriques et Statistiques

Chaque synchronisation retourne des statistiques complètes :

```javascript
{
  success: true,
  totalFetched: 34965,     // Communes récupérées de l'INSEE
  inserted: 0,             // Nouvelles communes
  updated: 152,            // Communes mises à jour
  skipped: 34813,          // Communes inchangées
  errors: 0,               // Erreurs rencontrées
  duration: 120,           // Durée en secondes
  dryRun: false           // Mode test
}
```

## 🔧 Dépannage

### Problèmes Courants

1. **Token INSEE invalide**
   ```bash
   ❌ Token INSEE invalide
   ```
   → Vérifiez vos clés dans `.env.local`

2. **Table non trouvée**
   ```bash
   ❌ relation "zones" does not exist
   ```
   → Créez la table avec le SQL fourni

3. **Realtime non activé**
   ```bash
   ⚠️ Connexion temps réel échouée
   ```
   → Activez la réplication dans Supabase

4. **Rate limit INSEE**
   ```bash
   ❌ Erreur API INSEE: 429 Too Many Requests
   ```
   → Le système attend automatiquement et retry

### Debug

```bash
# Logging verbose
SYNC_LOG_LEVEL=debug node sync-insee-cron.js

# Test avec petit batch
SYNC_BATCH_SIZE=10 node sync-insee-cron.js
```

## 🚀 Prochaines Améliorations

- [ ] Support des départements et régions
- [ ] Cache intelligent des tokens INSEE
- [ ] Interface d'administration web
- [ ] Métriques Prometheus/Grafana
- [ ] Support multi-tenant
- [ ] API REST pour déclencher la sync

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `/var/log/insee-sync.log`
2. Testez manuellement : `node sync-insee-cron.js`
3. Vérifiez la connexion Supabase Realtime
4. Consultez la documentation INSEE API

---

**🎉 Votre système INSEE-Supabase est maintenant opérationnel !**

Les cartes se mettront automatiquement à jour dès que l'INSEE publie de nouvelles données, sans que vos utilisateurs aient besoin de recharger la page. 