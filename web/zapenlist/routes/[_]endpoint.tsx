import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createContext } from '@zapenlist/core/trpc/context'
import { contractRouter } from '@zapenlist/core/trpc/contract'

export function fetchHandler(args: LoaderFunctionArgs) {
  return fetchRequestHandler({
    endpoint: '/_endpoint',
    req: args.request,
    router: contractRouter,
    createContext,
  })
}

export const action = async (args: ActionFunctionArgs) => {
  return fetchHandler(args)
}

export const loader = async (args: LoaderFunctionArgs) => {
  return fetchHandler(args)
}