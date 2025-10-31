export default function useLoginHandlers ({ email, password, acceptCGU, acceptNewsletter }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Connexion avec', { email, password, acceptCGU, acceptNewsletter })
  }

  return { handleSubmit }
}
