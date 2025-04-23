import { getImageByKey } from '@hermitdraft/core.s3'
import { getAuthorById } from '@hermitdraft/core.service/author'
import { LoaderFunctionArgs, data, redirect } from '@vercel/remix'
import invariant from 'tiny-invariant'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { author: authorId, id, image } = params

  invariant(image, 'Missing `image` parameter in the draft.')
  invariant(authorId, 'Missing `author` parameter in the draft.')
  invariant(id, 'Missing `id` paramter in the draft.')

  const author = await getAuthorById(Number(authorId))

  if (!author) {
    return data({}, { status: 404 })
  }

  try {
    const { res } = await getImageByKey(author.id, author.id2, `${authorId}_${id}_${image}`)
    return new Response(res)
  } catch {
    return redirect('', { status: 404 })
  }

}