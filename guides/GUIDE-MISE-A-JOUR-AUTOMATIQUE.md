# 🔄 Guide de Mise à Jour Automatique - Locali

## 📋 Vue d'ensemble

Le système de mise à jour automatique de Locali synchronise les données INSEE toutes les 24 heures pour maintenir les informations territoriales à jour. Ce guide couvre l'installation, la configuration et la surveillance du système.

## 🏗️ Architecture du Système

### Composants Principaux

1. **Service Auto-Update Client** (`src/services/autoUpdateService.js`)
   - Vérifie la fraîcheur des données côté client
   - Notifie l'utilisateur des mises à jour disponibles
   - Gère les tentatives de synchronisation

2. **Hook React** (`src/hooks/useAutoUpdate.jsx`)
   - Intégration React pour les composants
   - Gestion d'état pour les notifications
   - Callbacks personnalisables

3. **Composants UI** (`src/components/UpdateNotification.jsx`)
   - Notifications toast et bannières
   - Indicateurs de statut
   - Panneau de contrôle

4. **Script Cron** (`sync-insee-cron.js`)
   - Synchronisation serveur automatique
   - Logs détaillés et gestion d'erreurs
   - Notifications webhook optionnelles

## 🚀 Installation Rapide

### 1. Configuration Automatique

```bash
# Rendre le script de configuration exécutable
chmod +x cron-setup.sh

# Exécuter la configuration automatique
./cron-setup.sh
```

### 2. Vérification

```bash
# Vérifier que le cron job est installé
crontab -l | grep "Locali INSEE Auto Sync"

# Voir les logs
tail -f /var/log/locali/insee-sync.log

# Monitoring
./monitor-sync.sh
```

## 🔧 Configuration Manuelle

### Variables d'Environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Synchronisation côté serveur (optionnel)
VITE_SYNC_ENDPOINT=https://your-api.com/sync
VITE_SYNC_API_KEY=your-api-key

# Notifications webhook (optionnel)
SYNC_WEBHOOK_URL=https://your-webhook.com/notify
SYNC_LOG_LEVEL=info
SYNC_BATCH_SIZE=100
SYNC_FORCE_REFRESH=false
SYNC_MAX_RETRIES=3
SYNC_RETRY_DELAY=60000
```

### Configuration Côté Client

Le service se démarre automatiquement, mais vous pouvez le personnaliser :

```javascript
import { initAutoUpdateService } from './src/services/autoUpdateService.js'

// Configuration personnalisée
const service = initAutoUpdateService({
  CHECK_INTERVAL: 12 * 60 * 60 * 1000, // 12h au lieu de 24h
  UPDATE_THRESHOLD: 12 * 60 * 60 * 1000,
  RETRY_DELAY: 10 * 60 * 1000, // 10 minutes
  MAX_RETRIES: 5
})
```

## 📱 Utilisation dans les Composants

### Hook de Base

```javascript
import { useAutoUpdate } from '../hooks/useAutoUpdate.jsx'

function MyComponent() {
  const { 
    hasUpdateAvailable, 
    isUpdating, 
    forceCheck, 
    notification 
  } = useAutoUpdate({
    enableNotifications: true,
    onUpdateAvailable: (data) => {
      console.log('Mise à jour disponible:', data)
    }
  })

  return (
    <div>
      {hasUpdateAvailable && (
        <button onClick={() => window.location.reload()}>
          🔄 Actualiser pour voir les nouvelles données
        </button>
      )}
    </div>
  )
}
```

### Composants Pré-construits

```javascript
import { 
  UpdateNotification, 
  UpdateStatusIndicator, 
  UpdateControlPanel 
} from '../components/UpdateNotification.jsx'

function App() {
  return (
    <div>
      {/* Bannière en haut de page */}
      <UpdateNotification variant="banner" />
      
      {/* Indicateur de statut */}
      <UpdateStatusIndicator />
      
      {/* Panel de contrôle dans les paramètres */}
      <UpdateControlPanel />
      
      {/* Notification toast flottante */}
      <UpdateNotification variant="toast" />
    </div>
  )
}
```

## ⏰ Planification et Fréquence

### Configuration Cron par Défaut

```bash
# Synchronisation à 2h du matin tous les jours
0 2 * * * /path/to/project/cron-wrapper.sh >> /var/log/locali/insee-sync.log 2>&1
```

### Autres Options de Planification

```bash
# Toutes les 12 heures (midi et minuit)
0 0,12 * * * /path/to/wrapper.sh

# Tous les dimanche à 3h du matin
0 3 * * 0 /path/to/wrapper.sh

# Toutes les 6 heures
0 */6 * * * /path/to/wrapper.sh
```

## 📊 Surveillance et Monitoring

### Script de Monitoring

```bash
# Exécuter le monitoring
./monitor-sync.sh

# Voir les logs en temps réel
tail -f /var/log/locali/insee-sync.log

# Statistiques rapides
grep -c "terminée avec succès" /var/log/locali/insee-sync.log
```

### Exemple de Sortie de Monitoring

```
📊 Monitoring Synchronisation INSEE - Locali
==============================================
📁 Fichier de log: /var/log/locali/insee-sync.log
📏 Taille du fichier: 2.3M

🕐 Dernières exécutions:
------------------------
2024-01-15 02:00:01 🚀 Début de la synchronisation INSEE
2024-01-15 02:05:23 ✅ Synchronisation terminée avec succès
2024-01-16 02:00:01 🚀 Début de la synchronisation INSEE
2024-01-16 02:04:45 ✅ Synchronisation terminée avec succès

📈 Statistiques:
----------------
Total exécutions: 45
Succès: 43
Échecs: 1
Timeouts: 1
```

## 🚨 Gestion des Erreurs

### Types d'Erreurs Communes

1. **Erreur de Réseau**
   - Vérifiez la connexion internet
   - Vérifiez les URLs d'API

2. **Erreur d'Authentification**
   - Vérifiez les clés API INSEE
   - Vérifiez les tokens Supabase

3. **Timeout**
   - Augmentez la durée de timeout
   - Vérifiez les performances du serveur

### Actions de Dépannage

```bash
# Test manuel de synchronisation
node sync-insee-cron.js

# Vérification des variables d'environnement
cat .env.local | grep -E "INSEE|SUPABASE"

# Test de connectivité Supabase
node -e "
const { supabaseClient } = require('./src/shared/api/supabaseClient.js');
supabaseClient().from('communes_insee').select('count').then(console.log);
"
```

## 🔔 Notifications et Alertes

### Notifications Navigateur

Le système demande automatiquement la permission pour les notifications navigateur :

```javascript
import { requestNotificationPermission } from '../services/autoUpdateService.js'

// Demander la permission manuellement
const granted = await requestNotificationPermission()
if (granted) {
  console.log('Notifications activées')
}
```

### Webhooks (Optionnel)

Configurez un webhook pour recevoir des notifications sur Slack, Discord, etc. :

```javascript
// Exemple de payload webhook
{
  "type": "success",
  "timestamp": "2024-01-15T02:05:23.000Z",
  "environment": "production",
  "duration": 322,
  "stats": {
    "totalCommunes": 34969,
    "updated": 145,
    "created": 0,
    "errors": 0
  }
}
```

## 🎛️ Paramètres Avancés

### Configuration du Service

```javascript
// Configuration avancée du service
const CONFIG = {
  // Intervalle de vérification (millisecondes)
  CHECK_INTERVAL: 24 * 60 * 60 * 1000, // 24 heures
  
  // Seuil pour considérer qu'une mise à jour est nécessaire
  UPDATE_THRESHOLD: 24 * 60 * 60 * 1000, // 24 heures
  
  // Délai entre les tentatives de retry
  RETRY_DELAY: 5 * 60 * 1000, // 5 minutes
  
  // Nombre maximum de tentatives
  MAX_RETRIES: 3,
  
  // Clé de stockage local
  STORAGE_KEY: 'locali_last_update_check'
}
```

### Variables d'Environnement du Script Cron

```bash
# Niveau de log (silent, info, debug)
SYNC_LOG_LEVEL=info

# Taille des lots de synchronisation
SYNC_BATCH_SIZE=100

# Force la synchronisation même si les données semblent récentes
SYNC_FORCE_REFRESH=false

# Nombre maximum de tentatives
SYNC_MAX_RETRIES=3

# Délai entre les tentatives (millisecondes)
SYNC_RETRY_DELAY=60000
```

## 🚀 Déploiement en Production

### Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Cron job installé et testé
- [ ] Logs configurés avec rotation
- [ ] Monitoring en place
- [ ] Notifications testées
- [ ] Documentation équipe mise à jour

### Script de Déploiement

```bash
#!/bin/bash
# Déploiement automatique

# 1. Configuration
./cron-setup.sh

# 2. Test
./cron-wrapper.sh

# 3. Vérification
./monitor-sync.sh

# 4. Notification équipe
echo "✅ Système de mise à jour automatique déployé"
```

## 📈 Métriques et KPIs

### Métriques Surveillées

- **Taux de succès** : % de synchronisations réussies
- **Durée moyenne** : Temps de synchronisation
- **Fréquence d'erreurs** : Nombre d'échecs par semaine
- **Données synchronisées** : Nombre de communes mises à jour

### Alertes Recommandées

- Échec de synchronisation 2 fois consécutives
- Durée de synchronisation > 30 minutes
- Plus de 5% d'erreurs sur une semaine
- Aucune synchronisation depuis 48h

## 🛠️ Maintenance

### Rotation des Logs

```bash
# Configuration logrotate
sudo cat > /etc/logrotate.d/locali << EOF
/var/log/locali/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    copytruncate
}
EOF
```

### Nettoyage Périodique

```bash
# Script de nettoyage (à exécuter mensuellement)
# Supprime les logs de plus de 30 jours
find /var/log/locali -name "*.log.*" -mtime +30 -delete

# Archive les anciens logs
tar -czf /backup/locali-logs-$(date +%Y%m).tar.gz /var/log/locali/*.log.1
```

## 🆘 Support et Dépannage

### Problèmes Fréquents

1. **Le cron job ne s'exécute pas**
   - Vérifiez que le service cron est actif : `sudo systemctl status cron`
   - Vérifiez la syntaxe : `crontab -l`

2. **Erreurs de permission**
   - Vérifiez les permissions des fichiers : `ls -la sync-insee-cron.js`
   - Vérifiez le propriétaire des logs : `ls -la /var/log/locali/`

3. **Variables d'environnement non chargées**
   - Vérifiez le chemin du fichier `.env.local`
   - Testez le chargement : `node -e "require('dotenv').config(); console.log(process.env.VITE_SUPABASE_URL)"`

### Logs de Debug

```bash
# Activer les logs de debug
export SYNC_LOG_LEVEL=debug

# Exécution avec logs détaillés
node sync-insee-cron.js 2>&1 | tee debug.log
```

## 🔗 Ressources Additionnelles

- [Documentation API INSEE](https://www.insee.fr/fr/information/2868055)
- [Guide Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Cron Job Generator](https://crontab.guru/)
- [Guide Logrotate](https://linux.die.net/man/8/logrotate)

---

**💡 Support** : Pour toute question ou problème, consultez les logs ou créez une issue dans le projet.

**🔄 Dernière mise à jour** : 15 janvier 2024 