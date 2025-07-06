import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

import { cn } from '@components/lib/utils'
import { Link, MetaFunction, useFetcher } from '@remix-run/react'
import { ActionFunctionArgs, replace } from '@vercel/remix'
import { authenticator } from '../auth'
import { commitAuthSession, getAuthSession } from '../core.service/auth'

import { LoaderCircleIcon } from 'lucide-react'

export const meta: MetaFunction = () => [
  { title: 'Sign In | Hermitdraft' }
]

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getAuthSession(request)
  
  try {
    const author = await authenticator.authenticate('plain', request)

    session.set('author', author)

    return replace('/', {
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
  const login = useFetcher<{ login: boolean }>({ key: 'login' })

  return (
    <main className='mt-12'>
      <section>
        <div className={
          cn(
            'hermitdraft@container',
          )
        }>
          <login.Form
            className={
              cn(
                'grid gap-4',
                'mx-auto bg-zinc-100',
                'max-w-[48ch] border p-4',
              )
            }
            method='post'>

            <section>
              <h1 className='hermitdraft@h2'>Hermitdraft.org</h1>
              <p>A minimalist writing tool for offline writers.</p>
            </section>

            <Label className='grid gap-1'>
              <span>Email</span>
              <Input name='username' type='email' autoComplete='username' />
            </Label>

            <Label className='grid gap-1'>
              <span>Password</span>
              <Input name='pass' type='password' autoComplete='current-password' />
            </Label>

            <Button>
              { login.state == 'submitting' && <LoaderCircleIcon className='animate-spin' /> }
              <span>Login</span>
            </Button>

            <hr />

            <section className={
              cn(
                'flex items-center gap-2 mx-auto',
                'text-zinc-500',
              )
            }>
              <p className='text-sm'>Don't have an account?</p>
              <Button 
                size={'sm'} 
                variant={'link'}
                className={
                  cn(
                    'px-0 h-full',
                  )
                }
                asChild>
                <Link to={'/signup'}>
                  Sign up
                </Link>
              </Button>
            </section>

          </login.Form>
        </div>
      </section>
    </main>
  )
}