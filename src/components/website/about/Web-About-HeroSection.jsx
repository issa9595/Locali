import React from 'react';

const WebAboutHeroSection = () => {
  return (
    <section
      className="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-8"
      style={{
        backgroundImage: "url('/assets/images/GlobalPages/About-HeroSection.png')"
      }}
    >
      {/* Overlay optionnel pour lisibilité */}
      {/* <div className="absolute inset-0 bg-black/10 z-0" /> */}
      {/* Contenu éventuel à ajouter ici */}
    </section>
  );
};

export default WebAboutHeroSection; 