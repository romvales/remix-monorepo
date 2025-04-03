import { useRouteLoaderData } from '@remix-run/react'


import { clientLoader as rootAuthorClientLoader } from '../routes/_author'

export function useRoute_authorLoaderData() {
  return useRouteLoaderData<typeof rootAuthorClientLoader>('routes/_author')!
}