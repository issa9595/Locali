function EntrepreneurKit () {
  const resources = [
    {
      title: 'Étude de marché simplifiée',
      description: 'Guide étape par étape pour réaliser votre étude de marché',
      premium: false
    },
    {
      title: 'Conseils personnalisés',
      description: 'Recevez des conseils adaptés à votre projet',
      premium: true
    },
    {
      title: 'Modèles de documents',
      description: 'Templates pour business plan, prévisions financières, etc.',
      premium: false
    },
    {
      title: 'Analyse de la concurrence',
      description: 'Outils pour analyser votre marché et vos concurrents',
      premium: true
    }
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-kallisto-bold mb-6 text-locali-text-primary'>Kit de Lancement Entrepreneur</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {resources.map((resource, index) => (
          <div key={index} className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-start mb-4'>
              <h2 className='text-xl font-kallisto-light text-locali-text-primary'>{resource.title}</h2>
              {resource.premium && (
                <span className='bg-locali-green-light text-locali-green-dark text-xs px-2 py-1 rounded font-poppins-medium'>
                  Premium
                </span>
              )}
            </div>
            <p className='text-locali-text-secondary mb-4 font-poppins-regular'>{resource.description}</p>
            <button
              className={`w-full py-2 px-4 rounded font-poppins-medium transition-colors ${
                resource.premium
                  ? 'bg-locali-green hover:bg-locali-green-dark text-white'
                  : 'bg-locali-blue hover:bg-locali-green text-white'
              }`}
            >
              {resource.premium ? 'Passer à Premium' : 'Accéder'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EntrepreneurKit
