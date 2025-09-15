import React from 'react'
import { useAppProvider } from '../../context/appProvider';

export default function Account() {
  const {openModal, setOpenModal, setFormType, setModalContent} = useAppProvider()

  function handleForm(type){
    setFormType(type)
    setOpenModal(true)
    setModalContent("auth-form")
  }
    const isAuthenticated = false;
  return (
    <div className="w-48 flex flex-col items-center gap-4 p-4 text-green-950 bg-green-50 font-semibold">
        { isAuthenticated ? 
        <button className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign Out</button> :   
        <>
        <button onClick={()=>handleForm("signin")} className='py-3 rounded-lg w-full hover:bg-green-900 hover:text-green-50'>Sign In</button>
        <button onClick={()=>handleForm("signup")} className='py-3 rounded-lg w-full bg-green-950 hover:bg-green-900 text-green-50'>Register</button>
        </>}
    </div>
  )
}
