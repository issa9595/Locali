import React from 'react'

export default function UpdateBanner ({ notification, onDismiss, onApply, onSnooze }) {
  if (!notification) return null

  return (
    <div className='bg-gradient-to-r from-locali-blue-500 to-locali-blue-600 text-white'>
      <div className='max-w-7xl mx-auto py-2 px-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='text-sm font-medium'>
              Nouvelles données INSEE disponibles !
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <button
              onClick={onApply}
              className='bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-medium py-1 px-3 rounded transition-colors'
            >
              Actualiser
            </button>
            <button
              onClick={() => onSnooze(4)}
              className='text-locali-blue-100 hover:text-white text-xs font-medium py-1 px-2 rounded transition-colors'
            >
              Plus tard
            </button>
            <button
              onClick={onDismiss}
              className='text-locali-blue-100 hover:text-white'
            >
              <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
