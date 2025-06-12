/**
 * Système de planification et d'automatisation pour la synchronisation INSEE
 * Gère les cron jobs, edge functions et autres méthodes d'automatisation
 */

import { runFullSync } from './syncZones.js'

/**
 * Planificateur de synchronisation
 */
export class SyncScheduler {
  constructor(options = {}) {
    this.isRunning = false
    this.intervalId = null
    this.lastSyncTime = null
    this.syncHistory = []
    
    this.options = {
      interval: 24 * 60 * 60 * 1000, // 24h par défaut
      maxRetries: 3,
      retryDelay: 60000, // 1 minute
      onSuccess: null,
      onError: null,
      ...options
    }
  }

  /**
   * Démarre la synchronisation automatique
   */
  start() {
    if (this.isRunning) {
      console.warn('⚠️ La synchronisation automatique est déjà en cours')
      return
    }

    console.log(`🚀 Démarrage de la synchronisation automatique (intervalle: ${this.options.interval / 1000}s)`)
    
    // Première synchronisation immédiate
    this.runSync()
    
    // Planifier les synchronisations suivantes
    this.intervalId = setInterval(() => {
      this.runSync()
    }, this.options.interval)
    
    this.isRunning = true
  }

  /**
   * Arrête la synchronisation automatique
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    
    this.isRunning = false
    console.log('🛑 Synchronisation automatique arrêtée')
  }

  /**
   * Lance une synchronisation avec retry automatique
   */
  async runSync() {
    let attempts = 0
    let lastError = null

    while (attempts < this.options.maxRetries) {
      try {
        console.log(`🔄 Tentative de synchronisation ${attempts + 1}/${this.options.maxRetries}`)
        
        const result = await runFullSync({
          batchSize: 100,
          forceRefresh: false
        })

        if (result.success) {
          this.lastSyncTime = new Date()
          this.syncHistory.push({
            timestamp: this.lastSyncTime,
            success: true,
            stats: result,
            attempts: attempts + 1
          })

          console.log('✅ Synchronisation automatique réussie')
          
          // Callback de succès
          if (this.options.onSuccess) {
            this.options.onSuccess(result)
          }
          
          return result
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        attempts++
        lastError = error
        
        console.error(`❌ Échec de la synchronisation (tentative ${attempts}):`, error.message)
        
        if (attempts < this.options.maxRetries) {
          console.log(`⏳ Nouvelle tentative dans ${this.options.retryDelay / 1000}s...`)
          await new Promise(resolve => setTimeout(resolve, this.options.retryDelay))
        }
      }
    }

    // Toutes les tentatives ont échoué
    this.syncHistory.push({
      timestamp: new Date(),
      success: false,
      error: lastError.message,
      attempts
    })

    console.error('💥 Échec de toutes les tentatives de synchronisation')
    
    // Callback d'erreur
    if (this.options.onError) {
      this.options.onError(lastError)
    }
    
    throw lastError
  }

  /**
   * Obtient le statut du planificateur
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastSyncTime: this.lastSyncTime,
      nextSyncTime: this.isRunning ? new Date(Date.now() + this.options.interval) : null,
      syncHistory: this.syncHistory.slice(-10), // 10 dernières synchronisations
      intervalMs: this.options.interval
    }
  }
}

/**
 * Instance globale du planificateur
 */
let globalScheduler = null

/**
 * Démarre la synchronisation automatique globale
 * @param {Object} options - Options de configuration
 */
export function startAutoSync(options = {}) {
  if (globalScheduler) {
    globalScheduler.stop()
  }
  
  globalScheduler = new SyncScheduler(options)
  globalScheduler.start()
  
  return globalScheduler
}

/**
 * Arrête la synchronisation automatique globale
 */
export function stopAutoSync() {
  if (globalScheduler) {
    globalScheduler.stop()
    globalScheduler = null
  }
}

/**
 * Obtient le statut de la synchronisation automatique
 */
export function getAutoSyncStatus() {
  return globalScheduler ? globalScheduler.getStatus() : null
}

/**
 * Configuration pour Supabase Edge Function
 * À déployer en tant qu'Edge Function pour une automatisation côté serveur
 */
export const edgeFunctionCode = `
// Supabase Edge Function pour synchronisation automatique
// À sauvegarder dans supabase/functions/sync-insee/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const inseeClientId = Deno.env.get('INSEE_CLIENT_ID')!
const inseeClientSecret = Deno.env.get('INSEE_CLIENT_SECRET')!

serve(async (req) => {
  try {
    // Vérifier l'authentification (optionnel)
    const authHeader = req.headers.get('authorization')
    if (!authHeader || authHeader !== \`Bearer \${Deno.env.get('SYNC_TOKEN')}\`) {
      return new Response('Unauthorized', { status: 401 })
    }

    console.log('🚀 Démarrage de la synchronisation INSEE via Edge Function')

    // Importer et exécuter la synchronisation
    // (Vous devrez adapter le code pour Deno)
    const result = await runSyncInEdgeFunction()

    return new Response(
      JSON.stringify({ 
        success: true, 
        result,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('❌ Erreur dans l\'Edge Function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

async function runSyncInEdgeFunction() {
  // Code de synchronisation adapté pour Deno
  // (version simplifiée du code syncZones.js)
  return { message: 'Synchronisation terminée' }
}
`

/**
 * Configuration pour cron job Unix/Linux
 */
export const cronJobExample = `
# Exemple de cron job pour synchronisation quotidienne à 2h du matin
# Ajouter cette ligne à votre crontab (crontab -e)

0 2 * * * cd /path/to/your/project && node sync-insee-cron.js >> /var/log/insee-sync.log 2>&1

# Pour un cron job toutes les 6 heures :
0 */6 * * * cd /path/to/your/project && node sync-insee-cron.js >> /var/log/insee-sync.log 2>&1
`

/**
 * Script Node.js pour cron job
 * À sauvegarder comme sync-insee-cron.js à la racine du projet
 */
export const cronScript = `
#!/usr/bin/env node

/**
 * Script de synchronisation INSEE pour cron job
 * Usage: node sync-insee-cron.js
 */

import { runFullSync } from './src/services/syncZones.js'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

async function main() {
  const startTime = Date.now()
  
  console.log(\`🕒 [\${new Date().toISOString()}] Démarrage de la synchronisation INSEE via cron\`)
  
  try {
    const result = await runFullSync({
      batchSize: 100,
      forceRefresh: false
    })
    
    const duration = Math.round((Date.now() - startTime) / 1000)
    
    if (result.success) {
      console.log(\`✅ [\${new Date().toISOString()}] Synchronisation réussie en \${duration}s\`)
      console.log(\`📊 Statistiques: \${JSON.stringify(result, null, 2)}\`)
      process.exit(0)
    } else {
      console.error(\`❌ [\${new Date().toISOString()}] Synchronisation échouée: \${result.error}\`)
      process.exit(1)
    }
  } catch (error) {
    console.error(\`💥 [\${new Date().toISOString()}] Erreur fatale:\`, error)
    process.exit(1)
  }
}

main()
`

/**
 * Configuration pour GitHub Actions
 */
export const githubActionConfig = `
# .github/workflows/insee-sync.yml
# Synchronisation automatique via GitHub Actions

name: Synchronisation INSEE

on:
  schedule:
    # Tous les jours à 2h du matin UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Permet le déclenchement manuel

jobs:
  sync:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run INSEE sync
      env:
        VITE_SUPABASE_URL: \${{ secrets.SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: \${{ secrets.SUPABASE_ANON_KEY }}
        VITE_INSEE_CLIENT_ID: \${{ secrets.INSEE_CLIENT_ID }}
        VITE_INSEE_CLIENT_SECRET: \${{ secrets.INSEE_CLIENT_SECRET }}
      run: node sync-insee-cron.js
      
    - name: Notify on failure
      if: failure()
      run: echo "La synchronisation INSEE a échoué"
`

console.log('📋 Scripts d\'automatisation disponibles:')
console.log('1. SyncScheduler class pour automatisation côté client')
console.log('2. Code d\'Edge Function Supabase')
console.log('3. Configuration cron job Unix/Linux')
console.log('4. Configuration GitHub Actions')
console.log('5. Script Node.js pour cron') 