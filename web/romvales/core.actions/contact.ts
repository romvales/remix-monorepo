
import { ActionFunctionArgs } from '@vercel/remix'

import { parseForm } from '@components/lib/utils'
import { userSession } from '@romvales/session'
import { verifyTurnstile } from '@shared/auth/turnstile'
import { contactWithServicesSchema } from '@shared/schemas/contact'
import { uniqBy } from 'lodash-es'

export async function storeContactToDirectus({ request }: ActionFunctionArgs) {
  const session = await userSession.getSession(request.headers.get('Cookie'))
  const form = parseForm(await request.formData())

  try {
    const pending = session.get('pending') ?? []
    const contact = contactWithServicesSchema.parse(form)
    const { name } = contact

    if (!await verifyTurnstile(contact['cf-turnstile-response'])) {
      return { ok: false, name: null }
    }

    pending.push(contact)
    session.set('pending', uniqBy(pending, 'name'))

    return Response.json({ ok: true, name }, {
      headers: {
        'Set-Cookie': await userSession.commitSession(session),
      },
    })
  } catch {
    return { ok: false, name: null }
  }
}