/**
 * Client Supabase partagé pour Locali
 * Configuration centralisée pour toutes les fonctionnalités
 */

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

/**
 * Obtient ou crée l'instance Supabase client
 * @returns {SupabaseClient} Instance du client Supabase
 */
export function supabaseClient() {
  if (!supabase) {
    const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
    const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables d\'environnement Supabase manquantes (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)')
    }

    // Configuration optimisée pour Locali
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      },
      global: {
        headers: {
          'X-Client-Info': 'locali-web-app'
        }
      }
    })

    console.log('🔗 Client Supabase initialisé pour Locali')
  }
  
  return supabase
}

/**
 * Configuration spécifique pour les tables Locali
 */
export const TABLES = {
  COMMUNES_INSEE: 'communes_insee',
  DEMOGRAPHICS: 'demographics', 
  ENTERPRISES: 'enterprises',
  REAL_ESTATE: 'real_estate',
  SCORES: 'territorial_scores',
  REPORTS: 'user_reports',
  USERS: 'users',
  PROFILES: 'profiles'
}

/**
 * Schémas pour les types de données
 */
export const SCHEMAS = {
  PUBLIC: 'public',
  AUTH: 'auth'
}

// Export par défaut
export default supabaseClient 