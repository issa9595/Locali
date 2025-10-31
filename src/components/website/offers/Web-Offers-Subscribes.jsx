import React from 'react'

const WebOffersSubscribes = () => {
  return (
    <section className='py-8 sm:py-12 md:py-16 lg:py-20 bg-locali-background'>
      <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
        {/* Titre principal */}
        <div className='text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-kallisto-bold text-locali-purple-dark'>
            Abonnements
          </h2>
        </div>

        {/* Grille des abonnements */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto'>

          {/* Abonnement Classique */}
          <div className='bg-white rounded-xl sm:rounded-2xl border-2 border-locali-purple-dark p-4 sm:p-6 md:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='text-center mb-4 sm:mb-6 md:mb-8'>
              <h3 className='text-lg sm:text-xl md:text-2xl font-kallisto-bold text-locali-purple-dark mb-2 sm:mb-4'>
                Classique
              </h3>
              <div className='text-3xl sm:text-4xl md:text-5xl font-kallisto-bold text-locali-purple-dark'>
                0€
              </div>
            </div>

            <div className='flex-1 space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8'>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accès à la carte interactive nationale
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accès aux données démographiques de base
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Consultation de 3 indicateurs clés
                </p>
              </div>
            </div>

            <button className='w-full bg-locali-green hover:bg-locali-green-dark text-white py-2 sm:py-3 md:py-4 rounded-lg font-poppins-medium text-sm sm:text-base transition-all duration-300 ease-in-out'>
              Choisir cette offre
            </button>
          </div>

          {/* Abonnement Premium */}
          <div className='bg-white rounded-xl sm:rounded-2xl border-2 border-locali-purple-dark p-4 sm:p-6 md:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='text-center mb-4 sm:mb-6 md:mb-8'>
              <h3 className='text-lg sm:text-xl md:text-2xl font-kallisto-bold text-locali-purple-dark mb-2 sm:mb-4'>
                Premium
              </h3>
              <div className='text-3xl sm:text-4xl md:text-5xl font-kallisto-bold text-locali-purple-dark'>
                99,99€
              </div>
            </div>

            <div className='flex-1 space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8'>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Carte interactive multi-critères
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accès aux données : entreprises, revenus
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Analyse de 10 zones
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Recommandations personnalisées
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Kit de lancement complet
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Alertes territoriales automatiques
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Tableau de bord interactif
                </p>
              </div>
            </div>

            <button className='w-full bg-locali-green hover:bg-locali-green-dark text-white py-2 sm:py-3 md:py-4 rounded-lg font-poppins-medium text-sm sm:text-base transition-all duration-300 ease-in-out'>
              Choisir cette offre
            </button>
          </div>

          {/* Abonnement Professionnel */}
          <div className='bg-white rounded-xl sm:rounded-2xl border-2 border-locali-purple-dark p-4 sm:p-6 md:p-8 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='text-center mb-4 sm:mb-6 md:mb-8'>
              <h3 className='text-lg sm:text-xl md:text-2xl font-kallisto-bold text-locali-purple-dark mb-2 sm:mb-4'>
                Professionnel
              </h3>
              <div className='text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-purple-dark'>
                sur devis
              </div>
            </div>

            <div className='flex-1 space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8'>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Toutes les fonctionnalités de l'offre Premium
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Analyse illimitée de zones
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Tableau de bord gamifié pour collectivités
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accès aux données exclusives (flux piéton, criminalité, zones à revitaliser...)
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accompagnement expert mensuel (RDV visio)
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Accès API & export de données
                </p>
              </div>
              <div className='flex items-start space-x-2 sm:space-x-3'>
                <div className='text-locali-green text-base sm:text-lg md:text-xl'>✓</div>
                <p className='font-poppins-regular text-locali-purple-dark text-sm sm:text-base'>
                  Rapports mensuels personnalisés
                </p>
              </div>
            </div>

            <button className='w-full bg-locali-green hover:bg-locali-green-dark text-white py-2 sm:py-3 md:py-4 rounded-lg font-poppins-medium text-sm sm:text-base transition-all duration-300 ease-in-out'>
              Demander un devis
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WebOffersSubscribes
