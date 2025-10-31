import React from 'react'

export default function UpdateToast ({ notification, onDismiss, onApply, onSnooze }) {
  if (!notification) return null

  return (
    <div className='fixed top-4 right-4 z-50 max-w-md bg-white border-l-4 border-locali-blue rounded-lg shadow-lg transition-all duration-300 ease-in-out'>
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0' />
          <div className='ml-3 flex-1'>
            <h3 className='text-sm font-medium text-locali-text-primary'>
              {notification.title}
            </h3>
            <p className='mt-1 text-sm text-locali-text-secondary'>
              {notification.message}
            </p>
            <div className='mt-3 flex space-x-2'>
              <button
                onClick={onApply}
                className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-locali-blue hover:bg-locali-button-hover focus:outline-none focus:ring-2 focus:ring-locali-blue transition-colors'
              >
                Actualiser
              </button>
              <button
                onClick={() => onSnooze(4)}
                className='inline-flex items-center px-3 py-1.5 border border-locali-green-light text-xs font-medium rounded text-locali-text-primary bg-white hover:bg-locali-green-light/10 focus:outline-none focus:ring-2 focus:ring-locali-blue transition-colors'
              >
                Plus tard
              </button>
            </div>
          </div>
          <div className='ml-4 flex-shrink-0'>
            <button
              onClick={onDismiss}
              className='bg-white rounded-md inline-flex text-locali-text-secondary hover:text-locali-text-primary focus:outline-none focus:ring-2 focus:ring-locali-blue'
            >
              <span className='sr-only'>Fermer</span>
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
