import { Link } from 'react-router-dom'

function HomePage () {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-kallisto-bold mb-8 text-locali-text-primary'>Bienvenue sur Locali</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-kallisto-light mb-4 text-locali-text-primary'>Carte Interactive</h2>
          <p className='text-locali-text-secondary mb-4 font-poppins-regular'>
            Visualisez les entreprises par secteur d'activité et identifiez les opportunités d'implantation.
          </p>
          <Link
            to='/carte'
            className='inline-block bg-locali-blue hover:bg-locali-green text-white py-2 px-4 rounded font-poppins-medium transition-colors'
          >
            Explorer la carte
          </Link>
        </div>

        <div className='bg-white p-6 rounded-lg shadow border-2 border-locali-green-light'>
          <h2 className='text-xl font-kallisto-light mb-4 text-locali-green-dark'>🗺️ Carte Territoriale INSEE</h2>
          <p className='text-locali-text-secondary mb-4 font-poppins-regular'>
            Explorez les 34k communes françaises avec visualisations interactives, filtres avancés et analytics temps réel.
          </p>
          <Link
            to='/carte-territoriale'
            className='inline-block bg-locali-green hover:bg-locali-green-dark text-white py-2 px-4 rounded font-poppins-medium transition-colors'
          >
            Découvrir la carte territoriale
          </Link>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-kallisto-light mb-4 text-locali-text-primary'>Analyses Territoriales</h2>
          <p className='text-locali-text-secondary mb-4 font-poppins-regular'>
            Accédez à des données essentielles : démographie, criminalité, revenus, et plus encore.
          </p>
          <Link
            to='/analyses'
            className='inline-block bg-locali-blue hover:bg-locali-green text-white py-2 px-4 rounded font-poppins-medium transition-colors'
          >
            Voir les analyses
          </Link>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-kallisto-light mb-4 text-locali-text-primary'>Kit Entrepreneur</h2>
          <p className='text-locali-text-secondary mb-4 font-poppins-regular'>
            Ressources et outils pour accompagner votre projet d'implantation.
          </p>
          <Link
            to='/kit-entrepreneur'
            className='inline-block bg-locali-blue hover:bg-locali-green text-white py-2 px-4 rounded font-poppins-medium transition-colors'
          >
            Découvrir le kit
          </Link>
        </div>
      </div>

      {/* Section statistiques */}
      <div className='mt-12 bg-gradient-to-r from-locali-green-light/20 to-locali-purple/20 p-8 rounded-lg'>
        <h2 className='text-2xl font-kallisto-bold text-locali-text-primary mb-6'>Données Territoriales Locali</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='text-center'>
            <div className='text-3xl font-poppins-bold text-locali-green'>34 969</div>
            <div className='text-sm text-locali-text-secondary font-poppins-regular'>Communes INSEE</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-poppins-bold text-locali-blue'>67M</div>
            <div className='text-sm text-locali-text-secondary font-poppins-regular'>Population totale</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-poppins-bold text-locali-purple-dark'>551k</div>
            <div className='text-sm text-locali-text-secondary font-poppins-regular'>km² territoire</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-poppins-bold text-locali-green'>⚡</div>
            <div className='text-sm text-locali-text-secondary font-poppins-regular'>Temps réel</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
