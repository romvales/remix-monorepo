import './root.css'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import { useSWEffect } from '@remix-pwa/sw'
import { LinksFunction } from '@vercel/remix'

export const links: LinksFunction = () => [
  { rel: 'manifest', href: '/manifest.webmanifest' },
]

export default function App() {
  useSWEffect({})

  return (
  <html lang='en'>
  <head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
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
