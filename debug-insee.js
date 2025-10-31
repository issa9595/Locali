#!/usr/bin/env node

/**
 * Script de debug pour l'API INSEE
 * Usage: node debug-insee.js
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Configuration des chemins pour ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '.env.local') })

// Test détaillé de l'API INSEE
async function debugInseeAPI () {
  console.log('🔍 Debug détaillé de l\'API INSEE\n')

  try {
    // 1. Test d'obtention du token
    console.log('1️⃣ Test d\'obtention du token...')
    const { getInseeToken } = await import('./src/services/inseeService.js')
    const token = await getInseeToken()
    console.log(`✅ Token obtenu: ${token.substring(0, 20)}...`)

    // 2. Test direct de l'API géo avec le token
    console.log('\n2️⃣ Test direct de l\'API géo...')
    const testUrl = 'https://geo.api.gouv.fr/communes?fields=nom,code,population&limit=5'

    console.log(`📡 URL testée: ${testUrl}`)
    const response = await fetch(testUrl, {
      headers: {
        Accept: 'application/json'
      }
    })

    console.log(`📊 Status: ${response.status} ${response.statusText}`)
    console.log('📋 Headers de réponse:')
    for (const [key, value] of response.headers) {
      console.log(`   ${key}: ${value}`)
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.log(`❌ Erreur détaillée: ${errorText}`)
      return false
    }

    const data = await response.json()
    console.log(`✅ Données reçues: ${Array.isArray(data) ? data.length : 'Non-array'} éléments`)

    if (Array.isArray(data) && data.length > 0) {
      console.log('📋 Premier élément:')
      console.log(JSON.stringify(data[0], null, 2))
    }

    // 3. Test de validation du token
    console.log('\n3️⃣ Test de validation du token...')
    const { validateToken } = await import('./src/services/inseeService.js')
    const isValid = await validateToken(token)
    console.log(`🔍 Token valide: ${isValid}`)

    // 4. Test de récupération avec la fonction du service
    console.log('\n4️⃣ Test de récupération via le service...')

    // Debug: tester d'abord avec une URL simple
    console.log('🔍 Test URL simple...')
    const simpleUrl = 'https://geo.api.gouv.fr/communes?fields=nom,code&limit=3'
    console.log(`📡 URL simple: ${simpleUrl}`)
    const simpleResponse = await fetch(simpleUrl)
    console.log(`📊 Status simple: ${simpleResponse.status}`)

    if (simpleResponse.ok) {
      const simpleData = await simpleResponse.json()
      console.log(`✅ Données simples: ${simpleData.length} éléments`)
    }

    const { fetchZonesFromInsee } = await import('./src/services/inseeService.js')
    const zones = await fetchZonesFromInsee(token, { limit: 3 })
    console.log(`✅ Zones récupérées via service: ${zones.length}`)

    if (zones.length > 0) {
      console.log('📋 Première zone:')
      console.log(JSON.stringify(zones[0], null, 2))
    }

    return true
  } catch (error) {
    console.error('❌ Erreur lors du debug:', error)
    console.error('📝 Stack trace:', error.stack)
    return false
  }
}

// Test des variables d'environnement INSEE
function checkInseeEnv () {
  console.log('🔍 Vérification des variables INSEE...\n')

  const clientId = process.env.VITE_INSEE_CLIENT_ID
  const clientSecret = process.env.VITE_INSEE_CLIENT_SECRET

  console.log(`📋 Client ID: ${clientId ? `${clientId.substring(0, 10)}...` : 'MANQUANT'}`)
  console.log(`📋 Client Secret: ${clientSecret ? `${clientSecret.substring(0, 10)}...` : 'MANQUANT'}`)

  if (!clientId || !clientSecret) {
    console.log('\n❌ Variables INSEE manquantes!')
    console.log('📖 Pour obtenir les clés INSEE:')
    console.log('1. Aller sur https://api.insee.fr/catalogue/')
    console.log('2. Créer un compte et une application')
    console.log('3. Sélectionner l\'API "Géo"')
    console.log('4. Copier Client ID et Client Secret dans .env.local')
    return false
  }

  console.log('✅ Variables INSEE présentes')
  return true
}

// Test des URLs INSEE
async function testInseeURLs () {
  console.log('\n🌐 Test des URLs...\n')

  const urls = [
    'https://api.insee.fr',
    'https://api.insee.fr/token',
    'https://geo.api.gouv.fr',
    'https://geo.api.gouv.fr/communes'
  ]

  for (const url of urls) {
    try {
      console.log(`📡 Test: ${url}`)
      const response = await fetch(url, { method: 'HEAD' })
      console.log(`   Status: ${response.status} ${response.statusText}`)
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
  }
}

// Fonction principale
async function main () {
  console.log('🔍 Debug Complet API INSEE')
  console.log('='.repeat(50))

  // Étape 1: Variables d'environnement
  if (!checkInseeEnv()) {
    return
  }

  console.log('\n' + '='.repeat(50))

  // Étape 2: Test des URLs
  await testInseeURLs()

  console.log('\n' + '='.repeat(50))

  // Étape 3: Test complet de l'API
  const success = await debugInseeAPI()

  console.log('\n' + '='.repeat(50))

  if (success) {
    console.log('🎉 Debug terminé avec succès!')
    console.log('🚀 L\'API INSEE fonctionne correctement')
  } else {
    console.log('⚠️ Des problèmes ont été détectés')
    console.log('📖 Consultez les logs ci-dessus pour plus de détails')
  }
}

// Lancer le debug
main().catch((error) => {
  console.error('\n💥 Erreur fatale:', error)
  process.exit(1)
})
