import React, { useEffect } from 'react'
import { WebInteractiveHeroSection, WebInteractiveToworks, WebInteractiveAdvantage, WebInteractiveContact } from '../../components/website/interactive-map/'

function WebInteractiveMapPage () {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <WebInteractiveHeroSection />
      <WebInteractiveToworks />
      <WebInteractiveAdvantage />
      <WebInteractiveContact />
    </div>
  )
}

export default WebInteractiveMapPage
