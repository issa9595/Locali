import React from 'react'

const WebOffersSubscribes = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        {/* Titre principal */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-kallisto-bold text-locali-purple-dark">
            Abonnements
          </h2>
        </div>

        {/* Grille des abonnements */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Abonnement Classique */}
          <div className="bg-white rounded-2xl border-2 border-locali-purple-dark p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-kallisto-bold text-locali-purple-dark mb-4">
                Classique
              </h3>
              <div className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-kallisto-bold text-locali-purple-dark">
                0€
              </div>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 mb-6 md:mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accès à la carte interactive nationale
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accès aux données démographiques de base
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Consultation de 3 indicateurs clés
                </p>
              </div>
            </div>

            <button className="w-full bg-locali-green hover:bg-locali-green-dark text-white py-3 sm:py-4 md:py-3 lg:py-4 rounded-lg font-poppins-medium text-sm sm:text-base md:text-sm lg:text-base transition-all duration-300 ease-in-out">
              Choisir cette offre
            </button>
          </div>

          {/* Abonnement Premium */}
          <div className="bg-white rounded-2xl border-2 border-locali-purple-dark p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-kallisto-bold text-locali-purple-dark mb-4">
                Premium
              </h3>
              <div className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-kallisto-bold text-locali-purple-dark">
                99,99€
              </div>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 mb-6 md:mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Carte interactive multi-critères
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accès aux données : entreprises, revenus
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Analyse de 10 zones
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Recommandations personnalisées
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Kit de lancement complet
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Alertes territoriales automatiques
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Tableau de bord interactif
                </p>
              </div>
            </div>

            <button className="w-full bg-locali-green hover:bg-locali-green-dark text-white py-3 sm:py-4 md:py-3 lg:py-4 rounded-lg font-poppins-medium text-sm sm:text-base md:text-sm lg:text-base transition-all duration-300 ease-in-out">
              Choisir cette offre
            </button>
          </div>

          {/* Abonnement Professionnel */}
          <div className="bg-white rounded-2xl border-2 border-locali-purple-dark p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-kallisto-bold text-locali-purple-dark mb-4">
                Professionnel
              </h3>
              <div className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-kallisto-bold text-locali-purple-dark">
                sur devis
              </div>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4 mb-6 md:mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Toutes les fonctionnalités de l'offre Premium
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Analyse illimitée de zones
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Tableau de bord gamifié pour collectivités
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accès aux données exclusives (flux piéton, criminalité, zones à revitaliser...)
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accompagnement expert mensuel (RDV visio)
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Accès API & export de données
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-locali-green text-lg sm:text-xl">✓</div>
                <p className="font-poppins-regular text-locali-purple-dark text-sm sm:text-base md:text-sm lg:text-base">
                  Rapports mensuels personnalisés
                </p>
              </div>
            </div>

            <button className="w-full bg-locali-green hover:bg-locali-green-dark text-white py-3 sm:py-4 md:py-3 lg:py-4 rounded-lg font-poppins-medium text-sm sm:text-base md:text-sm lg:text-base transition-all duration-300 ease-in-out">
              Demander un devis
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WebOffersSubscribes 