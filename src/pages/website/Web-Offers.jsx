import React from 'react'
import { WebOffersHeroSection, WebOffersOffers, WebOffersIndispensable, WebOffersSubscribes, WebOffersContact } from '../../components/website/offers'

function WebOffers() {
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