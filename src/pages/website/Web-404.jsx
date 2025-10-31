import React from 'react'
import { Link } from 'react-router-dom'

const Web404 = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center bg-locali-background'>
      <h1 className='text-7xl font-kallisto-bold text-locali-purple-dark mb-4'>404</h1>
      <h2 className='text-2xl md:text-3xl font-kallisto-bold text-locali-purple-dark mb-2'>Page non trouvée</h2>
      <p className='text-gray-600 mb-8 text-center max-w-md'>Oups, la page que vous cherchez n'existe pas ou a été déplacée.</p>
      <Link
        to='/'
        className='bg-locali-purple-dark hover:bg-locali-purple text-white px-6 py-3 rounded-lg font-poppins-semibold transition-colors'
      >
        Retour à l'accueil
      </Link>
    </section>
  )
}

export default Web404
