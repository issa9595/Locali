import React from 'react'
import { Link } from 'react-router-dom'

const WebOffersIndispensable = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 bg-locali-background">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="bg-locali-purple-light rounded-[25px] border-2 border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-6 sm:mb-8 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-kallisto-bold text-locali-blue mb-3 sm:mb-4 md:mb-4">
              L'indispensable pour vos projets
            </h2>
          </div>

          {/* Contenu principal : Image + Texte */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-8 lg:gap-12 max-w-6xl mx-auto text-justify">
            {/* Image à gauche */}
            <div className="flex justify-center">
              <img 
                src="/assets/images/GlobalPages/Indispensable-image.png" 
                alt="Équipe au travail" 
                className="w-full h-64 sm:h-72 md:h-80 lg:h-[28rem] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Texte à droite */}
            <div className="space-y-4 sm:space-y-5 md:space-y-4">
              <p className="font-poppins-regular text-locali-blue leading-relaxed text-sm sm:text-base md:text-xs lg:text-sm xl:text-lg">
                En 2025, plus de 1,1 million d'entreprises ont été créées en 
                France. Cependant, près de 60 000 défaillances ont été 
                enregistrées sur la même période, soit une augmentation 
                de 14,8 % par rapport à l'année précédente*.
              </p>
              
              <p className="font-poppins-regular text-locali-blue leading-relaxed text-sm sm:text-base md:text-xs lg:text-sm xl:text-lg">
                Locali propose une solution complète pour aider les 
                entrepreneurs à sécuriser leur projet.
              </p>

              <p className="font-poppins-regular text-locali-blue leading-relaxed text-sm sm:text-base md:text-xs lg:text-sm xl:text-lg">
                Avec Locali, les entrepreneurs accèdent à des cartes 
                interactives, un kit pratique et une analyse territoriale 
                complète pour mieux comprendre leur environnement. Une 
                solution tout-en-un pour gagner du temps, réduire les 
                risques et faire les bons choix d'implantation, dès le départ 
                comme tout au long de leur parcours.
              </p>

              {/* Source */}
              <p className="font-poppins-light text-locali-blue text-xs sm:text-sm italic">
                *source : - Étude de la Banque de France
              </p>

              {/* Bouton */}
              <div className="pt-4 sm:pt-5 md:pt-4 text-right">
                <Link
                  to="/notre-histoire"
                  className="bg-locali-green hover:bg-locali-green-dark text-white px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-2 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-sm sm:text-base md:text-base"
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

export default WebOffersIndispensable 