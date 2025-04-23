
import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { NavLink, Outlet } from '@remix-run/react'
import { MobileNav } from '@romvales/components/nav'
import { content } from '@romvales/content'
import { MenuIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useState } from 'react'
import { Theme, useTheme } from 'remix-themes'

export default function Layout() {
  const { title, nav }  = content
  const [visibleNav, setVisibleNav] = useState(false)
  const [theme, setTheme] = useTheme()

  return (
    <>
      <header className={
        cn(
          'sticky top-0',
        )
      }>
        <div className={
          cn(
            'romvales-container my-4 relative',
          )
        }>
          <nav className={
            cn(
              'flex items-center justify-between',
              'border dark:border-zinc-900 dark:text-zinc-200 shadow px-4 py-1 lg:py-2 rounded-xl',
              'bg-white dark:bg-zinc-800 max-w-[60ch] mx-auto',
            )
          }>
            <NavLink className='font-semibold text-sm lg:text-xs' to={nav.homeUrl}>{title}</NavLink>

            <div className={
              cn(
                'lg:flex items-center gap-4 text-sm',
                'hidden',
              )
            }> 
              {nav.links.map((link, i) => (
                <NavLink 
                  className={'text-xs'}
                  key={i} 
                  to={link.url}>{link.name}</NavLink>
              ))}
              
              <Button 
                size={'icon'} 
                className='rounded-full w-4 h-4'
                variant={'ghost'}
                onClick={() => setTheme(theme == Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
                { theme == Theme.DARK && <SunIcon size={14} /> }
                { theme == Theme.LIGHT && <MoonIcon size={14} /> }
              </Button>
            </div>
            <div className={
              cn(
                'block lg:hidden',
              )
            }>
              <Button
                size={'icon'}
                variant={'ghost'}
                className='rounded-full'
                onClick={() => setVisibleNav(!visibleNav)}>
                <MenuIcon size={18} />
              </Button>
            </div>
          </nav>

          { visibleNav && <MobileNav onHide={() => setVisibleNav(!visibleNav)} /> }
        </div>
      </header>

      <Outlet />
    </>
  )
}