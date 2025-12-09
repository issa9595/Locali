import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function AdminRoute ({ children }) {
  const { user, role, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to='/connexion' replace />
  if (role !== 'super_admin') return <Navigate to='/dashboard' replace />
  return children
}


