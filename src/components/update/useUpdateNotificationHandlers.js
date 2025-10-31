export default function useUpdateNotificationHandlers (onUpdateApplied, dismissNotification) {
  const handleApply = () => {
    if (onUpdateApplied) {
      onUpdateApplied()
    }
    window.location.reload()
  }

  const handleSnooze = () => {
    dismissNotification()
  }

  const handleDismiss = () => {
    dismissNotification()
  }

  return { handleApply, handleSnooze, handleDismiss }
}
