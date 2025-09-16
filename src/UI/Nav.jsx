import AddRecipe from "../FEATURES/ADD_RECIPE/AddRecipe";
import Account from "../FEATURES/ACCOUNT/Account";
import Logo from "./Logo";
import NavListItem from "./NavListItem";
import Bookmarks from "../FEATURES/BOOKMARKS/bookmarks";
import AuthForm from "./AuthForm";
import { useAppProvider } from "../context/appProvider";
import MiniNavItems from "./MobileListItemNav";
import { UserButton } from "@clerk/clerk-react";

export default function Nav() {
    const {formType, openMobileNav, 
        setOpenMobileNav, dropdown, 
        setDropdown,
        UIView,
    } = useAppProvider()
    const cursor = "hover:bg-green-950 cursor"

    const mobileUIViews = {
        "bookmarks": <Bookmarks />,
        "add-recipe": <AddRecipe />,
        "account": <AuthForm type={formType} />,
        "learn-more": <div className="w-48 flex flex-col items-center gap-4 p-4 text-green-950 bg-green-50 font-semibold">
            <p className='font-bold text-lg'>Learn More</p>
            <p className=' text-center'>Learn more about Chef Diary and how to use it.</p>
        </div>
    }

    function handleDropDown(e){
        const target = e.target.classList.contains("dropdown-toggle")
        console.log({target});
        target ? setDropdown(!dropdown) : setDropdown(false)
    }
    return (
        <>
        <nav className="cstm-nav text-2xl text-green-100 bg-green-900 flex flex-row p-10 justify-between items-center">
            <Logo />
            <ul className="cstm-h-nav flex flex-row gap-6 font-semibold">
                <NavListItem dropDown={true} height="group-hover:h-[40rem]" component={<Bookmarks />}>BOOKMARK</NavListItem>
                <NavListItem dropDown={true} height={"group-hover:h-[31rem]"} component={<AddRecipe />}>ADD RECIPE</NavListItem>
                <NavListItem dropDown={true} height={"group-hover:h-[10rem]"} component={<Account />}>ACCOUNT</NavListItem>
                <NavListItem dropDown={true}>LEARN MORE</NavListItem>
                {/* <NavListItem><UserButton /></NavListItem> */}
                {/* <div className="clerk-wrapper isolate "><UserButton appearance={{variables: {fontSize: "100%" }}} /></div> */}
                <UserButton />
                
            </ul>
            <button onClick={()=>setOpenMobileNav(true)} className="text-5xl text-white hover:bg-green-950 cursor p-1 max-[900px]:block hidden"><ion-icon name="grid-outline"></ion-icon></button>

        </nav>

        <nav onClick={handleDropDown} className={`hidden  text-green-950 fixed  bg-green-100 h-screen max-[900px]:flex flex-col ${openMobileNav ? "w-full" : "w-0"} transition-all duration-500 overflow-hidden`}>
          <div className={` bg-white px-10 shadow-xl z-10`}>
            <div className="relative dropdown-toggle flex justify-between items-center w-full h-fit pb-8 border-b border-green-300">
                <div className="flex items-center gap-6 text-3xl font-semibold">
                    <Logo text={false} />
                    <p>/ { UIView.replace("-", " ")}</p>
                </div>
                <button onClick={()=>setOpenMobileNav(false)} className="text-5xl text-green-950 h-fit hover:text-white hover:bg-green-950 cursor p-1">&times;</button>
                <button  className="dropdown-toggle absolute -bottom-6 left-[45%]  text-3xl text-green-950 bg-white rounded-full size-12 flex items-center justify-center border border-green-500 hover:bg-green-200 cursor p-1">
                  <p className="dropdown-toggle absolute top-0 left-0 size-full z-10"></p>
                  <ion-icon  name={dropdown ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
                </button>
            </div>
            <ul className={` text-xl flex flex-col ${dropdown ? " h-[19rem] mt-10" : "h-0 mt-0"} font-semibold transition-all duration-500  overflow-hidden`}>
                <MiniNavItems ui="bookmarks" iconName={"bookmarks-outline"} text={"BOOKMARK"} />
                <MiniNavItems ui="add-recipe" iconName={"add-circle-outline"} text={"ADD RECIPE"} />
                <MiniNavItems ui="learn-more" iconName={"help-circle-outline"} text={"LEARN MORE"} />
                <MiniNavItems ui="account" iconName={"person-circle-outline"} text={"ACCOUNT"} />
            </ul>
          </div>

          <section className="flex-1">
            <div className="max-w-[70rem] mx-auto mt-16 flex items-center justify-center p-10">
              {mobileUIViews[UIView]}
            </div>
          </section>
        </nav>
        </>

    )
}

function DropDownIcon() {
    return (
        <span className="text-xl">
            <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
    )

}

