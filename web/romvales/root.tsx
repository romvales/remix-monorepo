import './root.css'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { themeResolver } from './session'

import { LoaderFunctionArgs } from '@vercel/remix'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme }  = await themeResolver(request)

  return {
    vars: {
      THEME: getTheme(),
    },
  }
}

function Root() {
  const { vars } = useLoaderData<{ vars: RomTypes.Vars }>()
  const [theme] = useTheme()

  return (
  <html lang='en' className={theme ?? ''}>
  <head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <script src='https://analytics.ahrefs.com/analytics.js' data-key='QREs2L7YNPNPN/y76oVxug' async></script>
    <Meta />
    <Links />
    <PreventFlashOnWrongTheme ssrTheme={Boolean(vars.THEME)} />
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
  const { vars } = useLoaderData<{ vars: RomTypes.Vars }>()

  return (
    <ThemeProvider specifiedTheme={vars.THEME} themeAction='theme'>
      <Root />
    </ThemeProvider>
  )
}
