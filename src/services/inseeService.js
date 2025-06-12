/**
 * Service pour interagir avec l'API INSEE
 * Gère l'authentification OAuth2 et la récupération des données géographiques
 */

const INSEE_BASE_URL = 'https://api.insee.fr'
const INSEE_GEO_BASE_URL = 'https://geo.api.gouv.fr' // API Géo française publique

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

/**
 * Récupère un token d'accès via OAuth2 Client Credentials
 * @returns {Promise<string>} Token d'accès
 */
export async function getInseeToken() {
  const clientId = getEnvVar('VITE_INSEE_CLIENT_ID')
  const clientSecret = getEnvVar('VITE_INSEE_CLIENT_SECRET')

  if (!clientId || !clientSecret) {
    throw new Error('Variables d\'environnement INSEE manquantes (CLIENT_ID, CLIENT_SECRET)')
  }

  const credentials = btoa(`${clientId}:${clientSecret}`)
  
  try {
    const response = await fetch(`${INSEE_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      throw new Error(`Erreur authentification INSEE: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.access_token) {
      throw new Error('Token d\'accès non reçu de l\'API INSEE')
    }

    return data.access_token
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token INSEE:', error)
    throw error
  }
}

/**
 * Récupère les communes depuis l'API Géo française (publique, pas besoin de token)
 * @param {string} token - Token d'accès (non utilisé pour l'API Géo publique)
 * @param {Object} options - Options de filtrage
 * @returns {Promise<Array>} Liste des communes formatées
 */
export async function fetchZonesFromInsee(token, options = {}) {
  const {
    limit = 1000,
    offset = 0,
    fields = 'nom,code,population,surface,centre'
  } = options

  try {
    // Utiliser l'API Géo française publique qui ne nécessite pas de token
    const url = new URL(`${INSEE_GEO_BASE_URL}/communes`)
    
    // L'API Géo française utilise des paramètres spécifiques
    // Note: 'contour' n'est pas supporté dans les requêtes non filtrées
    url.searchParams.append('fields', 'nom,code,population,surface,centre')
    
    // Gestion de la pagination avec limit
    if (limit && limit < 10000) {
      url.searchParams.append('limit', limit.toString())
    }

    console.log(`🔍 URL générée: ${url.toString()}`)

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erreur API Géo: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!Array.isArray(data)) {
      console.warn('Format de réponse inattendu:', data)
      return []
    }

    // Appliquer l'offset manuellement si nécessaire
    const slicedData = offset > 0 ? data.slice(offset) : data

    // Transformation des données vers notre format
    return slicedData.map(commune => ({
      id: commune.code,
      nom: commune.nom,
      code_insee: commune.code,
      population: commune.population || null,
      surface: commune.surface || null,
      geometrie: null, // Pas de géométrie disponible sans contour
      centre_lat: commune.centre?.coordinates?.[1] || null,
      centre_lng: commune.centre?.coordinates?.[0] || null,
      derniere_mise_a_jour: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des communes:', error)
    throw error
  }
}

/**
 * Formate la géométrie pour Supabase (PostGIS)
 * @param {Object} geometry - Géométrie brute de l'API
 * @returns {Object} Géométrie formatée en GeoJSON
 */
function formatGeometry(geometry) {
  if (!geometry) return null
  
  // Si c'est déjà du GeoJSON valide, on le retourne tel quel
  if (geometry.type && geometry.coordinates) {
    return geometry
  }
  
  // Sinon, on essaie de le convertir
  return {
    type: 'Polygon',
    coordinates: geometry.coordinates || geometry
  }
}

/**
 * Récupère toutes les communes par batch pour éviter les limites de l'API
 * @param {string} token - Token d'accès
 * @param {number} batchSize - Taille des batches
 * @returns {Promise<Array>} Toutes les communes
 */
export async function fetchAllZones(token, batchSize = 1000) {
  console.log('📡 Récupération de toutes les communes depuis l\'API Géo française...')
  
  try {
    // L'API Géo française retourne toutes les communes d'un coup
    const url = new URL(`${INSEE_GEO_BASE_URL}/communes`)
    url.searchParams.append('fields', 'nom,code,population,surface,centre')
    
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erreur API Géo: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!Array.isArray(data)) {
      throw new Error('Format de réponse inattendu de l\'API Géo')
    }

    // Transformation des données
    const allZones = data.map(commune => ({
      id: commune.code,
      nom: commune.nom,
      code_insee: commune.code,
      population: commune.population || null,
      surface: commune.surface || null,
      geometrie: null, // Pas de géométrie disponible sans contour
      centre_lat: commune.centre?.coordinates?.[1] || null,
      centre_lng: commune.centre?.coordinates?.[0] || null,
      derniere_mise_a_jour: new Date().toISOString()
    }))

    console.log(`✅ Total récupéré: ${allZones.length} communes`)
    return allZones
    
  } catch (error) {
    console.error('Erreur lors de la récupération complète:', error)
    throw error
  }
}

/**
 * Vérifie la validité du token (pour l'API INSEE, pas nécessaire pour l'API Géo)
 * @param {string} token - Token à vérifier
 * @returns {Promise<boolean>} True si le token est valide
 */
export async function validateToken(token) {
  try {
    // Test simple avec l'API Géo publique (pas besoin de token)
    const response = await fetch(`${INSEE_GEO_BASE_URL}/communes?limit=1`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    
    return response.ok
  } catch {
    return false
  }
} 