
export default function Button({ onClick, children }) {
    return <button onClick={onClick} className="rounded-md w-40 h-16 bg-green-400 hover:bg-green-600">{children}</button>
}
