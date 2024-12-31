import AddRecipe from "../FEATURES/ADD_RECIPE/AddRecipe";
import Logo from "./Logo";
import NavListItem from "./NavListItem";

export default function Nav() {
    const cursor = "hover:bg-green-950 cursor"
    return (
        <nav className="cstm-nav text-2xl text-green-100 bg-green-900 flex flex-row p-10 justify-between items-center">
            <Logo />
            <ul className="cstm-h-nav flex flex-row gap-6 font-semibold">
                <NavListItem dropDown={true}>BOOKMARK</NavListItem>
                <NavListItem dropDown={true} component={<AddRecipe />}>ADD RECIPE</NavListItem>
                <NavListItem>ACCOUNT</NavListItem>
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