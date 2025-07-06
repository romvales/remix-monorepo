import { RemixServer } from '@remix-run/react'
import { handleRequest, type EntryContext } from '@vercel/remix'
 
export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {

  responseHeaders.append('Cross-Origin-Embedder-Policy', 'require-corp')
  responseHeaders.append('Cross-Origi-Opener-Policy', 'same-origin')

  let remixServer = <RemixServer context={remixContext} url={request.url} />
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  )
}
