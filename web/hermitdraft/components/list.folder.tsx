import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@components/ui/context-menu'

import { Link, useFetcher } from '@remix-run/react'
import { FolderIcon } from 'lucide-react'
import { useState } from 'react'
import { AuthorActionData } from './menu'

type FolderListItemProps = ComponentProps<{
  item: HermitTypes.AuthorFolder
}>

enum FolderActionMode {
  NORMAL,
  RENAME,
}

export function Folder({ item }: FolderListItemProps) {
  const folder = useFetcher()
  const [mode, setMode] = useState<FolderActionMode>(FolderActionMode.NORMAL)

  const onToggleRename = () => setMode(FolderActionMode.RENAME)

  const onDelete = () => {
    if (confirm(`Delete "${item.name}"?`)) {
      const data = new FormData()

      data.append('+action', AuthorActionData.DELETE_FOLDER.toString())
      data.append('+id', item.id.toString())

      folder.submit(data, {
        method: 'post',
        encType: 'multipart/form-data',
      })
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          { mode == FolderActionMode.NORMAL && (
            <h4 className='flex items-center gap-1'>
              <FolderIcon size={14} />
              <Link to={item.target == 'DRAFT' ? `/folder/${item.slug}` : `/media?folder=${item.id}`}>
                {item.name}
              </Link>
            </h4>
          ) }

          { mode == FolderActionMode.RENAME && (
            <folder.Form
              method='post'
              encType='multipart/form-data'
              className='flex gap-1 items-center'>
              
              <FolderIcon size={14} />
              <input name={'+action'} value={AuthorActionData.RENAME_FOLDER} readOnly aria-hidden hidden />
              <input name={'slug'} value={item.slug} readOnly aria-hidden hidden />
              <input name={'name'} defaultValue={item.name} />
              <button hidden>Save</button>              

            </folder.Form>
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
      </ContextMenuContent>
    </ContextMenu>
  ) 
}