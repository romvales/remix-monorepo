import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Fragment } from 'react'

export const loader = async ({ context }: LoaderFunctionArgs) => {

  return {}
}

export default function Layout() {

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}