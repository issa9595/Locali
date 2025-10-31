import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendContactEmail (formData) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Configuration EmailJS manquante. Vérifiez vos variables d\'environnement.')
  }

  const templateParams = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    telephone: formData.telephone,
    sujet: formData.sujet,
    message: formData.message
  }

  await emailjs.init(PUBLIC_KEY)
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
}
