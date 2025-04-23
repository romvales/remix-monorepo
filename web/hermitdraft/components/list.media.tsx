import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@components/ui/context-menu'
import { persistMediaToStore } from '@hermitdraft/core.worker/storage-sw'

import { ImageIcon } from 'lucide-react'
import { MouseEventHandler } from 'react'

export type MediaListItemProps = ComponentProps<{
  item: HermitTypes.AuthorMedia
}>

export function Media({ item }: MediaListItemProps) {

  const onPreview: MouseEventHandler<HTMLAnchorElement> = async ev => {
    await persistMediaToStore(item)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          <h4 className='flex items-center gap-2'>
            <ImageIcon size={14} />
            <a 
              className='flex-1 text-wrap'
              href={`/media/${item.slug}`} target={'_blank'} onClick={onPreview}>
              {item.originalName}
            </a>
          </h4>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem inset>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}