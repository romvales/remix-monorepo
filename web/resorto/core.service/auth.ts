import { ActionFunctionArgs } from '@remix-run/node'

import { prisma } from '@resorto/core.db/prisma'

import dayjs from '@components/lib/time'
import { parseForm } from '@components/lib/utils'
import { createNanoid } from '@shared/utils/db'
import { z } from 'zod'

export const signupUserSchema = z.object({
  user: z.object({
    firstName: z.string().trim().nonempty(),
    lastName: z.string().trim().nonempty(),
    email: z.string().email().nonempty(),
    sex: z.enum([ 'MALE', 'FEMALE' ]).default('MALE'),
    birthMonth: z.number().nonnegative().min(1).max(12),
    birthDay: z.number().nonnegative().min(1).max(31),
    birthYear: z.number().nonnegative().min(1940).max(dayjs().year()),
    country: z.string().nonempty(),
    pass: z.string().trim().nonempty().min(10),
    confirmPass: z.string().trim().nonempty().min(10),
  }),
})
.superRefine(({ user: { pass, confirmPass } }, ctx) => {
  if (pass != confirmPass) {
    ctx.addIssue({
      code: 'custom',
      message: 'Mismatch password',
      path: ['user.confirmPass'],
    })
  }
})

export const loginSchema = z.object({
  owner: z.object({
    username: z.string().trim().nonempty(),
    pass: z.string().trim().min(10).nonempty(),
  }).nullable(),

  worker: z.object({
    username: z.string().trim().nonempty(),
    code: z.string().trim().min(10).nonempty(),
  }).nullable(),

  guest: z.object({
    email: z.string().email().nonempty(),
    otp: z.number().int().nonnegative().nullish(),
  }).nullable(),
})

export async function createUser({ request }: ActionFunctionArgs) {
  const _data = parseForm(await request.formData())
  const { user } = signupUserSchema.parse(_data)

  const uid = createNanoid()

  const { email, firstName, lastName, sex, country } = user
  const [ username ] = email.split('@')
  const birthday = 
      dayjs()
        .set('month', user.birthMonth)
        .set('day', user.birthDay)
        .set('year', user.birthYear)
        .set('h', 0)
        .set('minute', 0)
        .set('s', 0)
        .set('millisecond', 0)
        .utc(true)
        .toJSON()

  return prisma.user.create({
    data: {
      uid,
      email,
      username,
      firstName,
      lastName,
      sex,
      country,
      birthday,
      address: {},
    },
  })
}

export async function login({ request }: ActionFunctionArgs) {
  const _data = parseForm(await request.formData())
  const { owner, guest, worker } = loginSchema.parse(_data)

  if (owner) {
    const { username } = owner
    const user = await prisma.user.findFirstOrThrow({ 
      where: {
        OR: [ { email: username }, { username } ],
      },
    })  

    return
  }

  return loginNonOwner({ guest, worker })
}

async function loginNonOwner(login: Partial<z.infer<typeof loginSchema>>) {
  const { guest, worker } = login

  if (guest) {
    const { email } = guest
    const user = await prisma.guest.findFirstOrThrow({
      where: { email },
    })

    return
  }

  if (worker) {
    const { username } = worker
    const user = await prisma.worker.findFirstOrThrow({
      where: {
        OR: [ { email: username }, { username } ],
      },
    })

    return
  }
}

