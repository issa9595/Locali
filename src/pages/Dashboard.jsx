import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Dashboard () {
  const { user, role } = useAuth()
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-2'>Tableau de bord</h1>
      <p className='text-sm text-gray-600'>Connecté en tant que {user?.email} — rôle: {role}</p>
    </div>
  )
}


