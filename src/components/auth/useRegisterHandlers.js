import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'

export default function useRegisterHandlers (getForm, getAcceptCGU, getAcceptNewsletter) {
  const navigate = useNavigate()
  const { registerEmail, loginWithProvider } = useAuth()

  const handleChange = (e) => {
    const form = getForm()
    return { ...form, [e.target.name]: e.target.value }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = getForm()
      const acceptCGU = getAcceptCGU()
      const acceptNewsletter = getAcceptNewsletter()

      // Validation basique
      if (form.password !== form.passwordConfirm) {
        window.alert('Les mots de passe ne correspondent pas')
        return
      }

      await registerEmail({
        email: form.email,
        password: form.password,
        metadata: {
          first_name: form.prenom,
          last_name: form.nom,
          statut: form.statut,
          secteur: form.secteur,
          telephone: form.telephone,
          newsletter: !!acceptNewsletter,
          accepted_tos: !!acceptCGU
        }
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Erreur inscription complète:', error)
      const message = error.message || error.toString() || 'Erreur lors de l\'inscription'
      window.alert(message)
    }
  }

  const handleRegisterWithGoogle = () => loginWithProvider('google')
  const handleRegisterWithApple = () => loginWithProvider('apple')

  return { handleChange, handleSubmit, handleRegisterWithGoogle, handleRegisterWithApple }
}
