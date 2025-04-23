
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'


import invariant from 'tiny-invariant'

const
  bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME,
  endpoint = process.env.CLOUDFLARE_R2_ENDPOINT,
  accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY,
  secretAccessKey = process.env.CLOUDFLARE_R2_SECRET

invariant(bucketName, 'Environment variable CLOUDFLARE_R2_BUCKET_NAME is missing')
invariant(endpoint, 'Environment variable CLOUDFLARE_R2_ENDPOINT is missing')
invariant(accessKeyId, 'Environment variable CLOUDFLARE_R2_ACCESS_KEY is missing')
invariant(secretAccessKey, 'Environment variable CLOUDFLARE_SECRET is missing')

const createS3Client = () => new S3Client(
  {
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  }
)

export async function uploadDraftImagesToS3(author: number, id2: string, images: File[]) {
  const client = createS3Client()

  const uploadImage = async (image: File) => {
    const key = `authors-${author}/${id2}/${image.name}`

    try {      
      const cmd = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: Buffer.from(await image.arrayBuffer()),
        ContentType: image.type,
      })

      const res = await client.send(cmd)

      return { ok: true, key, res }
    } catch(e) {
      return { ok: false, key }
    }
  }

  const resAll = await Promise.all(images.map(uploadImage))

  client.destroy()
  
  return { ok: true, res: resAll }
}

export async function removeDraftImagesFromS3(author: number, id2: string, images: string[]) {
  const client = createS3Client()

  const deleteImage = async (key: string) => {
    try {
      const cmd = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })

      const res = await client.send(cmd)

      return { ok: true, res }
    } catch (e) {
      return { ok: false, key }
    }

  }

  const resAll = await Promise.all(images.map(image => deleteImage(`authors-${author}/${id2}/${image}`)))

  client.destroy()

  return { ok: true, res: resAll }
}

export async function getImageByKey(author: number, id2: string, name: string) {
  const client = createS3Client()

  const cmd = new GetObjectCommand({
    Bucket: bucketName,
    Key: `authors-${author}/${id2}/${name}`,
  })

  const res = await client.send(cmd)

  if (!res) return { ok: false, res: null }
  if (!res.Body) return { ok: false, res: null }

  const arrb = await res.Body.transformToByteArray()
  const file = new File([ Buffer.from(arrb) ], name, { type: res.ContentType })

  return { ok: true, res: file }
}
