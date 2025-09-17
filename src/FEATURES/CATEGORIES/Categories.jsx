import { useAppProvider } from "../../context/appProvider"

export const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage", "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "Low-Carb", "High-Protein", "Seafood", "Salad", "Soup", "Appetizer", "Main Course", "Side Dish"]

export default function Categories() {
  const { setUIView, setSearchStr, setIsTyping, setOpenMobileNav, setModalContent, setOpenModal } = useAppProvider()

  function handleCategoryClick(category) {
    setUIView("search-results")
    setIsTyping(true)
    setSearchStr(category)
    setModalContent("search-results")
    setOpenModal(true)
    setOpenMobileNav(false)
  }
  return <div className="w-[52rem] h-[30rem] max-[490px]:w-full max-[900px]:flex justify-center items-center pt-4 bg-green-50 text-2xl">
    <ul className="w-[50rem]  max-[490px]:w-full h-[23rem] flex flex-wrap mx-auto items-center justify-center text-green-950  font-semibold">
        {categories.map(category => (
            <li onClick={()=>handleCategoryClick(category)} className="hover:bg-white cursor-pointer w-fit border border-green-800 py-4 px-10 text-center" key={category} >{category}</li>
        ))}
    </ul>
  </div>
}
