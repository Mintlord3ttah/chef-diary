import React from 'react'
import { useAppProvider } from '../../context/appProvider';
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';

export default function Account() {
  const {handleForm} = useAppProvider()
  const {signOut} = useClerk()

  return (
    <div className="w-48 flex flex-col items-center gap-4 p-4 text-green-950 bg-green-50 font-semibold">
        <SignedIn>
        <button onClick={()=>signOut({redirect: "/"})} className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign Out</button>
        </SignedIn>
        <SignedOut>
        <button onClick={()=>handleForm("signin")} className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign In</button>
        <button onClick={()=>handleForm("signup")} className='py-3 rounded-lg w-full bg-green-950 hover:bg-green-900 text-green-50'>Register</button>
        </SignedOut>
    </div>
  )
}
