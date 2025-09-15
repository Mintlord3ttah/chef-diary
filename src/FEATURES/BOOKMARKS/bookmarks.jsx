import { useAppProvider } from "../../context/appProvider";
import BookmarkedRecipe from "../../UI/bookmarkedRecipe";

const recipes = [
    { id: 1, title: "Pizza", publisher: "Chef John", img: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg"
    },
    { id: 2, title: "Pasta", publisher: "Chef Jane", img: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
    },
    { id: 3, title: "Burger", publisher: "Chef Smith", img: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
    }
]

export default function Bookmarks() {
    const {setUIView} = useAppProvider()
    const isAuthenticated = true;
  return (
    <div className="w-[30rem] max-[900px]:w-full text-lg flex flex-col items-center text-green-950 bg-green-50 font-semibold">
                {!isAuthenticated ? (
                    <div className="w-full flex flex-col items-center gap-4 p-4">
                        <p className='font-bold text-lg'>Your Bookmarked Recipes</p>
                        <p className=' text-center'>You can view your favorite recipes here.</p>
                    </div>
                ) : 
                recipes.length > 0 ? (
                    recipes.map(recipe => (
                        <BookmarkedRecipe key={recipe.id} {...recipe} />
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center gap-4 p-4">
                        <p className='font-bold text-lg'>No Bookmarks Yet!</p>
                        <p className=' text-center'>You can bookmark your favorite recipes to access them quickly later.</p>
                    </div>
                )}
    </div>
  )
}
