import React from 'react'

export default function FiltersPanel ({ filterBy, setFilterBy, sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 sticky top-6'>
      <h3 className='font-semibold text-gray-900 mb-6'>Contrôles & Filtres</h3>

      <div className='space-y-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Type de filtre</label>
          <select
            value={filterBy.type}
            onChange={(e) => setFilterBy({ type: e.target.value, value: '' })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='none'>Aucun filtre</option>
            <option value='population'>Population minimale</option>
            <option value='name'>Nom de commune</option>
            <option value='department'>Code département</option>
          </select>
        </div>

        {filterBy.type !== 'none' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Valeur</label>
            <input
              type={filterBy.type === 'population' ? 'number' : 'text'}
              value={filterBy.value}
              onChange={(e) => setFilterBy({ ...filterBy, value: e.target.value })}
              placeholder={
                filterBy.type === 'population'
                  ? 'Ex: 10000'
                  : filterBy.type === 'name'
                    ? 'Ex: Paris'
                    : 'Ex: 75'
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        )}
      </div>

      <div className='space-y-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Trier par</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='nom'>Nom</option>
            <option value='population'>Population</option>
            <option value='surface'>Surface</option>
            <option value='density'>Densité</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Ordre</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='desc'>Décroissant</option>
            <option value='asc'>Croissant</option>
          </select>
        </div>
      </div>
    </div>
  )
}
