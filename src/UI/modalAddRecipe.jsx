import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { style } from '../FEATURES/ADD_RECIPE/AddRecipe'
import { useAppProvider } from '../context/appProvider'
import IngredientItem from './IngredientItem'
import PhotoUpload from './PhotoUpload'
import { categories } from '../FEATURES/CATEGORIES/Categories'
import { useSession } from '@clerk/clerk-react'

const base_url = import.meta.env.VITE_API

export default function ModalAddRecipe() {
    const {session} = useSession()
    const [next, setNext] = useState(1)
    const [recipeName, setRecipeName] = useState("")
    const [publisher, setPublisher] = useState("")
    const [description, setDescription] = useState("")
    const [directions, setDirections] = useState("")
    const [sourceUrl, setSourceUrl] = useState("")
    const [cookingTime, setCookingTime] = useState("")
    const [servings, setServings] = useState("") 
    const [category, setCategory] = useState("")
    const {ingredientValues: values, setIngredientValues: setValues, setOpenModal, setFiles, files, setDeleteLastIngredient, ingredientArr, setIngredientArr, recipeIngredients, setRecipeIngredients} = useAppProvider()
    const checkFormat = values?.split(",").length || 0

    function handleNext(e){
        e.preventDefault()
        console.log({ ingredientArr: ingredientArr?.length, if: ingredientArr?.length < 3, checkFormat, values})
        if(next === 0) {
            const checkIngredientCount = recipeIngredients?.length
            if(checkIngredientCount < 1 || checkFormat < 3) return toast("Please provide at least 2 ingredients!", {style: style})
        } else if(next === 1 || next === 2){
            if(!recipeName || !publisher || !description) return toast("Please fill all fields!", {style: style})
            if(!files?.length) return toast("Please upload a photo!", {style: style})
        } else if(next === -1){
            if(!directions || !sourceUrl || !cookingTime || !servings) return toast("Please fill all fields!", {style: style})
        }
        const arr = values?.length ? [...recipeIngredients, values] : recipeIngredients
        const lastIngredientCheck = new Set(arr) // refine ingredient array
        setRecipeIngredients([...lastIngredientCheck])
        setNext(next => next -1)
        // setValues("") - set empty when form is submitted
    }
    function handleBack(e){
        e.preventDefault()
        if(next === 1) return
        setNext(next => next + 1)
    }

    function AddIngredient(enterKey=false){
        if(checkFormat < 3) return toast.error("Please use the right format. i.e name, quantity, per-serving",  {style})
        setRecipeIngredients(arr=>[...arr, values])
        setIngredientArr(i=> [...i, {id: crypto.randomUUID(), component: <IngredientItem /> }])
        !enterKey && setValues("")
    }

    function handleDelete(event, value){
        event.preventDefault()
        const inputValue = event.target.closest("label").querySelector("input").value
        const filterDelItem = recipeIngredients.filter((ingredient)=> ingredient !== inputValue )
        console.log({filterDelItem, inputValue, target:event.target})
        setRecipeIngredients(filterDelItem || [])
        if(ingredientArr.length === 1) return setDeleteLastIngredient(true)
        const filterDelComponent = ingredientArr.filter((ingredient)=> ingredient !== value )
        setIngredientArr(filterDelComponent || [])
    }
        console.log({next})


    async function handleSubmit(e){
        e.preventDefault()
        const recipeData = {
            recipe: recipeName,
            ingredients: recipeIngredients,
            proceedure: directions,
            imageURL: files[0].file || "",
            servings: Number(servings),
            publisher,
            description,
            sourceUrl,
            prepTime: cookingTime,
            category,
        }

        if(!session?.user?.id){
            localStorage.setItem("recipe", recipeData)
            return toast("Please sign in to continue", {style: style})
        } 

        try{
            const recipePayload = JSON.stringify({...recipeData, userId: session?.user?.id})
            console.log({recipePayload})
            const data = await fetch(base_url, {
                method: "POST",
                body: recipePayload,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            const res = await data.text()
            toast.success("Recipe added successfully!", {style})
            setFiles([])
            setRecipeName("")
            setPublisher("")
            setOpenModal(false)
            setDescription("")
            setDirections("")
            setSourceUrl("")
            setCookingTime("")
            setServings("")
            setCategory("")
            setNext(1)
            
            console.log({res})
        }catch(error){
            console.log(error)
            toast.error("An error occurred. Please try again.", {style})  
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
/***************************** ENTER KEY PRESS COMING SOON ********************************************/

//     function handleEnterKey(e) {
//         // e.preventDefault(); // optional: only if you want to block default behavior
//         console.log(e)
//         if (e.code === 'Enter') {
//         AddIngredient(true);
//         }
//   }

//     useEffect(() => {
//         setTimeout(() => {
//             window.addEventListener('keypress', handleEnterKey);
//         }, 1000)

//       return () => {
//         window.removeEventListener('keypress', handleEnterKey);
//       };
//     }, [handleEnterKey]);

//////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='w-[42rem] h-[49rem] max-[440px]:w-full max-[44px]:h-fit bg-white rounded-lg py-8 overflow-hide'>
        <h2 onClick={handleBack} className={`text-2xl font-bold px-8 ${next === 1 ? 'cursor-default' : 'cursor-pointer hover:text-green-600'}`}>{next === 1 ? 'Adding a New Recipe' : '← Recipe Ingredients'}</h2>
        <form className='relative mt-10 '>
            <div style={{transform: `translateX(${((0 + next) *100)-100}%)`}} className={`flex absolute _transition px-8 flex-col gap-4 w-[42rem] max-[440px]:w-full shrink-0`}>
                <PhotoUpload />
                <input type="text" value={recipeName} onChange={(e)=>setRecipeName(e.target.value)} placeholder='Recipe Name' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <input type="text" value={publisher} onChange={(e)=>setPublisher(e.target.value)} placeholder='Publisher' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Recipe Description' className='border border-gray-300 rounded-lg h-32 px-4 py-2 text-xl resize-none'></textarea>
                <button onClick={handleNext} id="1" className='next bg-green-800 text-green-50 font-bold py-4 rounded-lg text-xl hover:bg-green-700 cursor-pointer'>Next</button>
            </div>

            <div style={{transform: `translateX(${((1 + next) *100)-100}%)`}} className='flex absolute max-[440px]:w-full px-8 _transition flex-col gap-4 w-[42rem] h-[40rem] shrink-0'>
                <div className='flex flex-col gap-4'>
                <div className='text-green-900 mb-4 text-3xl flex justify-between items-center'>
                    <h3>Ingredients: {ingredientArr.length}</h3>
                    <div onClick={AddIngredient} className='flex gap-3 items-center cursor-pointer font-bold py-3 rounded-lg px-6 bg-green-800 text-white hover:bg-green-700'> <ion-icon name="add-outline"></ion-icon> <p className=' text-xl'>Add</p></div>
                </div>
                {/* INGREDIENT LIST ITEMS */}
                <div className='overflow-y-auto h-[30rem] flex flex-col gap-4'>
                {ingredientArr?.map((v, i) => <IngredientItem key={v.id} next={next} itemNum={v.id} deleteItem={(e)=>handleDelete(e, v)} />)}
                </div>
                <div>
                <button onClick={handleNext} id="2" className={`next bg-green-800 hover:bg-green-700 w-full text-green-50 font-bold py-4 rounded-lg text-xl  cursor-pointer`}>Next</button>
                </div>
                </div>
            </div>

            <div style={{transform: `translateX(${((2 + next) *100)-100}%)`}} className='flex absolute max-[440px]:w-full px-8 _transition flex-col gap-4 w-[42rem] h-[40rem] shrink-0'>
                <h2 className='text-3xl font-bold text-white'>Recipe Directions</h2>
                <p className='text-xl text-gray-500 text-center mb-8'>Briefly tell how one can obtain your dish in simple steps. e.g 1. Boil water, 2. Add pasta, 3. Cook for 10 minutes</p>
                <textarea value={directions} onChange={(e)=>setDirections(e.target.value)} placeholder='Recipe Directions' className='border border-gray-300 rounded-lg h-64 px-4 py-2 text-xl resize-none'></textarea>
                <input value={sourceUrl} onChange={(e)=>setSourceUrl(e.target.value)} type="text" placeholder='Source URL' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <input value={cookingTime} onChange={(e)=>setCookingTime(e.target.value)} type="text" placeholder='Cooking Time (in minutes)' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <div className='flex gap-4 w-full'>
                <input value={servings} onChange={(e)=>setServings(e.target.value)} type="text" placeholder='Servings: 1' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <select value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Category' className='border w-full border-gray-300 rounded-lg h-12 px-4 text-xl'>
                    {categories.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
                </div>
                <button onClick={handleSubmit} id='3' className='next bg-green-800 text-green-50 font-bold py-4 rounded-lg text-xl hover:bg-green-700 cursor-pointer'>Add Recipe</button>
            </div>
        </form>
    </div>
  )
}

