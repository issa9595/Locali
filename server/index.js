import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger .env.local en priorité, puis .env
const envLocalPath = join(__dirname, '..', '.env.local')
const envPath = join(__dirname, '..', '.env')

if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath })
} else if (existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  dotenv.config() // Fallback par défaut
}

const app = express()
const port = process.env.PORT || 8787

const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
let supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variables d\'environnement manquantes: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// S'assurer que l'URL commence par https://
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`
}

console.log('Configuration Supabase:')
console.log('  URL:', supabaseUrl || 'MANQUANTE')
console.log('  Service Key:', supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : 'MANQUANTE')

// Test de connexion à Supabase
console.log('\nTest de connexion à Supabase...')
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Test simple de connexion (ne fait pas de requête réseau réelle)
// On teste plutôt avec une requête réelle
fetch(`${supabaseUrl}/rest/v1/`, {
  method: 'GET',
  headers: {
    apikey: supabaseServiceKey
  }
})
  .then((res) => {
    if (res.ok || res.status === 404) {
      console.log('✅ Connexion Supabase réussie (endpoint accessible)\n')
    } else {
      console.log('⚠️  Connexion Supabase partielle (status:', res.status, ')\n')
    }
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion Supabase:', err.message)
    console.error('   Code:', err.code)
    console.error('   Vérifiez votre connexion Internet et l\'URL Supabase\n')
  })

app.use(cors({
  origin: frontendOrigin,
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/'
}

function setAuthCookies (res, session) {
  res.cookie('sb-access-token', session.access_token, { ...cookieOptions, maxAge: session.expires_in * 1000 })
  res.cookie('sb-refresh-token', session.refresh_token, { ...cookieOptions, maxAge: 60 * 24 * 60 * 60 * 1000 })
}

function clearAuthCookies (res) {
  res.clearCookie('sb-access-token', { ...cookieOptions, maxAge: 0 })
  res.clearCookie('sb-refresh-token', { ...cookieOptions, maxAge: 0 })
}

app.post('/auth/email/signin', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(401).json({ error: error.message })
    setAuthCookies(res, data.session)
    return res.json({ user: data.user })
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.post('/auth/email/signup', async (req, res) => {
  try {
    const { email, password, metadata } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    console.log('Tentative d\'inscription pour:', email)
    console.log('URL Supabase utilisée:', supabaseUrl)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata || {} }
    })

    if (error) {
      console.error('Erreur Supabase signup:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('Inscription réussie pour:', email)
    if (data.session) setAuthCookies(res, data.session)
    return res.json({ user: data.user })
  } catch (e) {
    console.error('Erreur serveur signup:', e)
    console.error('Cause:', e.cause)
    return res.status(500).json({ error: 'Erreur serveur', details: e.message })
  }
})

app.get('/auth/oauth/:provider', async (req, res) => {
  const provider = req.params.provider
  const redirectTo = `${process.env.AUTH_CALLBACK_URL || 'http://localhost:8787/auth/callback'}`
  const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })
  if (error) return res.status(400).json({ error: error.message })
  return res.redirect(data.url)
})

app.get('/auth/callback', async (req, res) => {
  try {
    const code = req.query.code
    if (!code) return res.status(400).send('Code manquant')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return res.status(400).send(error.message)
    setAuthCookies(res, data.session)
    return res.redirect(`${frontendOrigin}/dashboard`)
  } catch (e) {
    return res.status(500).send('Erreur serveur')
  }
})

app.post('/auth/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies['sb-refresh-token']
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token manquant' })
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
    if (error) return res.status(401).json({ error: error.message })
    setAuthCookies(res, data.session)
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.post('/auth/signout', async (req, res) => {
  try {
    const accessToken = req.cookies['sb-access-token']
    if (accessToken) {
      await supabase.auth.admin.signOut(accessToken).catch(() => {})
    }
    clearAuthCookies(res)
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.get('/auth/user', async (req, res) => {
  try {
    const accessToken = req.cookies['sb-access-token']
    if (!accessToken) return res.status(200).json({ user: null, role: null })
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (error || !user) return res.status(200).json({ user: null, role: null })
    // Charger le profil pour récupérer le rôle (optionnel si la table n'existe pas encore)
    let role = 'user'
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single()
      if (profile?.role) role = profile.role
    } catch (profileError) {
      // Table profiles n'existe pas encore ou erreur - on utilise le rôle par défaut
      console.log('Note: Table profiles non disponible, rôle par défaut utilisé')
    }
    return res.json({ user, role })
  } catch (e) {
    console.error('Erreur /auth/user:', e)
    return res.status(500).json({ error: 'Erreur serveur', details: e.message })
  }
})

app.listen(port, () => {
  console.log(`Auth server démarré sur http://localhost:${port}`)
})
