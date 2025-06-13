import React from 'react';
import { Link } from 'react-router-dom';

const WebEntrepreneurHeroSection = () => {
  return (
    <section
      className="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-8 flex items-center justify-center xl:justify-end"
      style={{
        backgroundImage: "url('/assets/images/GlobalPages/Kit-Entrepreneur-Herosection.png')"
      }}
    >
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/10 z-0" />
      <div className="relative z-10 container mx-auto flex justify-center xl:justify-end">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 max-w-lg shadow-xl w-full mx-auto xl:mx-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-blue mb-3 sm:mb-4 md:mb-5">
            Kit de l’entrepreneur
          </h1>
          <p className="font-poppins-regular text-locali-blue text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 text-justify">
            Le Kit Entrepreneur, c’est le meilleur ami de votre projet : une boîte à outils digitale avec des modèles, des guides et des conseils pratiques pour structurer, présenter et défendre votre projet d’implantation.
          </p>
          <div className="flex justify-end">
            <Link
              to="/connexion"
              className="bg-locali-green hover:bg-locali-green-dark text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-lg font-poppins-medium text-xs sm:text-sm md:text-base transition-all duration-300 ease-in-out"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebEntrepreneurHeroSection;