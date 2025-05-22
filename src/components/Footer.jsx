import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} Locali. Tous droits réservés.</p>
          </div>
          <div className="space-x-4">
            <a href="/mentions-legales" className="hover:text-gray-300">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-gray-300">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
