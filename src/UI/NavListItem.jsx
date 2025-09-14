
export default function NavListItem({ dropDown = false, children, component, height = "h-[31rem]" }) {
    const style = "hover:bg-green-950 hover:text-green-50 p-5 cursor-pointer"
    if (dropDown) return <li className={`cstm-nav-li group ${style}`}>{children} <ion-icon name="chevron-down-outline"></ion-icon>
        <div className={`cstm-exp-el h-0 ${height}`}>{component}</div>
    </li>
    return <li className={style}>{children}</li>
}