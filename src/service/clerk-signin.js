import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useAppProvider } from '../context/appProvider'

export default function useSignInClerk({email, password}) {
  const { signIn, setActive, isLoaded } = useSignIn()
  const {setOpenModal} = useAppProvider()
  const navigate = useNavigate()

  // Handle the submission of the sign-in form
  const onSignIn = async () => {
    if (!isLoaded) return

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
    }
  }

  return { onSignIn }
}