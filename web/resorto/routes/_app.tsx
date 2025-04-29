import { Outlet } from '@remix-run/react'

export function HydrateFallback() {

  return (
    <>
      <p>Syncing...</p>
    </>
  )
}

export default function AppLayout() {

  return (
    <>
      <Outlet />
    </>
  )
}