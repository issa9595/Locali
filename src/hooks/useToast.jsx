import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider ({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message, { type = 'success', duration = 4000 } = {}) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, type, message }])
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }, [remove])

  const value = useMemo(() => ({ showToast, remove }), [showToast, remove])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Container des toasts */}
      <div className='fixed bottom-4 right-4 z-[9999] space-y-3 pointer-events-none'>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto min-w-[260px] max-w-[360px] text-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden transition-all duration-300 ${t.type === 'success' ? 'bg-locali-green' : 'bg-locali-purple-dark'}`}
          >
            <div className='px-4 py-3 flex items-start gap-3'>
              <div className='flex-1 font-poppins-regular text-sm leading-5'>
                {t.message}
              </div>
              <button
                onClick={() => remove(t.id)}
                className='shrink-0 text-white/90 hover:text-white font-poppins-medium'
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast () {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
