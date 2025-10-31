import React, { useEffect } from 'react'
import HeroSection from '../../components/HeroSection'
import { WebHomepageOffers, WebHomepageMap, WebHomepageStudy, WebHomepageTeam, WebHomepageValues, WebHomepageContact } from '../../components/website'

function WebHomepage () {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <HeroSection />
      <WebHomepageOffers />
      <WebHomepageMap />
      <WebHomepageStudy />
      <WebHomepageTeam />
      <WebHomepageValues />
      <WebHomepageContact />
    </div>
  )
}

export default WebHomepage
