import { ClientActionFunctionArgs } from '@remix-run/react'
import { AuthHeader } from '@zapenlist/components/common/auth'

import { SignInForm } from '@zapenlist/components/forms/auth'

export const clientAction = async (args: ClientActionFunctionArgs) => {

  return null
}

export default function SignIn() {

  return (
    <>
      <AuthHeader />
      
      <main>
        <section>
          <SignInForm />
        </section>
      </main>
    </>
  )
}
