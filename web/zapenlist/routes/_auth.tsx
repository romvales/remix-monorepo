import { Outlet } from '@remix-run/react'

import { AuthFooter } from '@zapenlist/components/common/auth'


export default function Layout() {

  return (
    <>
      <Outlet />
      <AuthFooter />
    </>
  )
}