/**
 * Script de synchronisation des communes INSEE avec Supabase
 * Récupère les données depuis l'API Géo française et les met à jour dans la base
 */

import { createClient } from '@supabase/supabase-js'
import { getInseeToken, fetchAllZones, validateToken } from './inseeService.js'

// Fonction utilitaire pour obtenir les variables d'environnement
// Compatible avec Vite (import.meta.env) et Node.js (process.env)
function getEnvVar (key) {
  // Dans Vite/navigateur
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }
  // Dans Node.js
  return process.env[key]
}

// Client Supabase initialisé de manière paresseuse
let supabase = null

function getSupabaseClient () {
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
 * Synchronise les communes depuis l'API Géo française vers Supabase
 * @param {Object} options - Options de synchronisation
 * @returns {Promise<Object>} Résultat de la synchronisation
 */
export async function syncZones (options = {}) {
  const {
    batchSize = 100,
    forceRefresh = false,
    dryRun = false
  } = options

  console.log('Début de la synchronisation des communes INSEE...')

  const startTime = Date.now()
  const stats = {
    totalFetched: 0,
    inserted: 0,
    updated: 0,
    errors: 0,
    skipped: 0
  }

  try {
    // 1. Obtenir le token INSEE (pas nécessaire pour l'API Géo mais on garde pour compatibilité)
    console.log('🔑 Récupération du token INSEE...')
    const token = await getInseeToken()

    // Vérifier que le token est valide
    const isValidToken = await validateToken(token)
    if (!isValidToken) {
      throw new Error('Token INSEE invalide')
    }

    console.log('Token INSEE obtenu avec succès')

    // 2. Récupérer les données depuis l'API Géo française
    console.log('📡 Récupération des données communes depuis l\'API Géo française...')
    const zones = await fetchAllZones(token)
    stats.totalFetched = zones.length

    console.log(`📊 ${zones.length} communes récupérées`)

    if (dryRun) {
      console.log('Mode dry-run activé - aucune modification ne sera effectuée')
      return { ...stats, dryRun: true }
    }

    // 3. Synchroniser par batch
    console.log('💾 Synchronisation avec Supabase...')
    await syncZonesBatch(zones, batchSize, stats, forceRefresh)

    const duration = Math.round((Date.now() - startTime) / 1000)

    console.log('Synchronisation terminée!')
    console.log('📈 Statistiques:')
    console.log(`   - Total traité: ${stats.totalFetched}`)
    console.log(`   - Nouvelles: ${stats.inserted}`)
    console.log(`   - Mises à jour: ${stats.updated}`)
    console.log(`   - Ignorées: ${stats.skipped}`)
    console.log(`   - Erreurs: ${stats.errors}`)
    console.log(`   - Durée: ${duration}s`)

    return { ...stats, duration, success: true }
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error)
    return {
      ...stats,
      success: false,
      error: error.message,
      duration: Math.round((Date.now() - startTime) / 1000)
    }
  }
}

/**
 * Synchronise les communes par batch pour optimiser les performances
 * @param {Array} zones - Liste des communes à synchroniser
 * @param {number} batchSize - Taille des batches
 * @param {Object} stats - Objet de statistiques à mettre à jour
 * @param {boolean} forceRefresh - Force la mise à jour même si pas de changement
 */
async function syncZonesBatch (zones, batchSize, stats, forceRefresh) {
  const totalBatches = Math.ceil(zones.length / batchSize)

  for (let i = 0; i < zones.length; i += batchSize) {
    const batch = zones.slice(i, i + batchSize)
    const batchNumber = Math.floor(i / batchSize) + 1

    console.log(`📦 Traitement du batch ${batchNumber}/${totalBatches} (${batch.length} communes)...`)

    try {
      await processBatch(batch, stats, forceRefresh)

      // Pause entre les batches pour éviter la surcharge
      if (i + batchSize < zones.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    } catch (error) {
      console.error(`❌ Erreur lors du traitement du batch ${batchNumber}:`, error)
      stats.errors += batch.length
    }
  }
}

/**
 * Traite un batch de communes
 * @param {Array} batch - Batch de communes à traiter
 * @param {Object} stats - Statistiques
 * @param {boolean} forceRefresh - Force la mise à jour
 */
async function processBatch (batch, stats, forceRefresh) {
  const supabase = getSupabaseClient() // Obtenir le client de manière paresseuse

  // Préparer les données pour l'upsert
  const dataToUpsert = batch.map(commune => ({
    id: commune.id,
    nom: commune.nom,
    code_insee: commune.code_insee,
    population: commune.population,
    surface: commune.surface,
    geometrie: commune.geometrie,
    centre_lat: commune.centre_lat,
    centre_lng: commune.centre_lng,
    derniere_mise_a_jour: commune.derniere_mise_a_jour
  }))

  if (!forceRefresh) {
    // Vérifier quelles communes ont changé
    const existingCommunes = await getExistingCommunes(batch.map(z => z.id))
    const filteredData = filterChangedCommunes(dataToUpsert, existingCommunes)

    if (filteredData.length === 0) {
      stats.skipped += batch.length
      return
    }

    stats.skipped += (batch.length - filteredData.length)
    dataToUpsert.splice(0, dataToUpsert.length, ...filteredData)
  }

  // Effectuer l'upsert sur la table communes_insee
  const { error, count } = await supabase
    .from('communes_insee')
    .upsert(dataToUpsert, {
      onConflict: 'id',
      count: 'exact'
    })

  if (error) {
    console.error('Erreur lors de l\'upsert:', error)
    throw error
  }

  // Mettre à jour les statistiques
  // Note: Supabase ne distingue pas insert/update dans le count
  // On estime basé sur l'existence préalable
  stats.updated += count || dataToUpsert.length

  console.log(`   ${dataToUpsert.length} communes traitées`)
}

/**
 * Récupère les communes existantes pour comparaison
 * @param {Array} ids - IDs des communes à vérifier
 * @returns {Promise<Array>} Communes existantes
 */
async function getExistingCommunes (ids) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('communes_insee')
    .select('id, derniere_mise_a_jour, population, nom')
    .in('id', ids)

  if (error) {
    console.warn('Erreur lors de la récupération des communes existantes:', error)
    return []
  }

  return data || []
}

/**
 * Filtre les communes qui ont réellement changé
 * @param {Array} newCommunes - Nouvelles communes
 * @param {Array} existingCommunes - Communes existantes
 * @returns {Array} Communes à mettre à jour
 */
function filterChangedCommunes (newCommunes, existingCommunes) {
  const existingMap = new Map(
    existingCommunes.map(commune => [commune.id, commune])
  )

  return newCommunes.filter(newCommune => {
    const existing = existingMap.get(newCommune.id)

    if (!existing) {
      return true // Nouvelle commune
    }

    // Vérifier si des changements significatifs ont eu lieu
    return (
      existing.population !== newCommune.population ||
      existing.nom !== newCommune.nom ||
      // Ajouter d'autres critères de comparaison si nécessaire
      false
    )
  })
}

/**
 * Initialise la table communes_insee si elle n'existe pas
 * @returns {Promise<boolean>} True si la table a été créée
 */
export async function initializeZonesTable () {
  try {
    const supabase = getSupabaseClient()

    // Vérifier si la table existe en tentant de la requêter
    const { error } = await supabase
      .from('communes_insee')
      .select('count')
      .limit(1)

    if (!error) {
      console.log('Table communes_insee déjà existante')
      return false
    }

    console.log('Création de la table communes_insee nécessaire...')
    console.log('📋 Veuillez exécuter le script SQL create-communes-insee-table.sql dans Supabase')

    return true
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la table:', error)
    throw error
  }
}

/**
 * Lance une synchronisation complète
 * Fonction principale à utiliser pour déclencher la sync
 * @param {Object} options - Options de synchronisation
 */
export async function runFullSync (options = {}) {
  console.log('🌟 Lancement de la synchronisation complète...')

  try {
    // Initialiser la table si nécessaire
    await initializeZonesTable()

    // Lancer la synchronisation
    const result = await syncZones(options)

    if (result.success) {
      console.log('🎉 Synchronisation complète réussie!')
    } else {
      console.error('💥 Synchronisation échouée:', result.error)
    }

    return result
  } catch (error) {
    console.error('💥 Erreur fatale lors de la synchronisation:', error)
    return { success: false, error: error.message }
  }
}
