import { contactWithServicesSchema } from '@shared/schemas/contact'
import { createCookieSessionStorage } from '@vercel/remix'
import { z } from 'zod'

import { createThemeSessionResolver } from 'remix-themes'
import { userSessionConfigSchema } from './core.service/guest'

export { jobSession, themeResolver, userSession }

export type UserSessionProps = {
  pending: z.infer<typeof contactWithServicesSchema>[]
  config: z.infer<typeof userSessionConfigSchema>
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

const jobSession = createCookieSessionStorage({
  cookie: {
    name: 'j',
    secrets: [ process.env.SECRET ],
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  },
})

const themeResolver = createThemeSessionResolver(themeSession)