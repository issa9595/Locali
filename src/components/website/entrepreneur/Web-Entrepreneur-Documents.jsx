import React from 'react';

const documents = [
  'Modèle de business plan',
  'Checklist pour votre implantation',
  'Réussir son rendez-vous à la banque',
  'Votre bail commercial',
];

const WebEntrepreneurDocuments = () => {
  return (
    <section className="bg-locali-background py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-kallisto-bold text-locali-blue text-center mb-8 sm:mb-12">
          Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-locali-purple-light rounded-xl py-6 px-4 text-center font-poppins-regular text-locali-purple-dark text-base sm:text-lg shadow-sm"
            >
              {doc}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebEntrepreneurDocuments; 