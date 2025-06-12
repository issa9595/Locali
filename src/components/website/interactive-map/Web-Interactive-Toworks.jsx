import React from 'react'

const WebInteractiveToworks = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 max-w-6xl">
        
        {/* Section Comment ça fonctionne */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-kallisto-bold text-locali-purple-dark mb-8 sm:mb-12 md:mb-16">
            Comment ça fonctionne ?
          </h2>
          
          {/* Les 3 étapes en ligne */}
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-4xl mx-auto">
            {/* Étape 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-kallisto-bold text-locali-green mb-2 sm:mb-3">
                1
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins-medium text-locali-purple max-w-40">
                Choisissez votre zone
              </p>
            </div>

            {/* Étape 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-kallisto-bold text-locali-green mb-2 sm:mb-3">
                2
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins-medium text-locali-purple max-w-40">
                Rentrez vos critères
              </p>
            </div>

            {/* Étape 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-kallisto-bold text-locali-green mb-2 sm:mb-3">
                3
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins-medium text-locali-purple max-w-40">
                Analysez vos données
              </p>
            </div>
          </div>
        </div>

        {/* Section Pourquoi l'utiliser */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-kallisto-bold text-locali-purple-dark mb-8 sm:mb-10 md:mb-12">
            Pourquoi l'utiliser ?
          </h2>
          
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-poppins-regular text-gray-800 leading-relaxed text-justify">
              Une implantation, ce n'est pas juste une adresse. C'est un environnement humain, économique, social. Grâce à nos analyses, vous 
              savez précisément qui vit, travaille, consomme et investit autour de votre future adresse. 86 % des porteurs de projet déclarent 
              manquer de données concrètes avant de s'implanter.* Résultat : des erreurs coûteuses, parfois irréversibles. En vous appuyant sur nos 
              indicateurs clés (revenu médian, âge moyen, taux de chômage, nombre de concurrents...), vous sécurisez votre projet et vous 
              construisez un business plan solide, crédible, chiffré.
            </p>
          </div>

          <button className="bg-locali-green hover:bg-locali-green-dark text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 lg:px-12 lg:py-5 rounded-lg font-poppins-medium text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
            Essayez Gratuitement
          </button>
        </div>
      </div>
    </section>
  )
}

export default WebInteractiveToworks 