import React from 'react'
import { useAppProvider } from '../context/appProvider'

export default function Modal({children}) {
    const {openModal, setOpenModal} = useAppProvider()

    function handleCloseModal(e){
        if(e.target.classList.contains("modal")){
            setOpenModal(false)
        }
    }
  return (
    <div onClick={handleCloseModal} className={`modal ${openModal ? 'block' : 'hidden'} px-4 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50`}>
      {children}
    </div>
  )
}
