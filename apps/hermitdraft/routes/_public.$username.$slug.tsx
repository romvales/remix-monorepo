import { generateHTML } from '@components/base/editor.tiptap'
import { Button } from '@components/ui/button'
import { getPublishDraftBySlug } from '@hermitdraft/core.service/author'
import { Link, useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs, MetaFunction, replace } from '@vercel/remix'
import { CircleAlertIcon } from 'lucide-react'
import { useMemo } from 'react'

import invariant from 'tiny-invariant'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { username, slug } = params

  invariant(username, 'Missing `username` in the URL parameters')
  invariant(slug, 'Missing `slug` in the URL parameters')

  try {
    const draft = await getPublishDraftBySlug(username, slug)

    return { username, draft }
  } catch {
    return replace('/')
  }
}

export const meta: MetaFunction = args => {
  const { username, draft } = args.data as { 
    username: string
    draft: HermitTypes.AuthorDraft,
  }

  return [
    { title: `${username}: ${draft.title} | Hermitdraft` }
  ]
}

export default function PublishDraft() {
  const { draft } = useLoaderData<typeof loader>()
  const output = useMemo(() => generateHTML(draft?.content ?? { type: 'doc', content: [] }), [ draft ])

  if (!draft) {
    return (
      <main>
        <section className='hermitdraft@container'>
          <div className='flex flex-col'>
            <p className='flex gap-1 items-center justify-center'>
              <CircleAlertIcon size={14} />
              Attempting to access a non existing or non published draft.
            </p>
            <Button variant={'link'} asChild>
              <Link to='/'>Go home</Link>
            </Button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <article 
        className='hermitdraft@container'>

        <div
          className='prose max-w-none bg-zinc-50 p-4'
          dangerouslySetInnerHTML={{ __html: output }}>
        </div>
      </article>
    </main>
  )
}