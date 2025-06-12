import React from 'react';

const Web_Analyses_HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/src/assets/Analyses-HeroImage.png")'
      }}
    >
      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        {/* Card blanche */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 max-w-lg shadow-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-purple-dark mb-3 sm:mb-4 md:mb-5">
            Analyses territoriales
          </h1>
          
          <div className="mb-4 sm:mb-5 md:mb-6">
            <p className="text-xs sm:text-sm md:text-base font-poppins-regular text-locali-blue leading-relaxed text-justify">
              Vous en avez marre des décisions à l'aveugle ? Nous aussi. C'est pourquoi on a regroupé pour vous les données qui comptent : Démographie, infrastructures, revenu médian, taux de criminalité et bien plus.
              Découvrez notre nouvel outils et analysez votre territoire efficacement, le tout en gagnant du temps               
            </p>
          </div>

          <div className="flex justify-end">
            <button className="bg-locali-green hover:bg-locali-green-dark text-white font-poppins-semibold px-8 py-3 rounded-lg transition-all duration-300 ease-in-out">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Web_Analyses_HeroSection; 