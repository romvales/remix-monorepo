import { initialize } from '@hermitdraft/core.db/browser'
import { mediaTable as media } from '@hermitdraft/core.db/browser/schema'
import { createRandomString } from '@shared/utils/db'

import { and, eq, isNull } from 'drizzle-orm'
import { kebabCase } from 'lodash-es'
import invariant from 'tiny-invariant'

export class MediaClientWebWorkerService {

  constructor(private props: Awaited<ReturnType<typeof initialize>>) { 
  }

  async saveMedia(subj: Partial<HermitTypes.AuthorMedia>) {
    const { db } = this.props
    const { id2, author, slug, bin, originalName, type, size } = subj

    invariant(id2, 'Missing `id2` property in the media.')
    invariant(author, 'Missing `author` property in the media.')
    invariant(slug, 'Missing `slug` property in the media.')
    invariant(bin, 'Missing `bin` property in the media.')
    invariant(originalName, 'Missing `originalName` in the media.')
    invariant(type, 'Missing `type` in the media.')
    invariant(size, 'Missing `size` in the media.')

    return db.insert(media)
      .values({ id2, author, slug, bin, originalName, type, size })
      .onConflictDoUpdate({
        target: media.id2,
        set: { author, slug, bin, originalName, type, size },
      })
      .returning()
      .then(res => res.at(0))
  }

  getMedias(author: number, folder?: number) {
    return this.props.db.query.media.findMany({
      where: and(
        eq(media.author, author),
        folder ? eq(media.folder, folder) : isNull(media.folder),
      ),
    })
  }

  getMedia(id: number) {
    return this.props.db.query.media.findFirst({
      where: eq(media.id, id),
    })
  }

  getMediaBySlug(slug: string) {
    return this.props.db.query.media.findFirst({
      where: eq(media.slug, slug),
    })
  }

  deleteMedia(id: number) {
    return this.props.db.delete(media).where(eq(media.id, id))
  }

  static async createMediaFromFile(file: File, author: number) {
    const id2 = createRandomString(32)
    const originalName = file.name
    const type = file.type
    const size = file.size
    const bin = Buffer.from(await file.arrayBuffer())
    const kebab = kebabCase(originalName)
    const filename = `${id2.slice(0, 8)}/${kebab.replace(/.([^-]*$)/, '.' + kebab.substring(kebab.lastIndexOf('-')+1))}`

    return {
      id2,
      originalName,
      type,
      size,
      bin,  
      author,
      slug: `${author}/${filename}`,
    } as Partial<HermitTypes.AuthorMedia>
  }

}
