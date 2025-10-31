import React from 'react'
import { Link } from 'react-router-dom'

const WebAboutObjectif = () => {
  return (
    <section className='bg-locali-background py-8 sm:py-12 md:py-16 lg:py-20'>
      <div className='container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 max-w-1xl'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-blue text-center mb-4 sm:mb-6'>
          Nos objectifs
        </h2>
        <p className='font-poppins-regular text-locali-blue text-base sm:text-lg text-justify mb-6'>
          Chez Locali, notre ambition est simple : accompagner les entrepreneurs dans la réussite de leur projet, dès les premières étapes. On veut leur faire gagner du temps, éviter les erreurs d'implantation, et surtout leur offrir des réponses claires, fiables et accessibles. Être à l'écoute, rester proches de nos utilisateurs, comprendre leurs besoins réels.
        </p>
        <div className='flex justify-center'>
          <Link
            to='/offres'
            className='bg-locali-green hover:bg-locali-green-dark text-white px-6 py-2 rounded-lg font-poppins-medium text-base transition-all duration-300 ease-in-out'
          >
            Découvrir nos offres
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WebAboutObjectif
