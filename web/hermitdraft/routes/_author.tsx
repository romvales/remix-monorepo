
import { useRoute_authorLoaderData } from '@hermitdraft/core.service/routes'
import { ClientLoaderFunctionArgs, Outlet } from '@remix-run/react'
import { LoaderFunctionArgs, replace } from '@vercel/remix'
import { Fragment } from 'react'
import { getAuthSession, isLoggedIn } from '../core.service/auth'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!await isLoggedIn(request)) {
    return replace('/land')
  }

  const session = await getAuthSession(request)
  const author = session.get('author') as HermitTypes.Author
  
  return { author }
}

export const clientLoader = async ({ request, serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()

  return { author }
}

export function HydrateFallback() {
  return (
    <Fragment>
      <p>Loading data...</p>
    </Fragment>
  )
}

export default function Layout() {
  const { author } = useRoute_authorLoaderData()

  return (
    <Fragment>
      <nav>

      </nav>

      <Outlet />
    </Fragment>
  )
}