import React from 'react'

const WebAboutForEntrepreneur = () => {
  return (
    <section className='bg-locali-background py-8 sm:py-12 md:py-16 lg:py-20'>
      <div className='container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 max-w-1xl'>
        {/* Titre principal */}
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-blue text-center mb-4 sm:mb-6'>
          Plus qu'un simple projet
        </h2>
        <p className='font-poppins-regular text-locali-blue text-base sm:text-lg text-center mb-10 max-w-3xl mx-auto'>
          Nous sommes une équipe d'étudiants, passionnés par l'entrepreneuriat et décidés à faire plus qu'un simple projet de fin d'études. Avec Locali, nous avons voulu répondre à une vraie problématique : comment aider concrètement ceux qui se lancent à s'implanter au bon endroit, avec les bonnes infos ?
        </p>

        {/* Section 1 : image à gauche, texte à droite */}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12'>
          <div className='w-full md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0'>
            <img
              src='/assets/images/GlobalPages/About-ForEntrepreneur.png'
              alt="Travail d'équipe"
              className='w-full max-w-md rounded-xl object-cover'
            />
          </div>
          <div className='w-full md:w-1/2'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-kallisto-bold text-locali-blue mb-4'>
              Par des entrepreneurs pour des entrepreneurs
            </h3>
            <p className='font-poppins-regular text-locali-blue text-base sm:text-lg text-justify'>
              L'idée de Locali est née lors de notre projet de fin d'année. L'entrepreneuriat, c'est un sujet qui nous inspire. Mais en discutant avec des porteurs de projet, on a vite réalisé que beaucoup se sentaient seuls, mal informés, et prenaient des décisions d'implantation à l'aveugle. Alors, on a décidé de créer un outil simple, utile et basé sur des données concrètes. Un outil pensé par des entrepreneurs, pour les entrepreneurs.
            </p>
          </div>
        </div>

        {/* Section 2 : texte à gauche, image à droite */}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12'>
          <div className='w-full md:w-1/2 order-2 md:order-1'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-kallisto-bold text-locali-blue mb-4'>
              Une vraie demande
            </h3>
            <p className='font-poppins-regular text-locali-blue text-base sm:text-lg text-justify'>
              On ne voulait pas créer un outil dans notre coin. On est allés sur le terrain, on a interrogé des entrepreneurs, des commerçants, des indépendants. Leurs retours ont été clairs : l'analyse territoriale est un manque réel. Beaucoup nous ont dit qu'ils auraient aimé avoir ce type d'outil avant de se lancer. Ce sont leurs besoins qui ont façonné Locali. Grâce à ces échanges, notre projet est devenu une solution concrète, en phase avec la réalité.
            </p>
          </div>
          <div className='w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end mb-6 md:mb-0'>
            <img
              src='/assets/images/GlobalPages/About-Sizao-team.png' // À remplacer par ton image
              alt="L'équipe Locali"
              className='w-full max-w-md rounded-xl object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebAboutForEntrepreneur
