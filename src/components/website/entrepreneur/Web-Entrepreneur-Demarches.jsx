import React from 'react';
import { Link } from 'react-router-dom';

const WebEntrepreneurDemarches = () => {
  return (
    <section className="bg-locali-background py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-blue text-center mb-8 sm:mb-12">
          Facilitez vos démarches
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src="/assets/images/GlobalPages/Demarches-image.png"
              alt="Facilitez vos démarches"
              className="w-full max-w-md rounded-xl shadow-lg object-cover"
            />
          </div>
          {/* Texte + bouton */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
            <p className="font-poppins-regular text-locali-blue text-base sm:text-lg mb-6 md:mb-8 text-justify">
              On a beau avoir une idée brillante, sans méthode ni outils, elle reste au stade du rêve. Le Kit Entrepreneur vous permet d'avancer concrètement, étape par étape. Il vous fait gagner jusqu'à 50 % de temps sur la préparation de votre projet, tout en vous évitant les pièges classiques. Modèles de documents, checklists, conseils stratégiques : tout est pensé pour structurer votre démarche, rassurer vos partenaires et vous aider à passer du "j'ai un projet" au "j'ouvre bientôt". Parce qu'être bien préparé, c'est aussi une implantation réussie.
            </p>
            <div className="flex justify-center md:justify-end">
              <Link
                to="/abonnement"
                className="bg-locali-green hover:bg-locali-green-dark text-white px-6 py-3 rounded-lg font-poppins-medium text-base transition-all duration-300 ease-in-out"
              >
                Voir les abonnements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebEntrepreneurDemarches; 