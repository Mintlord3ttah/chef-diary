
export default function Button({ onClick, children }) {
    return <button onClick={onClick} className="rounded-md max-[420px]:w-full w-40 h-16 bg-green-400 hover:bg-green-600">{children}</button>
}
