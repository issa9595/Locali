// 🔐 Module Auth - Authentification et gestion des rôles
// Collectivités, entrepreneurs, analystes pour Locali

export { default as LoginForm } from './components/LoginForm.jsx'
export { default as RoleSelector } from './components/RoleSelector.jsx'
export { default as ProtectedRoute } from './components/ProtectedRoute.jsx'

export { useAuth } from './hooks/useAuth.js'
export { usePermissions } from './hooks/usePermissions.js'
export { useRoles } from './hooks/useRoles.js'

export { authService } from './services/authService.js'
export { roleService } from './services/roleService.js'

export { UserRole, Permission } from './types/auth.types.js' 