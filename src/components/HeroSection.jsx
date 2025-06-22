import React from 'react'

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-8"
      style={{
        backgroundImage: "linear-gradient(rgba(18, 4, 62, 0.6), rgba(18, 4, 62, 0.6)), url('/assets/images/GlobalPages/Herosection-Homepage.png')"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-2 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-kallisto-bold mb-4 sm:mb-6 leading-tight">
            Quelle stratégie suivre pour s'implanter efficacement sur un territoire ?
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto font-poppins-regular">
            Vous êtes entrepreneur et ne savez pas par où commencer ? Découvrez comment 
            vous implanter facilement, au bon endroit et sans perdre de temps.
          </p>
          
          <button className="bg-locali-green hover:bg-locali-green-dark text-white font-poppins-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 transform hover:scale-105">
            En savoir plus
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 