/**
 * Page d'exemple pour démontrer l'utilisation du système INSEE
 */

import React, { useState } from 'react'
import { useZones } from '../hooks/useZonesRealtime'
import { runFullSync } from '../services/syncZones'
import { startAutoSync, stopAutoSync, getAutoSyncStatus } from '../services/syncScheduler'

export default function ExempleInsee () {
  const [syncResult, setSyncResult] = useState(null)
  const [isManualSyncing, setIsManualSyncing] = useState(false)
  const [autoSyncStatus, setAutoSyncStatus] = useState(null)

  // Hook simple pour récupérer les zones
  const { zones, loading, error, connectionStatus, refresh, totalCount } = useZones()

  // Fonction pour lancer une synchronisation manuelle
  const handleManualSync = async () => {
    setIsManualSyncing(true)
    try {
      const result = await runFullSync({
        batchSize: 50, // Plus petit batch pour l'exemple
        forceRefresh: false
      })
      setSyncResult(result)
    } catch (error) {
      setSyncResult({ success: false, error: error.message })
    } finally {
      setIsManualSyncing(false)
    }
  }

  // Démarrer la synchronisation automatique
  const handleStartAutoSync = () => {
    startAutoSync({
      interval: 60000, // 1 minute pour l'exemple (normalement 24h)
      onSuccess: (result) => {
        console.log('✅ Sync auto réussie:', result)
        setAutoSyncStatus(getAutoSyncStatus())
      },
      onError: (error) => {
        console.error('Sync auto échouée:', error)
        setAutoSyncStatus(getAutoSyncStatus())
      }
    })
    setAutoSyncStatus(getAutoSyncStatus())
  }

  // Arrêter la synchronisation automatique
  const handleStopAutoSync = () => {
    stopAutoSync()
    setAutoSyncStatus(null)
  }

  return (
    <div className='min-h-screen bg-locali-green-light/5 p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-locali-text-primary mb-8'>
          🇫🇷 Système INSEE - Supabase
        </h1>

        {/* Statut de connexion */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>📡 Statut de Connexion</h2>
          <div className='flex items-center space-x-4'>
            <div className={`w-4 h-4 rounded-full ${
              connectionStatus === 'SUBSCRIBED'
? 'bg-locali-green'
              : connectionStatus === 'CONNECTING' ? 'bg-locali-green-light' : 'bg-locali-purple-dark'
            }`}
            />
            <span className='font-medium'>
              {connectionStatus === 'SUBSCRIBED'
                ? '✅ Connecté en temps réel'
                : connectionStatus === 'CONNECTING' ? 'Connexion en cours...' : 'Déconnecté'}
            </span>
            {loading && <span className='text-locali-text-secondary'>Chargement des données...</span>}
          </div>
        </div>

        {/* Données chargées */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Données Chargées</h2>
          {error
            ? (
              <div className='text-locali-purple-dark mb-4'>
                Erreur: {error}
              </div>
              )
            : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-locali-blue/10 p-4 rounded'>
                  <div className='text-2xl font-bold text-locali-blue'>{totalCount}</div>
                  <div className='text-locali-text-primary'>Zones chargées</div>
                </div>
                <div className='bg-locali-green/10 p-4 rounded'>
                  <div className='text-2xl font-bold text-locali-green'>
                    {zones.filter(z => z.population).length}
                  </div>
                  <div className='text-locali-green-dark'>Avec population</div>
                </div>
                <div className='bg-locali-purple/20 p-4 rounded'>
                  <div className='text-2xl font-bold text-locali-purple-dark'>
                    {zones.filter(z => z.geometrie).length}
                  </div>
                  <div className='text-locali-text-primary'>Avec géométrie</div>
                </div>
              </div>
              )}

          <button
            onClick={refresh}
            className='mt-4 bg-locali-blue hover:bg-locali-button-hover text-white px-4 py-2 rounded transition-colors'
          >
            Actualiser
          </button>
        </div>

        {/* Synchronisation manuelle */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Synchronisation Manuelle</h2>
          <p className='text-locali-text-secondary mb-4'>
            Lancez une synchronisation manuelle pour récupérer les dernières données INSEE.
          </p>

          <button
            onClick={handleManualSync}
            disabled={isManualSyncing}
            className={`px-6 py-3 rounded font-medium transition-colors ${
              isManualSyncing
                ? 'bg-locali-green-light/50 text-locali-text-secondary cursor-not-allowed'
                : 'bg-locali-green hover:bg-locali-green-dark text-white'
            }`}
          >
            {isManualSyncing ? '⏳ Synchronisation en cours...' : '🚀 Lancer la synchronisation'}
          </button>

          {syncResult && (
            <div className={`mt-4 p-4 rounded ${
              syncResult.success ? 'bg-locali-green/10 border border-locali-green' : 'bg-locali-purple/10 border border-locali-purple-dark'
            }`}
            >
              <h3 className='font-semibold mb-2'>
                {syncResult.success ? 'Synchronisation réussie' : 'Synchronisation échouée'}
              </h3>
              {syncResult.success
                ? (
                  <div className='text-sm text-locali-text-secondary'>
                    <p>• Total traité: {syncResult.totalFetched}</p>
                    <p>• Mises à jour: {syncResult.updated}</p>
                    <p>• Ignorées: {syncResult.skipped}</p>
                    <p>• Durée: {syncResult.duration}s</p>
                  </div>
                  )
                : (
                  <p className='text-locali-purple-dark'>{syncResult.error}</p>
                  )}
            </div>
          )}
        </div>

        {/* Synchronisation automatique */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>⚙️ Synchronisation Automatique</h2>
          <p className='text-locali-text-secondary mb-4'>
            Configurez une synchronisation automatique périodique.
          </p>

          <div className='flex space-x-4 mb-4'>
            <button
              onClick={handleStartAutoSync}
              disabled={autoSyncStatus?.isRunning}
              className={`px-4 py-2 rounded transition-colors ${
                autoSyncStatus?.isRunning
                  ? 'bg-locali-green-light/50 text-locali-text-secondary cursor-not-allowed'
                  : 'bg-locali-blue hover:bg-locali-button-hover text-white'
              }`}
            >
              Démarrer
            </button>

            <button
              onClick={handleStopAutoSync}
              disabled={!autoSyncStatus?.isRunning}
              className={`px-4 py-2 rounded transition-colors ${
                !autoSyncStatus?.isRunning
                  ? 'bg-locali-green-light/50 text-locali-text-secondary cursor-not-allowed'
                  : 'bg-locali-purple-dark hover:bg-locali-purple text-white'
              }`}
            >
              Arrêter
            </button>
          </div>

          {autoSyncStatus && (
            <div className='bg-locali-green-light/10 p-4 rounded'>
              <h4 className='font-medium mb-2'>Statut:</h4>
              <div className='text-sm text-locali-text-secondary space-y-1'>
                <p>• État: {autoSyncStatus.isRunning ? '🟢 Actif' : '🔴 Arrêté'}</p>
                {autoSyncStatus.lastSyncTime && (
                  <p>• Dernière sync: {new Date(autoSyncStatus.lastSyncTime).toLocaleString('fr-FR')}</p>
                )}
                {autoSyncStatus.nextSyncTime && (
                  <p>• Prochaine sync: {new Date(autoSyncStatus.nextSyncTime).toLocaleString('fr-FR')}</p>
                )}
                <p>• Historique: {autoSyncStatus.syncHistory.length} synchronisations</p>
              </div>
            </div>
          )}
        </div>

        {/* Liste des zones (échantillon) */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>📋 Échantillon des Zones</h2>
          {zones.length > 0
            ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                  <thead>
                    <tr className='bg-locali-green-light/10'>
                      <th className='px-4 py-2 text-left'>Nom</th>
                      <th className='px-4 py-2 text-left'>Code INSEE</th>
                      <th className='px-4 py-2 text-left'>Population</th>
                      <th className='px-4 py-2 text-left'>Surface (km²)</th>
                      <th className='px-4 py-2 text-left'>Géométrie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zones.slice(0, 10).map((zone) => (
                      <tr key={zone.id} className='border-t border-locali-green-light/20'>
                        <td className='px-4 py-2 font-medium'>{zone.nom}</td>
                        <td className='px-4 py-2 font-mono text-sm'>{zone.code_insee}</td>
                        <td className='px-4 py-2'>
                          {zone.population ? zone.population.toLocaleString() : '-'}
                        </td>
                        <td className='px-4 py-2'>
                          {zone.surface ? zone.surface.toFixed(1) : '-'}
                        </td>
                        <td className='px-4 py-2'>
                          {zone.geometrie ? '' : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {zones.length > 10 && (
                  <p className='text-locali-text-secondary text-sm mt-2'>
                    ... et {zones.length - 10} autres zones
                  </p>
                )}
              </div>
              )
            : (
              <p className='text-locali-text-secondary'>Aucune zone chargée</p>
              )}
        </div>
      </div>
    </div>
  )
}
