import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'

import { Link, useFetcher } from '@remix-run/react'

export function LoginForm() {
  const login = useFetcher({ key: 'login' })

  return (
    <login.Form method='post'>
      
      <section>
        <h2>Login with Zapenlist</h2>
        <p>Connect with legit people finding you to be part of their team.</p>
      </section>

      <section>
        <Label>
          <span>Email Address</span>
        </Label>
      </section>

      <ul>
        <li>
          <Button type='submit'>Login with email</Button>
        </li>
        <li>
          <Button type='button'>
            <span>
              Continue with Google
            </span>
          </Button>
        </li>
      </ul>
    </login.Form>
  )
}

export function LoginOtpForm() {
  const otp = useFetcher({ key: 'otp' })

  return (
    <otp.Form method='post'>
      <section>
        <h1>We’ve sent a code to your email.</h1>
        <p>View your inbox and enter the 6-digit OTP code that we have sent.</p>
      </section>

      <section>
        <div>
          <Label>
            <span>One-time Password</span>
            
          </Label>
          <p>
            Can’t find it on your rom.vales@outlook.com? 
            Check your spam/junk folder or resend the code.
          </p>
        </div>
      </section>

      <ul>
        <li>
          <Button type='submit'>Verify and sign in</Button>
        </li>
        <li>
          <Button type='button'>Resend code</Button>
        </li>
        <li>
          <span>or</span>
          <Link to='/login'>
            Continue with Google
          </Link>
        </li>
      </ul>
    </otp.Form>
  )
}

