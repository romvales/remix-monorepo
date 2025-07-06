import { Button } from '@components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu'

import { CirclePlusIcon } from 'lucide-react'

import { cn, parseForm } from '@components/lib/utils'
import { createFolderAction, createUntitledDraftAction, deleteDraftAction, deleteFolderAction, renameDraftAction, renameFolderAction } from '@hermitdraft/routes/_author._index'
import { ClientActionFunctionArgs, useLoaderData, useSubmit } from '@remix-run/react'

export enum AuthorActionData {
  CREATE_DRAFT,
  CREATE_FOLDER,
  RENAME_DRAFT,
  RENAME_FOLDER,
  RENAME_MEDIA,
  DELETE_DRAFT,
  DELETE_FOLDER,
}

export async function authorClientAction(args: ClientActionFunctionArgs) {
  const { action } = parseForm(await args.request.clone().formData())

  switch (Number(action)) {
  case AuthorActionData.CREATE_DRAFT: return createUntitledDraftAction(args)
  case AuthorActionData.CREATE_FOLDER: return createFolderAction(args)
  case AuthorActionData.RENAME_DRAFT: return renameDraftAction(args)
  case AuthorActionData.DELETE_DRAFT: return deleteDraftAction(args)
  case AuthorActionData.RENAME_FOLDER: return renameFolderAction(args)
  case AuthorActionData.DELETE_FOLDER: return deleteFolderAction(args)
  }

  return {}
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