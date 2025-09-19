import { useEffect, useRef, useState } from 'react'
import { useAppProvider } from '../context/appProvider'

let timeout;
export default function IngredientItem({ itemNum, deleteItem, next }) {
    const {setIngredientValues: setValues, ingredientArr, setDeleteLastIngredient: setLast, deleteLastIngredient: last} = useAppProvider()
    const [inputValues, setInputValues, ] = useState()
    const inpuRef = useRef(null)

    useEffect(()=>{
        if(ingredientArr.length === 1 && last) {
            setInputValues("")
            setLast(false)
            return 
        }
        setValues(inputValues)
    },[inputValues, last])

    useEffect(()=>{
        const lastIngredient = ingredientArr[ingredientArr.length -1].id
        const inputId = inpuRef?.current.id
        console.log({next})
        timeout =setTimeout(()=>{
            if(inputId === lastIngredient && next === 0) inpuRef?.current.focus()
        }, 500)

        return ()=> clearTimeout(timeout)
    },[ingredientArr, next])

    return <label htmlFor={`ingredient-${itemNum}`} className='w-full relative'>
        <input ref={inpuRef} id={itemNum} value={inputValues} onChange={(e)=>setInputValues(e.target.value)} type="text" placeholder='Format: name, quantity, per serving' className='border w-full border-gray-300 rounded-lg h-12 px-4 text-xl' />
        <p onClick={deleteItem} className='cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 text-red-300 hover:text-red-500 text-2xl'><ion-icon name="trash-outline" ></ion-icon></p>
    </label>
}
