import { useState } from 'react'

function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const metrics = {
    revenue: 'Revenus médians',
    pedestrian: 'Flux piéton',
    businesses: 'Entreprises par secteur',
    crime: 'Indice de criminalité',
    population: 'Population et ménages'
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-kallisto-bold mb-6 text-locali-text-primary">Analyses Territoriales</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-kallisto-light mb-4 text-locali-text-primary">Métriques disponibles</h2>
          <div className="space-y-2">
            {Object.entries(metrics).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`w-full p-3 text-left rounded font-poppins-regular transition-colors ${
                  selectedMetric === key 
                    ? 'bg-locali-green/20 text-locali-green-dark border border-locali-green' 
                    : 'hover:bg-locali-purple/10 text-locali-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-kallisto-light mb-4 text-locali-text-primary">
            {metrics[selectedMetric]}
          </h2>
          <div className="h-64 flex items-center justify-center bg-locali-green-light/10 rounded border-2 border-dashed border-locali-green-light">
            {/* Ici viendra le composant de visualisation des données */}
            <p className="text-locali-text-secondary font-poppins-regular">Visualisation des données à venir</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage 