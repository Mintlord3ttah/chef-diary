import Input from './Input'
import { useAppProvider } from '../context/appProvider'
import { useEffect, useState } from 'react'
import useSignUpClerk from '../service/clerk-signup'
import useSignInClerk from '../service/clerk-signin'
import toast from 'react-hot-toast'
import { style } from '../FEATURES/ADD_RECIPE/AddRecipe'
import Logo from './Logo'

export default function AuthForm({type="signin"}) {
    const {setFormType, formType} = useAppProvider()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")
    const {onSignUp, onVerify, pending} = useSignUpClerk({email, password, username})
    const {onSignIn, } = useSignInClerk({email, password})

    async function handleFormSubmit(e){
        e.preventDefault(); 
        const checkSigninInputs = email !== "" && password !== ""
        const checkSignupInputs = email !== "" && password !== "" && username.length > 3
        const checkCodeInput = code.length === 6

        switch(type){
            case "signin":
                return checkSigninInputs ? await onSignIn() : toast.error("Please fill all fields", {style: style})
            case "signup":
                return checkSignupInputs ? await onSignUp() : toast.error("Please input a valid email address, names exceeding 3 characters", {style: style})
            case "code":
                return checkCodeInput ? await onVerify({code}) : toast.error("Please enter a valid 6 digit code", {style: style})    
            default:
                return;
        }
    }

    useEffect(()=>{pending && setFormType("code")},[pending])

  return <form onSubmit={handleFormSubmit} className="relative pt-32 mt-16 flex flex-col gap-4 p-10 w-[35rem] bg-white shadow-xl border border-gray-300 ">
        <div className="text-4xl w-[90%] border border-white h-40 absolute -top-[15%] left-1/2 transform -translate-x-1/2 text-green-50 flex flex-col gap-4 items-center justify-center font-semibold bg-green-950 rounded-lg text-center">
            <span className="">{type === "signin" ? "Welcome Back" :  type === "signup" ? "Register" : "Verify Email"}</span>
            <p className="text-2xl">{type === "code" ? "Please enter the code sent to your email" : "Please input your credentials"}</p>
        </div>
        <div className='flex justify-center'>
            <Logo />
        </div>
        {type === "code" && <Input value={code} onChange={setCode} placeholder="Enter 6 digit code" />}
        {type === "signup" && <Input value={username} onChange={setUsername} placeholder="John Doe" />}
        { type !== "code" && <>
            <Input value={email} onChange={setEmail} type="email" placeholder="example@gmail.com" />
            <Input value={password} onChange={setPassword} type="password" placeholder="password" />
        </>}
        <input  type="submit" value={type === "signin" ? "SIGN IN" : type === "signup" ? "REGISTER" : "VERIFY"} className="border border-gray-300 rounded-lg font-bold py-6 text-xl mt-4 bg-green-950 text-green-50 hover:bg-green-700 cursor-pointer" />
        <div className='flex justify-center w-full text-xl mt-4'>
            <p>{type === "signin" ? <span>Don't have an account ? 
                <span onClick={()=>setFormType("signup")} className='text-green-600 font-bold cursor-pointer '> Register</span></span> :
                <span>Already have an account ? 
                <span onClick={()=>setFormType("signin")} className='text-green-600 font-bold cursor-pointer '> Signin</span></span>
                 }</p>
        </div>
    </form>
}
