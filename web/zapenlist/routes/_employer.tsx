import { Outlet } from '@remix-run/react'
import { EmployerFooter } from '@zapenlist/components/common/employer'

export default function Layout() {
  
  return (
    <>
      <Outlet />
      <EmployerFooter />
    </>
  )
}