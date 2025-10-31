import React from 'react'
import { Link } from 'react-router-dom'

const WebHomepageStudy = () => {
  return (
    <section className='py-16 bg-locali-background'>
      <div className='container mx-auto px-16 lg:px-32'>
        {/* Titre principal */}
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-5xl font-kallisto-bold text-locali-blue mb-6'>
            Votre étude de marché en quelques clics
          </h2>
        </div>

        {/* Section Concurrence - À gauche */}
        <div className='grid md:grid-cols-2 gap-16 mb-20'>
          <div className='space-y-8'>
            <h3 className='text-3xl font-kallisto-bold text-locali-purple-dark mb-6'>
              Concurrence
            </h3>
            <p className='font-poppins-regular text-gray-700 leading-relaxed mb-8 text-justify text-lg'>
              Locali vous permet de visualiser en temps réel les entreprises déjà implantées selon
              votre secteur d'activité. En quelques clics, accédez à leurs données essentielles (nom,
              secteur, taille, localisation) pour affiner votre étude de marché et organiser une veille
              concurrentielle efficace, directement depuis notre interface.
            </p>
            <div>
              <Link
                to='/offres'
                className='bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-md font-poppins-medium transition-all duration-300 ease-in-out text-lg'
              >
                En savoir plus
              </Link>
            </div>
          </div>
          <div /> {/* Espace vide à droite */}
        </div>

        {/* Section Démographie - À droite */}
        <div className='grid md:grid-cols-2 gap-16 mb-20'>
          <div /> {/* Espace vide à gauche */}
          <div className='space-y-8'>
            <h3 className='text-3xl font-kallisto-bold text-locali-purple-dark mb-6'>
              Démographie
            </h3>
            <p className='font-poppins-regular text-gray-700 leading-relaxed mb-8 text-justify text-lg'>
              Accédez à des informations clés sur la population d'un territoire : âge, revenus,
              densité, habitudes de consommation... Visualisez en un coup d'œil les zones les
              plus pertinentes pour votre activité et appuyez vos décisions avec des données
              fiables, idéales pour une étude de marché ou un ciblage précis.
            </p>
            <div className='text-right'>
              <Link
                to='/offres'
                className='bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-md font-poppins-medium transition-all duration-300 ease-in-out text-lg'
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Section Données personnalisées - À gauche */}
        <div className='grid md:grid-cols-2 gap-16'>
          <div className='space-y-8'>
            <h3 className='text-3xl font-kallisto-bold text-locali-purple-dark mb-6'>
              Données personnalisées
            </h3>
            <p className='font-poppins-regular text-gray-700 leading-relaxed mb-8 text-justify text-lg'>
              Parce que chaque projet est unique, Locali vous propose une offre personnalisée
              sur devis. Que vous ayez besoin d'un zoom sur un quartier précis, d'une analyse
              approfondie d'un secteur ou d'un accompagnement stratégique, nous adaptons
              nos outils et données à vos objectifs. Dites-nous ce dont vous avez besoin,
              on s'occupe du reste.
            </p>
            <div>
              <Link
                to='/offres'
                className='bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-md font-poppins-medium transition-all duration-300 ease-in-out text-lg'
              >
                En savoir plus
              </Link>
            </div>
          </div>
          <div /> {/* Espace vide à droite */}
        </div>
      </div>
    </section>
  )
}

export default WebHomepageStudy
