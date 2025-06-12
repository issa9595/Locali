/**
 * Carte Territoriale Interactive - Visualisation des communes INSEE
 * Version simplifiée temporaire - En attente de résolution des problèmes react-map-gl
 * Module Locali - Version Stable
 */

import React, { useState, useCallback, useMemo } from 'react'
import { useZones } from '../features/territories/hooks/useTerritories.jsx'
// import { UpdateStatusIndicator } from './UpdateNotification.jsx'

/**
 * Palette de couleurs pour la visualisation des données
 */
const COLOR_SCHEMES = {
  population: {
    name: 'Population',
    colors: ['#f7f7f7', '#cccccc', '#969696', '#636363', '#252525'],
    values: [0, 1000, 5000, 20000, 100000]
  },
  density: {
    name: 'Densité',
    colors: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
    values: [0, 50, 200, 500, 1000, 2000]
  },
  surface: {
    name: 'Surface',
    colors: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'],
    values: [0, 500, 1000, 2000, 5000, 10000]
  }
}

export function CarteTerritoriale() {
  // Configuration d'affichage
  const [colorScheme, setColorScheme] = useState('population')
  const [filterBy, setFilterBy] = useState({ type: 'none', value: '' })
  const [sortBy, setSortBy] = useState('population')
  const [sortOrder, setSortOrder] = useState('desc')
  const [displayLimit, setDisplayLimit] = useState(100) // Pagination

  // Chargement des données avec limite augmentée
  const { 
    communes, 
    loading, 
    error, 
    refresh,
    totalCount,
    connectionStatus 
  } = useZones({ limit: 50000 }) // Charger toutes les communes

  /**
   * Filtrage des communes selon les critères sélectionnés
   */
  const filteredCommunes = useMemo(() => {
    if (!communes.length) return []

    let filtered = communes

    if (filterBy.type !== 'none') {
      switch (filterBy.type) {
        case 'population':
          const minPop = parseInt(filterBy.value) || 0
          filtered = communes.filter(c => (c.population || 0) >= minPop)
          break
        case 'name':
          filtered = communes.filter(c => 
            c.nom.toLowerCase().includes(filterBy.value.toLowerCase())
          )
          break
        case 'department':
          filtered = communes.filter(c => 
            c.code_insee.startsWith(filterBy.value)
          )
          break
      }
    }

    // Tri
    return filtered.sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
        case 'population':
          aVal = a.population || 0
          bVal = b.population || 0
          break
        case 'surface':
          aVal = a.surface || 0
          bVal = b.surface || 0
          break
        case 'density':
          aVal = a.surface > 0 ? (a.population || 0) / a.surface * 100 : 0
          bVal = b.surface > 0 ? (b.population || 0) / b.surface * 100 : 0
          break
        default:
          aVal = a.nom
          bVal = b.nom
      }
      
      if (sortBy === 'nom') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      } else {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
    })
  }, [communes, filterBy, sortBy, sortOrder])

  /**
   * Statistiques calculées
   */
  const stats = useMemo(() => {
    if (!communes.length) return {}

    const communesWithData = communes.filter(c => c.population && c.surface)
    
    return {
      totalCommunes: communes.length,
      filteredCount: filteredCommunes.length,
      totalPopulation: communes.reduce((sum, c) => sum + (c.population || 0), 0),
      filteredPopulation: filteredCommunes.reduce((sum, c) => sum + (c.population || 0), 0),
      totalSurface: communes.reduce((sum, c) => sum + (c.surface || 0), 0),
      averageDensity: communesWithData.length > 0 
        ? Math.round(communesWithData.reduce((sum, c) => sum + (c.population / c.surface * 100), 0) / communesWithData.length)
        : 0,
      largestCommune: communes.reduce((max, c) => 
        (c.population || 0) > (max.population || 0) ? c : max, {}),
      smallestCommune: communes.reduce((min, c) => 
        (c.population || 0) < (min.population || 0) && c.population > 0 ? c : min, {population: Infinity})
    }
  }, [communes, filteredCommunes])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des territoires Locali...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <div className="text-red-600 text-xl mb-4">❌ Erreur de chargement</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            🔄 Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre d'outils supérieure */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-gray-900">
              🗺️ Territoires INSEE - Analytics Avancés
            </h1>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'STABLE' ? 'bg-green-500' : 
                connectionStatus === 'DISABLED' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-gray-600">
                {stats.totalCommunes?.toLocaleString()} communes
              </span>
            </div>
            
            {/* Indicateur de mise à jour automatique */}
            {/* <UpdateStatusIndicator /> */}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={refresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              🔄 Actualiser
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Message temporaire */}
        <div className="mb-6 bg-orange-100 border border-orange-300 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-orange-600 text-xl">🔧</div>
            <div>
              <h3 className="font-medium text-orange-900">Mode Analytics Avancés</h3>
              <p className="text-orange-800 text-sm mt-1">
                Version temporaire avec tableaux interactifs en attendant la résolution des problèmes de cartographie.
                Toutes les données et fonctionnalités d'analyse sont disponibles.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalCommunes?.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Communes françaises</div>
            <div className="text-xs text-gray-500 mt-1">Base INSEE complète</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round((stats.totalPopulation || 0) / 1000000)}M
            </div>
            <div className="text-gray-600 text-sm">Population totale</div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.filteredPopulation?.toLocaleString()} filtrée
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round((stats.totalSurface || 0) / 100).toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">km² territoire</div>
            <div className="text-xs text-gray-500 mt-1">Surface française</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.averageDensity}
            </div>
            <div className="text-gray-600 text-sm">hab/km² moyen</div>
            <div className="text-xs text-gray-500 mt-1">Densité nationale</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panneau de contrôles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-6">Contrôles & Filtres</h3>
              
              {/* Filtres */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔍 Type de filtre
                  </label>
                  <select
                    value={filterBy.type}
                    onChange={(e) => setFilterBy({ type: e.target.value, value: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">Aucun filtre</option>
                    <option value="population">Population minimale</option>
                    <option value="name">Nom de commune</option>
                    <option value="department">Code département</option>
                  </select>
                </div>

                {filterBy.type !== 'none' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valeur
                    </label>
                    <input
                      type={filterBy.type === 'population' ? 'number' : 'text'}
                      value={filterBy.value}
                      onChange={(e) => setFilterBy({ ...filterBy, value: e.target.value })}
                      placeholder={
                        filterBy.type === 'population' ? 'Ex: 10000' :
                        filterBy.type === 'name' ? 'Ex: Paris' :
                        'Ex: 75'
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Tri */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📊 Trier par
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="nom">Nom</option>
                    <option value="population">Population</option>
                    <option value="surface">Surface</option>
                    <option value="density">Densité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordre
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Décroissant</option>
                    <option value="asc">Croissant</option>
                  </select>
                </div>
              </div>

              {/* Statistiques filtrées */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">📈 Résultats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Affichées:</span>
                    <span className="font-semibold">{stats.filteredCount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-semibold">{Math.round((stats.filteredPopulation || 0) / 1000000 * 10) / 10}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">% du total:</span>
                    <span className="font-semibold">
                      {Math.round((stats.filteredCount || 0) / (stats.totalCommunes || 1) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Communes remarquables */}
              {stats.largestCommune?.nom && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-3">🏆 Remarquables</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-yellow-50 p-2 rounded">
                      <div className="font-medium text-yellow-900">Plus peuplée</div>
                      <div className="text-yellow-700">
                        {stats.largestCommune.nom}
                      </div>
                      <div className="text-yellow-600">
                        {stats.largestCommune.population?.toLocaleString()} hab.
                      </div>
                    </div>
                    {stats.smallestCommune?.nom && stats.smallestCommune.population !== Infinity && (
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="font-medium text-blue-900">Plus petite</div>
                        <div className="text-blue-700">
                          {stats.smallestCommune.nom}
                        </div>
                        <div className="text-blue-600">
                          {stats.smallestCommune.population?.toLocaleString()} hab.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tableau principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  📋 Communes INSEE {filterBy.type !== 'none' && `(filtrées)`}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {stats.filteredCount?.toLocaleString()} résultat(s) sur {stats.totalCommunes?.toLocaleString()}
                </p>
              </div>
              
              <div className="overflow-x-auto max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commune
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code INSEE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Population
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Surface (km²)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Densité
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordonnées
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCommunes.slice(0, displayLimit).map((commune) => {
                      const density = commune.surface > 0 ? Math.round((commune.population || 0) / commune.surface * 100) : 0
                      return (
                        <tr key={commune.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {commune.nom}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600 font-mono">
                              {commune.code_insee}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 font-semibold">
                              {commune.population?.toLocaleString() || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {commune.surface ? Math.round(commune.surface / 100) : 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 font-medium">
                              {density > 0 ? density : 'N/A'}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">hab/km²</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {commune.centre_lat && commune.centre_lng ? (
                              <div className="text-xs text-gray-600 font-mono space-y-1">
                                <div>{commune.centre_lat.toFixed(4)}</div>
                                <div>{commune.centre_lng.toFixed(4)}</div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Contrôles de pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Affichage de <span className="font-semibold">{Math.min(displayLimit, filteredCommunes.length)}</span> sur{' '}
                    <span className="font-semibold">{filteredCommunes.length.toLocaleString()}</span> résultat(s)
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Afficher:</label>
                      <select
                        value={displayLimit}
                        onChange={(e) => setDisplayLimit(parseInt(e.target.value))}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                        <option value={1000}>1000</option>
                        <option value={5000}>5000</option>
                      </select>
                      <span className="text-sm text-gray-600">résultats</span>
                    </div>
                    
                    {filteredCommunes.length > displayLimit && (
                      <button
                        onClick={() => setDisplayLimit(Math.min(displayLimit * 2, filteredCommunes.length))}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Charger plus
                      </button>
                    )}
                  </div>
                </div>
                
                {filteredCommunes.length > 1000 && (
                  <div className="mt-2 text-xs text-amber-600">
                    ⚡ Conseil : Utilisez les filtres pour réduire le nombre de résultats et améliorer les performances
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarteTerritoriale 