import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@components/ui/context-menu'

import { ClientActionFunctionArgs, Link, useFetcher } from '@remix-run/react'
import { FileIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AuthorActionData } from './menu'

type DraftListItemProps = ComponentProps<{
  item: HermitTypes.AuthorDraft
}>

export function clientDraftUpdateActions({ request }: ClientActionFunctionArgs) {
  

}

enum DraftActionMode {
  NORMAL,
  RENAME,
}

export function Draft({ item }: DraftListItemProps) {
  const draft = useFetcher<{ updated: any }>()
  const [mode, setMode] = useState<DraftActionMode>(DraftActionMode.NORMAL)
  
  const onToggleRename = () => setMode(DraftActionMode.RENAME)

  const onDelete = () => {
    if (confirm(`Delete "${item.title}"?`)) {
      const data = new FormData()

      data.append('+action', AuthorActionData.DELETE_DRAFT.toString())
      data.append('+id', item.id.toString())

      draft.submit(data, {
        method: 'post',
        encType: 'multipart/form-data',
      })
    }
  }

  const toggleArchiveState = () => {

  }

  useEffect(() => {
    
    if (draft.state == 'idle' && draft.data?.updated) {
      setMode(DraftActionMode.NORMAL)
    }
    
  }, [ draft ])

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          { mode == DraftActionMode.NORMAL && (
            <h4 className='flex items-center gap-1'>
              <FileIcon size={14} />
              <Link to={`/draft/${item.slug}`}>
                {item.title}
              </Link>
            </h4>
          ) }
          { mode == DraftActionMode.RENAME && (
            <draft.Form
              method='post'
              encType='multipart/form-data'
              className='flex gap-1 items-center'>
              <FileIcon size={14} />
              <input name='+action' value={AuthorActionData.RENAME_DRAFT.toString()} readOnly aria-hidden hidden />
              <input name='slug' value={item.slug} readOnly aria-hidden hidden />
              <input name='title' defaultValue={item.title} />
              <button hidden>Save</button>
            </draft.Form>
          ) }
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        
        <ContextMenuItem inset onClick={onToggleRename}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem inset onClick={onDelete}>
          Delete
        </ContextMenuItem>
        
        <ContextMenuSeparator />

        <ContextMenuCheckboxItem 
          onCheckedChange={toggleArchiveState}
          checked={!!item.archived}>
          Archive
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          Publish
        </ContextMenuCheckboxItem>

        <ContextMenuSeparator />
        
      </ContextMenuContent>
    </ContextMenu>
  )
}