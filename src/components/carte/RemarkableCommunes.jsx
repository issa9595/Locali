import React from 'react'

export default function RemarkableCommunes ({ stats }) {
  if (!stats.largestCommune?.nom && !(stats.smallestCommune?.nom)) return null

  return (
    <div className='border-t pt-4 mt-4'>
      <h4 className='font-medium text-gray-900 mb-3'>Communes remarquables</h4>
      <div className='space-y-2 text-xs'>
        {stats.largestCommune?.nom && (
          <div className='bg-yellow-50 p-2 rounded'>
            <div className='font-medium text-yellow-900'>Plus peuplée</div>
            <div className='text-yellow-700'>{stats.largestCommune.nom}</div>
            <div className='text-yellow-600'>{stats.largestCommune.population?.toLocaleString()} hab.</div>
          </div>
        )}
        {stats.smallestCommune?.nom && stats.smallestCommune.population !== Infinity && (
          <div className='bg-blue-50 p-2 rounded'>
            <div className='font-medium text-blue-900'>Plus petite</div>
            <div className='text-blue-700'>{stats.smallestCommune.nom}</div>
            <div className='text-blue-600'>{stats.smallestCommune.population?.toLocaleString()} hab.</div>
          </div>
        )}
      </div>
    </div>
  )
}
