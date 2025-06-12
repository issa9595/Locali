/**
 * Hook React pour la gestion des mises à jour automatiques
 * Intègre le service d'auto-update dans les composants React
 * Module Locali - Auto Update Hook - VERSION CORRIGÉE
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { getAutoUpdateService, requestNotificationPermission } from '../services/autoUpdateService.js'

// Générateur d'ID unique pour les hooks
let hookIdCounter = 0

/**
 * Hook pour gérer les mises à jour automatiques
 * @param {Object} options - Options de configuration
 * @returns {Object} État et fonctions de contrôle des mises à jour
 */
export function useAutoUpdate(options = {}) {
  const {
    enableNotifications = true,
    autoStart = true,
    onUpdateAvailable = null,
    onUpdateCompleted = null,
    onError = null
  } = options

  const [status, setStatus] = useState({
    isRunning: false,
    lastCheck: null,
    nextCheck: null,
    updateAvailable: false,
    updating: false,
    error: null
  })

  const [notification, setNotification] = useState(null)
  const serviceRef = useRef(null)
  const listenersSetupRef = useRef(false)
  const hookIdRef = useRef(`hook-${++hookIdCounter}`)
  const mountedRef = useRef(true)

  /**
   * Initialise le service d'auto-update
   */
  const initService = useCallback(() => {
    if (serviceRef.current) return serviceRef.current

    serviceRef.current = getAutoUpdateService()
    return serviceRef.current
  }, [])

  /**
   * Met à jour le statut local seulement si le composant est monté
   */
  const updateStatus = useCallback(() => {
    if (!mountedRef.current) return
    
    if (serviceRef.current) {
      const serviceStatus = serviceRef.current.getStatus()
      setStatus(prevStatus => ({
        ...prevStatus,
        isRunning: serviceStatus.isRunning,
        lastCheck: serviceStatus.lastCheck ? new Date(serviceStatus.lastCheck) : null,
        nextCheck: serviceStatus.nextCheck ? new Date(serviceStatus.nextCheck) : null
      }))
    }
  }, [])

  /**
   * Configure les écouteurs d'événements du service
   */
  const setupEventListeners = useCallback(() => {
    if (!serviceRef.current || listenersSetupRef.current) return

    const service = serviceRef.current

    // Fonction helper pour les callbacks sécurisés
    const safeCallback = (callback) => (data) => {
      if (mountedRef.current && callback) {
        callback(data)
      }
    }

    // Événement: Service démarré
    service.on('started', () => {
      if (mountedRef.current) {
        updateStatus()
      }
    })

    // Événement: Service arrêté
    service.on('stopped', () => {
      if (mountedRef.current) {
        updateStatus()
      }
    })

    // Événement: Vérification effectuée
    service.on('checked', (data) => {
      if (mountedRef.current) {
        setStatus(prevStatus => ({
          ...prevStatus,
          lastCheck: data.timestamp,
          updateAvailable: data.needsUpdate,
          error: null
        }))
      }
    })

    // Événement: Mise à jour nécessaire
    service.on('updateNeeded', (data) => {
      if (mountedRef.current) {
        setStatus(prevStatus => ({
          ...prevStatus,
          updateAvailable: true
        }))

        if (onUpdateAvailable) {
          safeCallback(onUpdateAvailable)(data)
        }
      }
    })

    // Événement: Mise à jour démarrée
    service.on('updateStarted', () => {
      if (mountedRef.current) {
        setStatus(prevStatus => ({
          ...prevStatus,
          updating: true,
          error: null
        }))
      }
    })

    // Événement: Mise à jour terminée
    service.on('updateCompleted', (data) => {
      if (mountedRef.current) {
        setStatus(prevStatus => ({
          ...prevStatus,
          updating: false,
          updateAvailable: false,
          lastCheck: data.timestamp
        }))

        if (onUpdateCompleted) {
          safeCallback(onUpdateCompleted)(data)
        }
      }
    })

    // Événement: Notification utilisateur requise
    service.on('userNotificationRequired', (notificationData) => {
      if (mountedRef.current) {
        setNotification(notificationData)
      }
    })

    // Événement: Mise à jour reportée
    service.on('updateSnoozed', (data) => {
      if (mountedRef.current) {
        setNotification(null)
        setStatus(prevStatus => ({
          ...prevStatus,
          updateAvailable: false,
          nextCheck: data.nextCheck
        }))
      }
    })

    // Événement: Erreur
    service.on('error', (data) => {
      if (mountedRef.current) {
        setStatus(prevStatus => ({
          ...prevStatus,
          error: data.error,
          updating: false
        }))

        if (onError) {
          safeCallback(onError)(data)
        }
      }
    })

    listenersSetupRef.current = true
  }, [updateStatus, onUpdateAvailable, onUpdateCompleted, onError])

  /**
   * Démarre le service (via enregistrement)
   */
  const start = useCallback(() => {
    const service = initService()
    service.registerHook(hookIdRef.current)
    updateStatus()
  }, [initService, updateStatus])

  /**
   * Arrête le service (via désenregistrement)
   */
  const stop = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.unregisterHook(hookIdRef.current)
      updateStatus()
    }
  }, [updateStatus])

  /**
   * Force une vérification immédiate
   */
  const forceCheck = useCallback(async () => {
    if (serviceRef.current) {
      await serviceRef.current.forceCheck()
      updateStatus()
    }
  }, [updateStatus])

  /**
   * Reporte la mise à jour
   */
  const snoozeUpdate = useCallback((hours = 4) => {
    if (serviceRef.current) {
      serviceRef.current.snoozeUpdate(hours)
      if (mountedRef.current) {
        setNotification(null)
      }
    }
  }, [])

  /**
   * Actualise la page pour appliquer les mises à jour
   */
  const applyUpdate = useCallback(() => {
    window.location.reload()
  }, [])

  /**
   * Ferme la notification
   */
  const dismissNotification = useCallback(() => {
    if (mountedRef.current) {
      setNotification(null)
    }
  }, [])

  /**
   * Active les notifications navigateur
   */
  const enableBrowserNotifications = useCallback(async () => {
    if (enableNotifications) {
      await requestNotificationPermission()
    }
  }, [enableNotifications])

  // Effet d'initialisation unique
  useEffect(() => {
    mountedRef.current = true
    
    const service = initService()
    setupEventListeners()
    
    if (autoStart) {
      service.registerHook(hookIdRef.current)
    }

    // Demander la permission pour les notifications
    if (enableNotifications) {
      enableBrowserNotifications()
    }

    updateStatus()

    // Nettoyage au démontage
    return () => {
      mountedRef.current = false
      if (serviceRef.current) {
        serviceRef.current.unregisterHook(hookIdRef.current)
      }
    }
  }, []) // Dépendances vides pour éviter les re-exécutions

  // Effet pour mettre à jour le statut périodiquement (moins fréquent)
  useEffect(() => {
    const interval = setInterval(() => {
      if (mountedRef.current) {
        updateStatus()
      }
    }, 120000) // Toutes les 2 minutes au lieu de 1
    
    return () => clearInterval(interval)
  }, [updateStatus])

  return {
    // État
    status,
    notification,
    
    // Actions
    start,
    stop,
    forceCheck,
    snoozeUpdate,
    applyUpdate,
    dismissNotification,
    enableBrowserNotifications,
    
    // Helpers
    isRunning: status.isRunning,
    hasUpdateAvailable: status.updateAvailable,
    isUpdating: status.updating,
    hasError: !!status.error,
    lastCheckFormatted: status.lastCheck ? status.lastCheck.toLocaleString('fr-FR') : 'Jamais',
    nextCheckFormatted: status.nextCheck ? status.nextCheck.toLocaleString('fr-FR') : 'N/A',
    
    // Debug
    hookId: hookIdRef.current
  }
}

/**
 * Hook simplifié qui retourne seulement l'état de disponibilité des mises à jour
 * @returns {Boolean} true si une mise à jour est disponible
 */
export function useUpdateAvailable() {
  const { hasUpdateAvailable } = useAutoUpdate({ 
    autoStart: true,
    enableNotifications: false // Pas de notifications pour ce hook simple
  })
  return hasUpdateAvailable
}

/**
 * Hook pour afficher uniquement les notifications de mise à jour
 * @param {Function} onNotification - Callback appelé lors d'une nouvelle notification
 * @returns {Object} notification et fonction de dismiss
 */
export function useUpdateNotifications(onNotification = null) {
  const { notification, dismissNotification } = useAutoUpdate({
    autoStart: true,
    enableNotifications: true,
    onUpdateAvailable: onNotification
  })

  return {
    notification,
    dismissNotification,
    hasNotification: !!notification
  }
}

export default useAutoUpdate 