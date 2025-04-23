import { getAuthorByUsername } from '@hermitdraft/core.service/author'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs, MetaFunction } from '@vercel/remix'
import invariant from 'tiny-invariant'


export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { username } = params

  invariant(username, `Missing 'username' parameter in URL.`)

  const author = await getAuthorByUsername(username)

  return { author }
}

export const meta: MetaFunction = args => {
  const { author } = args.data as Awaited<ReturnType<typeof loader>>
  
  if (!author) {
    return []
  }

  return [
    { title: `@${author?.username} | Hermitdraft` },
  ]
}

export default function Author() {
  const { author } = useLoaderData<typeof loader>()

  if (!author) {
    return null
  }

  return (
    <main>
      
    </main>
  )
}