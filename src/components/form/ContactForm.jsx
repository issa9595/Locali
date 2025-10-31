import React, { useState } from 'react'
import { sendContactEmail } from '../../services/emailService'
import { useToast } from '../../hooks/useToast.jsx'

const ContactForm = ({
  title = 'Nous contacter',
  subtitle = "Une question, un projet ou simplement envie d'échanger ? Notre équipe est à votre écoute. Remplissez le formulaire ci-dessous : nous vous répondrons dans les plus brefs délais.",
  showInBox = true,
  className = ''
}) => {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: null, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFeedback({ type: null, message: '' })
    setSubmitting(true)
    try {
      await sendContactEmail(formData)
      setFeedback({ type: 'success', message: 'Votre message a été envoyé avec succès. Nous vous répondrons rapidement.' })
      showToast('Message envoyé avec succès. Nous vous répondrons rapidement.', { type: 'success' })
      setFormData({ nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' })
    } catch (err) {
      setFeedback({ type: 'error', message: "Une erreur est survenue lors de l'envoi. Merci de réessayer plus tard." })
      showToast("Une erreur est survenue lors de l'envoi. Merci de réessayer plus tard.", { type: 'error' })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const formContent = (
    <>
      {/* En-tête */}
      <div className='text-center mb-6 md:mb-10 '>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-kallisto-bold text-locali-blue mb-4 md:mb-6'>
          {title}
        </h2>
        <p className='text-base md:text-lg lg:text-xl font-poppins-regular text-locali-blue max-w-4xl mx-auto leading-relaxed px-4 md:px-0'>
          {subtitle}
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className='max-w-6xl mx-auto px-4 md:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12'>
          {/* Colonne de gauche - Champs */}
          <div className='space-y-4 md:space-y-6'>
            <input
              type='text'
              name='nom'
              placeholder='Nom'
              value={formData.nom}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue text-base'
              required
            />
            <input
              type='text'
              name='prenom'
              placeholder='Prénom'
              value={formData.prenom}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue text-base'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue text-base'
              required
            />
            <input
              type='tel'
              name='telephone'
              placeholder='Téléphone'
              value={formData.telephone}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue text-base'
            />
          </div>

          {/* Colonne de droite - Sujet et Message */}
          <div className='space-y-4 md:space-y-6'>
            <input
              type='text'
              name='sujet'
              placeholder='Sujet'
              value={formData.sujet}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue text-base'
              required
            />
            <textarea
              name='message'
              placeholder='Ecrivez votre message'
              value={formData.message}
              onChange={handleChange}
              rows={7}
              className='w-full px-4 pt-3 pb-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue resize-none text-base'
              required
            />
          </div>
        </div>

        {/* Bouton d'envoi */}
        {feedback.type && (
          <div className={`mt-4 md:mt-6 text-sm font-poppins-regular ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback.message}
          </div>
        )}
        <div className='mt-4 md:mt-8 text-center md:text-right'>
          <button
            type='submit'
            disabled={submitting}
            className={`w-full md:w-auto bg-locali-green hover:bg-locali-green-dark text-white px-6 md:px-8 py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-base md:text-lg ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Envoi…' : 'Envoyer'}
          </button>
        </div>
      </form>
    </>
  )

  if (showInBox) {
    return (
      <section className={`py-8 md:py-16 bg-locali-background ${className}`}>
        <div className='container mx-auto px-4 md:px-16 lg:px-32'>
          <div className='bg-locali-purple-light rounded-[25px] border-2 border-gray-300 shadow-lg p-4 md:p-8 lg:p-12 max-w-7xl mx-auto'>
            {formContent}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className={className}>
      {formContent}
    </div>
  )
}

export default ContactForm
