import React from 'react'

const WebHomepageTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-16 lg:px-32">
        <div className="bg-locali-purple-light rounded-[25px] border-2 border-gray-300 shadow-lg p-8 md:p-12 max-w-7xl mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-kallisto-bold text-locali-blue mb-6">
            Notre équipe
          </h2>
        </div>

        {/* Contenu principal : Image + Texte */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image de l'équipe à gauche */}
          <div className="flex justify-center">
            <img 
              src="/src/assets/team-image.png" 
              alt="Notre équipe" 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Texte à droite */}
          <div className="space-y-6">
            <p className="font-poppins-regular text-locali-blue leading-relaxed text-xl text-justify">
              Nous sommes des étudiants qui avons choisi de créer un projet concret pour notre fin d'année. L'entrepreneuriat est un sujet qui nous touche, alors nous nous sommes demandé : comment aider vraiment ceux qui se lancent ?
            </p>
            
            <p className="font-poppins-regular text-locali-blue leading-relaxed text-xl text-justify">
              L'idée de l'analyse territoriale est venue comme une évidence. Avec Locali, nous voulons proposer un outil utile, simple et pensé pour les entrepreneurs.
            </p>

            {/* Bouton */}
            <div className="pt-6 text-right">
              <button className="bg-locali-green hover:bg-locali-green-dark text-white px-8 py-3 rounded-md font-poppins-medium transition-all duration-300 ease-in-out text-lg">
                Nous connaître
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default WebHomepageTeam 