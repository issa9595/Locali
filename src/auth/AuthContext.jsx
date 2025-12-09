import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetchUser () {
    try {
      const res = await fetch('/auth/user', { credentials: 'include' })
      if (!res.ok) {
        // Si erreur serveur (500), on log mais on continue
        if (res.status >= 500) {
          console.error('Erreur serveur lors de la récupération de l\'utilisateur')
        }
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }
      const data = await res.json()
      if (data.user) {
        setUser(data.user)
        setRole(data.role || 'user')
      } else {
        setUser(null)
        setRole(null)
      }
    } catch (error) {
      // Erreur réseau ou parse JSON
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      setUser(null)
      setRole(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUser() }, [])

  const value = useMemo(() => ({
    user,
    role,
    loading,
    loginEmail: async (email, password) => {
      const res = await fetch('/auth/email/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Erreur inconnue' }))
        throw new Error(errorData.error || 'Échec de connexion')
      }
      await fetchUser()
    },
    registerEmail: async (payload) => {
      const res = await fetch('/auth/email/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        let errorMessage = 'Échec d\'inscription'
        try {
          const errorData = await res.json()
          errorMessage = errorData.error || errorData.message || errorMessage
          console.error('Erreur serveur signup:', errorData)
        } catch (e) {
          const text = await res.text().catch(() => '')
          errorMessage = text || `Erreur ${res.status}: ${res.statusText}`
          console.error('Erreur signup (non-JSON):', text)
        }
        throw new Error(errorMessage)
      }
      await fetchUser()
    },
    loginWithProvider: (provider) => {
      window.location.href = `/auth/oauth/${provider}`
    },
    logout: async () => {
      await fetch('/auth/signout', { method: 'POST', credentials: 'include' })
      setUser(null)
      setRole(null)
    }
  }), [user, role, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}
