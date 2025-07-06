import { cn, parseForm } from '@components/lib/utils'
import { DraftDirectory } from '@hermitdraft/components/list'

import { authorClientAction, HomeDropdownMenu } from '@hermitdraft/components/menu'

import { getSessionData } from '@hermitdraft/core.service/auth'
import { countDrafts, createUntitledDraft, deleteDraft, getDraftBySlug, getDrafts, saveDraft } from '@hermitdraft/core.service/draft.client'
import { countFolders, deleteFolder, getFolderBySlug, getFolders, saveFolder } from '@hermitdraft/core.service/folder.client'

import { LoaderFunctionArgs } from '@remix-run/node'

import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
} from '@remix-run/react'
import { kebabCase } from 'lodash-es'
import invariant from 'tiny-invariant'

export const clientAction = async (args: ClientActionFunctionArgs) => {
  return authorClientAction(args)
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

export async function renameDraftAction({ request }: ClientActionFunctionArgs) {
  const { slug, title } = parseForm(await request.formData()) as {
    slug: string
    title: string
  }

  const draft = await getDraftBySlug(slug)
  draft.title = title
  draft.slug = kebabCase(title)

  const updated = await saveDraft(draft)

  return { updated }
}

export async function renameFolderAction({ request }: ClientActionFunctionArgs) {
  const { slug, name } = parseForm(await request.formData()) as {
    slug: string
    name: string
  }

  const folder = await getFolderBySlug(slug)
  
  invariant(folder, 'Renaming a non existing folder is an error.')

  folder.name = name
  folder.slug = kebabCase(name)

  const updated = await saveFolder(folder)
  return { updated }
}

export async function deleteDraftAction({ request }: ClientActionFunctionArgs) {
  const { id } = parseForm(await request.formData()) as { id: number }

  await deleteDraft(id)

  return { deleted: true }
}

export async function deleteFolderAction({ request }: ClientActionFunctionArgs) {
  const { id } = parseForm(await request.formData()) as { id: number }

  await deleteFolder(id)

  return { deleted: true }
}