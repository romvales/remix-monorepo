import dayjs from '@components/lib/time'
import { parseForm } from '@components/lib/utils'
import { z } from 'zod'

import { Session } from '@remix-run/node'
import { createRandomString } from '@shared/utils/db'
import argon2 from 'argon2'
import { kebabCase } from 'lodash-es'
import { prisma } from '../core.db'
import { sessionStore } from '../session'

export const signupSchema = z
  .object({
    author: z.object({
      name: z.string().trim().nonempty(),
      email: z.string().email().nonempty(),
      country: z.string().nonempty(),
      birthMonth: z.number().nonnegative().min(1).max(12),
      birthDay: z.number().nonnegative().min(1).max(31),
      birthYear: z.number().nonnegative().min(1940).max(dayjs().year()),
      sex: z.enum([ 'MALE', 'FEMALE' ]).default('MALE'),
      pass: z.string().trim().nonempty().min(8),
      confirmPass: z.string().trim().nonempty().min(8),
    })
  })
  .superRefine(({ author: { pass, confirmPass } }, ctx) => {
    if (pass != confirmPass) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mismatch password',
        path: ['author.confirmPass'],
      })
    }
  })

export async function createNewAccount(request: Request) {
  const { author } = signupSchema.parse(parseForm(await request.formData()))
  const secret = await argon2.hash(author.pass)

  const id2 = createRandomString(32)
  const { email, name, sex, country } = author
  const username = `${kebabCase(name).replaceAll('-', '.')}${dayjs().unix().toString().slice(0, 4)}`
  const birthday = 
    dayjs()
      .set('month', author.birthMonth)
      .set('day', author.birthDay)
      .set('year', author.birthYear)
      .set('h', 0)
      .set('minute', 0)
      .set('s', 0)
      .set('millisecond', 0)
      .utc(true)
      .toJSON()

  return prisma.author.create({
    data: {
      id2,
      username,
      email,
      name,
      secret,
      sex,
      country,
      birthday,
    },
  })
}

export const plainAuthSchema = z.object({
  username: z.string().trim().nonempty('Invalid email or username provided'),
  pass: z.string().trim().nonempty('No password provided'),
})

type PlainAuth = z.infer<typeof plainAuthSchema>

export async function loginAccountWithEmail(request: Request) {
  const data = parseForm(await request.formData()) as PlainAuth
  const author = await prisma.author.findUnique({
    where: {
      email: data.username,
    },
  })

  if (!author?.secret) throw Error()
  if (!await argon2.verify(author.secret, data.pass)) throw Error()

  return author
}

export async function loginAccountWithUsername(request: Request) {
  const data = parseForm(await request.formData()) as PlainAuth
  const author = await prisma.author.findUnique({
    where: {
      username: data.username,
    },
  })

  if (!author?.secret) throw Error()
  if (!await argon2.verify(author.secret, data.pass)) throw Error()

  return author
}

// Session functions

export function getAuthSession(request: Request) {
  return sessionStore.getSession(request.headers.get('Cookie'))
}

export function commitAuthSession(session: Session) {
  return sessionStore.commitSession(session, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  })
}

export function invalidate(session: Session) {
  return sessionStore.destroySession(session, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  })
}

export async function isLoggedIn(request: Request) {
  const session = await getAuthSession(request)
  return session.has('author')
}

export async function getSessionData(request: Request) {
  const session = await getAuthSession(request)
  const author = session.get('author') as HermitTypes.Author
  return { author }
}