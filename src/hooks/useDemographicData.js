import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDemographicData(zoneId) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fonction pour charger les données initiales
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('donnees_demographiques')
          .select('*')
          .eq('zone_id', zoneId)
          .order('annee', { ascending: false })
          .limit(1)
          .single()

        if (error) throw error
        setStats(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    // Charger les données initiales
    fetchData()

    // Configurer l'abonnement en temps réel
    const subscription = supabase
      .channel('demographic_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donnees_demographiques',
          filter: `zone_id=eq.${zoneId}`
        },
        (payload) => {
          setStats(payload.new)
        }
      )
      .subscribe()

    // Nettoyer l'abonnement
    return () => {
      subscription.unsubscribe()
    }
  }, [zoneId])

  return { stats, loading, error }
}

const getEntreprisesByZone = async (zoneId) => {
  const { data, error } = await supabase
    .from('batiments')
    .select(`
      entreprise_id,
      entreprises (
        id,
        nom,
        secteur_activite,
        adresse
      )
    `)
    .eq('zone_id', zoneId)
    .not('entreprise_id', 'is', null)

  if (error) throw error

  // Filtrer les entreprises uniques
  const entreprisesUniques = []
  const ids = new Set()
  data.forEach(batiment => {
    const ent = batiment.entreprises
    if (ent && !ids.has(ent.id)) {
      ids.add(ent.id)
      entreprisesUniques.push(ent)
    }
  })
  return entreprisesUniques
} 