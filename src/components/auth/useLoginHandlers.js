import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'

export default function useLoginHandlers ({ email, password, acceptCGU, acceptNewsletter }) {
  const navigate = useNavigate()
  const { loginEmail, loginWithProvider } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginEmail(email, password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Erreur connexion:', error)
      window.alert(error.message || 'Erreur lors de la connexion')
    }
  }

  const handleLoginWithGoogle = () => loginWithProvider('google')
  const handleLoginWithApple = () => loginWithProvider('apple')

  return { handleSubmit, handleLoginWithGoogle, handleLoginWithApple }
}
