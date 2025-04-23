import { cn, parseForm } from '@components/lib/utils'
import { DraftDirectory } from '@hermitdraft/components/list'

import { AuthorActionData, HomeDropdownMenu } from '@hermitdraft/components/menu'

import { getSessionData } from '@hermitdraft/core.service/auth'
import { countDrafts, createUntitledDraft, getDrafts } from '@hermitdraft/core.service/draft.client'
import { countFolders, getFolders, saveFolder } from '@hermitdraft/core.service/folder.client'

import { LoaderFunctionArgs } from '@remix-run/node'

import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
} from '@remix-run/react'

export const clientAction = async (args: ClientActionFunctionArgs) => {
  const { action } = parseForm(await args.request.clone().formData())

  if (action == AuthorActionData.CREATE_DRAFT) 
    return createUntitledDraftAction(args)

  if (action == AuthorActionData.CREATE_FOLDER)
    return createFolderAction(args)

  return {}
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { author } = await getSessionData(request)
  return { author }
}

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()
  const drafts = await getDrafts(author.id)
  const folders = await getFolders(author.id, 'DRAFT')
  const counts = await countDrafts()

  return { author, drafts, folders, counts }
}

clientLoader.hydrate = true as const

export default function Board() {
  const { author, drafts, counts, folders } = useLoaderData<typeof clientLoader>()
  
  return (
    <main>
      <div className={
        cn(
          'hermitdraft@container',
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

// Actions
export async function createUntitledDraftAction({ request }: ClientActionFunctionArgs) {
  const { author, folder } = parseForm(await request.formData()) as { 
    author: number
    folder: number
  }

  const { updated: { slug } } = await createUntitledDraft(author, folder)
  return redirect(`/draft/${slug}?new`)
}

export async function createFolderAction({ request }: ClientActionFunctionArgs) {
  const { author, folder, target } = parseForm(await request.formData()) as { 
    author: number,
    folder: number,
    target: 'DRAFT' | 'MEDIA'
  }

  const name = `Untitled-${await countFolders() + 1}`
  const created = await saveFolder({ author, folder, name, target })

  return { created }
}