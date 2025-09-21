import Input from './Input'
import { useAppProvider } from '../context/appProvider'
import { useEffect, useState } from 'react'
import useSignUpClerk from '../service/clerk-signup'
import useSignInClerk from '../service/clerk-signin'
import toast from 'react-hot-toast'
import { style } from '../FEATURES/ADD_RECIPE/AddRecipe'
import Logo from './Logo'

const ERRORS = {
    email: {
        invalid: "Invalid email",
        empty: "Email is required",
    },
    password: {
        invalid: "Password must be 8 characters long",
        empty: "Password is required"
    },
    username: {
        invalid: "Name must be more than 3 characters",
        empty: "Please provide a user name"
    },
    code: {
        invalid: "Please enter a valid 6 digit code",
        empty: "Please enter a valid 6 digit code"
    }
}

export default function AuthForm({type="signin"}) {
    const {setFormType, formType} = useAppProvider()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")
    const {onSignUp, onVerify, pending, loading: signupLoading} = useSignUpClerk({email, password, username})
    const {onSignIn, loading: loginLoading} = useSignInClerk({email, password})

    async function handleFormSubmit(e){
        e.preventDefault(); 
        const emailCheck = email.length <= 0 &&  "empty" || ""
        const passwordCheck = password.length > 0 && password.length < 8 && "invalid" || password.length <= 0 &&  "empty" || ""
        const usernamesCheck = username.length > 0 && username.length < 4 && "invalid" || username.length <= 0 &&  "empty" || ""
        const codeCheck = code.length > 0 && code.length < 6 && "invalid" || code.length <= 0 &&  "empty" || ""

        if(type === "signup" && usernamesCheck.length > 0) return toast.error(ERRORS.username[usernamesCheck], {style: style})
        if(type !== "code" && emailCheck.length > 0) return toast.error(ERRORS.email[emailCheck], {style: style})
        if(type !== "code" && passwordCheck.length > 0) return toast.error(ERRORS.password[passwordCheck], {style: style})
        if(type === "code" && codeCheck.length > 0) return toast.error(ERRORS.code[codeCheck], {style: style})

        switch(type){
            case "signin":
                return await onSignIn() 
            case "signup":
                return await onSignUp() 
            case "code":
                return await onVerify({code}) 
            default:
                return;
        }
    }

    useEffect(()=>{pending && setFormType("code")},[pending])

  return <form onSubmit={handleFormSubmit} className="relative pt-32 mt-16 flex flex-col gap-4 p-10 w-[35rem] bg-white shadow-xl border border-gray-300 ">
        <div className="text-4xl w-[90%] border border-white h-40 absolute -top-[15%] left-1/2 transform -translate-x-1/2 text-green-50 flex flex-col gap-4 items-center justify-center font-semibold bg-green-800 rounded-lg text-center">
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
        <input disabled={signupLoading || loginLoading} type="submit" 
            value={type === "signin" ? "SIGN IN" : type === "signup" ? "REGISTER" : "VERIFY"} 
            className={`border border-gray-300 rounded-lg font-bold py-6 text-xl mt-4 ${loginLoading || signupLoading ? "bg-inherit border-dashed border-gray-600 text-gray-800 cursor-wait" : "bg-green-800 hover:bg-green-700"}  text-green-50  cursor-pointer`} />
        <div className='flex justify-center w-full text-xl mt-4'>
            <p>{type === "signin" ? <span>Don't have an account ? 
                <span onClick={()=>setFormType("signup")} className='text-green-600 font-bold cursor-pointer '> Register</span></span> :
                <span>Already have an account ? 
                <span onClick={()=>setFormType("signin")} className='text-green-600 font-bold cursor-pointer '> Signin</span></span>
                 }</p>
        </div>
    </form>
}
