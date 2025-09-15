import Input from './Input'
import { useAppProvider } from '../context/appProvider'

export default function AuthForm({type="signin"}) {
    const {setFormType, formType} = useAppProvider()
  return <form className="relative pt-40 mt-16 flex flex-col gap-4 p-10 w-[35rem] bg-white shadow-xl border border-gray-300 ">
        <div className="text-4xl w-[90%] h-40 absolute -top-[15%] left-1/2 transform -translate-x-1/2 text-green-50 flex flex-col gap-4 items-center justify-center font-semibold bg-green-950 rounded-lg text-center">
            <span className="">{type === "signin" ? "Welcome Back" : "Register"}</span>
            <p className="text-2xl">Please input your credentials</p>
        </div>

        {type === "signup" && <Input placeholder="John Doe" />}
        <Input type="email" placeholder="example@gmail.com" />
        <Input type="password" placeholder="password" />
        <input type="submit" value={type === "signin" ? "SIGN IN" : "REGISTER"} className="border border-gray-300 rounded-lg font-bold py-6 text-xl mt-4 bg-green-950 text-green-50 hover:bg-green-700 cursor-pointer" />
        <div className='flex justify-center w-full text-xl mt-4'>
            <p>{type === "signin" ? <span>Don't have an account ? 
                <span onClick={()=>setFormType("signup")} className='text-green-600 font-bold cursor-pointer '> Register</span></span> :
                <span>Already have an account ? 
                <span onClick={()=>setFormType("signin")} className='text-green-600 font-bold cursor-pointer '> Signin</span></span>
                 }</p>
        </div>
    </form>
}
