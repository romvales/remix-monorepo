import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

import { useFetcher } from '@remix-run/react'
import { ActionFunctionArgs, data } from '@vercel/remix'
import { authenticator } from '../auth'
import { commitAuthSession, getAuthSession } from '../core.service/auth'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getAuthSession(request)
  
  try {
    const author = await authenticator.authenticate('plain', request)

    session.set('author', author)

    return data({ author, login: true }, {
      headers: {
        'Set-Cookie': await commitAuthSession(session),
      },
    })
  } catch (e) {
    console.error(e)
    return { login: false }
  }

}

export default function Login() {
  const login = useFetcher({ key: 'login' })

  return (
    <main>
      <login.Form method='post'>

        <Label>
          <span>Email</span>
          <Input name='username' type='email' autoComplete='username' />
        </Label>

        <Label>
          <span>Password</span>
          <Input name='pass' type='password' autoComplete='current-password' />
        </Label>

        <Button>
          Login
        </Button>

      </login.Form>
    </main>
  )
}