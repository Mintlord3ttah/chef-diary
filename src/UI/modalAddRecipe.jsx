import React, { useState } from 'react'

export default function ModalAddRecipe() {
    const [next, setNext] = useState(1)
    const [ingredientArr, setIngredientArr] = useState([<IngredientItem />])

    function handleNext(e){
        e.preventDefault()
        setNext(next => next -1)
    }
    function handleBack(e){
        e.preventDefault()
        if(next === 1) return
        setNext(next => next + 1)
    }

    function AddIngredient(){
        const newIngredentArr = [...ingredientArr, ingredientArr.length + 1]
        setIngredientArr(i=> [...i, <IngredientItem />])
    }

    function handleDelete(id){
        const filterDel = ingredientArr.filter((ingredient, i)=> ingredientArr.indexOf(ingredient) !== id )
        setIngredientArr(filterDel)
    }
  return (
    <div className='w-[42rem] h-[48rem] bg-white rounded-lg py-8 overflow-hidden'>
        <h2 onClick={handleBack} className={`text-2xl font-bold px-8 ${next === 1 ? 'cursor-default' : 'cursor-pointer hover:text-green-600'}`}>{next === 1 ? 'Adding a New Recipe' : '← Recipe Ingredients'}</h2>
        <form className='relative mt-10 '>
            <div style={{transform: `translateX(${((0 + next) *100)-100}%)`}} className={`flex absolute transition-all duration-500 px-8 flex-col gap-4 w-[42rem] shrink-0`}>
                <label  htmlFor="recipe-photo" className='flex flex-col items-center justify-center border-dashed border border-green-900 h-64 w-full rounded-lg cursor-pointer'>
                    <div className='text-7xl'><ion-icon name="cloud-upload-outline"></ion-icon></div>
                    <p className='text-gray-600 text-3xl'>Upload Recipe Photo</p>
                    <input type="file" className='hidden' name="recipe-photo" id="recipe-photo" />
                </label>

                <input type="text" placeholder='Recipe Name' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <input type="text" placeholder='Publisher' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <textarea placeholder='Recipe Description' className='border border-gray-300 rounded-lg h-32 px-4 py-2 text-xl resize-none'></textarea>
                <button onClick={handleNext} className='bg-green-800 text-green-50 font-bold py-4 rounded-lg text-xl hover:bg-green-700 cursor-pointer'>Next</button>
            </div>

            <div style={{transform: `translateX(${((1 + next) *100)-100}%)`}} className='flex absolute  px-8 transition-all duration-500 flex-col gap-4 w-[42rem] h-[40rem] shrink-0'>
                <div className='flex flex-col gap-4'>
                <div className='text-green-900 mb-4 text-3xl flex justify-between items-center'>
                    <h3>Ingredients</h3>
                    <div onClick={AddIngredient} className='flex gap-3 items-center cursor-pointer font-bold py-3 rounded-lg px-6 bg-green-800 text-white hover:bg-green-700'> <ion-icon name="add-outline"></ion-icon> <p className=' text-xl'>Add</p></div>
                </div>
                {/* INGREDIENT LIST ITEMS */}
                <div className='overflow-y-auto h-[30rem] flex flex-col gap-4'>
                {ingredientArr?.map((v, i) => <IngredientItem key={i} itemNum={i + 1} deleteItem={()=>handleDelete(i)} />)}
                </div>
                <div>
                <button onClick={handleNext} disabled={!ingredientArr.length} className={` ${!ingredientArr.length ? "bg-gray-400" : "bg-green-800 hover:bg-green-700"} w-full text-green-50 font-bold py-4 rounded-lg text-xl  cursor-pointer`}>Next</button>
                </div>
                </div>
            </div>

            <div style={{transform: `translateX(${((2 + next) *100)-100}%)`}} className='flex absolute  px-8 transition-all duration-500 flex-col gap-4 w-[42rem] h-[40rem] shrink-0'>
                <h2 className='text-3xl font-bold text-white'>Recipe Directions</h2>
                <p className='text-xl text-gray-500 text-center mb-8'>Briefly tell how one can obtain your dish in simple steps. e.g 1. Boil water, 2. Add pasta, 3. Cook for 10 minutes</p>
                <textarea placeholder='Recipe Directions' className='border border-gray-300 rounded-lg h-64 px-4 py-2 text-xl resize-none'></textarea>
                <input type="text" placeholder='Source URL' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <input type="text" placeholder='Cooking Time (in minutes)' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <input type="text" placeholder='Servings' className='border border-gray-300 rounded-lg h-12 px-4 text-xl' />
                <button onClick={(e)=>e.preventDefault()} className='bg-green-800 text-green-50 font-bold py-4 rounded-lg text-xl hover:bg-green-700 cursor-pointer'>Add Recipe</button>
            </div>
        </form>
    </div>
  )
}


function IngredientItem({ itemNum, deleteItem }) {
    return <label htmlFor={`ingredient-${itemNum}`} className='w-full relative'>
        <input type="text" placeholder='Format: name, quantity, per serving' className='border w-full border-gray-300 rounded-lg h-12 px-4 text-xl' />
        <p onClick={deleteItem} className='cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 text-red-300 hover:text-red-500 text-2xl'><ion-icon name="trash-outline" ></ion-icon></p>
    </label>
}