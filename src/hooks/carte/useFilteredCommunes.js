import { useMemo } from 'react'

export default function useFilteredCommunes (communes, filterBy, sortBy, sortOrder) {
  return useMemo(() => {
    if (!communes.length) return []

    let filtered = communes

    if (filterBy.type !== 'none') {
      switch (filterBy.type) {
        case 'population': {
          const minPop = parseInt(filterBy.value) || 0
          filtered = communes.filter(c => (c.population || 0) >= minPop)
          break
        }
        case 'name':
          filtered = communes.filter(c => c.nom.toLowerCase().includes((filterBy.value || '').toLowerCase()))
          break
        case 'department':
          filtered = communes.filter(c => (c.code_insee || '').startsWith(filterBy.value))
          break
        default:
          break
      }
    }

    return filtered.sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
        case 'population':
          aVal = a.population || 0
          bVal = b.population || 0
          break
        case 'surface':
          aVal = a.surface || 0
          bVal = b.surface || 0
          break
        case 'density':
          aVal = a.surface > 0 ? (a.population || 0) / a.surface * 100 : 0
          bVal = b.surface > 0 ? (b.population || 0) / b.surface * 100 : 0
          break
        case 'nom':
        default:
          aVal = a.nom
          bVal = b.nom
      }

      if (sortBy === 'nom') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    })
  }, [communes, filterBy, sortBy, sortOrder])
}
