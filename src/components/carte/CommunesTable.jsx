import React from 'react'

export default function CommunesTable ({ filteredCommunes, displayLimit }) {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-900'>Communes INSEE</h3>
        <p className='text-sm text-gray-600 mt-1'>
          {filteredCommunes.length.toLocaleString()} résultat(s)
        </p>
      </div>
      <div className='overflow-x-auto max-h-96'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 sticky top-0'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Commune</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Code INSEE</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Population</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Surface (km²)</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Densité</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Coordonnées</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredCommunes.slice(0, displayLimit).map((commune) => {
              const density = commune.surface > 0 ? Math.round((commune.population || 0) / commune.surface * 100) : 0
              return (
                <tr key={commune.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>{commune.nom}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-600 font-mono'>{commune.code_insee}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900 font-semibold'>{commune.population?.toLocaleString() || 'N/A'}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{commune.surface ? Math.round(commune.surface / 100) : 'N/A'}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900 font-medium'>{density > 0 ? density : 'N/A'}</span>
                    <span className='text-xs text-gray-500 ml-1'>hab/km²</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {commune.centre_lat && commune.centre_lng
                      ? (
                        <div className='text-xs text-gray-600 font-mono space-y-1'>
                          <div>{commune.centre_lat.toFixed(4)}</div>
                          <div>{commune.centre_lng.toFixed(4)}</div>
                        </div>
                        )
                      : (
                        <span className='text-sm text-gray-400'>N/A</span>
                        )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
