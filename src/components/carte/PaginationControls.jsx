import React from 'react'

export default function PaginationControls ({ displayLimit, setDisplayLimit, total }) {
  return (
    <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-600'>
          Affichage de <span className='font-semibold'>{Math.min(displayLimit, total)}</span> sur{' '}
          <span className='font-semibold'>{total.toLocaleString()}</span> résultat(s)
        </div>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <label className='text-sm text-gray-600'>Afficher:</label>
            <select
              value={displayLimit}
              onChange={(e) => setDisplayLimit(parseInt(e.target.value))}
              className='px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={250}>250</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={5000}>5000</option>
            </select>
            <span className='text-sm text-gray-600'>résultats</span>
          </div>

          {total > displayLimit && (
            <button
              onClick={() => setDisplayLimit(Math.min(displayLimit * 2, total))}
              className='px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors'
            >
              Charger plus
            </button>
          )}
        </div>
      </div>
      {total > 1000 && (
        <div className='mt-2 text-xs text-amber-600'>
          Conseil : Utilisez les filtres pour réduire le nombre de résultats et améliorer les performances
        </div>
      )}
    </div>
  )
}
