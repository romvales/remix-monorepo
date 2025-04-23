
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { HermitRouter } from './router.server'

export const trpc = createTRPCProxyClient<HermitRouter>({
  links: [
    httpBatchLink({
      url: `${location.origin}/author.rpc`,
    }),
  ],
})  
