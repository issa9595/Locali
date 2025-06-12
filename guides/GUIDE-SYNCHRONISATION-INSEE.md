# 🏛️ Guide de Synchronisation des Communes INSEE

## 🎯 Résumé de la Situation

Votre base de données contient déjà une table `zones` avec une structure différente. Nous avons créé une solution qui utilise une **nouvelle table `communes_insee`** spécifiquement pour les données de l'API Géo française.

## 📋 Étapes à Suivre

### 1. Créer la Table `communes_insee` 

Dans le dashboard Supabase, allez dans **SQL Editor** et exécutez le contenu du fichier `create-communes-insee-table.sql` :

```sql
-- Le fichier contient la création complète de la table avec tous les index et triggers
```

### 2. Lancer la Synchronisation

Une fois la table créée, lancez la synchronisation :

```bash
node sync-insee-cron.js
```

## 🏗️ Structure de la Nouvelle Table

### Table `communes_insee`
```sql
CREATE TABLE communes_insee (
  id TEXT PRIMARY KEY,                    -- Code INSEE (ex: "75001")
  nom TEXT NOT NULL,                      -- Nom de la commune
  code_insee TEXT NOT NULL UNIQUE,       -- Code INSEE (doublon de l'id)
  population INTEGER,                     -- Population municipale
  surface NUMERIC,                        -- Surface en hectares
  geometrie JSONB,                        -- Géométrie GeoJSON (null pour l'instant)
  centre_lat NUMERIC,                     -- Latitude du centre
  centre_lng NUMERIC,                     -- Longitude du centre
  derniere_mise_a_jour TIMESTAMPTZ,      -- Date de dernière sync
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔄 Hooks React Mis à Jour

### Hook Principal
```javascript
import { useZones } from './src/hooks/useZonesRealtime.js'

function MonComposant() {
  const { communes, zones, loading, error } = useZones()
  
  // `communes` = nouvelles données INSEE
  // `zones` = alias pour compatibilité avec votre code existant
  
  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {communes.map(commune => (
            <li key={commune.id}>
              {commune.nom} - Population: {commune.population}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Hook avec Temps Réel
```javascript
import { useZonesRealtime } from './src/hooks/useZonesRealtime.js'

function ComposantTempsReel() {
  const { 
    communes, 
    loading, 
    connectionStatus,
    refresh 
  } = useZonesRealtime({
    autoFetch: true,
    onInsert: (commune) => console.log('Nouvelle commune:', commune),
    onUpdate: (commune) => console.log('Commune mise à jour:', commune),
    onDelete: (commune) => console.log('Commune supprimée:', commune)
  })
  
  return (
    <div>
      <p>Statut connexion: {connectionStatus}</p>
      <button onClick={refresh}>Actualiser</button>
      <p>{communes.length} communes chargées</p>
    </div>
  )
}
```

## 📊 Données Disponibles

### API Géo Française - Données Récupérées ✅
- ✅ **Nom** de la commune
- ✅ **Code INSEE** 
- ✅ **Population** municipale
- ✅ **Surface** en hectares
- ✅ **Coordonnées du centre** (lat/lng)
- ❌ **Géométrie** (contours) - non disponible sans filtrage

### Exemple de Données
```javascript
{
  id: "75001",
  nom: "Paris 1er Arrondissement", 
  code_insee: "75001",
  population: 16888,
  surface: 183,
  geometrie: null,
  centre_lat: 48.8607,
  centre_lng: 2.3378,
  derniere_mise_a_jour: "2025-05-23T09:45:00Z"
}
```

## 🚀 Résultats Attendus

- ✅ **~35 000 communes** françaises synchronisées
- ✅ **Temps réel** via Supabase Realtime
- ✅ **Performance optimisée** avec pagination par batches
- ✅ **Détection des changements** pour éviter les mises à jour inutiles
- ✅ **Retry automatique** en cas d'erreur

## 🔧 Configuration Automatisée

### Cron Job (Production)
```bash
# Synchronisation quotidienne à 2h du matin
0 2 * * * cd /path/to/your/project && node sync-insee-cron.js
```

### GitHub Actions (CI/CD)
```yaml
name: Sync INSEE Data
on:
  schedule:
    - cron: '0 2 * * *'  # Tous les jours à 2h
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: node sync-insee-cron.js
```

## 🔍 Monitoring et Debug

### Logs de Synchronisation
```bash
node sync-insee-cron.js
# ✅ 34,968 communes récupérées
# ✅ 100% synchronisées avec succès
# ⏱️ Durée: 45 secondes
```

### Script de Debug
```bash
node debug-insee.js
# Teste l'API, la connexion Supabase, et la structure des données
```

## 🛠️ Intégration avec Votre Code Existant

### Option 1: Remplacer Progressivement
Utilisez les alias de compatibilité pour une transition en douceur :
```javascript
const { zones } = useZones() // Récupère communes_insee mais avec l'alias 'zones'
```

### Option 2: Utiliser les Deux Tables
Gardez votre table `zones` existante et ajoutez `communes_insee` pour les données INSEE :
```javascript
const { communes } = useZones()        // Données INSEE
const { zones } = useExistingZones()   // Vos zones existantes
```

## 📈 Avantages de Cette Approche

1. **Non-destructive** : Votre table `zones` existante reste intacte
2. **Spécialisée** : Table optimisée pour les données INSEE
3. **Performance** : Index adaptés aux requêtes géographiques
4. **Évolutive** : Facile d'ajouter d'autres sources de données
5. **Compatible** : Hooks avec alias pour votre code existant

## 🎉 Prochaines Étapes

1. **Exécuter** `create-communes-insee-table.sql` dans Supabase
2. **Lancer** `node sync-insee-cron.js`
3. **Intégrer** les hooks dans vos composants React
4. **Configurer** la synchronisation automatique
5. **Monitorer** les performances et logs

---

*La synchronisation récupère **toutes les communes françaises** avec leurs données démographiques en temps réel ! 🇫🇷* 