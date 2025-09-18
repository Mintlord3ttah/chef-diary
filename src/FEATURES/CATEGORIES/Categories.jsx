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
  return <div className="w-[52rem] h-[30rem] max-[490px]:h-[43rem] max-[490px]:w-full -my-8 flex justify-center items-center bg-green-50 text-2xl max-[380px]:text-xl">
    <ul className="w-[50rem]  max-[490px]:w-full max-[490px]:h-[40rem] overflow-y-auto h-[23rem] flex flex-wrap max-[380px]:grid max-[380px]:grid-cols-2 max-[380px]:px-4  mx-auto items-center justify-center text-green-950  font-semibold">
        {categories.map(category => (
            <li onClick={()=>handleCategoryClick(category)} className="hover:bg-white cursor-pointer w-fit max-[380px]:w-full border border-green-800 py-4 px-10 text-center" key={category} >{category}</li>
        ))}
    </ul>
  </div>
}
