import { parseForm } from '@components/lib/utils'
import { userSession } from '@romvales/session'
import { ActionFunctionArgs } from '@vercel/remix'
import { merge } from 'lodash-es'
import { z } from 'zod'

export const userSessionConfigSchema = z.object({
  jobs: z.object({
    query: z.object({
      country: z.string().nullish(),
      search: z.string().nullish(),
    }),


  }).nullish(),
})

export async function updateUserConfigFromCookie({ request }: ActionFunctionArgs) {
  const session = await userSession.getSession(request.headers.get('Cookie'))
  let data: unknown

  if (request.headers.get('Content-Type') == 'application/json') {
    data = await request.json()
  } else {
    data = parseForm(await request.formData())
  }
  
  try {
    const oldConfig = session.get('config') ?? {}
    const config = userSessionConfigSchema.parse(data)

    merge(oldConfig, config)

    session.set('config', oldConfig)
    
    return Response.json({ ok: true, config: oldConfig }, {
      headers: {
        'Set-Cookie': await userSession.commitSession(session),
      },
    })
  } catch (e) {
    return { ok: false }
  }
}