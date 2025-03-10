import { Outlet } from '@remix-run/react'
import { Fragment } from 'react'

export default function Layout() {

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}