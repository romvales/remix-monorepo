import './root.css'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import { ManifestLink, useSWEffect } from '@remix-pwa/sw'
import { MetaFunction } from '@vercel/remix'

export const meta: MetaFunction = () => [
  { charSet: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
]

export default function App() {
  useSWEffect({})

  return (
  <html lang='en'>
  <head>
    <ManifestLink manifestUrl='/manifest.webmanifest' />
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
