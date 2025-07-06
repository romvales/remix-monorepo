import './_land.css'

import { NavLink, Outlet } from '@remix-run/react'
import { Logo } from '@romvales/components/nav'


export default function Layout() {

  return (
    <>
      <header>
        <div className='romvales-container my-4 relative'>
          <nav>
            <NavLink to={'/'}>
              <Logo />
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  )
}