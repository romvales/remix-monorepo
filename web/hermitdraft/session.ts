import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStore = createCookieSessionStorage({
  cookie: {
    name: '__author',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
  },
})