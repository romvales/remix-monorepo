import { cn } from '@components/lib/utils'
import { DraftDirectory } from '@hermitdraft/components/list'
import { authorClientAction, HomeDropdownMenu } from '@hermitdraft/components/menu'
import { getSessionData } from '@hermitdraft/core.service/auth'
import { getDrafts } from '@hermitdraft/core.service/draft.client'
import { getFolderBySlug, getFolders } from '@hermitdraft/core.service/folder.client'

import { LoaderFunctionArgs } from '@remix-run/node'
import { ClientActionFunctionArgs, ClientLoaderFunctionArgs } from '@remix-run/react'
import invariant from 'tiny-invariant'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { author } = await getSessionData(request)
  return { author }
}

export const clientAction = async (args: ClientActionFunctionArgs) => {
  return authorClientAction(args)
}

export const clientLoader = async ({ params, serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()
  const slug = params['*'] as string
  const folder = await getFolderBySlug(slug)

  invariant(folder, 'Did not find folder associated with the slug.')

  const drafts = await getDrafts(author.id, folder.id)
  const folders = await getFolders(author.id, 'DRAFT', folder.id)

  return { author, folder, folders, drafts }
}

clientLoader.hydrate = true as const

export default function Folder() {
  
  return (
    <main>
      <div className={
        cn(
          'hermitdraft@container'
        )
      }>

        <section
          className={
            cn(
              'bg-zinc-50',
              'border-b border-b-zinc-400 rounded-t',
            )
          }>
          <HomeDropdownMenu />
        </section>

        <section
          className={
            cn(
              'bg-zinc-50',
              'rounded-b',
            )
          }>
          <div className='py-2'>
            <DraftDirectory />
          </div>
        </section>
      </div>
    </main>
  )
}