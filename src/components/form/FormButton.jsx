import React from 'react'

const FormButton = ({
  type = "button",
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const variants = {
    primary: 'bg-locali-green hover:bg-locali-green-dark text-white',
    secondary: 'bg-locali-blue hover:bg-locali-button-dark text-white',
    outline: 'border-2 border-locali-green text-locali-green hover:bg-locali-green hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-lg'
  }

  return (
    <button
      type={type}
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-poppins-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default FormButton 