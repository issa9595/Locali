import React from 'react'

export default function Toolbar ({ connectionStatus, totalCommunes, onRefresh }) {
  return (
    <div className='bg-white shadow-sm border-b p-4'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <h1 className='text-xl font-bold text-gray-900'>Territoires INSEE - Analytics Avancés</h1>
          <div className='flex items-center space-x-2 text-sm'>
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'STABLE'
? 'bg-green-500'
              : connectionStatus === 'DISABLED' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            />
            <span className='text-gray-600'>
              {totalCommunes?.toLocaleString()} communes
            </span>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            onClick={onRefresh}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm'
          >
            Actualiser
          </button>
        </div>
      </div>
    </div>
  )
}
