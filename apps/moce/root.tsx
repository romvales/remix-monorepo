import { monolith } from '@moce/client/monolith'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { LoaderFunctionArgs } from '@vercel/remix'
import { UserActionRequest } from './types/models/requests'

export const loader = async ({}: LoaderFunctionArgs) => {
  const message = await monolith.saveUser(new UserActionRequest()).then(res => res.toObject())

  return { message }
}

export function Root() {

  return (
  <html lang='en'>
  <head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
    <Links />
    <Meta />
  </head>
  <body>
    <noscript></noscript>

    <Outlet />

    <ScrollRestoration />
    <Scripts />
  </body>
  </html>
  )
}

export default function RootWithContext() {

  return (
    <Root />
  )
}