/**
 * Service de mise à jour automatique des données territoriales
 * Vérifie et met à jour les données toutes les 24h
 * Module Locali - Auto Update Service - VERSION CORRIGÉE
 */

import { supabaseClient } from '../shared/api/supabaseClient.js'

/**
 * Configuration du service de mise à jour
 */
const CONFIG = {
  CHECK_INTERVAL: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
  STORAGE_KEY: 'locali_last_update_check',
  UPDATE_THRESHOLD: 24 * 60 * 60 * 1000, // 24 heures
  RETRY_DELAY: 5 * 60 * 1000, // 5 minutes
  MAX_RETRIES: 3,
  DEBUG: false // Mode debug pour éviter les logs en boucle
}

/**
 * Gestionnaire d'événements pour les mises à jour
 */
class AutoUpdateEventEmitter {
  constructor () {
    this.listeners = {}
  }

  on (event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit (event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.warn('Erreur dans le listener:', error)
        }
      })
    }
  }

  off (event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }
}

/**
 * Service principal de mise à jour automatique
 */
class AutoUpdateService {
  constructor () {
    this.isRunning = false
    this.intervalId = null
    this.retryCount = 0
    this.events = new AutoUpdateEventEmitter()
    this.isInitialized = false
    this.activeHooks = new Set() // Suivi des hooks actifs

    // NE PAS démarrer automatiquement pour éviter les boucles
    this.log('🏗️ Service d\'auto-update initialisé (en attente)')
  }

  /**
   * Logger conditionnel pour éviter le spam
   */
  log (message, ...args) {
    if (CONFIG.DEBUG || this.activeHooks.size <= 1) {
      console.log(message, ...args)
    }
  }

  /**
   * Enregistre un hook actif
   */
  registerHook (hookId) {
    this.activeHooks.add(hookId)
    this.log(`📝 Hook enregistré: ${hookId} (${this.activeHooks.size} actifs)`)

    // Démarrer le service seulement si c'est le premier hook
    if (this.activeHooks.size === 1 && !this.isRunning) {
      this.start()
    }
  }

  /**
   * Désenregistre un hook actif
   */
  unregisterHook (hookId) {
    this.activeHooks.delete(hookId)
    this.log(`📝 Hook désenregistré: ${hookId} (${this.activeHooks.size} actifs)`)

    // Arrêter le service si plus aucun hook n'est actif
    if (this.activeHooks.size === 0 && this.isRunning) {
      this.stop()
    }
  }

  /**
   * Démarre le service de mise à jour automatique
   */
  start () {
    if (this.isRunning) {
      this.log('Service déjà en cours d\'exécution')
      return
    }

    this.isRunning = true
    this.log('Service de mise à jour automatique démarré')

    // Vérification immédiate (mais pas si trop récente)
    this.checkForUpdatesThrottled()

    // Vérification périodique
    this.intervalId = setInterval(() => {
      this.checkForUpdatesThrottled()
    }, CONFIG.CHECK_INTERVAL)

    this.events.emit('started', { timestamp: new Date() })
  }

  /**
   * Arrête le service
   */
  stop () {
    if (!this.isRunning) {
      return
    }

    this.isRunning = false

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.log('Service de mise à jour automatique arrêté')
    this.events.emit('stopped', { timestamp: new Date() })
  }

  /**
   * Vérification throttlée pour éviter les appels trop fréquents
   */
  async checkForUpdatesThrottled () {
    const lastCheck = this.getLastUpdateCheck()
    const now = Date.now()

    // Vérifier si assez de temps s'est écoulé (minimum 1 minute entre les vérifications)
    if (lastCheck && (now - lastCheck) < 60000) {
      this.log('⏭️ Vérification ignorée (trop récente)')
      return
    }

    await this.checkForUpdates()
  }

  /**
   * Vérifie si une mise à jour est nécessaire
   */
  async checkForUpdates () {
    try {
      this.log('Vérification de la fraîcheur des données...')

      const lastCheck = this.getLastUpdateCheck()
      const now = Date.now()

      // Vérifier si assez de temps s'est écoulé pour une vraie vérification
      if (lastCheck && (now - lastCheck) < CONFIG.UPDATE_THRESHOLD) {
        const nextCheck = new Date(lastCheck + CONFIG.UPDATE_THRESHOLD)
        this.log(`Prochaine vérification prévue: ${nextCheck.toLocaleString('fr-FR')}`)

        // Mettre à jour le timestamp pour éviter les vérifications trop fréquentes
        this.setLastUpdateCheck(now)

        this.events.emit('checked', {
          timestamp: new Date(),
          needsUpdate: false,
          lastDataUpdate: null
        })
        return
      }

      // Vérifier la dernière mise à jour en base
      const lastDataUpdate = await this.getLastDataUpdate()

      if (lastDataUpdate && (now - lastDataUpdate.getTime()) < CONFIG.UPDATE_THRESHOLD) {
        this.log('Données à jour, pas de synchronisation nécessaire')
        this.setLastUpdateCheck(now)
        this.events.emit('checked', {
          timestamp: new Date(),
          needsUpdate: false,
          lastDataUpdate
        })
        return
      }

      // Mise à jour nécessaire
      this.log('Mise à jour des données nécessaire')
      this.events.emit('updateNeeded', {
        timestamp: new Date(),
        lastDataUpdate
      })

      await this.triggerUpdate()
    } catch (error) {
      console.error('Erreur lors de la vérification des mises à jour:', error)
      this.handleError(error)
    }
  }

  /**
   * Déclenche une mise à jour des données
   */
  async triggerUpdate () {
    try {
      this.log('Déclenchement de la mise à jour des données...')
      this.events.emit('updateStarted', { timestamp: new Date() })

      // Option 1: Déclencher la synchronisation côté serveur (si disponible)
      const serverUpdate = await this.triggerServerSync()

      if (serverUpdate.success) {
        this.log('Mise à jour serveur réussie')
        this.setLastUpdateCheck(Date.now())
        this.retryCount = 0

        this.events.emit('updateCompleted', {
          timestamp: new Date(),
          method: 'server',
          stats: serverUpdate.stats
        })
        return
      }

      // Option 2: Notification utilisateur pour actualisation manuelle
      this.notifyUserUpdate()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      this.handleError(error)
    }
  }

  /**
   * Tente de déclencher une synchronisation côté serveur
   */
  async triggerServerSync () {
    try {
      // Vérifier s'il y a un endpoint de synchronisation
      const syncEndpoint = import.meta.env.VITE_SYNC_ENDPOINT

      if (!syncEndpoint) {
        return { success: false, reason: 'no_endpoint' }
      }

      const response = await fetch(syncEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SYNC_API_KEY}`
        },
        body: JSON.stringify({
          source: 'auto-update-service',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, stats: result }
      } else {
        return { success: false, reason: 'server_error', status: response.status }
      }
    } catch (error) {
      return { success: false, reason: 'network_error', error: error.message }
    }
  }

  /**
   * Notifie l'utilisateur qu'une mise à jour est disponible
   */
  notifyUserUpdate () {
    const notification = {
      title: 'Mise à jour des données INSEE disponible',
      message: 'Nouvelles données territoriales disponibles. Actualisez la page pour les voir.',
      timestamp: new Date(),
      actions: [
        {
          label: 'Actualiser maintenant',
          action: () => window.location.reload()
        },
        {
          label: 'Plus tard',
          action: () => this.snoozeUpdate()
        }
      ]
    }

    // Émettre l'événement pour l'interface utilisateur
    this.events.emit('userNotificationRequired', notification)

    // Afficher une notification native si possible
    if ('Notification' in window && Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: 'locali-data-update'
      })
    }

    // Fallback: notification dans la console
    this.log(notification.title)
    this.log(notification.message)
  }

  /**
   * Reporte la vérification de mise à jour
   */
  snoozeUpdate (delayHours = 4) {
    const snoozeTime = delayHours * 60 * 60 * 1000
    const nextCheck = Date.now() + snoozeTime

    localStorage.setItem(CONFIG.STORAGE_KEY, nextCheck.toString())

    this.log(`Mise à jour reportée de ${delayHours}h`)
    this.events.emit('updateSnoozed', {
      timestamp: new Date(),
      nextCheck: new Date(nextCheck),
      delayHours
    })
  }

  /**
   * Récupère la date de la dernière vérification
   */
  getLastUpdateCheck () {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY)
    return stored ? parseInt(stored) : null
  }

  /**
   * Enregistre la date de la dernière vérification
   */
  setLastUpdateCheck (timestamp) {
    localStorage.setItem(CONFIG.STORAGE_KEY, timestamp.toString())
  }

  /**
   * Récupère la date de la dernière mise à jour des données
   */
  async getLastDataUpdate () {
    try {
      const supabase = supabaseClient()

      // Vérifier la date de dernière modification de la table
      const { data, error } = await supabase
        .from('communes_insee')
        .select('updated_at')
        .order('updated_at', { ascending: false })
        .limit(1)

      if (error) throw error

      return data?.[0]?.updated_at ? new Date(data[0].updated_at) : null
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière mise à jour:', error)
      return null
    }
  }

  /**
   * Gère les erreurs avec retry automatique
   */
  handleError (error) {
    this.retryCount++

    this.events.emit('error', {
      timestamp: new Date(),
      error: error.message,
      retryCount: this.retryCount,
      maxRetries: CONFIG.MAX_RETRIES
    })

    if (this.retryCount < CONFIG.MAX_RETRIES) {
      this.log(`Nouvelle tentative dans ${CONFIG.RETRY_DELAY / 60000} minutes... (${this.retryCount}/${CONFIG.MAX_RETRIES})`)

      setTimeout(() => {
        this.checkForUpdates()
      }, CONFIG.RETRY_DELAY)
    } else {
      console.error('Nombre maximum de tentatives atteint')
      this.retryCount = 0
    }
  }

  /**
   * Force une vérification immédiate
   */
  async forceCheck () {
    this.log('Vérification forcée des mises à jour...')
    localStorage.removeItem(CONFIG.STORAGE_KEY)
    await this.checkForUpdates()
  }

  /**
   * Retourne l'état du service
   */
  getStatus () {
    return {
      isRunning: this.isRunning,
      lastCheck: this.getLastUpdateCheck(),
      nextCheck: this.getLastUpdateCheck() ? this.getLastUpdateCheck() + CONFIG.CHECK_INTERVAL : null,
      retryCount: this.retryCount,
      activeHooks: this.activeHooks.size,
      config: CONFIG
    }
  }

  /**
   * Ajoute un écouteur d'événements
   */
  on (event, callback) {
    this.events.on(event, callback)
  }

  /**
   * Supprime un écouteur d'événements
   */
  off (event, callback) {
    this.events.off(event, callback)
  }

  /**
   * Reset pour le debug
   */
  reset () {
    this.stop()
    this.activeHooks.clear()
    localStorage.removeItem(CONFIG.STORAGE_KEY)
    this.retryCount = 0
    this.log('Service réinitialisé')
  }
}

// Instance singleton
let autoUpdateService = null

/**
 * Récupère l'instance du service
 */
export function getAutoUpdateService () {
  if (!autoUpdateService) {
    autoUpdateService = new AutoUpdateService()
  }
  return autoUpdateService
}

/**
 * Initialise le service avec configuration personnalisée
 */
export function initAutoUpdateService (config = {}) {
  Object.assign(CONFIG, config)
  return getAutoUpdateService()
}

/**
 * Demande la permission pour les notifications
 */
export async function requestNotificationPermission () {
  if ('Notification' in window && Notification.permission === 'default') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return Notification.permission === 'granted'
}

/**
 * Reset le service pour le debug
 */
export function resetAutoUpdateService () {
  if (autoUpdateService) {
    autoUpdateService.reset()
  }
}

export default {
  getAutoUpdateService,
  initAutoUpdateService,
  requestNotificationPermission,
  resetAutoUpdateService
}
