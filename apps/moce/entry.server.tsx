import { RemixServer } from '@remix-run/react'
import { handleRequest, type EntryContext } from '@vercel/remix'
 
export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let url = new URL(request.url)
  let remixServer = <RemixServer context={remixContext} url={url} />

  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  )
}
