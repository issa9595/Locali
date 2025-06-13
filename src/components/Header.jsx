import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isMobileAccountMenuOpen, setIsMobileAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef(null)

  // Fermer le menu compte si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false)
      }
    }
    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAccountMenuOpen])

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
              to="/kit-entrepreneur-page" 
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
            <Link 
              to="/notre-histoire" 
              className="text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              Notre Histoire
            </Link>
          </div>

          {/* Boutons à droite - Desktop seulement */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
            {/* Menu déroulant compte */}
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => setIsAccountMenuOpen((open) => !open)}
                className="bg-white border border-locali-purple-dark text-locali-purple-dark px-1 py-1 lg:px-2 xl:px-3 lg:py-2 rounded-md font-poppins-medium hover:bg-locali-purple/10 transition-colors text-xs xl:text-sm whitespace-nowrap"
              >
                Votre compte
              </button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                  <Link
                    to="/connexion"
                    className="block px-4 py-3 text-gray-800 hover:bg-locali-purple-light hover:text-locali-purple-dark font-poppins-medium rounded-t-lg transition-colors"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/inscription"
                    className="block px-4 py-3 text-gray-800 hover:bg-locali-purple-light hover:text-locali-purple-dark font-poppins-medium rounded-b-lg transition-colors"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/contact" 
              className="bg-locali-button-dark text-white px-1 py-1 lg:px-2 xl:px-3 lg:py-2 rounded-md font-poppins-medium hover:bg-locali-button-hover transition-colors text-xs xl:text-sm whitespace-nowrap inline-block"
            >
              Contact
            </Link>
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
                  to="/kit-entrepreneur-page" 
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
                <Link 
                  to="/notre-histoire" 
                  className="block text-locali-text-primary hover:text-locali-green font-poppins-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Notre Histoire
                </Link>
              </div>

              {/* Boutons mobile */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {/* Menu déroulant compte version mobile */}
                <div className="relative">
                  <button
                    onClick={() => setIsMobileAccountMenuOpen((open) => !open)}
                    className="w-full bg-white border border-locali-purple-dark text-locali-purple-dark px-4 py-3 rounded-md font-poppins-medium hover:bg-locali-purple/10 transition-colors"
                  >
                    Votre compte
                  </button>
                  {isMobileAccountMenuOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                      <Link
                        to="/connexion"
                        className="block px-4 py-3 text-gray-800 hover:bg-locali-purple-light hover:text-locali-purple-dark font-poppins-medium rounded-t-lg transition-colors"
                        onClick={() => { setIsMobileAccountMenuOpen(false); setIsMobileMenuOpen(false) }}
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/inscription"
                        className="block px-4 py-3 text-gray-800 hover:bg-locali-purple-light hover:text-locali-purple-dark font-poppins-medium rounded-b-lg transition-colors"
                        onClick={() => { setIsMobileAccountMenuOpen(false); setIsMobileMenuOpen(false) }}
                      >
                        S'inscrire
                      </Link>
                    </div>
                  )}
                </div>
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
