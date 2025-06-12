import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm relative">
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/assets/images/Logo/Locali-Logo-Header.png" 
                alt="Logo Locali" 
                className="w-24 h-16 sm:w-28 sm:h-20 object-contain"
              />
            </Link>
          </div>

          {/* Menu navigation centré */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8">
            <Link 
              to="/locali-map" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Locali.map
            </Link>
            <Link 
              to="/analyses" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Analyses territoriales
            </Link>
            <Link 
              to="/kit-entrepreneur" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Kit de l'entrepreneur
            </Link>
            <Link 
              to="/offres" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Nos offres
            </Link>
            <a 
              href="#" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Notre Histoire
            </a>
          </div>

          {/* Boutons à droite - Desktop seulement */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
            <button className="bg-white border border-locali-purple-dark text-locali-purple-dark px-1 py-1 lg:px-2 xl:px-3 lg:py-2 rounded-md font-poppins-medium hover:bg-locali-purple/10 transition-colors text-xs xl:text-sm whitespace-nowrap">
              Votre compte
            </button>
            <button className="bg-locali-button-dark text-white px-1 py-1 lg:px-2 xl:px-3 lg:py-2 rounded-md font-poppins-medium hover:bg-locali-button-hover transition-colors text-xs xl:text-sm whitespace-nowrap">
              Contact
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-locali-text-primary p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="px-4 py-6 space-y-6">
              {/* Navigation mobile */}
              <div className="space-y-4">
                <Link 
                  to="/locali-map" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Locali.map
                </Link>
                <Link 
                  to="/analyses" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analyses territoriales
                </Link>
                <Link 
                  to="/kit-entrepreneur" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kit de l'entrepreneur
                </Link>
                <Link 
                  to="/offres" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nos offres
                </Link>
                <a 
                  href="#" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Notre Histoire
                </a>
              </div>

              {/* Boutons mobile */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button 
                  className="w-full bg-white border border-locali-purple-dark text-locali-purple-dark px-4 py-3 rounded-md font-poppins-medium hover:bg-locali-purple/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Votre compte
                </button>
                <button 
                  className="w-full bg-locali-button-dark text-white px-4 py-3 rounded-md font-poppins-medium hover:bg-locali-button-hover transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
