import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStore = createCookieSessionStorage({
  cookie: {
    name: '__author',
    secrets: [ process.env.SECRET ],
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
  },
})
