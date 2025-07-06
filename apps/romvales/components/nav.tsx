import { cn } from '@components/lib/utils'
import { NavLink } from '@remix-run/react'
import { content } from '@romvales/content'
import { Theme, useTheme } from 'remix-themes'

import logoDark from '@romvales/assets/logo-dark.png'
import logoLight from '@romvales/assets/logo-light.png'

type LogoProps = ComponentProps<{}>

export function Logo() {
  const [theme] = useTheme()
  
  return (
    theme == Theme.DARK && 
      <img className='w-[6rem]' src={logoDark} /> ||
      <img className='w-[6rem]' src={logoLight} />
  )
}

type MobileNavProps = ComponentProps<{
  onHide: () => void
}>

export function MobileNav({ onHide }: MobileNavProps) {
  const { nav }  = content

  return (
    <nav className={
      cn(
        'absolute left-0',
        'mt-2 w-full flex justify-center',
        'px-4 py-1 lg:py-2',
      )
    }>
      <div className={
        cn(
          'w-full max-w-[60ch] p-4 border',
          'rounded-lg shadow lg:hidden',
          'bg-white dark:bg-zinc-800 dark:border-zinc-900',
        )
      }>
        <ul className='text-lg space-y-4'>
          {nav.links.map((link, i) => (
            <li key={i}>
              <NavLink to={link.url} onClick={onHide}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}