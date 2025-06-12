import React from 'react'

const WebHomepageMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-kallisto-bold text-locali-blue mb-4">
            Carte interactive
          </h2>
          <p className="text-lg font-poppins-regular text-gray-700 max-w-4xl mx-auto">
            Locali vous propose une solution complète pour analyser le territoire à travers une carte interactive
          </p>
        </div>

        {/* Zone pour la carte - Vous pouvez remplacer cette div par votre carte */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              {/* Remplacez cette div par votre carte interactive */}
              <img 
                src="/src/assets/map-image.png" 
                alt="Carte interactive" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageMap 