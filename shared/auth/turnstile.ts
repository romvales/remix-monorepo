import invariant from 'tiny-invariant'

const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(token: string) {

  invariant(process.env.TURNSTILE_SECRET, 'Missing `TURNSTILE_SECRET` from environment variable.')

  const res = await fetch(verifyUrl, {
    method: 'POST',
    body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET)}&response=${encodeURIComponent(token)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const data = await res.json() as { success: boolean }
  const { success } = data

  return success
}