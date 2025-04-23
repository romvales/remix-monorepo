import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@vercel/remix'

import { createContext } from '@hermitdraft/core.trpc/context'
import { router } from '@hermitdraft/core.trpc/router.server'

async function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: '/author.rpc',
    req: args.request,
    router,
    createContext,
  })
}

export const action = async (args: ActionFunctionArgs) => { 
  return handleRequest(args)
}

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args)
}