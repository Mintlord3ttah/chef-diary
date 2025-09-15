import React from 'react'
import RecipeComponent from './RecipeComponent'
import { recipes } from '../FEATURES/BOOKMARKS/bookmarks'
import { useAppProvider } from '../context/appProvider'
import Loader from './Loader'

export default function SearchResult() {
    const { searchResults, searchStr, setSearchStr, handleInputBlur,
        handleInputFocus } = useAppProvider()
  return <div className="bg-white w-[50rem]  p-10 rounded-lg shadow-xl border border-gray-300 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Search result for {searchStr}</h1>
        <input value={searchStr} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={(e)=>setSearchStr(e.target.value)} type="search" name="search" className="border border-green-300 h-16 rounded-lg text-2xl px-8" />
        {/* <p className="text-green-950">No results found</p> */}
        <h3 className="text-2xl font-bold">{searchResults?.length} found</h3>
        <div className='max-h-[40rem] overflow-y-scroll'>
            {searchResults?.map(recipe => (
                <RecipeComponent useFor="search" key={recipe.id} img={recipe.image_url} title={recipe.title} publisher={recipe.publisher} />
            ))}
            {/* {searchResults?.length === 0 && <p className="text-green-950">No results found</p>} */}
            <div className='w-full flex justify-center my-10'>
            <Loader />
            </div>
        </div>
    </div>
}
