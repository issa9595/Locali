import React from 'react'

const FormTextarea = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className={`w-full h-full px-4 py-3 rounded-lg bg-white border-none shadow-sm font-poppins-regular text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-locali-blue resize-none ${className}`}
      {...props}
    />
  )
}

export default FormTextarea 