import React from 'react'
import { Button } from '../../Buttons'

const WebHomepageOffers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-kallisto-bold text-locali-blue mb-4">
            Nos Offres
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Carte Interactive */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-locali-green max-w-sm mx-auto flex flex-col h-full">
            <div className="h-48 bg-gray-200">
              <img 
                src="/assets/images/GlobalPages/offers-image.png" 
                alt="Carte Interactive" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-kallisto-bold text-locali-blue mb-3">
                Carte Interactive
              </h3>
              <p className="font-poppins-regular text-gray-700 mb-6 text-left leading-relaxed flex-1">
                Visualisez les entreprises par secteur d'activité et identifiez les opportunités d'implantation.
              </p>
              <div className="text-right mt-auto">
                <button className="bg-locali-purple hover:bg-locali-purple-dark text-white px-6 py-2 rounded-md font-poppins-medium transition-all duration-300 ease-in-out">
                  Voir l'offre
                </button>
              </div>
            </div>
          </div>

          {/* Analyses Territoriales */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-locali-green max-w-sm mx-auto flex flex-col h-full">
            <div className="h-48 bg-gray-200">
              <img 
                src="/assets/images/GlobalPages/offers-image.png" 
                alt="Analyses Territoriales" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-kallisto-bold text-locali-blue mb-3">
                Analyses Territoriales
              </h3>
              <p className="font-poppins-regular text-gray-700 mb-6 text-left leading-relaxed flex-1">
                Accédez à des données essentielles : démographie, criminalité, revenus, et plus encore.
              </p>
              <div className="text-right mt-auto">
                <button className="bg-locali-purple hover:bg-locali-purple-dark text-white px-6 py-2 rounded-md font-poppins-medium transition-all duration-300 ease-in-out">
                  Voir l'offre
                </button>
              </div>
            </div>
          </div>

          {/* Kit Entrepreneurs */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-locali-green max-w-sm mx-auto flex flex-col h-full">
            <div className="h-48 bg-gray-200">
              <img
                src="/assets/images/GlobalPages/offers-image.png" 
                alt="Kit Entrepreneurs" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-kallisto-bold text-locali-blue mb-3">
                Kit Entrepreneurs
              </h3>
              <p className="font-poppins-regular text-gray-700 mb-6 text-left leading-relaxed flex-1">
                Ressources et outils pour accompagner votre projet d'implantation.
              </p>
              <div className="text-right mt-auto">
                <button className="bg-locali-purple hover:bg-locali-purple-dark text-white px-6 py-2 rounded-md font-poppins-medium transition-all duration-300 ease-in-out">
                  Voir l'offre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageOffers 