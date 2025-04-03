import { getAppWorker } from '@hermitdraft/app.client'
import { db } from '@hermitdraft/core.db/browser'
import { mediaTable as media } from '@hermitdraft/core.db/browser/schema'
import { createRandomString } from '@shared/utils/db'
import { eq } from 'drizzle-orm'
import { kebabCase } from 'lodash-es'
import invariant from 'tiny-invariant'

export async function saveMedia(subj: Partial<HermitTypes.AuthorMedia>) {
  const { id2, author, slug, name, bin, originalName, type, size } = subj

  invariant(id2, 'Missing `id2` property in the media.')
  invariant(author, 'Missing `author` property in the media.')
  invariant(slug, 'Missing `slug` property in the media.')
  invariant(name, 'Missing `name` property in the media.')
  invariant(bin, 'Missing `bin` property in the media.')
  invariant(originalName, 'Missing `originalName` in the media.')
  invariant(type, 'Missing `type` in the media.')
  invariant(size, 'Missing `size` in the media.')

  if (subj.id) {
    return db.update(media)
      .set(subj)
      .where(eq(media.id, subj.id))
      .returning()
  }

  return db.insert(media)
    .values({ id2, author, slug, name, bin, originalName, type, size })
    .returning()

  new File([], 'example', {  })

}

export function getMedias(author: number) {
  return db.query.media.findMany({
    where: eq(media.author, author),
  })
}

export function getMediaById(id: number) {
  return db.query.media.findFirst({
    where: eq(media.id, id),
  })
}

export function getMediaBySlug(slug: string) {
  return db.query.media.findFirst({
    where: eq(media.slug, slug),
  })
}

export function deleteMedia(id: number) {
  return db.delete(media).where(eq(media.id, id))
}

export async function createMediaFromFile(file: File, author: HermitTypes.Author) {
  const id2 = createRandomString(32)
  const originalName = file.name
  const name = id2
  const type = file.type
  const size = file.size
  const bin = Buffer.from(await file.arrayBuffer())

  return {
    id2,
    originalName,
    name,
    type,
    size,
    bin,
    
    author: author.id,
    slug: kebabCase(originalName),
  } as Partial<HermitTypes.AuthorMedia>
}

export function createUploadByFileUploader(author: HermitTypes.Author) {
  return async function uploadByFile(_file: File) {
    const media = await createMediaFromFile(_file, author)
    const appWorker = getAppWorker()

    appWorker.postMessage(media)

    return {
      success: false,
      file: undefined,
    }
  }
}

export function createUploadByUrlUploader(author: HermitTypes.Author) {
  return async function uploadByUrl(url: string) {
    const res = await fetch(new Request(url))
    const blob = await res.blob()
    const file = new File([ blob ], url)
    const media = await createMediaFromFile(file, author)
    const appWorker = getAppWorker()

    appWorker.postMessage(media)

    return {
      success: false,
      file: undefined,
    }
  }
}