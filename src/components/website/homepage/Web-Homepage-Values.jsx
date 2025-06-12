import React from 'react'

const WebHomepageValues = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-kallisto-bold text-locali-blue mb-4">
            Nos valeurs
          </h2>
        </div>

        {/* Grille des valeurs */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Local */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 flex items-center justify-center">
                <img 
                  src="/assets/images/Icones/local-value.png"
                  alt="Local" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-kallisto-bold text-locali-blue">
              Local
            </h3>
          </div>

          {/* Fiabilité */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 flex items-center justify-center">
                <img 
                  src="/assets/images/Icones/Fiability-value.png" 
                  alt="Fiabilité" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-kallisto-bold text-locali-blue">
              Fiabilité
            </h3>
          </div>

          {/* Proximité */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 flex items-center justify-center">
                <img 
                  src="/assets/images/Icones/Proximity-value.png" 
                  alt="Proximité" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-kallisto-bold text-locali-blue">
              Proximité
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageValues 