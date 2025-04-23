
import { initialize } from '@hermitdraft/core.db/browser'
import { draftsTable as drafts } from '@hermitdraft/core.db/browser/schema'
import { trpc } from '@hermitdraft/core.trpc/client.client'
import { createRandomString } from '@shared/utils/db'

import { type JSONContent } from '@tiptap/react'

import dayjs from '@components/lib/time'

import { and, eq, isNull } from 'drizzle-orm'
import { chunk, kebabCase, omit } from 'lodash-es'
import invariant from 'tiny-invariant'
import { getMediaFromStore, persistMediaToStore } from './storage-sw'

export class DraftClientWebWorkerService {

  constructor(private props: Awaited<ReturnType<typeof initialize>>) {

  }

  getDrafts(author: number, folder?: number) {
    
    return this.props.db.query.drafts.findMany({
      where: and(
        eq(drafts.author, author),
        folder ? eq(drafts.folder, folder) : isNull(drafts.folder),
      ),
    })
  }

  async saveDraft(draft: Partial<HermitTypes.AuthorDraft>) {
    const { db } = this.props
    const { 
      id2, title, slug, author, desc, 
      subheadline, status, images } = draft

    invariant(id2, 'Missing `id2` property in the draft.')
    invariant(title, 'Missing `title` property in the draft.')
    invariant(slug, 'Missing `slug` property in the draft.')
    invariant(author, 'Missing `author` property in the draft.')

    let content: JSONContent | undefined
    let published: Date | null = draft.published!

    if (draft.content instanceof File) {
      content = JSON.parse(await draft.content.text())
    } else {
      content = draft.content ?? { type: 'doc', content: [] }
    }

    const folder = isNaN(draft.folder!) ? null : draft.folder

    if (status == 'PUB' && !published) {
      published = dayjs().utc(true).toDate()
    }

    if (status != 'PUB' && published) {
      published = null
    }

    const updated = await db
      .insert(drafts)
      .values({
        id2,
        slug,
        title,
        subheadline,
        desc,
        author,
        status: status ?? 'DRAFT',
        published,
        content,
        folder,
        images: images ?? [],
      })
      .onConflictDoUpdate({
        target: [ drafts.id2 ],
        set: { 
          slug,
          title,
          subheadline,
          desc, 
          author, 
          status, 
          published,
          content,
          folder,
          images,
        },
      })
      .returning()
      .then(res => res.at(0))

    const unupload = (removed: string[]) => new Promise<HermitTypes.AuthorMedia[]>(async (resolve) => {
      const pending: HermitTypes.AuthorMedia[] = []

      for (const imageUrl of removed) {
        const url = new URL(imageUrl)
        const slug = url.pathname.replace('/media/', '')
        const image = await getMediaFromStore(slug)

        if (!image.uploaded) {
          continue
        }

        image.uploaded = false
        
        pending.push(image)

        await persistMediaToStore(image)
      }

      resolve(pending)
    })

    let res: { updated: typeof updated, refs: [File[], HermitTypes.AuthorMedia[]] } = { updated, refs: [[], []] }

    // FEATURE: Publish the draft to the internet.
    if (status == 'PUB') {
      try {
        // Remove not needed fields before mutating
        const _res = await trpc.publish.mutate(omit(updated, [ 'id', 'folder', 'status' ]))
        const images = draft.images as string[]

        // FEATURE: Upload and remove unused images from the cloudflare r2 bucket.
        const upload = new Promise<File[]>(async (resolve) => {
          const pending: File[] = []

          for (const imageUrl of images) {
            const url = new URL(imageUrl)
            const slug = url.pathname.replace('/media/', '')
            const image = await getMediaFromStore(slug)
  
            if (image.uploaded) {
              continue
            }
  
            image.uploaded = true
            
            pending.push(new File([ image.bin! ], slug.replaceAll('/', '_'), { type: image.type }))
  
            await persistMediaToStore(image)
          }

          resolve(pending)
        })

        const refs = await Promise.all([ upload, unupload(_res?.removed ?? []) ])
        res = { updated, refs }
      } catch {

      }
    }

    // FEATURE: Unpublish the draft from the internet.
    if (status != 'PUB' && updated?.published) {
      try {
        await trpc.unpublish.mutate(id2)
        const refs = await Promise.all([ [], unupload(updated?.images as string[] ?? []) ])
        res = { updated, refs }
      } catch {

      }
    }

    // FEATURE: Upload and remove images used by the draft to/from the Cloudflare R2 bucket.
    const { refs: [ up, down ] } = res

    Promise.all([

      // Chunk the files into 5 per requests and attempt to upload it via /media.upload
      ...chunk(up, 5).map(files => {
        const body = new FormData()
  
        files.map(file => body.append('images[]', file))
  
        return fetch('/media.upload?action=up', {
          method: 'post',
          credentials: 'include',
          body,
        })
      }),

      // Remove all images used by the draft from the Cloudflare R2 bucket.
      new Promise(async (resolve) => {
        const body = new FormData()

        down.map(media => body.append('images[]', media.slug.replaceAll('/', '_')))

        if (down.length) {
          resolve(
            fetch('/media.upload?action=down', {
              method: 'post',
              credentials: 'include',
              body,
            })
          )
        }
      }),

    ])
      .then()
      .catch()

    return res
  }

  getDraft(id: number) {
    return this.props.db.query.drafts.findFirst({
      where: eq(drafts.id, id),
    }) as Promise<HermitTypes.AuthorDraft | undefined>
  }

  async getDraftBySlug(slug: string) {
    return this.props.db.query.drafts.findFirst({
      where: eq(drafts.slug, slug),
    }).catch(() => undefined)
  }

  deleteDraft(id: number) {
    return this.props.db.delete(drafts).where(eq(drafts.id, id))
  }

  countDrafts() {
    return this.props.db.$count(drafts)
  }

  async createUntitledDraft(author: number, folder?: number) {
    const id2 = createRandomString(32)
    const title = `Untitled ${await this.countDrafts() + 1}`
    const slug = kebabCase(title)
    const status = 'DRAFT'
    const content = { type: 'doc', content: [] }
    
    return this.saveDraft({ 
      id2, 
      title, 
      author, 
      slug, 
      status, 
      folder, 
      content, 
      images: [],
    })
  }

}