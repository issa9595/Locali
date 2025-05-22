function EntrepreneurKit() {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kit de Lancement Entrepreneur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{resource.title}</h2>
              {resource.premium && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  Premium
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <button
              className={`w-full py-2 px-4 rounded ${
                resource.premium
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
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