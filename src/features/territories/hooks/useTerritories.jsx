/**
 * Hook simplifié pour une utilisation basique des territoires (VERSION STABLE OPTIMISÉE)
 * Module Territories - Locali
 * Désactivation temporaire du Realtime pour éviter les bugs
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { supabaseClient } from '../../../shared/api/supabaseClient.js'

// Cache global pour éviter les rechargements inutiles
const territoriesCache = {
  data: null,
  timestamp: null,
  loading: false,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
}

/**
 * Hook simplifié pour récupérer les territoires (sans Realtime)
 * @param {Object} options - Options de configuration optionnelles
 * @returns {Object} { territories, communes, zones, loading, error, refresh }
 */
export function useTerritories (options = {}) {
  const {
    autoFetch = true,
    disabled = false,
    filter = null,
    orderBy = { column: 'nom', ascending: true },
    limit = 50000 // Augmenté pour charger toutes les communes françaises
  } = options

  const [territories, setTerritories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const mountedRef = useRef(true)
  const fetchedRef = useRef(false)

  // Stabiliser les options pour éviter les re-renders
  const stableOptions = useMemo(() => ({
    autoFetch,
    disabled,
    filter: filter ? JSON.stringify(filter) : null,
    orderBy: orderBy ? JSON.stringify(orderBy) : null,
    limit
  }), [autoFetch, disabled, filter, orderBy, limit])

  /**
   * Vérifie si le cache est valide
   */
  const isCacheValid = useCallback(() => {
    if (!territoriesCache.data || !territoriesCache.timestamp) return false
    return (Date.now() - territoriesCache.timestamp) < territoriesCache.CACHE_DURATION
  }, [])

  /**
   * Récupère les territoires depuis Supabase (sans Realtime)
   */
  const fetchTerritories = useCallback(async (forceRefresh = false) => {
    if (disabled) {
      console.log('🚫 Hook territories désactivé')
      if (mountedRef.current) {
        setLoading(false)
      }
      return
    }

    // Éviter les fetch multiples simultanés
    if (territoriesCache.loading && !forceRefresh) {
      console.log('⏳ Chargement déjà en cours, attente...')
      return
    }

    // Utiliser le cache si valide et pas de forceRefresh
    if (!forceRefresh && isCacheValid()) {
      console.log('📦 Utilisation du cache des territoires')
      if (mountedRef.current) {
        setTerritories(territoriesCache.data)
        setTotalCount(territoriesCache.data.length)
        setLoading(false)
        setError(null)
      }
      return
    }

    try {
      territoriesCache.loading = true
      if (mountedRef.current) {
        setLoading(true)
        setError(null)
      }

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

      // Mettre à jour le cache
      territoriesCache.data = data || []
      territoriesCache.timestamp = Date.now()
      territoriesCache.loading = false

      // Utiliser requestIdleCallback pour optimiser les performances
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          if (mountedRef.current) {
            setTerritories(data || [])
            setTotalCount(data?.length || 0)
            fetchedRef.current = true
          }
          console.log(`✅ ${data?.length || 0} territoires chargés (mode stable optimisé)`)
        })
      } else {
        // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
        setTimeout(() => {
          if (mountedRef.current) {
            setTerritories(data || [])
            setTotalCount(data?.length || 0)
            fetchedRef.current = true
          }
          console.log(`✅ ${data?.length || 0} territoires chargés (mode stable)`)
        }, 0)
      }
    } catch (err) {
      console.error('Erreur lors du chargement des territoires:', err)
      territoriesCache.loading = false
      if (mountedRef.current) {
        setError(err.message)
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [disabled, filter, orderBy, limit, isCacheValid])

  /**
   * Fonction de rafraîchissement manuel
   */
  const refresh = useCallback(() => {
    fetchTerritories(true) // Force refresh
  }, [fetchTerritories])

  // Effet pour l'initialisation (une seule fois)
  useEffect(() => {
    mountedRef.current = true

    if (autoFetch && !fetchedRef.current) {
      fetchTerritories()
    }

    return () => {
      mountedRef.current = false
    }
  }, []) // Pas de dépendances pour éviter les re-executions

  // Effet pour les changements d'options (seulement si nécessaire)
  useEffect(() => {
    if (fetchedRef.current && autoFetch) {
      // Seulement refetch si les options ont vraiment changé
      fetchTerritories()
    }
  }, [stableOptions.filter, stableOptions.orderBy, stableOptions.limit, stableOptions.disabled])

  return {
    // État
    territories,
    communes: territories, // Alias pour compatibilité
    zones: territories, // Alias pour compatibilité
    loading,
    error,

    // Actions
    refresh,

    // Métadonnées
    totalCount,
    connectionStatus: disabled ? 'DISABLED' : 'STABLE' // Pas de realtime
  }
}

/**
 * Hook pour récupérer seulement les communes (alias)
 * @param {Object} options - Options de configuration
 * @returns {Object} { communes, loading, error, refresh }
 */
export function useCommunes (options = {}) {
  const result = useTerritories(options)

  return {
    communes: result.territories,
    loading: result.loading,
    error: result.error,
    refresh: result.refresh,
    totalCount: result.totalCount,
    connectionStatus: result.connectionStatus
  }
}

/**
 * Hook pour récupérer seulement les zones (alias pour compatibilité)
 * @param {Object} options - Options de configuration
 * @returns {Object} { zones, loading, error, refresh }
 */
export function useZones (options = {}) {
  const result = useTerritories(options)

  return {
    zones: result.territories,
    communes: result.territories, // Double alias
    loading: result.loading,
    error: result.error,
    refresh: result.refresh,
    totalCount: result.totalCount,
    connectionStatus: result.connectionStatus
  }
}
