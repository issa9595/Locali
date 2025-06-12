/**
 * Hook React pour écouter les changements en temps réel sur les territoires (communes INSEE)
 * Module Territories - Locali
 * Utilise Supabase Realtime pour détecter les insert, update, delete
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { supabaseClient } from '../../../shared/api/supabaseClient.js'

/**
 * Hook pour écouter les changements en temps réel sur les territoires
 * @param {Object} options - Options de configuration
 * @returns {Object} { territories, loading, error, refresh, connectionStatus }
 */
export function useTerritoriesRealtime(options = {}) {
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

  const [territories, setTerritories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED')
  
  const subscriptionRef = useRef(null)
  const retryTimeoutRef = useRef(null)
  const retryCountRef = useRef(0)
  const maxRetries = 2

  /**
   * Récupère les territoires initiaux depuis Supabase
   */
  const fetchTerritories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const supabase = supabaseClient()
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

      // Limiter le nombre de résultats
      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      setTerritories(data || [])
      console.log(`✅ ${data?.length || 0} territoires chargés`)
    } catch (err) {
      console.error('❌ Erreur lors du chargement des territoires:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filter, orderBy, limit])

  /**
   * Gère les événements de changement en temps réel
   */
  const handleRealtimeChange = useCallback((payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload

    console.log(`🔄 Changement territoire détecté: ${eventType}`, { newRecord, oldRecord })

    switch (eventType) {
      case 'INSERT':
        setTerritories(prevTerritories => {
          const updatedTerritories = [...prevTerritories, newRecord]
          
          // Appliquer l'ordre si défini
          if (orderBy) {
            updatedTerritories.sort((a, b) => {
              const aVal = a[orderBy.column]
              const bVal = b[orderBy.column]
              const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
              return orderBy.ascending ? comparison : -comparison
            })
          }
          
          return updatedTerritories
        })
        
        // Callback personnalisé
        if (onInsert) {
          onInsert(newRecord)
        }
        break

      case 'UPDATE':
        setTerritories(prevTerritories => 
          prevTerritories.map(territory => 
            territory.id === newRecord.id ? newRecord : territory
          )
        )
        
        // Callback personnalisé
        if (onUpdate) {
          onUpdate(newRecord, oldRecord)
        }
        break

      case 'DELETE':
        setTerritories(prevTerritories => 
          prevTerritories.filter(territory => territory.id !== oldRecord.id)
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
      console.log('📡 Configuration de l\'abonnement temps réel territoires...')
      console.log(`🔄 Tentative ${retryCountRef.current + 1}/${maxRetries}`)
      
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }

      const supabase = supabaseClient()
      const subscription = supabase
        .channel('territories_realtime')
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
          console.log(`📊 Statut abonnement territoires: ${status}`)
          setConnectionStatus(status)

          if (status === 'SUBSCRIBED') {
            console.log('✅ Abonnement territoires temps réel actif')
            retryCountRef.current = 0
          } else if (status === 'CHANNEL_ERROR' || status === 'CLOSED') {
            console.error('❌ Erreur abonnement territoires:', err)
            retryCountRef.current++
            
            if (retryCountRef.current < maxRetries) {
              console.log(`🔄 Reconnexion territoires ${retryCountRef.current + 1}/${maxRetries} dans 2s...`)
              
              retryTimeoutRef.current = setTimeout(() => {
                setupRealtimeSubscription()
              }, 2000)
            } else {
              console.log('🛑 Nombre maximum de tentatives atteint')
              setConnectionStatus('FAILED')
              setError('Impossible de se connecter au Realtime territoires')
            }
          } else if (status === 'TIMED_OUT') {
            console.warn('⏰ Timeout abonnement territoires')
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
      console.error('❌ Erreur configuration abonnement territoires:', err)
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
    fetchTerritories()
  }, [fetchTerritories])

  /**
   * Ajoute un territoire manuellement (optimistic update)
   */
  const addTerritory = useCallback((territory) => {
    setTerritories(prevTerritories => [...prevTerritories, territory])
  }, [])

  /**
   * Met à jour un territoire manuellement (optimistic update)
   */
  const updateTerritory = useCallback((territoryId, updates) => {
    setTerritories(prevTerritories =>
      prevTerritories.map(territory =>
        territory.id === territoryId ? { ...territory, ...updates } : territory
      )
    )
  }, [])

  /**
   * Supprime un territoire manuellement (optimistic update)
   */
  const removeTerritory = useCallback((territoryId) => {
    setTerritories(prevTerritories => 
      prevTerritories.filter(territory => territory.id !== territoryId)
    )
  }, [])

  // Effet pour l'initialisation
  useEffect(() => {
    if (autoFetch) {
      fetchTerritories()
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
      setupRealtimeSubscription()
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
  }, [autoFetch, disabled, fetchTerritories, setupRealtimeSubscription])

  // Effet pour gérer les changements de filtre
  useEffect(() => {
    if (autoFetch) {
      fetchTerritories()
    }
  }, [filter, orderBy, fetchTerritories, autoFetch])

  return {
    // État
    territories,
    communes: territories, // Alias pour compatibilité
    zones: territories,    // Alias pour compatibilité
    loading,
    error,
    connectionStatus,
    
    // Actions
    refresh,
    addTerritory,
    updateTerritory,
    removeTerritory,
    
    // Métadonnées
    subscription: subscriptionRef.current,
    totalCount: territories.length
  }
}