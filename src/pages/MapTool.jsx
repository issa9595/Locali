import { useState } from 'react'
import Map, { NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const layers = [
  {
    title: 'Indice de criminalité',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Population',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Flux Piéton',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Logements',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
  },
]

function MapTool() {
  const [viewport, setViewport] = useState({
    longitude: -122.4194,
    latitude: 37.7749,
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
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        </div>
      </div>

      {/* Panneau flottant à gauche */}
      <div className="absolute left-8 top-16 z-20 w-[420px] max-w-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        {/* Logo et bouton exporter */}
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-2xl">F</div>
          <button className="bg-gray-100 px-4 py-2 rounded shadow text-sm font-medium">Exportez les données</button>
        </div>
        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Découvrez les concurrents autour de moi"
          className="w-full px-4 py-2 rounded bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
        />
        {/* Liste des couches */}
        <div className="flex flex-col gap-4">
          {layers.map((layer, idx) => (
            <button key={idx} className="flex items-center bg-gray-50 rounded shadow hover:shadow-md transition overflow-hidden">
              <img src={layer.image} alt="" className="w-20 h-16 object-cover" />
              <span className="ml-4 text-base font-medium">{layer.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MapTool
