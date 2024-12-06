import { useState } from "react"
import Button from "../../UI/Button"

export default function AddRecipe() {
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
    return <form action="" className="cstm-form-add-recipe bg-green-50 text-green-950">
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
            <div className="flex gap-3">
                <Button onClick={handleNext}>Back &larr;</Button>
                <Button onClick={handleAddRecipe}>+ Add</Button>
                <Button>Submmit</Button>
            </div>
        </div>
    </form>
}



function InputHTML({ type = "text", placeholder = "" }) {

    return <input className="cstm-input h-14 px-5" type={type} id="recipe-name" placeholder={placeholder} />
}

function IngredientItem({ itemNum, deleteItem }) {
    return <label htmlFor="recipe-publisher" className="cstm-ing-label">INGREDIENT {itemNum}
        <InputHTML placeholder="Format: ingredient, quantity, per-serving" />
        <span className="cstm-btn-rm-ing w-7 h-7" onClick={() => deleteItem(itemNum - 1)} title="Remove Item">&times;</span>
    </label>
}