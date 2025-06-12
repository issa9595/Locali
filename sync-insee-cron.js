#!/usr/bin/env node

/**
 * Script de synchronisation INSEE pour cron job
 * Usage: node sync-insee-cron.js
 * 
 * Configuration crontab recommandée:
 * # Synchronisation quotidienne à 2h du matin
 * 0 2 * * * cd /path/to/your/project && node sync-insee-cron.js >> /var/log/insee-sync.log 2>&1
 */

import { runFullSync } from './src/services/syncZones.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Configuration des chemins pour ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '.env.local') })

/**
 * Configuration du script
 */
const CONFIG = {
  logLevel: process.env.SYNC_LOG_LEVEL || 'info',
  batchSize: parseInt(process.env.SYNC_BATCH_SIZE) || 100,
  forceRefresh: process.env.SYNC_FORCE_REFRESH === 'true',
  maxRetries: parseInt(process.env.SYNC_MAX_RETRIES) || 3,
  retryDelay: parseInt(process.env.SYNC_RETRY_DELAY) || 60000
}

/**
 * Logger simple avec niveaux
 */
const logger = {
  info: (msg, ...args) => {
    if (CONFIG.logLevel !== 'silent') {
      console.log(`ℹ️ [${new Date().toISOString()}] ${msg}`, ...args)
    }
  },
  error: (msg, ...args) => {
    console.error(`❌ [${new Date().toISOString()}] ${msg}`, ...args)
  },
  success: (msg, ...args) => {
    console.log(`✅ [${new Date().toISOString()}] ${msg}`, ...args)
  },
  warn: (msg, ...args) => {
    console.warn(`⚠️ [${new Date().toISOString()}] ${msg}`, ...args)
  }
}

/**
 * Vérifie les variables d'environnement requises
 */
function checkEnvironment() {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_INSEE_CLIENT_ID',
    'VITE_INSEE_CLIENT_SECRET'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    logger.error(`Variables d'environnement manquantes: ${missing.join(', ')}`)
    logger.error('Vérifiez votre fichier .env.local')
    process.exit(1)
  }

  logger.info('✅ Variables d\'environnement validées')
}

/**
 * Envoie une notification (webhook, email, etc.)
 */
async function sendNotification(type, data) {
  const webhookUrl = process.env.SYNC_WEBHOOK_URL
  
  if (!webhookUrl) return

  try {
    const payload = {
      type,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      ...data
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      logger.info(`📢 Notification ${type} envoyée`)
    } else {
      logger.warn(`⚠️ Échec de la notification: ${response.status}`)
    }
  } catch (error) {
    logger.warn('⚠️ Erreur lors de l\'envoi de notification:', error.message)
  }
}

/**
 * Fonction principale avec gestion des erreurs et retry
 */
async function main() {
  const startTime = Date.now()
  let attempts = 0
  let lastError = null

  logger.info('🚀 Démarrage de la synchronisation INSEE via cron')
  logger.info(`📋 Configuration: ${JSON.stringify(CONFIG, null, 2)}`)

  // Vérifier l'environnement
  checkEnvironment()

  // Boucle de retry
  while (attempts < CONFIG.maxRetries) {
    attempts++
    
    try {
      logger.info(`🔄 Tentative ${attempts}/${CONFIG.maxRetries}`)
      
      const result = await runFullSync({
        batchSize: CONFIG.batchSize,
        forceRefresh: CONFIG.forceRefresh
      })
      
      const duration = Math.round((Date.now() - startTime) / 1000)
      
      if (result.success) {
        logger.success(`Synchronisation réussie en ${duration}s`)
        logger.info(`📊 Statistiques: ${JSON.stringify(result, null, 2)}`)
        
        // Notification de succès
        await sendNotification('success', {
          duration,
          stats: result,
          attempts
        })
        
        process.exit(0)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      lastError = error
      
      logger.error(`Échec de la tentative ${attempts}:`, error.message)
      
      if (attempts < CONFIG.maxRetries) {
        logger.info(`⏳ Nouvelle tentative dans ${CONFIG.retryDelay / 1000}s...`)
        await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay))
      }
    }
  }

  // Toutes les tentatives ont échoué
  const duration = Math.round((Date.now() - startTime) / 1000)
  
  logger.error(`💥 Échec de toutes les tentatives après ${duration}s`)
  logger.error(`Dernière erreur: ${lastError?.message}`)
  
  // Notification d'échec
  await sendNotification('failure', {
    duration,
    error: lastError?.message,
    attempts,
    stack: lastError?.stack
  })
  
  process.exit(1)
}

/**
 * Gestion des signaux pour un arrêt propre
 */
process.on('SIGINT', () => {
  logger.warn('Signal SIGINT reçu, arrêt en cours...')
  process.exit(130)
})

process.on('SIGTERM', () => {
  logger.warn('Signal SIGTERM reçu, arrêt en cours...')
  process.exit(143)
})

/**
 * Gestion des erreurs non capturées
 */
process.on('uncaughtException', (error) => {
  logger.error('💥 Erreur non capturée:', error)
  sendNotification('error', {
    type: 'uncaughtException',
    error: error.message,
    stack: error.stack
  }).finally(() => process.exit(1))
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('💥 Promise rejetée non gérée:', reason)
  sendNotification('error', {
    type: 'unhandledRejection',
    reason: reason?.toString(),
    promise: promise?.toString()
  }).finally(() => process.exit(1))
})

// Lancer le script
main().catch((error) => {
  logger.error('💥 Erreur fatale dans main():', error)
  process.exit(1)
}) 