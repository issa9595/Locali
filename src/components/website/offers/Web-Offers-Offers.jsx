import React from 'react'
import { Link } from 'react-router-dom'

const WebOffersOffers = () => {
  return (
    <section className="py-16 bg-locali-background">
      <div className="container mx-auto px-16 lg:px-32 text-justify">
        {/* Titre principal */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-kallisto-bold text-locali-blue mb-6">
            Nos offres
          </h2>
        </div>

        {/* Carte interactive - Gauche */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-kallisto-bold text-locali-purple-dark mb-6">
              Carte interactive
            </h3>
            <p className="font-poppins-regular text-gray-700 leading-relaxed text-lg">
              Notre carte interactive centralise des données fiables, constamment mises à jour, 
              pour vous offrir une vision précise de chaque territoire. Démographie, revenus, 
              infrastructures, concurrents... tout y est, pour que vous puissiez analyser un quartier 
              ou une ville en quelques clics.
            </p>
            <div>
              <Link
                to="/carte"
                className="bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-lg"
              >
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 font-poppins-regular">Image placeholder</span>
          </div>
        </div>

        {/* Analyses territoriales - Droite */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
          <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center order-2 md:order-1">
            <span className="text-gray-500 font-poppins-regular">Image placeholder</span>
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h3 className="text-3xl font-kallisto-bold text-locali-purple-dark mb-6">
              Analyses territoriales
            </h3>
            <p className="font-poppins-regular text-gray-700 leading-relaxed text-lg">
              Notre outil d'analyse territoriale croise des données essentielles pour évaluer le 
              potentiel d'un lieu. Zones de chalandise, dynamiques économiques, profils 
              d'habitants... vous obtenez une lecture claire du territoire pour prendre des 
              décisions stratégiques, basées sur du concret.
            </p>
            <div className="text-right">
              <Link
                to="/analyses"
                className="bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-lg"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Kit entrepreneur - Gauche */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-kallisto-bold text-locali-purple-dark mb-6">
              Kit entrepreneur
            </h3>
            <p className="font-poppins-regular text-gray-700 leading-relaxed text-lg">
              Notre kit entrepreneur regroupe tous les outils nécessaires pour structurer votre 
              projet : checklist de lancement, modèles de business plan, conseils 
              d'implantation... Tout est pensé pour vous faire gagner du temps et avancer 
              sereinement, étape par étape.
            </p>
            <div>
              <Link
                to="/kit-entrepreneur-page"
                className="bg-locali-purple hover:bg-locali-purple-dark text-white px-8 py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-lg"
              >
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 font-poppins-regular">Image placeholder</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebOffersOffers 