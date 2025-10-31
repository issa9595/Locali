/**
 * Carte Territoriale Interactive - Visualisation des communes INSEE
 * Version simplifiée temporaire - En attente de résolution des problèmes react-map-gl
 * Module Locali - Version Stable
 */

import React, { useState } from 'react'
import { useZones } from '../features/territories/hooks/useTerritories.jsx'
import Toolbar from './carte/Toolbar.jsx'
import InfoAlert from './carte/InfoAlert.jsx'
import FiltersPanel from './carte/FiltersPanel.jsx'
import StatsSummary from './carte/StatsSummary.jsx'
import RemarkableCommunes from './carte/RemarkableCommunes.jsx'
import CommunesTable from './carte/CommunesTable.jsx'
import PaginationControls from './carte/PaginationControls.jsx'
import useFilteredCommunes from '../hooks/carte/useFilteredCommunes.js'
import useCommunesStats from '../hooks/carte/useCommunesStats.js'

// Palette potentielle (réservée pour future carte)
// const COLOR_SCHEMES = {}

export function CarteTerritoriale () {
//   const [colorScheme, setColorScheme] = useState('population')
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
    // totalCount,
    connectionStatus
  } = useZones({ limit: 50000 }) // Charger toutes les communes

  const filteredCommunes = useFilteredCommunes(communes, filterBy, sortBy, sortOrder)

  const stats = useCommunesStats(communes, filteredCommunes)

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
          <p className='text-gray-600'>Chargement des territoires Locali...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center bg-red-50'>
        <div className='text-center p-8'>
          <div className='text-red-600 text-xl mb-4'>Erreur de chargement</div>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button onClick={refresh} className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors'>Réessayer</button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Toolbar connectionStatus={connectionStatus} totalCommunes={stats.totalCommunes} onRefresh={refresh} />
      <div className='max-w-7xl mx-auto p-6'>
        <InfoAlert />
        <StatsSummary stats={stats} />
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          <div className='lg:col-span-1'>
            <FiltersPanel
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            <div className='bg-white rounded-lg shadow-lg p-6 mt-6'>
              <h4 className='font-medium text-gray-900 mb-3'>Résultats</h4>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Affichées:</span>
                  <span className='font-semibold'>{stats.filteredCount?.toLocaleString()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Population:</span>
                  <span className='font-semibold'>{Math.round((stats.filteredPopulation || 0) / 1000000 * 10) / 10}M</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>% du total:</span>
                  <span className='font-semibold'>{Math.round((stats.filteredCount || 0) / (stats.totalCommunes || 1) * 100)}%</span>
                </div>
              </div>
              <RemarkableCommunes stats={stats} />
            </div>
          </div>
          <div className='lg:col-span-3'>
            <CommunesTable filteredCommunes={filteredCommunes} displayLimit={displayLimit} />
            <PaginationControls displayLimit={displayLimit} setDisplayLimit={setDisplayLimit} total={filteredCommunes.length} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarteTerritoriale
