import { contactWithServicesSchema } from '@shared/schemas/contact'
import { createCookieSessionStorage } from '@vercel/remix'
import { z } from 'zod'

import { createThemeSessionResolver } from 'remix-themes'

export { themeResolver, userSession }

export type UserSessionProps = {
  pending: z.infer<typeof contactWithServicesSchema>[],
}

const userSession = createCookieSessionStorage<UserSessionProps>({
  cookie: {
    name: 'u',
    secrets: [ process.env.SECRET ],
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  },
})

const themeSession = createCookieSessionStorage({
  cookie: {
    name: 't',
    secrets: [ process.env.SECRET ],
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  },
})

const themeResolver = createThemeSessionResolver(themeSession)