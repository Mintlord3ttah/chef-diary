
export default function BookmarkedRecipe({
  img, title, publisher, sourceUrl
}) {
  return (
    <div className='relative w-full group: flex flex-col gap-2 border-b-2 p-4 text-lg hover:bg-white transition-all duration-300'>
      <div className='flex items-center gap-4'>
      <img src={img} alt={title} className='size-8' />
      <div className=' flex gap-6 items-center group'>
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="font-medium text-gray-500">14/09/25</span>
        <p className="group-[&:hover]:opacity-100 opacity-0 transition-all duration-300 text-red-600 text-xl p-1 hover:bg-red-100">
        <ion-icon name="trash-outline" ></ion-icon>
        </p>
      </div>
      </div>
      <p>Publisher: <ion-icon name="person-outline"></ion-icon> {publisher}</p>
      {/* <a href={sourceUrl}>View Recipe</a> */}
      <button className="absolute top-1/3 right-4">
      <ion-icon name="chevron-forward-outline"></ion-icon>      
      </button>
    </div>
  )
}
