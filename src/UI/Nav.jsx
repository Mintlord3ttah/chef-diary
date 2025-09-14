import AddRecipe from "../FEATURES/ADD_RECIPE/AddRecipe";
import Account from "../FEATURES/ACCOUNT/Account";
import Logo from "./Logo";
import NavListItem from "./NavListItem";
import Bookmarks from "../FEATURES/BOOKMARKS/bookmarks";

export default function Nav() {
    const cursor = "hover:bg-green-950 cursor"
    return (
        <nav className="cstm-nav text-2xl text-green-100 bg-green-900 flex flex-row p-10 justify-between items-center">
            <Logo />
            <ul className="cstm-h-nav flex flex-row gap-6 font-semibold">
                <NavListItem dropDown={true} height="group-hover:h-[40rem]" component={<Bookmarks />}>BOOKMARK</NavListItem>
                <NavListItem dropDown={true} height={"group-hover:h-[31rem]"} component={<AddRecipe />}>ADD RECIPE</NavListItem>
                <NavListItem dropDown={true} height={"group-hover:h-[10rem]"} component={<Account />}>ACCOUNT</NavListItem>
                <NavListItem dropDown={true}>LEARN MORE</NavListItem>
            </ul>
        </nav>
    )
}

function DropDownIcon() {
    return (
        <span className="text-xl">
            <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
    )
}