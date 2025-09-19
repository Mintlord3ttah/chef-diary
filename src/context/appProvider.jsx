import { createContext, useContext, useState } from "react";
import IngredientItem from "../UI/IngredientItem";

const Context = createContext()
//UIV =  "bookmarks" | "add-recipe"| "account" | "categories" | "modal-add-recipe"
function AppProviderContext({children}){
    const [formType, setFormType] = useState("signin") // signin or signup
    const [openMobileNav, setOpenMobileNav] = useState(true)
    const [UIView, setUIView] = useState("account") // for mobile nav views
    const [dropdown, setDropdown] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalContent, setModalContent] = useState("") // "auth-form" | search-results - auto
    const [searchResults, setSearchResults] = useState([])
    const [searchStr, setSearchStr] = useState("");
    const [inputFocus, setInputFocus] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ingredientValues, setIngredientValues] = useState("") // per input
    const [recipeIngredients, setRecipeIngredients] = useState([]) // all ingredient values
    const [ingredientArr, setIngredientArr] = useState([{id: crypto.randomUUID(), component: <IngredientItem />}])
    const [deleteLastIngredient, setDeleteLastIngredient] = useState([false])
    const [files, setFiles] = useState([]); // for photo upload
    

    function handleInputFocus(e, clear=true){
            clear && setSearchStr("")
            setInputFocus(true)
            setSelectedRecipe(null)
        }
        function handleInputBlur(e){
            e.preventDefault();
            setInputFocus(false)
        }

    function handleForm(type){
        setFormType(type)
        setOpenModal(true)
        setModalContent("auth-form")
    }

    return <Context.Provider value={{
        formType, 
        setFormType, 
        openMobileNav, 
        setOpenMobileNav, 
        UIView, 
        setUIView, 
        dropdown, 
        setDropdown,
        openModal, 
        setOpenModal,
        modalContent,
        setModalContent,
        setSearchResults,
        searchResults,
        searchStr,
        setSearchStr,
        handleInputBlur,
        handleInputFocus,
        inputFocus,
        handleForm,
        isTyping,
        setIsTyping,
        selectedRecipe,
        setSelectedRecipe,
        ingredientValues,
        setIngredientValues,
        recipeIngredients,
        setRecipeIngredients,
        ingredientArr,
        setIngredientArr,
        setDeleteLastIngredient,
        deleteLastIngredient,
        files,
        setFiles
    }}>
        {children}
    </Context.Provider>
}

function useAppProvider(){
    const context = useContext(Context)

    if(context === undefined) throw Error("Context is used outside of the app provider context")
    return context
}

export {useAppProvider, AppProviderContext}