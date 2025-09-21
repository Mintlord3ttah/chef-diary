import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { useAppProvider } from '../context/appProvider'
import toast from 'react-hot-toast'
import { style } from '../FEATURES/ADD_RECIPE/AddRecipe'

export default function useSignUpClerk({email, password, username}) {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [loading, setLoading] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const {setOpenModal} = useAppProvider ()
//   const router = useRouter()

  // Handle submission of sign-up form
  const onSignUp = async () => {
    if (!isLoaded) return
    setLoading(true)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
        username
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }finally{
      setLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerify = async ({code}) => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        setOpenModal(false)
        // router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      toast.error("Error: Something went wrong", {style: style})

    }
  }

  return {pending: pendingVerification, onSignUp, onVerify, loading}
}