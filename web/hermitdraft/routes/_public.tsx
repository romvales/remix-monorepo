import { Outlet } from '@remix-run/react'
import { LoaderFunctionArgs } from '@vercel/remix'
import { Fragment } from 'react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  

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