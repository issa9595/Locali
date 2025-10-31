// Module Territories - Gestion des zones géographiques
// Communes, départements, régions pour Locali

export { default as TerritoryCard } from './components/TerritoryCard.jsx'
export { default as TerritoryList } from './components/TerritoryList.jsx'
export { default as TerritorySelector } from './components/TerritorySelector.jsx'

export { useTerritories, useCommunes, useZones } from './hooks/useTerritories.jsx'
export { useTerritoriesRealtime } from './hooks/useTerritoriesRealtime.jsx'
export { useTerritoryDetails } from './hooks/useTerritoryDetails.jsx'

export { territoriesApi } from './api/territoriesApi.js'
export { inseeSync } from './api/inseeSync.js'

export { territoryService } from './services/territoryService.js'
export { territoryScoring } from './services/territoryScoring.js'
