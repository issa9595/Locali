import React from 'react'

const Web_Interactive_Advantage = () => {
  const advantages = [
    {
      image: '/assets/images/Icones/ICONE-Loupe.png',
      alt: 'Analyse rapide',
      title: 'Une analyse rapide, sans compétences techniques'
    },
    {
      image: '/assets/images/Icones/ICONE-Valise.png',
      alt: 'Données utiles',
      title: 'Des données utiles tout au long de votre projet'
    },
    {
      image: '/assets/images/Icones/ICONE-Reseaux.png',
      alt: 'Données fiables',
      title: 'Des données fiables'
    },
    {
      image: '/assets/images/Icones/ICONE-Chrono.png',
      alt: 'Temps gagné',
      title: 'Moins de temps perdu'
    },
    {
      image: '/assets/images/Icones/ICONE-PC.png',
      alt: 'Outil visuel',
      title: 'Un outil visuel et intuitif, accessible à tous'
    }
  ]

  return (
    <section className='py-16 bg-locali-background'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <h2 className='text-4xl font-poppins-bold text-center text-locali-blue mb-16'>
          Avantages
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {advantages.map((advantage, index) => (
            <div key={index} className='text-center'>
              <div className='mb-6 flex justify-center'>
                <img
                  src={advantage.image}
                  alt={advantage.alt}
                  className='w-24 h-24 object-cover rounded-lg'
                />
              </div>
              <p className='text-sm font-poppins-regular text-gray-800 leading-relaxed text-center px-2'>
                {advantage.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Web_Interactive_Advantage
