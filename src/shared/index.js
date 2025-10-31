// Shared - Code partagé entre tous les modules Locali
// APIs, hooks, utils, config, constants

// API Clients
export { inseeApi } from './api/inseeApi.js'
export { sireneApi } from './api/sireneApi.js'
export { supabaseClient } from './api/supabaseClient.js'

// Hooks globaux
export { useAsync } from './hooks/useAsync.js'
export { useDebounce } from './hooks/useDebounce.js'
export { useLocalStorage } from './hooks/useLocalStorage.js'

// Utilitaires
export { formatters } from './utils/formatters.js'
export { validators } from './utils/validators.js'
export { helpers } from './utils/helpers.js'

// Configuration
export { config } from './config/config.js'
export { env } from './config/env.js'

// Constantes
export { CONSTANTS } from './constants/index.js'
