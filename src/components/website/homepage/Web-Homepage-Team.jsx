import React from 'react'
import { Link } from 'react-router-dom'

const WebHomepageTeam = () => {
  return (
    <section className='py-8 md:py-16 bg-locali-background'>
      <div className='container mx-auto px-4 md:px-16 lg:px-32'>
        <div className='bg-locali-purple-light rounded-[25px] border-2 border-gray-300 shadow-lg p-4 md:p-8 lg:p-12 max-w-7xl mx-auto'>
          {/* Titre principal */}
          <div className='text-center mb-6 md:mb-10'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-kallisto-bold text-locali-blue mb-4 md:mb-6'>
              Notre équipe
            </h2>
          </div>

          {/* Contenu principal : Image + Texte */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-12 items-start max-w-6xl mx-auto'>
            {/* Image de l'équipe */}
            <div className='flex justify-center'>
              <img
                src='/assets/images/GlobalPages/team-image.png'
                alt='Notre équipe'
                className='w-full h-auto object-cover rounded-lg shadow-lg max-w-md md:max-w-lg mx-auto'
              />
            </div>

            {/* Texte */}
            <div className='space-y-4 md:space-y-6'>
              <p className='font-poppins-regular text-locali-blue leading-relaxed text-sm md:text-base lg:text-xl text-justify'>
                Nous sommes des étudiants qui avons choisi de créer un projet concret pour notre fin d'année. L'entrepreneuriat est un sujet qui nous touche, alors nous nous sommes demandé : comment aider vraiment ceux qui se lancent ?
              </p>

              <p className='font-poppins-regular text-locali-blue leading-relaxed text-sm md:text-base lg:text-xl text-justify'>
                L'idée de l'analyse territoriale est venue comme une évidence. Avec Locali, nous voulons proposer un outil utile, simple et pensé pour les entrepreneurs.
              </p>

              {/* Bouton */}
              <div className='pt-4 md:pt-6 text-center lg:text-right'>
                <Link
                  to='/notre-histoire'
                  className='w-full lg:w-auto bg-locali-green hover:bg-locali-green-dark text-white px-6 md:px-8 py-3 rounded-md font-poppins-medium transition-all duration-300 ease-in-out text-base md:text-lg'
                >
                  Nous connaître
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageTeam
