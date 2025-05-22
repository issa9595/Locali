import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Bienvenue sur Locali</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive</h2>
          <p className="text-gray-600 mb-4">
            Visualisez les entreprises par secteur d'activité et identifiez les opportunités d'implantation.
          </p>
          <Link 
            to="/carte" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Explorer la carte
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Analyses Territoriales</h2>
          <p className="text-gray-600 mb-4">
            Accédez à des données essentielles : démographie, criminalité, revenus, et plus encore.
          </p>
          <Link 
            to="/analyses" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Voir les analyses
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Kit Entrepreneur</h2>
          <p className="text-gray-600 mb-4">
            Ressources et outils pour accompagner votre projet d'implantation.
          </p>
          <Link 
            to="/kit-entrepreneur" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Découvrir le kit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
