import React, { useState } from 'react'

const ContactForm = ({ 
  title = "Nous contacter",
  subtitle = "Une question, un projet ou simplement envie d'échanger ? Notre équipe est à votre écoute. Remplissez le formulaire ci-dessous : nous vous répondrons dans les plus brefs délais.",
  showInBox = true,
  className = ""
}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique de soumission du formulaire
    console.log('Données du formulaire:', formData)
  }

  const formContent = (
    <>
      {/* En-tête */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-kallisto-bold text-locali-blue mb-6">
          {title}
        </h2>
        <p className="text-xl font-poppins-regular text-locali-blue max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Colonne de gauche - Champs */}
          <div className="space-y-6">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue"
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue"
              required
            />
            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue"
            />
          </div>

          {/* Colonne de droite - Sujet et Message */}
          <div className="space-y-6">
            <input
              type="text"
              name="sujet"
              placeholder="Sujet"
              value={formData.sujet}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue"
              required
            />
            <textarea
              name="message"
              placeholder="Ecrivez votre message"
              value={formData.message}
              onChange={handleChange}
              rows={7}
              className="w-full px-4 pt-3 pb-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue resize-none"
              required
            />
          </div>
        </div>

        <div className="mt-8"></div>

        {/* Bouton d'envoi */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-locali-green hover:bg-locali-green-dark text-white px-8 py-3 rounded-lg font-poppins-medium transition-all duration-300 ease-in-out text-lg"
          >
            Envoyer
          </button>
        </div>
      </form>
    </>
  )

  if (showInBox) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="container mx-auto px-16 lg:px-32">
          <div className="bg-locali-purple-light rounded-[25px] border-2 border-gray-300 shadow-lg p-8 md:p-12 max-w-7xl mx-auto">
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