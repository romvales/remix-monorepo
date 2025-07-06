import { prisma } from '@hermitdraft/core.db'
import invariant from 'tiny-invariant'

export async function getAuthorById(id: number) {
  return prisma.author.findUnique({
    where: { id },
  })
}

export async function getAuthorByUsername(name: string) {
  return prisma.author.findFirst({
    where: {
      username: {
        equals: name.replace(/^@/, ''),
      },
    },
  })
}

export async function getPublishDraftBySlug(name: string, slug: string) {
  const author = await getAuthorByUsername(name)

  if (!author) {
    return null
  }

  return prisma.authorPublicDraft.findFirst({
    where: {
      authorId: { equals: author.id },
      slug: { equals: slug },
    },
  })
}

export async function publishAuthorDraftToWeb(subj: Partial<HermitTypes.AuthorDraft>) {
  const { 
    id2, author, slug, created, updated, 
    published, title, subheadline, desc,
    featuredImageUrl, content, images: _images } = subj

  if (!published || !content) {
    return
  }

  invariant(author, 'Missing `author` property in the draft')
  invariant(id2, 'Missing `id2` property in the draft')
  invariant(slug, 'Missing `slug` property in the draft')
  invariant(created, 'Missing `created` property in the draft')
  invariant(updated, 'Missing `updated` property in the draft')
  invariant(title, 'Missing `title` property in the draft')
  invariant(_images, 'Missing `images` property in the draft')

  const images = _images as string[]
  const old = await prisma.authorPublicDraft.findFirst({
    where: { id2 },
    select: { images: true },
  })


  const removed = 
    (old?.images ?? [])
      .filter(image => !new Set(images).has(image))

  return {
    draft: await prisma.authorPublicDraft.upsert({
      where: { id2 },
  
      create: {
        authorId: author,
        id2,
        slug,
        created,
        updated,
        published,
        title,
        subheadline,
        desc,
        featuredImageUrl,
        content,
        images,
      },
  
      update: {
        slug,
        created,
        updated,
        published,
        title,
        subheadline,
        desc,
        featuredImageUrl,
        content,
        images,
      },
    }),
    removed,
  }
}

export async function unpublishAuthorDraft(id2: string) {
  return prisma.authorPublicDraft.delete({
    where: { id2 },
  })
}
