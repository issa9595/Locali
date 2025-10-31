import React, { useEffect } from 'react'
import { WebSubscriptionSubs } from '../../components/website/subscription'

const WebSubscriptionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <WebSubscriptionSubs />
}

export default WebSubscriptionPage
