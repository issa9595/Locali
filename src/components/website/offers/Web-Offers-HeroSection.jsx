import React from 'react'
import { Link } from 'react-router-dom'

const WebOffersHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen bg-locali-background overflow-hidden bg-cover bg-center bg-no-repeat px-4 sm:px-8 flex items-center justify-center" >
      {/* Image de carte en arrière-plan */}
      <div className="absolute inset-0">
        <img 
          src="/assets/images/Map/World_map_with_points.png" 
          alt="Carte interactive" 
          className="w-full h-full object-cover"
        />
        {/* Voile transparent violet avec effets */}
        <div className="absolute inset-0 bg-gradient-to-br from-locali-purple via-locali-purple-dark to-locali-purple opacity-70" style={{animation: 'pulse 3s ease-in-out infinite'}}></div>
      </div>

      {/* Encadré Best-seller */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="bg-locali-blue rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl border border-locali-blue">
            {/* Titre Best-seller */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-kallisto-bold text-white mb-2">
                Best-seller
              </h1>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <p className="font-poppins-regular text-white leading-relaxed text-sm sm:text-base text-justify">
                Notre carte interactive est au cœur de la solution Locali. Elle permet de visualiser facilement les données clés d'un territoire : entreprises en place, données démographiques, zones d'activités, etc. Intuitive et pratique, elle vous aide à analyser votre environnement, à repérer les meilleures opportunités et à prendre des décisions rapides et éclairées pour votre implantation.
              </p>
            </div>

            {/* Bouton */}
            <div>
              <Link
                to="/carte"
                className="bg-locali-green hover:bg-locali-green-dark text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-sm sm:text-base w-full"
              >
                Accéder à la carte interactive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebOffersHeroSection 