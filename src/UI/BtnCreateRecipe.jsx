import React from 'react'
import { useAppProvider } from '../context/appProvider'

export default function BtnCreateRecipe() {
    const {openModal, setOpenModal, setModalContent} = useAppProvider()
    function handleOpenModal(){
        setOpenModal(!openModal)
        setModalContent("modal-add-recipe")
    }
  return (
    <li className="flex items-center">
      <button onClick={handleOpenModal} className="add-recipe-button shadow-md flex gap-4 items-center  bg-gradient-to-tr from-white to-green-200 text-black py-3 px-8 rounded-lg">
        <p className="text-4xl text-green-500"><ion-icon name="add-circle"></ion-icon></p>
        <span>Add a Recipe</span>
      </button>
    </li>
  )
}
