
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export function createContext(opts: FetchCreateContextFnOptions): ZapenlistCore.TRPCContext {
  const { req: request, resHeaders } = opts

  return {
    request,
    resHeaders,
  }
}