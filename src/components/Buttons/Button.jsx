import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'font-poppins-medium transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-locali-blue hover:bg-white text-white hover:text-locali-blue focus:ring-locali-blue',
    secondary: 'bg-locali-green hover:bg-locali-green-dark text-white focus:ring-locali-green',
    outline: 'border-2 border-locali-blue text-locali-blue hover:bg-locali-blue hover:text-white focus:ring-locali-blue',
    ghost: 'text-locali-blue hover:bg-locali-blue/10 focus:ring-locali-blue'
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-base'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
