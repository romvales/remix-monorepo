import { directus } from '@romvales/core.server/client'
import { LoaderFunctionArgs } from '@vercel/remix'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params['*']
  return fetch(`${directus.url}assets/${slug}?access_token=${await directus.getToken()}`)
}