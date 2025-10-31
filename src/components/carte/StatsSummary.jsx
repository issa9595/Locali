import React from 'react'

export default function StatsSummary ({ stats }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='text-3xl font-bold text-blue-600 mb-2'>
          {stats.totalCommunes?.toLocaleString()}
        </div>
        <div className='text-gray-600 text-sm'>Communes françaises</div>
        <div className='text-xs text-gray-500 mt-1'>Base INSEE complète</div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='text-3xl font-bold text-green-600 mb-2'>
          {Math.round((stats.totalPopulation || 0) / 1000000)}M
        </div>
        <div className='text-gray-600 text-sm'>Population totale</div>
        <div className='text-xs text-gray-500 mt-1'>
          {stats.filteredPopulation?.toLocaleString()} filtrée
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='text-3xl font-bold text-purple-600 mb-2'>
          {Math.round((stats.totalSurface || 0) / 100).toLocaleString()}
        </div>
        <div className='text-gray-600 text-sm'>km² territoire</div>
        <div className='text-xs text-gray-500 mt-1'>Surface française</div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='text-3xl font-bold text-orange-600 mb-2'>
          {stats.averageDensity}
        </div>
        <div className='text-gray-600 text-sm'>hab/km² moyen</div>
        <div className='text-xs text-gray-500 mt-1'>Densité nationale</div>
      </div>
    </div>
  )
}
