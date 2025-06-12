import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-cover bg-center bg-no-repeat" 
             style={{
               backgroundImage: "linear-gradient(rgba(18, 4, 62, 0.6), rgba(18, 4, 62, 0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')"
             }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-kallisto-bold mb-6 leading-tight">
            Quelle stratégie suivre pour s'implanter efficacement sur un territoire ?
          </h1>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto font-poppins-regular">
            Vous êtes entrepreneur et ne savez pas par où commencer ? Découvrez comment 
            vous implanter facilement, au bon endroit et sans perdre de temps.
          </p>
          
          <button className="bg-locali-green hover:bg-locali-green-dark text-white font-poppins-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105">
            En savoir plus
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 