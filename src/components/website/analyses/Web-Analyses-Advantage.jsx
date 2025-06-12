import React from 'react';

const Web_Analyses_Advantage = () => {
  const advantages = [
    {
      image: "/src/assets/ICONE-Loupe.png",
      alt: "Analyse rapide",
      title: "Une analyse rapide, sans compétences techniques"
    },
    {
      image: "/src/assets/ICONE-Valise.png", 
      alt: "Données utiles",
      title: "Des données utiles tout au long de votre projet"
    },
    {
      image: "/src/assets/ICONE-Reseaux.png",
      alt: "Données fiables", 
      title: "Des données fiables"
    },
    {
      image: "/src/assets/ICONE-Chrono.png",
      alt: "Temps gagné",
      title: "Moins de temps perdu"
    },
    {
      image: "/src/assets/ICONE-PC.png",
      alt: "Visualisations graphiques",
      title: "Visualisations graphiques"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Avantages */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins-bold text-locali-blue mb-12">
              Avantages
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={advantage.image} 
                      alt={advantage.alt}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <p className="text-sm font-poppins-regular text-locali-blue leading-relaxed text-center px-2">
                    {advantage.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Pourquoi l'utiliser */}
          <div className="text-center">
            <h2 className="text-4xl font-poppins-bold text-locali-blue mb-12">
              Pourquoi l'utiliser ?
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-xl font-poppins-semibold text-locali-purple-dark mb-4">
                  En 2025, s'implanter sans données, c'est risqué
                </h3>
                <p className="text-base font-poppins-regular text-gray-700 leading-relaxed text-justify">
                  Plus de 65 000 entreprises ont fait faillite en France cette année. Dans la majorité des cas, un mauvais choix d'implantation ou un manque de connaissance du territoire est en cause. Notre carte interactive vous aide à éviter ces erreurs et à maximiser vos chances de réussite dès le départ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Web_Analyses_Advantage; 