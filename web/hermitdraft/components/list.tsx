import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'

import { Draft } from './list.draft'
import { Folder } from './list.folder'
import { Media } from './list.media'

export function DraftDirectory() {
  const { drafts, folders } = useLoaderData<{
    drafts: HermitTypes.AuthorDraft[]
    folders: HermitTypes.AuthorFolder[]
  }>()

  const files = useMemo(() => [ 
    folders.map(folder => ({ type: 'FOLDER', item: folder })), 
    drafts.map(draft => ({ type: 'DRAFT', item: draft })),
  ].flat(), [ drafts, folders ])

  return (
    <ul className='grid px-4'>
    {
      files.map(({ type, item }) => (
        <li key={item.id2}>
          { /FOLDER/.test(type) && <Folder item={item as any} /> }
          { /DRAFT/.test(type) && <Draft item={item as any} /> }
        </li>
      ))
    }
    </ul>
  )
}

export function MediaDirectory() {
  const { folders, media } = useLoaderData<{
    folders: HermitTypes.AuthorFolder[]
    media: HermitTypes.AuthorMedia[]    
  }>()

  const files = useMemo(() => [
    folders.map(folder => ({ type: 'FOLDER', item: folder })),
    media.map(media => ({ type: 'MEDIA', item: media })),
  ].flat(), [ media, folders ])

  return (
    <ul className='grid px-4'>
    {
      files.map(({ type, item }) => (
        <li key={item.id2}>
          { /FOLDER/.test(type) && <Folder item={item as any} /> }
          { /MEDIA/.test(type) && <Media item={item as any} /> }
        </li>
      ))
    }
    </ul>
  )
}