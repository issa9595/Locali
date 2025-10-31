export default function useRegisterHandlers (getForm, getAcceptCGU, getAcceptNewsletter) {
  const handleChange = (e) => {
    const form = getForm()
    return { ...form, [e.target.name]: e.target.value }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = getForm()
    const acceptCGU = getAcceptCGU()
    const acceptNewsletter = getAcceptNewsletter()
    console.log('Inscription avec', { ...form, acceptCGU, acceptNewsletter })
  }

  return { handleChange, handleSubmit }
}
