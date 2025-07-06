
import './root.css'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { LoaderFunctionArgs } from '@vercel/remix'

export const loader = async ({}: LoaderFunctionArgs) => {

  return {}
}

function Root() {

  return (
  <html lang='en'>
  <head>
    <Meta />
    <Links />
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  </head>
  <body>
    <noscript>
    </noscript>

    <Outlet />

    <ScrollRestoration />
    <Scripts />
  </body>
  </html>
  )
}

export default function App() {

  return (
    <Root />
  )
}