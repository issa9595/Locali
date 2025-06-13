import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Web_Analyses_Data = () => {
  const [selectedMetric, setSelectedMetric] = useState('Revenus médians');
  const [selectedCity, setSelectedCity] = useState('Nantes');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const metrics = [
    'Revenus médians',
    'Flux piéton',
    'Entreprises par secteur',
    'Indice de criminalité',
    'Population et ménages'
  ];

  const cities = [
    'Nantes',
    'Rennes',
    'Angers',
    'Le Mans',
    'Saint-Nazaire',
    'Laval',
    'Cholet',
    'La Roche-sur-Yon'
  ];

  const premiumMetrics = ['Entreprises par secteur', 'Population et ménages'];

  const handleMetricClick = (metric) => {
    if (premiumMetrics.includes(metric)) {
      setShowPremiumModal(true);
    } else {
      setSelectedMetric(metric);
    }
  };

  // Données fictives basées sur Nantes
  const nantesData = {
    'Revenus médians': {
      title: 'Revenus médians par quartier - Nantes',
      data: [
        { quartier: 'Centre-ville', revenu: 28500, color: 'bg-green-500' },
        { quartier: 'Île de Nantes', revenu: 32800, color: 'bg-green-600' },
        { quartier: 'Hauts-Pavés', revenu: 35200, color: 'bg-green-700' },
        { quartier: 'Dervallières', revenu: 22100, color: 'bg-green-400' },
        { quartier: 'Bellevue', revenu: 19800, color: 'bg-green-300' },
        { quartier: 'Nantes Sud', revenu: 26900, color: 'bg-green-500' }
      ]
    },
    'Flux piéton': {
      title: 'Flux piéton moyen par zone - Nantes',
      data: [
        { zone: 'Place du Commerce', flux: 15420, color: 'bg-blue-500' },
        { zone: 'Rue Crébillon', flux: 12800, color: 'bg-blue-600' },
        { zone: 'Place Royale', flux: 9650, color: 'bg-blue-400' },
        { zone: 'Cours des 50 Otages', flux: 8900, color: 'bg-blue-400' },
        { zone: 'Place Graslin', flux: 7200, color: 'bg-blue-300' },
        { zone: 'Île Feydeau', flux: 4500, color: 'bg-blue-300' }
      ]
    },
    'Entreprises par secteur': {
      title: 'Répartition des entreprises - Nantes',
      data: [
        { secteur: 'Services', nombre: 8420, pourcentage: 35.2, color: 'bg-purple-500' },
        { secteur: 'Commerce', nombre: 6180, pourcentage: 25.8, color: 'bg-purple-600' },
        { secteur: 'Restauration', nombre: 3250, pourcentage: 13.6, color: 'bg-purple-400' },
        { secteur: 'Santé', nombre: 2890, pourcentage: 12.1, color: 'bg-purple-400' },
        { secteur: 'Industrie', nombre: 1980, pourcentage: 8.3, color: 'bg-purple-300' },
        { secteur: 'Autres', nombre: 1200, pourcentage: 5.0, color: 'bg-purple-300' }
      ]
    },
    'Indice de criminalité': {
      title: 'Indice de criminalité par 1000 habitants - Nantes',
      data: [
        { quartier: 'Centre-ville', indice: 12.8, niveau: 'Élevé', color: 'bg-red-500' },
        { quartier: 'Bellevue', indice: 8.2, niveau: 'Modéré', color: 'bg-orange-400' },
        { quartier: 'Dervallières', indice: 7.1, niveau: 'Modéré', color: 'bg-orange-400' },
        { quartier: 'Hauts-Pavés', indice: 4.3, niveau: 'Faible', color: 'bg-green-400' },
        { quartier: 'Île de Nantes', indice: 3.9, niveau: 'Faible', color: 'bg-green-500' },
        { quartier: 'Nantes Sud', indice: 5.6, niveau: 'Modéré', color: 'bg-orange-300' }
      ]
    },
    'Population et ménages': {
      title: 'Données démographiques - Nantes',
      data: [
        { indicateur: 'Population totale', valeur: '320 732', unite: 'habitants' },
        { indicateur: 'Nombre de ménages', valeur: '171 327', unite: 'ménages' },
        { indicateur: 'Taille moyenne ménage', valeur: '1.87', unite: 'pers/ménage' },
        { indicateur: 'Âge médian', valeur: '37.2', unite: 'ans' },
        { indicateur: 'Moins de 30 ans', valeur: '42.8', unite: '%' },
        { indicateur: 'Plus de 60 ans', valeur: '21.4', unite: '%' }
      ]
    }
  };

  return (
    <section className="py-16 bg-locali-background">
      <h2 className="text-4xl md:text-5xl font-kallisto-bold text-locali-blue text-center mb-8">
        Analyses territoriales
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-locali-purple-light rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Métriques disponibles - Colonne gauche */}
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-poppins-bold text-locali-purple-dark mb-8">
                  Données disponibles
                </h3>
                <div className="space-y-3">
                  {metrics.map((metric, index) => (
                    <button
                      key={index}
                      onClick={() => handleMetricClick(metric)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 font-poppins-medium relative ${
                        selectedMetric === metric
                          ? 'bg-white text-gray-800 shadow-md'
                          : premiumMetrics.includes(metric)
                          ? 'bg-white bg-opacity-50 text-gray-500 hover:bg-white hover:bg-opacity-70'
                          : 'bg-white bg-opacity-70 text-gray-700 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <span className={premiumMetrics.includes(metric) ? 'opacity-60' : ''}>
                        {metric}
                      </span>
                      {premiumMetrics.includes(metric) && (
                        <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-poppins-semibold">
                          Premium
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {/* Bouton "Plus de données" */}
                <div className="mt-8">
                  <Link
                    to="/abonnement"
                    className="bg-locali-purple-dark text-white px-4 py-3 rounded-xl font-poppins-semibold hover:bg-purple-800 transition-colors"
                  >
                    Plus de données
                  </Link>
                </div>
              </div>

              {/* Visualisation des données - Colonne droite */}
              <div>
                <div className="bg-white rounded-xl p-4 mb-4">
                  <label className="block text-gray-600 font-poppins-regular text-sm mb-2">
                    Sélectionnez votre secteur
                  </label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg font-poppins-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-locali-purple focus:border-transparent"
                  >
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-white rounded-xl p-6 h-96 overflow-y-auto">
                  <h4 className="text-lg font-poppins-semibold text-locali-blue mb-4">
                    {selectedCity === 'Nantes' ? nantesData[selectedMetric]?.title : `${selectedMetric} - ${selectedCity}`}
                  </h4>
                  
                  {selectedCity !== 'Nantes' && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-poppins-regular">
                        Données pour {selectedCity} en cours de développement
                      </p>
                      <p className="text-gray-400 font-poppins-light text-sm mt-2">
                        Seules les données de Nantes sont actuellement disponibles
                      </p>
                    </div>
                  )}
                  
                  {/* Affichage conditionnel selon le type de données - seulement pour Nantes */}
                  {selectedCity === 'Nantes' && selectedMetric === 'Revenus médians' && (
                    <div className="space-y-3">
                      {nantesData[selectedMetric].data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                            <span className="font-poppins-medium text-gray-700">{item.quartier}</span>
                          </div>
                          <span className="font-poppins-semibold text-locali-green">
                            {item.revenu.toLocaleString()}€
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCity === 'Nantes' && selectedMetric === 'Flux piéton' && (
                    <div className="space-y-3">
                      {nantesData[selectedMetric].data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                            <span className="font-poppins-medium text-gray-700">{item.zone}</span>
                          </div>
                          <span className="font-poppins-semibold text-blue-600">
                            {item.flux.toLocaleString()} pers/jour
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCity === 'Nantes' && selectedMetric === 'Entreprises par secteur' && (
                    <div className="space-y-3">
                      {nantesData[selectedMetric].data.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                              <span className="font-poppins-medium text-gray-700">{item.secteur}</span>
                            </div>
                            <span className="font-poppins-semibold text-purple-600">
                              {item.nombre.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{width: `${item.pourcentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 font-poppins-regular">
                            {item.pourcentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCity === 'Nantes' && selectedMetric === 'Indice de criminalité' && (
                    <div className="space-y-3">
                      {nantesData[selectedMetric].data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                            <span className="font-poppins-medium text-gray-700">{item.quartier}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-poppins-semibold text-gray-800">
                              {item.indice}/1000
                            </div>
                            <div className="text-sm font-poppins-regular text-gray-500">
                              {item.niveau}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCity === 'Nantes' && selectedMetric === 'Population et ménages' && (
                    <div className="space-y-3">
                      {nantesData[selectedMetric].data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-poppins-medium text-gray-700">{item.indicateur}</span>
                          <span className="font-poppins-semibold text-locali-blue">
                            {item.valeur} {item.unite}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Premium */}
      {showPremiumModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-poppins-bold text-locali-blue mb-2">
                  Contenu Premium
                </h3>
                <p className="text-gray-600 font-poppins-regular">
                  Accédez à toutes les données avancées avec un abonnement Premium
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-locali-purple to-locali-purple-dark rounded-xl p-6 text-white">
                  <h4 className="text-xl font-poppins-bold mb-2">Plan Premium</h4>
                  <div className="text-3xl font-poppins-bold mb-2">29€<span className="text-lg font-poppins-regular">/mois</span></div>
                  <ul className="text-sm space-y-2 text-left">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Toutes les métriques disponibles
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Données en temps réel
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Export des rapports
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Support prioritaire
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-locali-green hover:bg-locali-green-dark text-white py-3 px-6 rounded-xl font-poppins-semibold transition-colors">
                  Se connecter
                </button>
                <button 
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-poppins-medium transition-colors"
                >
                  Continuer en gratuit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Web_Analyses_Data; 