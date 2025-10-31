/**
 * Script de nettoyage complet de l'état de l'application Locali
 * À exécuter dans la console du navigateur pour réinitialiser tout
 */

// Fonction de nettoyage principal
function resetLocaliApp () {
  console.log('🧹 Nettoyage complet de l\'application Locali...')

  // 1. Nettoyer le localStorage
  const localiKeys = Object.keys(localStorage).filter(key =>
    key.includes('locali') || key.includes('territories') || key.includes('auto')
  )

  localiKeys.forEach(key => {
    localStorage.removeItem(key)
    console.log(`🗑️ Supprimé: ${key}`)
  })

  // 2. Nettoyer le sessionStorage
  const sessionKeys = Object.keys(sessionStorage).filter(key =>
    key.includes('locali') || key.includes('territories') || key.includes('auto')
  )

  sessionKeys.forEach(key => {
    sessionStorage.removeItem(key)
    console.log(`🗑️ Supprimé (session): ${key}`)
  })

  // 3. Réinitialiser les compteurs de hooks
  if (window.hookIdCounter) {
    window.hookIdCounter = 0
    console.log('🔢 Compteur de hooks réinitialisé')
  }

  // 4. Nettoyer le cache des territoires (si accessible)
  if (window.territoriesCache) {
    window.territoriesCache = {
      data: null,
      timestamp: null,
      loading: false,
      CACHE_DURATION: 5 * 60 * 1000
    }
    console.log('💾 Cache des territoires vidé')
  }

  // 5. Message de confirmation
  console.log('✅ Nettoyage terminé!')
  console.log('🔄 Rechargez la page pour un redémarrage propre')

  // 6. Recharger automatiquement après 2 secondes
  setTimeout(() => {
    console.log('🔄 Rechargement automatique...')
    window.location.reload()
  }, 2000)
}

// Fonction de diagnostic
function diagnosisLocaliApp () {
  console.log('🔍 Diagnostic de l\'application Locali')
  console.log('=====================================')

  // localStorage
  const localiKeys = Object.keys(localStorage).filter(key =>
    key.includes('locali') || key.includes('territories') || key.includes('auto')
  )
  console.log(`📦 LocalStorage (${localiKeys.length} clés):`, localiKeys)

  // sessionStorage
  const sessionKeys = Object.keys(sessionStorage).filter(key =>
    key.includes('locali') || key.includes('territories') || key.includes('auto')
  )
  console.log(`🎯 SessionStorage (${sessionKeys.length} clés):`, sessionKeys)

  // Vérifier les variables globales
  console.log('🌐 Variables globales:')
  console.log('- hookIdCounter:', window.hookIdCounter || 'undefined')
  console.log('- territoriesCache:', window.territoriesCache || 'undefined')

  // Vérifier les erreurs récentes
  console.log('📊 État de l\'application:')
  console.log('- URL actuelle:', window.location.href)
  console.log('- User Agent:', navigator.userAgent.split(') ')[0] + ')')
  console.log('- Timestamp:', new Date().toLocaleString('fr-FR'))
}

// Export pour usage direct
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resetLocaliApp, diagnosisLocaliApp }
} else {
  // Usage navigateur - ajouter aux globales
  window.resetLocaliApp = resetLocaliApp
  window.diagnosisLocaliApp = diagnosisLocaliApp

  console.log('🛠️ Outils de diagnostic Locali chargés!')
  console.log('Usage:')
  console.log('- resetLocaliApp() : Nettoie tout et recharge')
  console.log('- diagnosisLocaliApp() : Affiche l\'état actuel')
}
