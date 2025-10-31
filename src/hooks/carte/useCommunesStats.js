import { useMemo } from 'react'

export default function useCommunesStats (communes, filteredCommunes) {
  return useMemo(() => {
    if (!communes.length) return {}

    const communesWithData = communes.filter(c => c.population && c.surface)

    return {
      totalCommunes: communes.length,
      filteredCount: filteredCommunes.length,
      totalPopulation: communes.reduce((sum, c) => sum + (c.population || 0), 0),
      filteredPopulation: filteredCommunes.reduce((sum, c) => sum + (c.population || 0), 0),
      totalSurface: communes.reduce((sum, c) => sum + (c.surface || 0), 0),
      averageDensity: communesWithData.length > 0
        ? Math.round(communesWithData.reduce((sum, c) => sum + (c.population / c.surface * 100), 0) / communesWithData.length)
        : 0,
      largestCommune: communes.reduce((max, c) => (c.population || 0) > (max.population || 0) ? c : max, {}),
      smallestCommune: communes.reduce((min, c) => (c.population || 0) < (min.population || 0) && c.population > 0 ? c : min, { population: Infinity })
    }
  }, [communes, filteredCommunes])
}
