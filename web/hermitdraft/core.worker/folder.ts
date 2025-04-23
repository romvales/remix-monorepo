import { initialize } from '@hermitdraft/core.db/browser'
import { foldersTable as folders } from '@hermitdraft/core.db/browser/schema'
import { createRandomString } from '@shared/utils/db'
import { and, eq, isNull } from 'drizzle-orm'
import { kebabCase, merge } from 'lodash-es'
import invariant from 'tiny-invariant'


export class FolderClientWebWorkerService {

  constructor(private props: Awaited<ReturnType<typeof initialize>>) {

  } 

  async saveFolder(subj: Partial<HermitTypes.AuthorFolder>) {
    if (!subj.id2) {
      merge(subj, await this.createFolder(subj))
    }

    invariant(subj.id2, 'Missing `id2` property in the folder.')
    invariant(subj.slug, 'Missing `slug` property in the folder.')
    invariant(subj.name, 'Missing `name` property in the folder.')
    invariant(subj.author, 'Missing `author` property in the folder.')
    invariant(subj.target, 'Missing `target` property in the folder.')

    const { id2, author, slug, folder, name, target } = subj

    return this.props.db
      .insert(folders)
      .values({ id2, author, target, slug, folder, name })
      .onConflictDoUpdate({
        target: folders.id2,
        set: await this.createFolder(subj),
      })
      .returning()
      .then(res => res.at(0))
  }

  async createFolder(subj: Partial<HermitTypes.AuthorFolder>) {
    let id2 = createRandomString(32)
    let slug = `${subj.author}/${kebabCase(subj.name)}`

    if (subj.folder) {
      const folder = await this.getFolder(subj.folder)
      invariant(folder, `Folder associated with id "${subj.folder}" does not exist.`)
      slug = `${folder.slug}/${kebabCase(subj.name)}`
    }

    const clone = merge(structuredClone(subj), { id2, slug })
    return clone
  }

  getFolders(author: number, target: string, parent?: number) {

    return this.props.db.query.folders.findMany({
      where: and( 
        eq(folders.author, author),
        parent ? eq(folders.folder, parent) : isNull(folders.folder),
        eq(folders.target, target as any ?? 'DRAFT'),
      ),
    })
  }

  getFolder(id: number) {
    return this.props.db.query.folders.findFirst({
      where: eq(folders.id, id),
    })
  }

  getFolderBySlug(slug: string) {
    return this.props.db.query.folders.findFirst({
      where: eq(folders.slug, slug),
    })
  }

  deleteFolder(id: number) {
    return this.props.db.delete(folders).where(eq(folders.id, id))
  }

  countFolders() {
    return this.props.db.$count(folders)
  }

}