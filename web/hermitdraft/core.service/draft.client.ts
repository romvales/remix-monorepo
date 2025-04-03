import { db } from '@hermitdraft/core.db/browser'
import { draftsTable as drafts } from '@hermitdraft/core.db/browser/schema'
import { createRandomString } from '@shared/utils/db'

import { eq } from 'drizzle-orm'
import { kebabCase, omit } from 'lodash-es'
import invariant from 'tiny-invariant'

export async function getDrafts(author: number) {
  return db.query.drafts.findMany({
    where: eq(drafts.author, author),
  })
}

export async function saveDraft(draft: Partial<HermitTypes.AuthorDraft>) {
  const { title, slug, author, desc, subheadline } = draft

  invariant(title, 'Missing `title` property in the draft.')
  invariant(slug, 'Missing `slug` property in the draft.')
  invariant(author, 'Missing `author` property in the draft.')

  if (draft.id) {
    return await db.update(drafts)
      .set(omit(draft, [ 'id', 'id2' ]))
      .where(eq(drafts.id, draft.id))
      .returning()
  }

  return await db.insert(drafts)
    .values({
      slug,
      title,
      subheadline,
      desc,
      author,
      id2: createRandomString(32),
      content: draft.content,
      status: 'DRAFT',
    })
    .returning()
}

export async function getDraft(id: number) {
  const res = await db.query.drafts.findFirst({
    where: eq(drafts.id, id),
  })

  return res
}

export function deleteDraft(id: number) {
  return db.delete(drafts).where(eq(drafts.id, id))
}

export async function countDrafts() {
  return await db.$count(drafts)
}

export async function createUntitledDraft(author: number): Promise<HermitTypes.AuthorDraft | undefined> {
  const title = `Untitled ${await countDrafts() + 1}`
  const slug = kebabCase(title)

  return (await saveDraft({ title, slug, author })).at(0)
}
