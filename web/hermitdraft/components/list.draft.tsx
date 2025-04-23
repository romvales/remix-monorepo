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
import { useEffect } from 'react'

type DraftListItemProps = ComponentProps<{
  item: HermitTypes.AuthorDraft
}>

export function clientDraftUpdateActions({ request }: ClientActionFunctionArgs) {
  

}

export function Draft({ item }: DraftListItemProps) {
  const draft = useFetcher()

  const onRename = () => {
    
  }

  const onDelete = () => {
    
  }

  const toggleArchiveState = () => {

  }

  useEffect(() => {
    
    
  }, [])

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          <h4 className='flex items-center gap-1'>
            <FileIcon size={14} />
            <Link to={`/draft/${item.slug}`}>
              {item.title}
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