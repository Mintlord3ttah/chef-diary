import { useAppProvider } from '../context/appProvider'

export default function MiniNavItems({iconName, text, ui}) {
    const {setUIView, UIView} = useAppProvider()
    const active = UIView === ui
    return (
        <li onClick={() => setUIView(ui)} className={`flex items-center gap-2 text-xl w-fit px-6 hover:bg-green-600 cursor-pointer rounded-lg py-3 ${active ? "text-white bg-green-700" : "text-green-950"}`}>
            <div className="text-4xl"><ion-icon name={iconName}></ion-icon></div>
            <span>{text}</span>
        </li>
    )
}
