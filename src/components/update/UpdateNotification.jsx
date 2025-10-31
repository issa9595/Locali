import React from 'react'
import { useUpdateNotifications } from '../../hooks/useAutoUpdate.jsx'
import UpdateToast from './UpdateToast.jsx'
import UpdateBanner from './UpdateBanner.jsx'
import useUpdateNotificationHandlers from './useUpdateNotificationHandlers.js'

export default function UpdateNotification ({ variant = 'toast', onUpdateApplied = null }) {
  const { notification, dismissNotification, hasNotification } = useUpdateNotifications()
  const { handleApply, handleSnooze, handleDismiss } = useUpdateNotificationHandlers(onUpdateApplied, dismissNotification)

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
