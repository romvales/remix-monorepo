import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@components/ui/context-menu'

import { Link, useFetcher } from '@remix-run/react'
import { FolderIcon } from 'lucide-react'

type FolderListItemProps = ComponentProps<{
  item: HermitTypes.AuthorFolder
}>

export function Folder({ item }: FolderListItemProps) {
  const folder = useFetcher()

  const onRename = () => {

  }

  const onDelete = () => {
    
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          <h4 className='flex items-center gap-1'>
            <FolderIcon size={14} />
            <Link to={item.target == 'DRAFT' ? `/folder/${item.slug}` : `/media?folder=${item.id}`}>
              {item.name}
            </Link>
          </h4>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem inset onClick={onRename}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem inset onClick={onDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ) 
}