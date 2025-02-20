import stylesHref from './root.css?url';

import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesHref }
]

export default function App() {
  return (
  <html lang='en'>
  <head>
    <Meta />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta charSet='utf-8' />
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