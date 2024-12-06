import AddRecipe from "../FEATURES/ADD_RECIPE/AddRecipe";
import Logo from "./Logo";
import NavList from "./NavListItem";

export default function Nav() {
    const cursor = "hover:bg-green-950 cursor"
    return (
        <nav className="cstm-nav text-2xl text-green-100 bg-green-900 flex flex-row p-10 justify-between items-center">
            <Logo />
            <ul className="flex flex-row gap-6 font-semibold">
                <NavList dropDown={true}>BOOKMARK</NavList>
                <NavList dropDown={true} component={<AddRecipe />}>ADD RECIPE</NavList>
                <NavList>ACCOUNT</NavList>
                <NavList dropDown={true}>LEARN MORE</NavList>
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