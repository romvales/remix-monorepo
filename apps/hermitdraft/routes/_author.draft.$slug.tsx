

import { Editor } from '@components/base/editor.client'
import { cn, parseForm } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { getSessionData } from '@hermitdraft/core.service/auth'
import { getDraftBySlug, saveDraft } from '@hermitdraft/core.service/draft.client'

import { LoaderFunctionArgs } from '@remix-run/node'
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  data,
  Form,
  Link,
  replace,
  useFetcher,
  useLoaderData,
  useRevalidator
} from '@remix-run/react'
import { JSONContent } from '@tiptap/react'

import dayjs from '@components/lib/time'
import invariant from 'tiny-invariant'

import { debounce, kebabCase } from 'lodash-es'
import { CircleAlertIcon, GlobeIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const data = parseForm(await request.clone().formData())
  
  const { updated } = await saveDraft(data)
  return replace(`/draft/${updated.slug}`)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { author } = await getSessionData(request)
  return { author }
}

export const clientLoader = async ({ params, serverLoader }: ClientLoaderFunctionArgs) => {
  const { author } = await serverLoader<typeof loader>()
  const { slug } = params

  invariant(slug, 'Missing `slug` paramter in the URL.')

  try {
    const draft = await getDraftBySlug(slug)

    console.log(slug, draft)

    return { author, draft }
  } catch (e) {
    return data({ author, draft: {} })
  }

}

clientLoader.hydrate = true as const

export default function Draft() {
  const revalidator = useRevalidator()
  const formRef = useRef<HTMLFormElement>(null)
  const editor = useFetcher<{
    updated: HermitTypes.AuthorDraft
  }>()

  const { draft } = useLoaderData<{
    author: HermitTypes.Author
    draft: HermitTypes.AuthorDraft
  }>()

  if (!draft) {
    return (
      <main>
        <section className='hermitdraft@container'>
          <div className='flex flex-col'>
            <p className='flex gap-1 items-center justify-center'>
              <CircleAlertIcon size={14} />
              Attempting to access a non existing draft.
            </p>
            <Button variant={'link'} asChild>
              <Link to='/'>Go home</Link>
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const blob = new Blob([ JSON.stringify(draft.content ?? { type: 'doc', content: [] }) ])
  const [content, setContent] = useState<File>(new File([ blob ], 'content', { type: 'application/json' }))
  const [images, setImages] = useState<string[]>(draft.images as string[] ?? [])

  const setupPayload = (form: HTMLFormElement) => {
    const data = new FormData(form)
    
    data.append('id2', draft.id2)
    data.append('+author', draft.author?.toString())
    data.append('status', draft.status)
    data.append('slug', kebabCase(data.get('title') as string))
    data.append('content', content)
    data.append('created', dayjs(draft.created).toJSON())
    data.append('updated', dayjs(draft.updated).toJSON())

    images.map(image => data.append('images[]', image))
    
    if (draft.folder) data.append('+folder', draft.folder.toString())
    if (draft.archived) data.append('archived', dayjs(draft.archived).toJSON())

    return data
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = ev => {
    const data = setupPayload(ev.currentTarget)

    editor.submit(data, {
      method: 'post',
      encType: 'multipart/form-data',
    })
  }

  const onUnpublish: React.MouseEventHandler<HTMLButtonElement> = ev => {
    if (confirm(`Unpublish '${draft.title}?'`)) {
      const data = setupPayload(formRef.current!)

      data.set('status', 'DRAFT')

      editor.submit(data, {
        method: 'post', 
        encType: 'multipart/form-data',
      })
    }
  }

  const onPublish: React.MouseEventHandler<HTMLButtonElement> = ev => {
    if (confirm(`Are you sure you want to publish '${draft.title}' to the internet?`)) {
      const data = setupPayload(formRef.current!)

      data.set('status', 'PUB')

      editor.submit(data, {
        method: 'post',
        encType: 'multipart/form-data',
      })
    }
  }

  const updateContent = useMemo(() => debounce((content: JSONContent) => {
    setContent(
      new File(
        [ Buffer.from(JSON.stringify(content), 'utf-8') ], 
        'content.json', 
        { type: 'application/json' },
      )
    )
  }, 500), [])

  const onEditorUpdateContent = (content: JSONContent) => updateContent(content)

  useEffect(() => {
    const onKeyboard = (ev: KeyboardEvent) => {

      if (ev.ctrlKey && ev.key.toLowerCase() == 's' && formRef.current) {
        const data = setupPayload(formRef.current)

        editor.submit(data, {
          method: 'post',
          encType: 'multipart/form-data',
        })

        ev.preventDefault()
      }
      
    }

    window.addEventListener('keydown', onKeyboard)

    return () => {
      window.removeEventListener('keydown', onKeyboard)
    }
  }, [])

  return (
    <main>
      <article className='hermitdraft@container'>
        <Form
          ref={formRef}
          navigate={false}
          onSubmit={onSubmit}
          encType='multipart/form-data'
          className='flex flex-col gap-2 w-full'>
          <Label className='grid gap-1'>
            <span>Title</span>
            <Input 
              name='title' 
              className={
                cn(
                  'bg-zinc-50 font-normal rounded-xs focus-visible:ring-0',
                  'focus-visible:border-0 border-0',
                )
              } 
              defaultValue={draft.title} />
          </Label>
          <Label className='grid gap-1'>
            <span>Subheadline</span>
            <Input 
              name='subheadline' 
              className={
                cn(
                  'bg-zinc-50 font-normal rounded-xs focus-visible:ring-0',
                  'focus-visible:border-0 border-0',
                )
              }
              defaultValue={draft.subheadline!} />
          </Label>
          <div className='flex flex-col gap-1'>
            <Label>Content</Label>
            <section className='bg-zinc-50'>
              <Editor 
                body={draft.content}
                onUpdate={onEditorUpdateContent}
                onImagesRefUpdate={setImages} />
            </section>
          </div>

          <div
            className={
              cn(
                'sticky bottom-0 flex gap-1 justify-end',
              )
            }>

            {
              draft.status != 'PUB' &&
              <Button 
                type='button' 
                variant={'link'} 
                onClick={onPublish}
                className={
                  cn(
                    'px-2',
                  )
                }>
                <GlobeIcon />
                <span>Publish</span>
              </Button> ||
              <Button
                type='button'
                variant={'link'}
                onClick={onUnpublish}
                className={
                  cn(
                    'px-2',
                  )
                }>
                <RotateCcwIcon />
                <span>Unpublish</span>
              </Button>
            }

            <Button 
              variant={'link'}
              className={
                cn(
                  'px-2',
                )
              }>
              <SaveIcon />
              <span>Save</span>
            </Button>
          </div>
        </Form>
      </article>
    </main>
  )
}