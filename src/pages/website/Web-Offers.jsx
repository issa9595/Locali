import React, { useEffect } from 'react'
import { WebOffersHeroSection, WebOffersOffers, WebOffersIndispensable, WebOffersSubscribes, WebOffersContact } from '../../components/website/offers'

function WebOffers () {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <WebOffersHeroSection />
      <WebOffersOffers />
      <WebOffersIndispensable />
      <WebOffersSubscribes />
      <WebOffersContact />
    </div>
  )
}

export default WebOffers
