import { JobsHeaderWrapper } from '@romvales/components/jobs/layout'
import './_jobs.css'

import { ClientLoaderFunctionArgs, Outlet, useLoaderData, useRevalidator } from '@remix-run/react'
import { getClientIpInfo, updateUserConfig } from '@romvales/core.service/guest.client'
import { userSession } from '@romvales/session'
import { LoaderFunctionArgs } from '@vercel/remix'

import { getCountryData, TCountryCode } from 'countries-list'
import { LoaderCircleIcon } from 'lucide-react'
import { useEffect } from 'react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await userSession.getSession(request.headers.get('Cookie'))
  const config = session.get('config') ?? {}

  return { config }
}

export const clientLoader = async ({ request, serverLoader }: ClientLoaderFunctionArgs) => {
  const { config } = await serverLoader<typeof loader>()
  const clientIpInfo = await getClientIpInfo()
  const country  = getCountryData(clientIpInfo.geo?.country as TCountryCode)

  if (!config.jobs?.query.country) {
    await updateUserConfig({
      jobs: {
        query: {
          country: country.name,
        },
      },
    })

    return { config, revalidate: true }
  }

  return { config }
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return (
    <main className='w-screen min-h-screen grid place-content-center'>
      <LoaderCircleIcon className='animate-spin' />
    </main>
  )
}

export default function Layout() {
  const { config, revalidate } = useLoaderData<typeof clientLoader>()
  const revalidator = useRevalidator()

  useEffect(() => {
    if (revalidate) revalidator.revalidate()
  }, [])

  if (revalidate) {
    return <HydrateFallback />
  }

  return (
    <>
      <JobsHeaderWrapper
        config={config}
        hero={<></>}>
        <Outlet />
      </JobsHeaderWrapper>

      <footer>

      </footer>
    </>
  )
}