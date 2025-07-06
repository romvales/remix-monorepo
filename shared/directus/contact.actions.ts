import { createItem, DirectusClient, DirectusError, RestClient, StaticTokenClient } from '@directus/sdk'
import { transporter } from '@shared/nodemailer'
import { contactWithServicesSchema } from '@shared/schemas/contact'
import { createRandomString } from '@shared/utils/db'
import { Session } from '@vercel/remix'
import { z } from 'zod'

type DefaultSchema = RomTypes.DirectusSchema

const MAX_PENDING_MESSAGE_ATTEMPT = 2

export async function flushPendingMessagesFromSession(
  client: DirectusClient<DefaultSchema> & StaticTokenClient<DefaultSchema> & RestClient<DefaultSchema>,
  session: Session<{
    attempts: number[],
    pending: z.infer<typeof contactWithServicesSchema>[],
  }>
) {
  const pending = session.get('pending')
  const attempts = session.get('attempts') ?? new Array(pending?.length ?? 0).fill(0)
  const toCreate: Promise<void>[] = []

  pending?.map((contact, i) => {
    const id = createRandomString(32)
    const names = contact.name.split(' ')
    const [firstName, lastName] = [names[0], names[names.length-1]]
    const {
      gender,
      services: interests,
      country,
      email,
      message,
    } = contact

    toCreate.push(
      client.request(
        createItem('contacts', {
          id,
          firstName,
          lastName,
          email,
          country,
          gender,
          interests,
          raw: contact,
        })
      )
      .then(async () => {
        // Send an email using nodemailer
        await transporter.sendMail({
          from: 'no-reply@marketing.romvales.com',
          to: 'rom.vales@outlook.com',
          subject: `New message from "${firstName} ${lastName} <${email}>"`,
          replyTo: email,
          text: message,
        })
          .then(console.log)  
          .catch(console.error)

        pending.splice(i, 1)
      })
      .catch((e: DirectusError) => {

        for (const error of e.errors ?? []) {
          if (/unique/.test(error.message.toLowerCase())) {
            pending.splice(i, 1)
            attempts.splice(i, 1)
            return
          }
        }

        if (attempts[i] >= MAX_PENDING_MESSAGE_ATTEMPT) {
          pending.splice(i, 1)
          attempts.splice(i, 1)
          return
        }

        attempts[i]++
      })
    )

  })

  await Promise.all(toCreate)

  session.set('pending', pending ?? [])
  session.set('attempts', attempts)

  return session
}