import { useState } from 'react'

function ExpandableLayer ({ title, image, children }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='bg-locali-purple/5 rounded shadow hover:shadow-md transition border border-locali-border-light'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center p-4 hover:bg-locali-purple/10 transition-colors'
      >
        <img
          src={image}
          alt=''
          className='w-20 h-16 object-cover rounded overflow-hidden'
        />
        <span className='ml-4 text-base font-poppins-medium flex-grow text-left text-locali-text-primary'>{title}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-6 w-6 transform transition-transform text-locali-green ${isExpanded ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isExpanded && (
        <div className='p-4 border-t border-locali-border-default'>
          {children}
        </div>
      )}
    </div>
  )
}

export default ExpandableLayer
