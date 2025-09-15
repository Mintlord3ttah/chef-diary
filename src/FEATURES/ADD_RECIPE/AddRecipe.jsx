import { useState } from "react"
import Button from "../../UI/Button"
import toast from "react-hot-toast";

export default function AddRecipe() {
    const isAuthenticated = false
    const [isNext, setIsNext] = useState(false);
    const [ingredientArr, setIngredientArr] = useState([<IngredientItem />])

    const container = "recipe-source-info flex p-10 flex-col gap-7"
    function handleNext(e) {
        e.preventDefault()
        setIsNext(n => !n)
    }

    function handleAddRecipe(e) {
        e.preventDefault();
        setIngredientArr(i => [...i, <IngredientItem />])
    }
    function deleteItem(index) {
        const filterDel = ingredientArr.filter((v) => ingredientArr.indexOf(v) !== index)

        setIngredientArr(filterDel)
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Handle form submission logic here
        if (!isAuthenticated) return toast("You need to be signed in to add a recipe", {
            style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#14532d',
                fontSize: '1.6rem',
            }
        })
    }

    return <form action="" className="cstm-form-add-recipe max-[420px]:w-full bg-green-50 shadow-xl text-green-950 text-2xl">
        <div className={`default-0 ${container} ${isNext ? "backward" : "default-0"}`}>
            <label htmlFor="recipe-image">RECIPE NAME
                <InputHTML />
            </label>
            <label htmlFor="recipe-image">IMAGE
                <InputHTML type="file" />
            </label>
            <label htmlFor="recipe-publisher">PUBLISHER
                <InputHTML />
            </label>
            <Button onClick={handleNext}>Next &rarr;</Button>
        </div>
        <div className={`default-1 ${container} ${isNext ? "forward" : "default-1"}`}>
            <div className="cstm-ingredient-list flex flex-col gap-10">
                {ingredientArr?.map((v, i) => <IngredientItem key={i} itemNum={i + 1} deleteItem={deleteItem} />)}
            </div>
            <div className="flex gap-3 max-[420px]:grid grid-cols-2 grid-rows-2">
                <Button onClick={handleNext}>Back &larr;</Button>
                <Button onClick={handleAddRecipe}>+ Add</Button>
                <div className="max-[420px]:col-span-2">
                    <Button onClick={handleSubmit}>Submmit</Button>
                </div>
            </div>
        </div>
    </form>
}



function InputHTML({ type = "text", placeholder = "" }) {

    return <input className="cstm-input max-[420px]:w-full h-14 px-5" type={type} id="recipe-name" placeholder={placeholder} />
}

function IngredientItem({ itemNum, deleteItem }) {
    return <label htmlFor="recipe-publisher" className="cstm-ing-label">INGREDIENT {itemNum}
        <InputHTML placeholder="Format: ingredient, quantity, per-serving" />
        <span className="cstm-btn-rm-ing w-7 h-7" onClick={() => deleteItem(itemNum - 1)} title="Remove Item">&times;</span>
    </label>
}