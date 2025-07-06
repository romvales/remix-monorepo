import { ActionFunctionArgs } from '@vercel/remix'

import { parseForm } from '@components/lib/utils'
import { removeDraftImagesFromS3, uploadDraftImagesToS3 } from '@hermitdraft/core.s3'
import { getSessionData } from '@hermitdraft/core.service/auth'
import { MemoryFileStorage } from '@mjackson/file-storage/memory'
import { parseFormData, type FileUpload } from '@mjackson/form-data-parser'

const mem = new MemoryFileStorage()

export const action = async ({ request }: ActionFunctionArgs) => {
  const search = new URL(request.url).searchParams
  const { author } = await getSessionData(request)
  let key = `author-${author.id2}-images`
  
  async function uploadHandle(upload: FileUpload) {
    if (upload.fieldName == 'images[]') {
      await mem.set(key, upload)
      return mem.get(key)
    }

    return upload
  }

  const formd = await parseFormData(request, uploadHandle)
  const data = parseForm(formd)
  
  let res

  switch (search.get('action')) {
  case 'up':
    res = await uploadDraftImagesToS3(author.id, author.id2, data.images as File[] ?? [])
    break
  case 'down':
    res = await removeDraftImagesFromS3(author.id, author.id2, data.images as string[] ?? [])
  }

  mem.remove(key)
  return Response.json(res)
}