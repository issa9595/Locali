#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration INSEE-Supabase
 * Usage: node test-sync.js
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Configuration des chemins pour ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '.env.local') })

// Test des variables d'environnement
function testEnvironment() {
  console.log('🧪 Test de la configuration d\'environnement...\n')
  
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_INSEE_CLIENT_ID',
    'VITE_INSEE_CLIENT_SECRET'
  ]

  let allGood = true

  required.forEach(key => {
    const value = process.env[key]
    if (!value) {
      console.log(`❌ ${key}: MANQUANT`)
      allGood = false
    } else if (value.startsWith('votre_') || value.includes('...')) {
      console.log(`⚠️  ${key}: EXEMPLE (remplacez par une vraie valeur)`)
      allGood = false
    } else {
      console.log(`✅ ${key}: OK`)
    }
  })

  console.log()
  
  if (!allGood) {
    console.log('📋 Pour configurer vos variables d\'environnement:')
    console.log('1. Créez un fichier .env.local à la racine du projet')
    console.log('2. Ajoutez vos vraies clés:')
    console.log()
    console.log('VITE_SUPABASE_URL=https://votre-project-id.supabase.co')
    console.log('VITE_SUPABASE_ANON_KEY=eyJ...')
    console.log('VITE_INSEE_CLIENT_ID=votre_client_id')
    console.log('VITE_INSEE_CLIENT_SECRET=votre_client_secret')
    console.log()
    console.log('📖 Consultez README-INSEE-SYNC.md pour les instructions détaillées')
    process.exit(1)
  }

  console.log('🎉 Configuration valide ! Vous pouvez maintenant tester la synchronisation.')
  return true
}

// Test simple de l'API INSEE
async function testInseeAPI() {
  console.log('🔑 Test de l\'API INSEE...')
  
  try {
    const { getInseeToken } = await import('./src/services/inseeService.js')
    const token = await getInseeToken()
    console.log('✅ Token INSEE obtenu avec succès')
    return true
  } catch (error) {
    console.log(`❌ Erreur API INSEE: ${error.message}`)
    return false
  }
}

// Test de connexion Supabase
async function testSupabase() {
  console.log('📊 Test de Supabase...')
  
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    )

    // Test simple de connexion
    const { data, error } = await supabase
      .from('zones')
      .select('count')
      .limit(1)

    if (error && error.code === 'PGRST116') {
      console.log('⚠️  Table "zones" n\'existe pas encore')
      console.log('📋 Créez la table avec le SQL fourni dans README-INSEE-SYNC.md')
      return false
    } else if (error) {
      throw error
    } else {
      console.log('✅ Connexion Supabase réussie')
      console.log(`📊 Table "zones" trouvée`)
      return true
    }
  } catch (error) {
    console.log(`❌ Erreur Supabase: ${error.message}`)
    return false
  }
}

// Fonction principale
async function main() {
  console.log('🧪 Test de Configuration INSEE-Supabase\n')
  console.log('=' .repeat(50))
  
  // Test 1: Variables d'environnement
  if (!testEnvironment()) {
    return
  }
  
  console.log('=' .repeat(50))
  
  // Test 2: API INSEE
  const inseeOk = await testInseeAPI()
  
  console.log('=' .repeat(50))
  
  // Test 3: Supabase
  const supabaseOk = await testSupabase()
  
  console.log('=' .repeat(50))
  
  // Résumé
  if (inseeOk && supabaseOk) {
    console.log('🎉 Tous les tests sont passés !')
    console.log('🚀 Vous pouvez maintenant lancer: node sync-insee-cron.js')
  } else {
    console.log('⚠️  Certains tests ont échoué. Vérifiez votre configuration.')
  }
}

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  console.error('\n💥 Erreur non capturée:', error.message)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('\n💥 Promise rejetée:', reason)
  process.exit(1)
})

// Lancer le test
main().catch((error) => {
  console.error('\n💥 Erreur fatale:', error.message)
  process.exit(1)
}) 