import stylesHref from './root.css?url'

import { LinksFunction } from '@remix-run/node'
import { CoreContextProvider } from './core/context'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesHref },
]

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
    <CoreContextProvider>
      <Root />
    </CoreContextProvider>
  )
}