import { ClientActionFunctionArgs } from '@remix-run/react'
import { AuthHeader } from '@zapenlist/components/common/auth'
import { SignUpForm } from '@zapenlist/components/forms/auth'

export const clientAction = async (args: ClientActionFunctionArgs) => {
  

  return null
}

export default function SignUp() {
  
  return (
    <>
      <AuthHeader />
      
      <main>
        <section>
          <SignUpForm />
        </section>
      </main>
    </>
  )
}