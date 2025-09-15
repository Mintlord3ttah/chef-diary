import { createContext, useContext, useState } from "react";

const Context = createContext()
//UIV =  "bookmarks" | "add-recipe"| "account" | "learn-more" 
function AppProviderContext({children}){
    const [formType, setFormType] = useState("signin") // signin or signup
    const [openMobileNav, setOpenMobileNav] = useState(false)
    const [UIView, setUIView] = useState("account") // for mobile nav views
    const [dropdown, setDropdown] = useState(false)


    return <Context.Provider value={{
        formType, 
        setFormType, 
        openMobileNav, 
        setOpenMobileNav, 
        UIView, 
        setUIView, 
        dropdown, 
        setDropdown
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