
import { ClientLoaderFunctionArgs, Link, NavLink, Outlet, useSubmit } from '@remix-run/react'
import { LoaderFunctionArgs, replace } from '@vercel/remix'
import { Fragment } from 'react'

import { getSessionData, isLoggedIn } from '../core.service/auth'

import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { content } from '@hermitdraft/content'
import { LoaderCircleIcon } from 'lucide-react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!await isLoggedIn(request)) {
    return replace('/land')
  }

  const { author } = await getSessionData(request)
  return { author }
}

export const clientLoader = async ({ request, serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()
  return { author }
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return (
    <Fragment>
      <header className={cn('my-10')}>
        <div className='hermitdraft@container text-center'>
          <h1 className='font-semibold'>{content.name}</h1>
          <p>{content.tagline}</p>
        </div>
      </header>

      <main>
        <section>
          <div className='hermitdraft@container grid items-center'>
            <div className='flex justify-center items-center gap-1'>
              <LoaderCircleIcon size={14} className='animate-spin' />
              <p>Loading data...</p>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  )
}

export default function Layout() {
  const submit = useSubmit()

  const onLogout = () => submit(new FormData(), {
    action: 'logout',
    method: 'post',
    navigate: false,
  })
  
  return (
    <Fragment>
      <nav>
        <div className={
          cn(
            'hermitdraft@container',
            'flex items-center justify-between my-4',
          )
        }>
          <Link 
            className='font-semibold'
            to='/'>
            {content.name}
          </Link>

          <ul className='flex gap-4 items-center'>
            <li>
              <Button className='px-0' variant={'link'} asChild>
                <NavLink to='/media'>
                  Media
                </NavLink>
              </Button>
            </li>
            <li>
              <Button className='px-0' variant={'link'} onClick={onLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </Fragment>
  )
}