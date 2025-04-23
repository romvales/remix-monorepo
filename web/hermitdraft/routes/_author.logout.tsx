import { getAuthSession, invalidate } from '@hermitdraft/core.service/auth'
import { ActionFunctionArgs, replace } from '@vercel/remix'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getAuthSession(request)

  return replace('/land', {
    headers: {
      'Set-Cookie': await invalidate(session),
    },
  })
}