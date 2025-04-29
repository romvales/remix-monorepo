import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { MediaDirectory } from '@hermitdraft/components/list'
import { AuthorActionData, authorClientAction } from '@hermitdraft/components/menu'
import { getSessionData } from '@hermitdraft/core.service/auth'
import { getMedias, saveMedia } from '@hermitdraft/core.service/media.client'
import { LoaderFunctionArgs } from '@remix-run/node'
import { ClientActionFunctionArgs, ClientLoaderFunctionArgs, useLoaderData, useRevalidator, useSearchParams, useSubmit } from '@remix-run/react'

import { getFolders } from '@hermitdraft/core.service/folder.client'
import { MediaClientWebWorkerService } from '@hermitdraft/core.worker/media'
import { CirclePlusIcon, UploadIcon } from 'lucide-react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { author } = await getSessionData(request)
  return { author }
}

export const clientAction = async (args: ClientActionFunctionArgs) => {
  return authorClientAction(args)
}

export const clientLoader = async ({ request, serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()
  const search = new URL(request.url).searchParams

  const folder = Number(search.get('folder')) ?? ''
  const folders = await getFolders(author.id, 'MEDIA', folder)
  const media = await getMedias(author.id, folder) as HermitTypes.AuthorMedia[]

  return { author, media, folders }
}

clientLoader.hydrate = true as const

export default function Media() {
  const { author, media, folders } = useLoaderData<typeof clientLoader>()
  const [search] = useSearchParams()
  const submit = useSubmit()
  const revalidator = useRevalidator()

  const onCreateFolder = () => {
    const data = new FormData()
    const folder = search.get('folder')

    data.append('+author', author.id.toString())
    data.append('action', AuthorActionData.CREATE_FOLDER.toString())
    data.append('target', 'MEDIA')
    
    if (folder) {
      data.append('+folder', folder)
    }

    submit(data, {
      navigate: false,
      encType: 'multipart/form-data',
      method: 'post',
    })
  }

  const onUpload = () => {
    const input = document.createElement('input')

    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.click()

    const uploadHandle = async () => {
      for (const file of input.files ?? []) {
        // FEATURE: Limit file size upload to 300kb.
        if (file.size >= 300_000) {
          // TODO: Show an error explaining that the user uploaded a file with a size of 300kb.
          alert(`${file.name} has reached the 300kb upload limit.`)
          continue
        }

        const media = await MediaClientWebWorkerService.createMediaFromFile(file, author.id)
        await saveMedia(media)
      }

      revalidator.revalidate()
      input.removeEventListener('change', uploadHandle)
      input.remove()
    }

    input.addEventListener('change', uploadHandle)
  }
  
  return (
    <main>
      <div className={
        cn(
          'hermitdraft@container',
        )
      }>
        <header>
        
        </header>

        <section 
          className={
            cn(
              'bg-zinc-50',
              'border-b border-b-zinc-400 rounded-t',
            )
          }>
          <ul className='flex'>
            <li>
              <Button
                className={
                  cn(
                    'focus:ring-0 focus-visible:ring-0',
                  )
                }
                variant={'link'}
                onClick={onCreateFolder}>
                <CirclePlusIcon size={8} />
                <span>New Folder</span>
              </Button>
            </li>
            <li>
              <Button
                className={
                  cn('focus:ring-0 focus-visible:ring-0')
                }
                variant={'link'}
                onClick={onUpload}>
                <UploadIcon size={8} />
                <span>Upload</span>
              </Button>
            </li>
          </ul>
        </section>

        <section className={
          cn(
            'bg-zinc-50',
            'rounded-b',
          )
        }>
          <div className='py-2'>
            <MediaDirectory />
          </div>
        </section>
      </div>
    </main>
  )
}