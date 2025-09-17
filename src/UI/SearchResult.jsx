import React from 'react'
import RecipeComponent from './RecipeComponent'
import { recipes } from '../FEATURES/BOOKMARKS/bookmarks'
import { useAppProvider } from '../context/appProvider'
import Loader from './Loader'

export default function SearchResult() {
    const { searchResults, searchStr, setSearchStr, handleInputBlur,
        handleInputFocus,
        selectedRecipe,
        setSelectedRecipe } = useAppProvider()

    function onFocus(){
        handleInputFocus(_, false)
        setSelectedRecipe(null)
    }
    
    return <div className='bg-white rounded-lg max-[670px]:w-full shadow-xl border border-gray-300 flex'>
        <div className=" w-[50rem] max-[900px]:w-[35rem] max-[670px]:w-full p-10  flex flex-col gap-6">
                <h1 className="text-2xl font-bold">Search result for {searchStr}</h1>
                <input value={searchStr} onFocus={onFocus} onBlur={handleInputBlur} onChange={(e)=>setSearchStr(e.target.value)} type="search" name="search" className="border border-green-300 h-16 rounded-lg text-2xl px-8" />
                {/* <p className="text-green-950">No results found</p> */}
                <h3 className="text-2xl font-bold">{searchResults?.length} found</h3>
                <div className='max-h-[40rem] overflow-y-scroll'>
                    {searchResults?.map(recipe => (
                        <RecipeComponent onClick={()=>setSelectedRecipe(recipe)} useFor="search" key={recipe.id} img={recipe.image_url} title={recipe.title} publisher={recipe.publisher} />
                    ))}
                    {/* {searchResults?.length === 0 && <p className="text-green-950">No results found</p>} */}
                    <div className='w-full flex justify-center my-10'>
                    <Loader />
                    </div>
                </div>
        </div>

        <div className={`${selectedRecipe ? "w-[50rem] pr-[4rem]" : "w-0 pr-0"} max-[1020px]:w-[30rem] max-[670px]:w-0 max-[670px]:pr-0 max-[1020px]:pr-[2rem] overflow-hidden pt-[4rem] transition-all duration-500`}>
            <h1 className={`${selectedRecipe?.title?.length > 50 ? "text-[2rem]" : "text-[4rem]"} max-[1020px]:text-[3rem]`}>{selectedRecipe?.title}</h1>
            <div className='overflow-y-auto max-h-[calc()]'>
            <div className='w-full h-[20rem] overflow-hidden mt-5'>
            <img src={selectedRecipe?.image_url} alt="" className='w-full object-center object-contain' />
            </div>
            {/* <p className='text-xl mt-4'>Published by: {selectedRecipe?.publisher}</p>
            <div className='mt-8 flex flex-col gap-6'>
                <h4 className='text-3xl font-bold'>About this recipe</h4> */}
                {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis dolore temporibus, dignissimos labore veniam incidunt rerum error magnam, excepturi iste debitis laborum saepe neque id quaerat laudantium aspernatur numquam corrupti.</p> */}
            {/* </div> */}
            </div>
        </div>
    </div>
}
