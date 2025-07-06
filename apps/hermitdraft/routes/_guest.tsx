import { Outlet } from '@remix-run/react'
import { LoaderFunctionArgs, replace } from '@vercel/remix'
import { Fragment } from 'react'
import { isLoggedIn } from '../core.service/auth'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (await isLoggedIn(request)) {
    return replace('/')
  }

  return {}
}

export default function Layout() {

  return (
    <Fragment>
      <nav>
        
      </nav>

      <Outlet />

      <footer>
        
      </footer>
    </Fragment>
  )
} 