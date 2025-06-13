import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const statuts = [
  '',
  'Entrepreneur',
  'Investisseur',
  'Collectivité',
  'Autre'
]

const secteurs = [
  '',
  'Commerce',
  'Restauration',
  'Santé',
  'Services',
  'Industrie',
  'Autre'
]

const Register = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    statut: '',
    email: '',
    secteur: '',
    telephone: '',
    password: '',
    passwordConfirm: ''
  })
  const [acceptCGU, setAcceptCGU] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique d'inscription ici
    console.log('Inscription avec', { ...form, acceptCGU, acceptNewsletter })
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/Login/Signup-Background-image.png')" }}
    >
      <div className="bg-[#C6F68D] bg-opacity-95 rounded-2xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-kallisto-bold text-white text-center mb-8 tracking-wide">
          Inscrivez - vous
        </h2>
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Nom"
          />
          <input
            type="text"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Prénom"
          />
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
          >
            <option value="" disabled>Statut</option>
            {statuts.slice(1).map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Email"
          />
          <select
            name="secteur"
            value={form.secteur}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
          >
            <option value="" disabled>Secteur d'activité</option>
            {secteurs.slice(1).map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="tel"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Téléphone"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Mot de passe"
          />
          <input
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white border-none shadow font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 text-base"
            placeholder="Validation du mot de passe"
          />
        </form>
        <div className="w-full flex flex-col gap-2 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cgu"
              checked={acceptCGU}
              onChange={e => setAcceptCGU(e.target.checked)}
              className="mr-2 accent-green-500 w-4 h-4"
              required
            />
            <label htmlFor="cgu" className="text-sm text-gray-800 font-poppins-regular">
              J'accepte les conditions générales d'utilisation
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              checked={acceptNewsletter}
              onChange={e => setAcceptNewsletter(e.target.checked)}
              className="mr-2 accent-green-500 w-4 h-4"
            />
            <label htmlFor="newsletter" className="text-sm text-gray-800 font-poppins-regular">
              J'accepte de recevoir la newsletter ainsi que des offres et actualités exclusives
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-poppins-semibold transition-colors mb-2"
        >
          S'inscrire
        </button>
        <Link
          to="/connexion"
          className="block text-green-900 hover:underline font-poppins-medium text-center mt-2"
        >
          Se connecter
        </Link>
      </div>
    </section>
  )
}

export default Register 