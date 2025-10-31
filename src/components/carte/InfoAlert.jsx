import React from 'react'

export default function InfoAlert () {
  return (
    <div className='mb-6 bg-orange-100 border border-orange-300 rounded-lg p-4'>
      <div className='flex items-start space-x-3'>
        <div className='text-orange-600 text-xl'>i</div>
        <div>
          <h3 className='font-medium text-orange-900'>Mode Analytics Avancés</h3>
          <p className='text-orange-800 text-sm mt-1'>
            Version temporaire avec tableaux interactifs en attendant la résolution des problèmes de cartographie.
            Toutes les données et fonctionnalités d'analyse sont disponibles.
          </p>
        </div>
      </div>
    </div>
  )
}
