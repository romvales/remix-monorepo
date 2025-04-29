import { createFileSessionStorage } from '@remix-run/node'
import { createCookie, createCookieSessionStorage } from '@vercel/remix'

const cookie = createCookie('a', {
  httpOnly: true,
  secrets: [ process.env.SECRET ],
  sameSite: true,
  secure: true,
  path: '/',
})

export const webSession = createCookieSessionStorage({
  cookie,
})

export const nodeSession = createFileSessionStorage({
  dir: `/tmp/${process.env.APP}.session`,
  cookie,
})