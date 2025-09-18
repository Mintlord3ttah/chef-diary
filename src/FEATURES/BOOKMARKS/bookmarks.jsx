import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useAppProvider } from "../../context/appProvider";
import RecipeComponent from "../../UI/RecipeComponent";

export const recipes = [
    { id: 1, title: "Pizza", publisher: "Chef John", img: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg"
    },
    { id: 2, title: "Pasta", publisher: "Chef Jane", img: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
    },
    { id: 3, title: "Burger", publisher: "Chef Smith", img: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
    }
]

export default function Bookmarks() {
    const {setUIView, handleForm, setOpenMobileNav} = useAppProvider()
    const isAuthenticated = false;

    function onClickbtn(){
        handleForm("signin")
        setOpenMobileNav(false)
    }
  return (
    <div className="w-[30rem] max-[900px]:w-full text-lg flex flex-col items-center text-green-950 bg-green-50 font-semibold">
        <SignedOut>
            <div className="w-full flex flex-col items-center gap-4 p-4 text-xl">
                <p className='font-bold text-2xl'>Your Bookmarked Recipes</p>
                <p className=' text-center'>You can view your favorite recipes here.</p>
                <button onClick={onClickbtn} className="cstm-search-btn mt-6 glow-button w-fit px-6 py-3 h-full bg-green-950 flex gap-4 items-center cursor-pointer justify-center text-green-100 font-bold text-xl">
                    SIGN IN TO VIEW
                    <ion-icon name="log-in-outline"></ion-icon>
                </button>
            </div>
        </SignedOut>
        <SignedIn>
            { recipes.length > 0 ?
            recipes.map(recipe => (
                <RecipeComponent key={recipe.id} {...recipe} />
            )) :
            <div className="w-full flex flex-col items-center gap-4 p-4">
                <p className='font-bold text-lg'>No Bookmarks Yet!</p>
                <p className=' text-center'>You can bookmark your favorite recipes to access them quickly later.</p>
            </div> }  
        </SignedIn>
    </div>

  )
}
