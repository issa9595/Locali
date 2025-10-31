import React, { useState, useCallback, useMemo } from 'react'
import { useZones } from '../features/territories/hooks/useTerritories.jsx'
// import { useTerritoriesRealtime } from '../features/territories/hooks/useTerritoriesRealtime.jsx'

/**
 * Composant de démonstration des communes INSEE (version simplifiée sans temps réel)
 * Utilise la nouvelle architecture modulaire Locali
 */
const CommunesDemo = React.memo(() => {
  const [filter, setFilter] = useState('')
  // const [showRealtime, setShowRealtime] = useState(false)
  // const [realtimeDisabled, setRealtimeDisabled] = useState(false)

  // Hook principal pour récupérer les communes (nouvelle architecture)
  const hookOptions = useMemo(() => ({
    disabled: true, // Désactiver le realtime
    autoFetch: true,
    limit: 1000 // Limiter pour les performances
  }), [])

  const {
    communes,
    // zones, // Alias pour compatibilité
    loading,
    error,
    refresh,
    totalCount
  } = useZones(hookOptions)

  // Hook avec temps réel désactivé temporairement
  // const {
  //   connectionStatus
  // } = useTerritoriesRealtime({
  //   autoFetch: false, // Pas besoin de récupérer à nouveau
  //   disabled: true, // DESACTIVE pour éviter les bugs
  //   onInsert: (territoire) => {
  //     console.log('🟢 Nouveau territoire ajouté:', territoire.nom)
  //     if (showRealtime) {
  //       alert(`Nouveau territoire: ${territoire.nom}`)
  //     }
  //   },
  //   onUpdate: (territoire) => {
  //     console.log('🟡 Territoire mis à jour:', territoire.nom)
  //     if (showRealtime) {
  //       alert(`Territoire mis à jour: ${territoire.nom}`)
  //     }
  //   },
  //   onDelete: (territoire) => {
  //     console.log('🔴 Territoire supprimé:', territoire.nom)
  //     if (showRealtime) {
  //       alert(`Territoire supprimé: ${territoire.nom}`)
  //     }
  //   }
  // })

  // Statut en dur pour éviter les erreurs
  const connectionStatus = 'DISABLED'

  // Fonctions désactivées temporairement
  // const stopRealtime = () => {
  //   setRealtimeDisabled(true)
  //   console.log('🛑 Realtime territoires désactivé manuellement')
  // }

  // const restartRealtime = () => {
  //   setRealtimeDisabled(false)
  //   console.log('🔄 Redémarrage du Realtime territoires...')
  // }

  // Memoizer le filtrage pour éviter les recalculs
  const filteredCommunes = useMemo(() =>
    communes.filter(commune =>
      commune.nom.toLowerCase().includes(filter.toLowerCase())
    ), [communes, filter]
  )

  // Memoizer les handlers
  const handleFilterChange = useCallback((e) => {
    setFilter(e.target.value)
  }, [])

  const handleRefresh = useCallback(() => {
    refresh()
  }, [refresh])

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'SUBSCRIBED': return 'bg-locali-green/20 text-locali-green-dark'
      case 'FAILED': return 'bg-locali-purple/20 text-locali-purple-dark'
      case 'CLOSED': return 'bg-locali-green-light/20 text-locali-green-dark'
      case 'DISABLED': return 'bg-locali-green-light/20 text-locali-text-secondary'
      case 'DISCONNECTED': return 'bg-locali-green-light/20 text-locali-text-secondary'
      default: return 'bg-locali-green-light/30 text-locali-green-dark'
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
        <span className='ml-2'>Chargement des territoires Locali...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        <strong>Erreur Locali:</strong> {error}
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      {/* En-tête */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          🏛️ Locali - Territoires INSEE (Version Stable)
        </h1>
        <div className='flex flex-wrap gap-4 items-center text-sm text-gray-600'>
          <span className='bg-green-100 px-3 py-1 rounded-full'>
            ✅ {totalCount.toLocaleString()} territoires synchronisés
          </span>
          <span className={`px-3 py-1 rounded-full ${getStatusColor(connectionStatus)}`}>
            📡 Temps réel: {connectionStatus}
          </span>

          {/* Contrôles simplifiés */}
          <div className='flex gap-2'>
            <button
              onClick={handleRefresh}
              className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors'
            >
              Actualiser
            </button>
          </div>
        </div>

        {/* Message d'état */}
        <div className='mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg'>
          <p className='text-yellow-800 text-sm'>
            ⚠️ <strong>Mode Stable</strong> - Realtime temporairement désactivé pour éviter les bugs.
            Les données sont mises à jour manuellement.
          </p>
        </div>

        {/* Info architecture */}
        <div className='mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
          <p className='text-blue-800 text-sm'>
            🏗️ <strong>Nouvelle Architecture Modulaire</strong> - Utilise les modules
            <code className='bg-blue-100 px-1 rounded text-xs mx-1'>features/territories</code> et
            <code className='bg-blue-100 px-1 rounded text-xs mx-1'>shared/api</code>
          </p>
        </div>
      </div>

      {/* Contrôles */}
      <div className='mb-6 bg-gray-50 p-4 rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Filtre de recherche */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Rechercher un territoire
            </label>
            <input
              type='text'
              value={filter}
              onChange={handleFilterChange}
              placeholder='Ex: Paris, Lyon, Marseille...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {filter && (
              <p className='text-sm text-gray-500 mt-1'>
                {filteredCommunes.length} territoire(s) trouvé(s)
              </p>
            )}
          </div>

          {/* Info mode stable */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Mode d'affichage
            </label>
            <div className='flex items-center'>
              <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm'>
                Mode Stable - Pas de temps réel
              </span>
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              Les données sont statiques pour éviter les bugs
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-blue-100 p-4 rounded-lg'>
          <div className='text-2xl font-bold text-blue-800'>
            {totalCount.toLocaleString()}
          </div>
          <div className='text-sm text-blue-600'>Total territoires</div>
        </div>
        <div className='bg-green-100 p-4 rounded-lg'>
          <div className='text-2xl font-bold text-green-800'>
            {communes.filter(c => c.population > 100000).length}
          </div>
          <div className='text-sm text-green-600'>Grandes villes (&gt;100k)</div>
        </div>
        <div className='bg-yellow-100 p-4 rounded-lg'>
          <div className='text-2xl font-bold text-yellow-800'>
            {communes.filter(c => c.population < 1000).length}
          </div>
          <div className='text-sm text-yellow-600'>Petites communes (&lt;1k)</div>
        </div>
        <div className='bg-purple-100 p-4 rounded-lg'>
          <div className='text-2xl font-bold text-purple-800'>
            {Math.round(communes.reduce((sum, c) => sum + (c.population || 0), 0) / 1000000)}M
          </div>
          <div className='text-sm text-purple-600'>Population totale</div>
        </div>
      </div>

      {/* Liste des communes */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-3 bg-gray-50 border-b'>
          <h3 className='text-lg font-medium text-gray-900'>
            📋 Territoires Locali {filter && `(filtrés: "${filter}")`}
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Territoire
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Code INSEE
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Population
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Surface (ha)
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Coordonnées
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredCommunes.slice(0, 20).map((commune) => (
                <tr key={commune.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {commune.nom}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-600 font-mono'>
                      {commune.code_insee}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>
                      {commune.population?.toLocaleString() || 'N/A'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>
                      {commune.surface?.toLocaleString() || 'N/A'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {commune.centre_lat && commune.centre_lng
                      ? (
                        <div className='text-xs text-gray-600 font-mono'>
                          <div>{commune.centre_lat.toFixed(4)}</div>
                          <div>{commune.centre_lng.toFixed(4)}</div>
                        </div>
                        )
                      : (
                        <span className='text-sm text-gray-400'>N/A</span>
                        )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCommunes.length > 20 && (
          <div className='px-6 py-3 bg-gray-50 border-t text-sm text-gray-600'>
            Affichage des 20 premiers résultats sur {filteredCommunes.length}
          </div>
        )}
      </div>

      {/* Instructions pour la version stable */}
      <div className='mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h4 className='text-lg font-medium text-blue-900 mb-2'>
          🛡️ Mode Stable Activé
        </h4>
        <div className='text-sm text-blue-800 space-y-2'>
          <p>
            <strong>Locali - Version simplifiée :</strong>
          </p>
          <ol className='list-decimal list-inside space-y-1 ml-4'>
            <li>✅ <strong>Territoires</strong> : 34k communes INSEE synchronisées</li>
            <li>🚫 <strong>Temps réel désactivé</strong> : Pour éviter les bugs</li>
            <li>🏗️ <strong>Architecture modulaire</strong> : Toujours fonctionnelle</li>
            <li><strong>Actualisation manuelle</strong> : Utilisez le bouton "Actualiser"</li>
          </ol>
        </div>
      </div>
    </div>
  )
})

export default CommunesDemo
