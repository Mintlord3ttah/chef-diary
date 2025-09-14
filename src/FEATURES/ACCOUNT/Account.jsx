import React from 'react'

export default function Account() {
    const isAuthenticated = false;
  return (
    <div className="w-48 flex flex-col items-center gap-4 p-4 text-green-950 bg-green-50 font-semibold">
        { isAuthenticated ? 
        <button className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign Out</button> :   
        <>
        <button className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign In</button>
        <button className='py-3 rounded-lg w-full bg-green-950 hover:bg-green-900 text-green-50'>Register</button>
        </>}
    </div>
  )
}
