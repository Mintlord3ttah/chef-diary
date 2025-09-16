import { createContext, useContext, useState } from "react";

const Context = createContext()
//UIV =  "bookmarks" | "add-recipe"| "account" | "learn-more" 
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


    function handleInputFocus(e){
            e.preventDefault();
            setSearchStr("")
            setInputFocus(true)
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
        handleForm
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