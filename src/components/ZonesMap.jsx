/**
 * Composant d'exemple utilisant le hook temps réel pour afficher les zones
 * Démontre l'intégration avec react-map-gl et les mises à jour automatiques
 */

import React, { useState, useCallback, useMemo } from 'react'
import Map, { Source, Layer } from 'react-map-gl'
import { useZonesRealtime } from '../hooks/useZonesRealtime'

export default function ZonesMap() {
  const [selectedZone, setSelectedZone] = useState(null)
  const [showPopulation, setShowPopulation] = useState(true)
  
  // Hook temps réel pour les zones
  const { 
    zones, 
    loading, 
    error, 
    connectionStatus, 
    refresh,
    totalCount 
  } = useZonesRealtime({
    autoFetch: true,
    onInsert: (zone) => {
      console.log('🆕 Nouvelle zone ajoutée:', zone.nom)
      // Optionnel : notification toast
    },
    onUpdate: (zone, oldZone) => {
      console.log('🔄 Zone mise à jour:', zone.nom)
      // Optionnel : notification des changements
    },
    onDelete: (zone) => {
      console.log('🗑️ Zone supprimée:', zone.nom)
    }
  })

  // Configuration de la carte
  const [viewState, setViewState] = useState({
    longitude: 2.213749, // Centré sur la France
    latitude: 46.227638,
    zoom: 6
  })

  // Préparation des données GeoJSON pour la carte
  const geoJsonData = useMemo(() => {
    if (!zones.length) return null

    return {
      type: 'FeatureCollection',
      features: zones
        .filter(zone => zone.geometrie) // Seulement les zones avec géométrie
        .map(zone => ({
          type: 'Feature',
          id: zone.id,
          properties: {
            id: zone.id,
            nom: zone.nom,
            code_insee: zone.code_insee,
            population: zone.population,
            surface: zone.surface
          },
          geometry: zone.geometrie
        }))
    }
  }, [zones])

  // Style des couches de la carte
  const layerStyle = {
    id: 'zones',
    type: 'fill',
    paint: {
      'fill-color': showPopulation
        ? [
            'interpolate',
            ['linear'],
            ['get', 'population'],
            0, '#f7f7f7',
            1000, '#cccccc',
            5000, '#969696',
            20000, '#636363',
            100000, '#252525'
          ]
        : '#3b82f6',
      'fill-opacity': 0.6,
      'fill-outline-color': '#1f2937'
    }
  }

  const layerStyleHover = {
    id: 'zones-hover',
    type: 'line',
    paint: {
      'line-color': '#f59e0b',
      'line-width': 3
    },
    filter: ['==', 'id', selectedZone?.id || '']
  }

  // Gestionnaire de clic sur la carte
  const handleMapClick = useCallback((event) => {
    const feature = event.features?.[0]
    
    if (feature && feature.layer.id === 'zones') {
      const zone = zones.find(z => z.id === feature.properties.id)
      setSelectedZone(zone)
    } else {
      setSelectedZone(null)
    }
  }, [zones])

  // Gestionnaire de survol
  const handleMapHover = useCallback((event) => {
    if (event.features?.length > 0) {
      const feature = event.features[0]
      const zone = zones.find(z => z.id === feature.properties.id)
      if (zone) {
        setSelectedZone(zone)
      }
    }
  }, [zones])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-locali-purple/10">
        <div className="text-center">
          <div className="text-locali-purple-dark text-xl mb-4">❌ Erreur de chargement</div>
          <p className="text-locali-text-secondary mb-4">{error}</p>
          <button 
            onClick={refresh}
            className="bg-locali-purple-dark text-white px-4 py-2 rounded hover:bg-locali-purple transition-colors"
          >
            🔄 Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Barre de statut */}
      <div className="bg-locali-blue text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Zones INSEE - Temps Réel</h1>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'SUBSCRIBED' ? 'bg-locali-green' : 
              connectionStatus === 'CONNECTING' ? 'bg-locali-green-light' : 'bg-locali-purple-dark'
            }`} />
            <span className="text-sm">
              {connectionStatus === 'SUBSCRIBED' ? 'Connecté' : 
               connectionStatus === 'CONNECTING' ? 'Connexion...' : 'Déconnecté'}
            </span>
          </div>

          {loading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              <span className="text-sm">Chargement...</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm">{totalCount} zones</span>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPopulation}
              onChange={(e) => setShowPopulation(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Colorer par population</span>
          </label>

          <button
            onClick={refresh}
            className="bg-locali-blue text-white px-3 py-1 rounded hover:bg-locali-button-hover text-sm transition-colors"
          >
            🔄 Actualiser
          </button>
        </div>
      </div>

      {/* Carte */}
      <div className="flex-1 relative">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onClick={handleMapClick}
          onMouseMove={handleMapHover}
          interactiveLayerIds={['zones']}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          {geoJsonData && (
            <Source id="zones-source" type="geojson" data={geoJsonData}>
              <Layer {...layerStyle} />
              <Layer {...layerStyleHover} />
            </Source>
          )}
        </Map>

        {/* Panel d'information */}
        {selectedZone && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-locali-text-primary">
                {selectedZone.nom}
              </h3>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-locali-text-secondary hover:text-locali-text-primary transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-locali-text-secondary">Code INSEE:</span>
                <span className="font-mono">{selectedZone.code_insee}</span>
              </div>

              {selectedZone.population && (
                <div className="flex justify-between">
                  <span className="text-locali-text-secondary">Population:</span>
                  <span className="font-semibold">
                    {selectedZone.population.toLocaleString()} hab.
                  </span>
                </div>
              )}

              {selectedZone.surface && (
                <div className="flex justify-between">
                  <span className="text-locali-text-secondary">Surface:</span>
                  <span>{selectedZone.surface.toFixed(1)} km²</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-locali-text-secondary">Dernière MAJ:</span>
                <span className="text-xs">
                  {new Date(selectedZone.derniere_mise_a_jour).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-locali-text-secondary">
                Mise à jour automatique en temps réel
              </div>
            </div>
          </div>
        )}

        {/* Légende pour la coloration par population */}
        {showPopulation && geoJsonData && (
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Population</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-locali-green-light/20 border" />
                <span>0 - 1k hab.</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-locali-green-light/40 border" />
                <span>1k - 5k hab.</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-locali-green-light/60 border" />
                <span>5k - 20k hab.</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-locali-green-light/80 border" />
                <span>20k - 100k hab.</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-locali-green border" />
                <span>100k+ hab.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 