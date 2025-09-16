import React from 'react'

export default function Input({type="text", placeholder, value, onChange}) {
  return <input onChange={(e)=>onChange(e.target.value)} value={value} type={type} placeholder={placeholder} className="text-xl border h-16 border-gray-300 rounded-lg px-4" />

}
