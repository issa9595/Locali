import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WebHomepageMap = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    setIsTransitioning(true)

    // Attendre que l'animation soit terminée avant de naviguer
    setTimeout(() => {
      navigate('/carte')
    }, 500) // Durée de l'animation
  }

  return (
    <section className='py-16 bg-locali-background'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-kallisto-bold text-locali-blue mb-4'>
            Carte interactive
          </h2>
          <p className='text-lg font-poppins-regular text-gray-700 max-w-4xl mx-auto'>
            Locali vous propose une solution complète pour analyser le territoire à travers une carte interactive
          </p>
        </div>

        {/* Zone pour la carte - Vous pouvez remplacer cette div par votre carte */}
        <div className='max-w-6xl mx-auto'>
          <div className='bg-gray-100 overflow-hidden border-2 border-gray-200'>
            <Link
              to='/carte'
              onClick={handleClick}
              className={`block h-96 bg-gray-200 hover:opacity-90 transition-all duration-500 relative group ${
                isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <img
                src='/assets/images/Map/map-image.png'
                alt='Carte interactive'
                className='w-full h-full object-cover'
              />
              {/* Overlay au survol */}
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center'>
                <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-poppins-medium text-xl'>
                  Cliquez pour explorer
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageMap
