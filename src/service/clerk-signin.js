import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useAppProvider } from '../context/appProvider'
import toast from 'react-hot-toast'
import { style } from '../FEATURES/ADD_RECIPE/AddRecipe'
import { useState } from 'react'

export default function useSignInClerk({email, password}) {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [loading, setLoading] = useState(false)
  const {setOpenModal} = useAppProvider()
  const navigate = useNavigate()

  // Handle the submission of the sign-in form
  const onSignIn = async () => {
    if (!isLoaded) return
    setLoading(true)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        setOpenModal(false)
        navigate('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      // if(err.type === "NETWORK")
      toast.error("Error: Something went wrong", {style: style})
    }finally{
      setLoading(false)
    }
  }

  return { onSignIn, loading }
}