/**
 * Composant de notification pour les mises à jour automatiques
 * Affiche des notifications élégantes pour informer l'utilisateur des mises à jour
 * Module Locali - Update Notification Component
 */

import React from 'react'
import { useUpdateNotifications } from '../hooks/useAutoUpdate.jsx'

/**
 * Notification toast pour les mises à jour
 */
function UpdateToast({ notification, onDismiss, onApply, onSnooze }) {
  if (!notification) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md bg-white border-l-4 border-locali-blue rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-2xl">📊</div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-locali-text-primary">
              {notification.title}
            </h3>
            <p className="mt-1 text-sm text-locali-text-secondary">
              {notification.message}
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={onApply}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-locali-blue hover:bg-locali-button-hover focus:outline-none focus:ring-2 focus:ring-locali-blue transition-colors"
              >
                🔄 Actualiser
              </button>
              <button
                onClick={() => onSnooze(4)}
                className="inline-flex items-center px-3 py-1.5 border border-locali-green-light text-xs font-medium rounded text-locali-text-primary bg-white hover:bg-locali-green-light/10 focus:outline-none focus:ring-2 focus:ring-locali-blue transition-colors"
              >
                😴 Plus tard
              </button>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onDismiss}
              className="bg-white rounded-md inline-flex text-locali-text-secondary hover:text-locali-text-primary focus:outline-none focus:ring-2 focus:ring-locali-blue"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Bannière de mise à jour en haut de page
 */
function UpdateBanner({ notification, onDismiss, onApply, onSnooze }) {
  if (!notification) return null

  return (
    <div className="bg-gradient-to-r from-locali-blue-500 to-locali-blue-600 text-white">
      <div className="max-w-7xl mx-auto py-2 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg mr-2">📊</span>
            <p className="text-sm font-medium">
              Nouvelles données INSEE disponibles !
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onApply}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-medium py-1 px-3 rounded transition-colors"
            >
              🔄 Actualiser
            </button>
            <button
              onClick={() => onSnooze(4)}
              className="text-locali-blue-100 hover:text-white text-xs font-medium py-1 px-2 rounded transition-colors"
            >
              Plus tard
            </button>
            <button
              onClick={onDismiss}
              className="text-locali-blue-100 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Composant principal de notification de mise à jour
 */
export function UpdateNotification({ variant = 'toast', onUpdateApplied = null }) {
  const { 
    notification, 
    dismissNotification,
    hasNotification 
  } = useUpdateNotifications()

  const handleApply = () => {
    if (onUpdateApplied) {
      onUpdateApplied()
    }
    window.location.reload()
  }

  const handleSnooze = (hours) => {
    // Le hook gère déjà le snooze via le service
    dismissNotification()
  }

  const handleDismiss = () => {
    dismissNotification()
  }

  if (!hasNotification) return null

  if (variant === 'banner') {
    return (
      <UpdateBanner
        notification={notification}
        onDismiss={handleDismiss}
        onApply={handleApply}
        onSnooze={handleSnooze}
      />
    )
  }

  return (
    <UpdateToast
      notification={notification}
      onDismiss={handleDismiss}
      onApply={handleApply}
      onSnooze={handleSnooze}
    />
  )
}

/**
 * Indicateur de statut de mise à jour pour la barre d'état
 */
export function UpdateStatusIndicator() {
  const { 
    hasUpdateAvailable, 
    isUpdating, 
    lastCheckFormatted, 
    nextCheckFormatted 
  } = useUpdateNotifications()

  if (isUpdating) {
    return (
      <div className="flex items-center space-x-2 text-sm text-locali-blue">
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-locali-blue"></div>
        <span>Mise à jour en cours...</span>
      </div>
    )
  }

  if (hasUpdateAvailable) {
    return (
      <div className="flex items-center space-x-2 text-sm text-locali-green-light">
        <div className="w-3 h-3 bg-locali-green-light rounded-full animate-pulse"></div>
        <span>Mise à jour disponible</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-locali-green">
      <div className="w-3 h-3 bg-locali-green rounded-full"></div>
      <span title={`Prochaine vérification: ${nextCheckFormatted}`}>
        Données à jour
      </span>
    </div>
  )
}

/**
 * Panneau de contrôle des mises à jour pour les paramètres
 */
export function UpdateControlPanel() {
  const { 
    status, 
    start, 
    stop, 
    forceCheck, 
    isRunning, 
    lastCheckFormatted, 
    nextCheckFormatted,
    hasError 
  } = useUpdateNotifications()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-locali-text-primary mb-4">
        🔄 Mises à jour automatiques
      </h3>
      
      <div className="space-y-4">
        {/* Statut */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-locali-text-secondary">Statut:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-locali-green' : 'bg-locali-green-light/50'
            }`} />
            <span className="text-sm font-medium">
              {isRunning ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>

        {/* Dernière vérification */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-locali-text-secondary">Dernière vérification:</span>
          <span className="text-sm font-mono">{lastCheckFormatted}</span>
        </div>

        {/* Prochaine vérification */}
        {isRunning && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-locali-text-secondary">Prochaine vérification:</span>
            <span className="text-sm font-mono">{nextCheckFormatted}</span>
          </div>
        )}

        {/* Erreur */}
        {hasError && (
          <div className="bg-locali-purple/10 border border-locali-purple-dark rounded-md p-3">
            <div className="text-sm text-locali-purple-dark">
              ❌ Erreur: {status.error}
            </div>
          </div>
        )}

        {/* Contrôles */}
        <div className="flex space-x-2 pt-4 border-t">
          {!isRunning ? (
            <button
              onClick={start}
              className="flex-1 bg-locali-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-green-dark transition-colors"
            >
              ▶️ Démarrer
            </button>
          ) : (
            <button
              onClick={stop}
              className="flex-1 bg-locali-purple-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-purple transition-colors"
            >
              ⏹️ Arrêter
            </button>
          )}
          
          <button
            onClick={forceCheck}
            disabled={!isRunning}
            className="flex-1 bg-locali-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-button-hover disabled:bg-locali-green-light/50 disabled:cursor-not-allowed transition-colors"
          >
            🔍 Vérifier
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateNotification 