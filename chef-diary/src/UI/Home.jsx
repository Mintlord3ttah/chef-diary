import SearchRecipe from "../FEATURES/SEARCH/SearchRecipe";
import Nav from "./Nav";

export default function Home() {
    const styleFlex = "flex items-center justify-center flex-col"
    return (
        <div className="cstm-home h-screen " >
            <p className="cstm-chef-co text-center text-xl ">The Chef Diary Foundation co.</p>
            <Nav />
            <main className={`cstm-main ${styleFlex} text-green-100 font-medium text-center gap-16 p-10`}>
                <div className={`cstm-wrap-main-content ${styleFlex} gap-12`}>
                    <h1 className="font-extrabold text-6xl tracking-tight text-center dark:text-white">
                        Get All You Need About Recipes in One Place!</h1>
                    {/* <h1 className="text-7xl font-extrabold leading-normal"></h1> */}
                    <p className="text-3xl leading-10">From making of eba/fufu to making of piza and the most difficult of them all you can ever imagine,
                        we have got you covered with a simple step by step approach to achieving that feat...</p>
                    <SearchRecipe />
                </div>
            </main>
        </div>
    )
}


// #052e16
