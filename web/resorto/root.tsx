import './root.css'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import { ResortoCoreProvider } from './context'

function Root() {

  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <Meta />
      <Links />
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

export default function App() {

  return (
    <ResortoCoreProvider>
      <Root />
    </ResortoCoreProvider>
  )
}