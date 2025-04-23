import { Button } from '@components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu'

import { CirclePlusIcon } from 'lucide-react'

import { cn } from '@components/lib/utils'
import { useLoaderData, useSubmit } from '@remix-run/react'

export enum AuthorActionData {
  CREATE_DRAFT,
  CREATE_FOLDER,
}

export function HomeDropdownMenu({}: ComponentProps) {
  const { author, folder } = useLoaderData<{
    author: HermitTypes.Author,
    folder: HermitTypes.AuthorFolder,
  }>()

  const submit = useSubmit()

  const onCreateFolder = () => {
    const data = new FormData()

    data.append('+author', author.id.toString())
    data.append('action', AuthorActionData.CREATE_FOLDER.toString())
    data.append('target', 'DRAFT')

    if (folder) {
      data.append('+folder', folder.id.toString())
    }

    submit(data, {
      navigate: false,
      encType: 'multipart/form-data',
      method: 'post',
    })
  }

  const onCreateDraft = () => {
    const data = new FormData()

    data.append('+author', author.id.toString())
    data.append('action', AuthorActionData.CREATE_DRAFT.toString())

    if (folder) {
      data.append('+folder', folder.id.toString())
    }

    submit(data, { 
      navigate: false,
      encType: 'multipart/form-data',
      method: 'post',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className={
            cn(
              'focus:ring-0 focus-visible:ring-0',
            )
          }
          variant={'link'}>
          <CirclePlusIcon size={8} />
          <span>New</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={onCreateFolder}>
          Folder
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCreateDraft}>
          Draft
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}