import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLoginHandlers from './useLoginHandlers.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptCGU, setAcceptCGU] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)

  const { handleSubmit } = useLoginHandlers({ email, password, acceptCGU, acceptNewsletter })

  return (
    <section
      className='min-h-screen flex items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: "url('/assets/images/Login/Connect-Background-image.png')" }}
    >
      <div className='bg-[#C6F68D] bg-opacity-95 rounded-2xl shadow-2xl p-4 md:p-8 w-full max-w-xs md:max-w-md flex flex-col items-center'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-kallisto-bold text-white text-center mb-8 tracking-wide'>
          Connectez - vous
        </h2>
        <form onSubmit={handleSubmit} className='w-full space-y-4 md:space-y-5'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm md:text-base mb-2'
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm md:text-base mb-2'
            placeholder='Mot de passe'
          />
          <div className='flex items-center mb-1'>
            <input
              type='checkbox'
              id='cgu'
              checked={acceptCGU}
              onChange={e => setAcceptCGU(e.target.checked)}
              className='mr-2 accent-green-500 w-4 h-4'
              required
            />
            <label htmlFor='cgu' className='text-xs md:text-sm text-gray-800 font-poppins-regular'>
              J'accepte les conditions générales d'utilisation
            </label>
          </div>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='newsletter'
              checked={acceptNewsletter}
              onChange={e => setAcceptNewsletter(e.target.checked)}
              className='mr-2 accent-green-500 w-4 h-4'
            />
            <label htmlFor='newsletter' className='text-xs md:text-sm text-gray-800 font-poppins-regular'>
              J'accepte de recevoir la newsletter ainsi que des offres et actualités exclusives
            </label>
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 rounded-lg font-poppins-semibold transition-colors mt-2 text-sm md:text-base'
          >
            Se connecter
          </button>
        </form>
        <Link
          to='/inscription'
          className='block text-green-900 hover:underline font-poppins-medium text-center mt-6 text-sm md:text-base'
        >
          S'inscrire
        </Link>
      </div>
    </section>
  )
}

export default Login
