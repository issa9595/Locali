import React from 'react'
import { Link } from 'react-router-dom'

const WebInteractiveHeroSection = () => {
  return (
    <section 
      className="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat px-4 sm:px-8"
      style={{
        backgroundImage: `url('/assets/images/Map/Map-interactive.png')`
      }}
    >
      {/* Voile violet animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-locali-purple via-locali-purple-dark to-locali-purple opacity-70" style={{
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      {/* Card avec le contenu */}
      <div className="relative z-10 container mx-auto">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 max-w-lg shadow-xl">
          {/* Titre principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-purple-dark mb-3 sm:mb-4 md:mb-5">
            Locali.Map
          </h1>

          {/* Texte descriptif */}
          <p className="text-xs sm:text-sm md:text-base font-poppins-regular text-locali-blue leading-relaxed mb-4 sm:mb-5 md:mb-6 text-justify">
            Notre carte interactive est au cœur de la solution Locali. 
            Visualisez en un clin d'œil les entreprises existantes par 
            secteur d'activité, identifiez les zones saturées... ou au 
            contraire pleines de potentiel. Naviguez quartier par quartier, 
            filtrez par catégorie (commerces, services, restauration...) et 
            accédez à des données concrètes pour affiner votre stratégie.
          </p>

          {/* Bouton d'action */}
          <div className="flex justify-end">
            <Link
              to="/carte"
              className="bg-locali-green hover:bg-locali-green-dark text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-lg font-poppins-medium text-xs sm:text-sm md:text-base transition-all duration-300 ease-in-out"
            >
              Accéder à la carte interactive
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebInteractiveHeroSection 