import React from 'react'
import { useUpdateNotifications } from '../../hooks/useAutoUpdate.jsx'

export default function UpdateControlPanel () {
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
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-lg font-semibold text-locali-text-primary mb-4'>
        Mises à jour automatiques
      </h3>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-locali-text-secondary'>Statut:</span>
          <div className='flex items-center space-x-2'>
            <div className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-locali-green' : 'bg-locali-green-light/50'
            }`}
            />
            <span className='text-sm font-medium'>
              {isRunning ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-locali-text-secondary'>Dernière vérification:</span>
          <span className='text-sm font-mono'>{lastCheckFormatted}</span>
        </div>

        {isRunning && (
          <div className='flex items-center justify-between'>
            <span className='text-sm text-locali-text-secondary'>Prochaine vérification:</span>
            <span className='text-sm font-mono'>{nextCheckFormatted}</span>
          </div>
        )}

        {hasError && (
          <div className='bg-locali-purple/10 border border-locali-purple-dark rounded-md p-3'>
            <div className='text-sm text-locali-purple-dark'>
              Erreur: {status.error}
            </div>
          </div>
        )}

        <div className='flex space-x-2 pt-4 border-t'>
          {!isRunning
            ? (
              <button
                onClick={start}
                className='flex-1 bg-locali-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-green-dark transition-colors'
              >
                Démarrer
              </button>
              )
            : (
              <button
                onClick={stop}
                className='flex-1 bg-locali-purple-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-purple transition-colors'
              >
                Arrêter
              </button>
              )}

          <button
            onClick={forceCheck}
            disabled={!isRunning}
            className='flex-1 bg-locali-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-locali-button-hover disabled:bg-locali-green-light/50 disabled:cursor-not-allowed transition-colors'
          >
            Vérifier
          </button>
        </div>
      </div>
    </div>
  )
}
