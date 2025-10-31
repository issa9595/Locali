import React from 'react'
import { useUpdateNotifications } from '../../hooks/useAutoUpdate.jsx'

export default function UpdateStatusIndicator () {
  const {
    hasUpdateAvailable,
    isUpdating,
    // lastCheckFormatted,
    nextCheckFormatted
  } = useUpdateNotifications()

  if (isUpdating) {
    return (
      <div className='flex items-center space-x-2 text-sm text-locali-blue'>
        <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-locali-blue' />
        <span>Mise à jour en cours...</span>
      </div>
    )
  }

  if (hasUpdateAvailable) {
    return (
      <div className='flex items-center space-x-2 text-sm text-locali-green-light'>
        <div className='w-3 h-3 bg-locali-green-light rounded-full animate-pulse' />
        <span>Mise à jour disponible</span>
      </div>
    )
  }

  return (
    <div className='flex items-center space-x-2 text-sm text-locali-green'>
      <div className='w-3 h-3 bg-locali-green rounded-full' />
      <span title={`Prochaine vérification: ${nextCheckFormatted}`}>
        Données à jour
      </span>
    </div>
  )
}
