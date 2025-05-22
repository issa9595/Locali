import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo à gauche */}
          <div>
            <button className="bg-gray-800 text-white font-bold px-6 py-2 rounded">Logo</button>
          </div>

          {/* Menu centré */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-8 text-gray-500 text-sm items-center">
              <a href="#" className="flex items-center space-x-1 hover:text-gray-800">
                <span className="inline-block">⦿</span>
                <span>Nos offres</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-gray-800">
                <span className="inline-block">⦿</span>
                <span>À propos</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-gray-800">
                <span className="inline-block">⦿</span>
                <span>Nos solutions</span>
              </a>
            </div>
          </div>

          {/* Boutons à droite */}
          <div className="flex space-x-3">
            <button className="border border-gray-800 text-gray-800 font-semibold px-5 py-2 rounded bg-white hover:bg-gray-100">Se connecter</button>
            <button className="bg-gray-800 text-white font-semibold px-5 py-2 rounded hover:bg-gray-700">Contact</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
