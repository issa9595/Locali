import { useState } from 'react'
import Map, { NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import ExpandableLayer from '../components/ExpandableLayer'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const layers = [
  {
    title: 'Indice de criminalité',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Analyse des données de criminalité par quartier',
    metrics: [
      { label: 'Vols', value: '12.3%' },
      { label: 'Agressions', value: '8.7%' },
      { label: 'Cambriolages', value: '5.2%' }
    ]
  },
  {
    title: 'Population',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Données démographiques de la ville',
    metrics: [
      { label: 'Population totale', value: '318,808' },
      { label: 'Densité', value: '4,712/km²' },
      { label: 'Croissance', value: '+1.2%' }
    ]
  },
  {
    title: 'Flux Piéton',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Analyse des mouvements piétons',
    metrics: [
      { label: 'Passages/jour', value: '45,000' },
      { label: 'Heures de pointe', value: '8h-9h, 17h-18h' },
      { label: 'Zones les plus fréquentées', value: 'Centre-ville' }
    ]
  },
  {
    title: 'Logements',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    description: 'Statistiques immobilières',
    metrics: [
      { label: 'Prix moyen', value: '3,200€/m²' },
      { label: 'Taux de vacance', value: '4.5%' },
      { label: 'Nouveaux logements', value: '1,200/an' }
    ]
  },
]

function MapTool() {
  const [viewport, setViewport] = useState({
    longitude: -1.5536,
    latitude: 47.2184,
    zoom: 12,
  })

  return (
    <div className="relative w-full h-screen">
      {/* Carte MapLibre */}
      <Map
        initialViewState={viewport}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`}
        style={{ width: '100vw', height: '100vh' }}
      >
        <NavigationControl position="bottom-right" />
      </Map>

      {/* Avatar utilisateur en haut à droite */}
      <div className="absolute top-6 right-8 z-20">
        <div className="w-10 h-10 rounded-full bg-locali-purple/20 flex items-center justify-center shadow border border-locali-purple">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-locali-purple-dark">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        </div>
      </div>

      {/* Panneau flottant à gauche */}
      <div className="absolute left-8 top-16 z-20 w-[420px] max-w-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {/* Logo et bouton exporter */}
        <div className="flex justify-between items-center mb-2">
          <div className="font-kallisto-bold text-2xl text-locali-blue">L</div>
          <button className="bg-locali-green hover:bg-locali-green-dark px-4 py-2 rounded shadow text-sm font-poppins-medium text-white transition-colors">Exportez les données</button>
        </div>
        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Découvrez les concurrents autour de moi"
          className="w-full px-4 py-2 rounded bg-locali-purple/5 border border-locali-border-light focus:outline-none focus:ring-2 focus:ring-locali-green/50 focus:border-locali-green mb-2 font-poppins-regular placeholder-locali-text-secondary"
        />
        {/* Liste des couches */}
        <div className="flex flex-col gap-4">
          {layers.map((layer, idx) => (
            <ExpandableLayer key={idx} title={layer.title} image={layer.image}>
              <div className="space-y-4">
                <p className="text-locali-text-secondary font-poppins-regular">{layer.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {layer.metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} className="bg-locali-green-light/10 p-3 rounded shadow-sm border border-locali-border-light">
                      <div className="text-sm text-locali-text-secondary font-poppins-light">{metric.label}</div>
                      <div className="text-lg font-poppins-semibold text-locali-text-primary">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableLayer>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MapTool
