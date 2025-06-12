/**
 * Hook React pour écouter les changements en temps réel sur la table communes_insee
 * Utilise Supabase Realtime pour détecter les insert, update, delete
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

// Fonction utilitaire pour obtenir les variables d'environnement
// Compatible avec Vite (import.meta.env) et Node.js (process.env)
function getEnvVar(key) {
  // Dans Vite/navigateur
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }
  // Dans Node.js
  return process.env[key]
}

// Client Supabase initialisé de manière paresseuse
let supabase = null

function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
    const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables d\'environnement Supabase manquantes (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)')
    }

    supabase = createClient(supabaseUrl, supabaseKey)
  }
  
  return supabase
}

/**
 * Hook pour écouter les changements en temps réel sur les communes INSEE
 * @param {Object} options - Options de configuration
 * @returns {Object} { communes, loading, error, refresh, subscription }
 */
export function useZonesRealtime(options = {}) {
  const {
    autoFetch = true,
    disabled = false,
    onInsert = null,
    onUpdate = null,
    onDelete = null,
    filter = null,
    orderBy = { column: 'nom', ascending: true },
    limit = 1000
  } = options

  const [communes, setCommunes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED')
  
  const subscriptionRef = useRef(null)
  const retryTimeoutRef = useRef(null)
  const retryCountRef = useRef(0)
  const maxRetries = 2

  /**
   * Récupère les communes initiales depuis Supabase
   */
  const fetchCommunes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const supabase = getSupabaseClient()
      let query = supabase
        .from('communes_insee')
        .select('*')

      // Appliquer les filtres si fournis
      if (filter) {
        Object.entries(filter).forEach(([column, value]) => {
          if (Array.isArray(value)) {
            query = query.in(column, value)
          } else {
            query = query.eq(column, value)
          }
        })
      }

      // Appliquer l'ordre
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending })
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      setCommunes(data || [])
      console.log(`✅ ${data?.length || 0} communes chargées`)
    } catch (err) {
      console.error('❌ Erreur lors du chargement des communes:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filter, orderBy])

  /**
   * Gère les événements de changement en temps réel
   */
  const handleRealtimeChange = useCallback((payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload

    console.log(`🔄 Changement détecté: ${eventType}`, { newRecord, oldRecord })

    switch (eventType) {
      case 'INSERT':
        setCommunes(prevCommunes => {
          const updatedCommunes = [...prevCommunes, newRecord]
          
          // Appliquer l'ordre si défini
          if (orderBy) {
            updatedCommunes.sort((a, b) => {
              const aVal = a[orderBy.column]
              const bVal = b[orderBy.column]
              const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
              return orderBy.ascending ? comparison : -comparison
            })
          }
          
          return updatedCommunes
        })
        
        // Callback personnalisé
        if (onInsert) {
          onInsert(newRecord)
        }
        break

      case 'UPDATE':
        setCommunes(prevCommunes => 
          prevCommunes.map(commune => 
            commune.id === newRecord.id ? newRecord : commune
          )
        )
        
        // Callback personnalisé
        if (onUpdate) {
          onUpdate(newRecord, oldRecord)
        }
        break

      case 'DELETE':
        setCommunes(prevCommunes => 
          prevCommunes.filter(commune => commune.id !== oldRecord.id)
        )
        
        // Callback personnalisé
        if (onDelete) {
          onDelete(oldRecord)
        }
        break

      default:
        console.warn('Type d\'événement non géré:', eventType)
    }
  }, [orderBy, onInsert, onUpdate, onDelete])

  /**
   * Configure l'abonnement en temps réel
   */
  const setupRealtimeSubscription = useCallback(() => {
    if (disabled) {
      console.log('🚫 Realtime désactivé par l\'option disabled')
      setConnectionStatus('DISABLED')
      return null
    }

    if (retryCountRef.current >= maxRetries) {
      console.log(`🛑 Arrêt des tentatives après ${maxRetries} échecs`)
      setConnectionStatus('FAILED')
      setError('Connexion Realtime échouée après plusieurs tentatives')
      return null
    }

    try {
      console.log('📡 Configuration de l\'abonnement temps réel...')
      console.log(`🔄 Tentative ${retryCountRef.current + 1}/${maxRetries}`)
      
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }

      const supabase = getSupabaseClient()
      const subscription = supabase
        .channel('communes_insee_realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'communes_insee'
          },
          handleRealtimeChange
        )
        .subscribe((status, err) => {
          console.log(`📊 Statut de l'abonnement: ${status}`)
          setConnectionStatus(status)

          if (status === 'SUBSCRIBED') {
            console.log('✅ Abonnement temps réel actif')
            retryCountRef.current = 0
          } else if (status === 'CHANNEL_ERROR' || status === 'CLOSED') {
            console.error('❌ Erreur dans l\'abonnement temps réel:', err)
            retryCountRef.current++
            
            if (retryCountRef.current < maxRetries) {
              console.log(`🔄 Tentative de reconnexion ${retryCountRef.current + 1}/${maxRetries} dans 2 secondes...`)
              
              retryTimeoutRef.current = setTimeout(() => {
                setupRealtimeSubscription()
              }, 2000)
            } else {
              console.log('🛑 Nombre maximum de tentatives atteint')
              setConnectionStatus('FAILED')
              setError('Impossible de se connecter au Realtime après plusieurs tentatives')
            }
          } else if (status === 'TIMED_OUT') {
            console.warn('⏰ Timeout de l\'abonnement temps réel')
            retryCountRef.current++
            
            if (retryCountRef.current < maxRetries) {
              retryTimeoutRef.current = setTimeout(() => {
                setupRealtimeSubscription()
              }, 2000)
            }
          }
        })

      subscriptionRef.current = subscription
      return subscription

    } catch (err) {
      console.error('❌ Erreur lors de la configuration de l\'abonnement:', err)
      setError(`Erreur temps réel: ${err.message}`)
      retryCountRef.current++
      
      if (retryCountRef.current < maxRetries) {
        retryTimeoutRef.current = setTimeout(() => {
          setupRealtimeSubscription()
        }, 2000)
      }
    }
  }, [handleRealtimeChange, disabled])

  /**
   * Fonction de rafraîchissement manuel
   */
  const refresh = useCallback(() => {
    fetchCommunes()
  }, [fetchCommunes])

  /**
   * Ajoute une commune manuellement (optimistic update)
   */
  const addCommune = useCallback((commune) => {
    setCommunes(prevCommunes => [...prevCommunes, commune])
  }, [])

  /**
   * Met à jour une commune manuellement (optimistic update)
   */
  const updateCommune = useCallback((communeId, updates) => {
    setCommunes(prevCommunes =>
      prevCommunes.map(commune =>
        commune.id === communeId ? { ...commune, ...updates } : commune
      )
    )
  }, [])

  /**
   * Supprime une commune manuellement (optimistic update)
   */
  const removeCommune = useCallback((communeId) => {
    setCommunes(prevCommunes => prevCommunes.filter(commune => commune.id !== communeId))
  }, [])

  // Effet pour l'initialisation
  useEffect(() => {
    if (autoFetch) {
      fetchCommunes()
    }
    
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe()
      subscriptionRef.current = null
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
    
    retryCountRef.current = 0
    
    if (!disabled) {
      const subscription = setupRealtimeSubscription()
    } else {
      setConnectionStatus('DISABLED')
    }

    // Nettoyage
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [autoFetch, disabled, fetchCommunes, setupRealtimeSubscription])

  // Effet pour gérer les changements de filtre
  useEffect(() => {
    if (autoFetch) {
      fetchCommunes()
    }
  }, [filter, orderBy, fetchCommunes, autoFetch])

  return {
    // État
    communes,
    zones: communes, // Alias pour compatibilité
    loading,
    error,
    connectionStatus,
    
    // Actions
    refresh,
    addCommune,
    updateCommune,
    removeCommune,
    // Alias pour compatibilité
    addZone: addCommune,
    updateZone: updateCommune,
    removeZone: removeCommune,
    
    // Métadonnées
    subscription: subscriptionRef.current,
    totalCount: communes.length
  }
}

/**
 * Hook simplifié pour une utilisation basique
 * @returns {Object} { communes, zones, loading, error, refresh }
 */
export function useZones() {
  return useZonesRealtime({
    autoFetch: true,
    orderBy: { column: 'nom', ascending: true }
  })
}

/**
 * Hook pour une commune spécifique avec écoute temps réel
 * @param {string} communeId - ID de la commune à surveiller
 * @returns {Object} { commune, zone, loading, error, refresh }
 */
export function useZoneById(communeId) {
  const [commune, setCommune] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCommune = useCallback(async () => {
    if (!communeId) return

    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error: fetchError } = await supabase
        .from('communes_insee')
        .select('*')
        .eq('id', communeId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      setCommune(data)
    } catch (err) {
      console.error('Erreur lors du chargement de la commune:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [communeId])

  useEffect(() => {
    fetchCommune()

    // Abonnement pour cette commune spécifique
    const supabase = getSupabaseClient()
    const subscription = supabase
      .channel(`commune_${communeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'communes_insee',
          filter: `id=eq.${communeId}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setCommune(payload.new)
          } else if (payload.eventType === 'DELETE') {
            setCommune(null)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [communeId, fetchCommune])

  return {
    commune,
    zone: commune, // Alias pour compatibilité
    loading,
    error,
    refresh: fetchCommune
  }
} 