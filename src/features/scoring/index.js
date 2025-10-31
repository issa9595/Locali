// 📈 Module Scoring - Intelligence territoriale
// Algorithmes de notation et d'analyse pour Locali

export { default as ScoreCard } from './components/ScoreCard.jsx'
export { default as ScoreComparison } from './components/ScoreComparison.jsx'
export { default as ScoreVisualization } from './components/ScoreVisualization.jsx'

export { useScoring } from './hooks/useScoring.js'
export { useScoreComparison } from './hooks/useScoreComparison.js'

export { scoringService } from './services/scoringService.js'

export { attractivenessScore } from './algorithms/attractivenessScore.js'
export { economicPotential } from './algorithms/economicPotential.js'
export { competitivenessIndex } from './algorithms/competitivenessIndex.js'
