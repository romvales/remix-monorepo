import { useFetcher } from '@remix-run/react';

export function SignInForm() {
  const signin = useFetcher({ key: 'signin' })

  return (
    <signin.Form method='post'>

    </signin.Form>
  )
}

export function SignUpForm() {
  const signup = useFetcher({ key: 'signup' })

  return (
    <signup.Form method='post'>

    </signup.Form>
  )
}

