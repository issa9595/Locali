import React from 'react'

const FormInput = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue ${className}`}
      {...props}
    />
  )
}

export default FormInput
