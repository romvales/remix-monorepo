import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'

import React, { useEffect, useState } from 'react'

import { Link, NavLink, useFetcher, useLocation, useNavigate } from '@remix-run/react'
import { Theme, useTheme } from 'remix-themes'

import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import logoDark from '@romvales/assets/jobs-logo-dark.png'
import logoLight from '@romvales/assets/jobs-logo-light.png'

import { UserSessionProps } from '@romvales/session'
import { MenuIcon, PaperclipIcon, SearchIcon, XIcon } from 'lucide-react'
import { NavDropdownMenu } from './dropdown'

type JobsHeaderWrapperProps = ComponentProps<{
  config: UserSessionProps['config']
  hero: React.ReactNode
}>


export function JobsHeaderWrapper({ 
  hero, 
  children, 
  config,
}: JobsHeaderWrapperProps) {

  const [theme] = useTheme()
  const search = useFetcher<{
    ok: boolean
    config: UserSessionProps['config']
  }>()
  
  const location = useLocation()
  const navigate = useNavigate()

  

  useEffect(() => {

    if (search.state == 'idle' && search.data?.ok && location.pathname != '/jobs') {
      navigate('/jobs')
    }
    
  }, [ search ])

  const Search = () => {
    const [searchQ, setSearchQuery] = useState(config.jobs?.query.search ?? '')

    const onClearQuery = () => {
      const data = new FormData()

      data.append('jobs.query.search', '')
      
      search.submit(data, {
        method: 'POST',
        encType: 'multipart/form-data',
        action: '/jobs?action=updateUserConfig',
      })

      setSearchQuery('')
    }
    
    return (
      <search.Form
        method='POST'
        action='/jobs?action=updateUserConfig'
        encType='multipart/form-data'>
        <Label
          className={
            cn(
              'flex items-center gap-2 border px-3 rounded-full focus-within:outline-1',
              'relative',
            )
          }
          role='textbox'>
          <SearchIcon size={16} className='mb-[1px]' />
          <Input 
            name='jobs.query.search'
            value={searchQ}
            onInput={ev => {
              const input = ev.target as HTMLInputElement
              setSearchQuery(input.value)
            }}
            className='!bg-transparent !border-none focus-visible:ring-0 !text-sm p-0 m-0' 
            placeholder='Search for a job...' />
          {
            searchQ.length ? (
              <div className='absolute right-2'>
                <Button 
                  type={'button'}
                  variant={'ghost'} 
                  size={'icon'}
                  className='w-6 h-6 rounded-full'
                  onClick={onClearQuery}>
                  <XIcon />
                </Button>
              </div>
            ) : (
              <></>
            )
          }
        </Label>
      </search.Form>
    )
  }
  
  return (
    <>
      <header className={
        cn('border-b')
      }>
        <nav className={
          cn('romvales-container')
        }>
          <div className={
            cn('flex items-center gap-4 py-2')
          }>
            
            <Link to={'/jobs'}>
              <img 
                className='w-[8.5rem]'  
                src={theme != Theme.LIGHT ? logoDark : logoLight} />
            </Link>

            <div className={
              cn(
                'flex-1',
                'flex items-center justify-end gap-4',
              )
            }>
              <div className={
                cn('hidden sm:flex')
              }>
                <Search />
              </div>
              

              <div className='flex-1'></div>

              <ul className={
                cn('gap-4', 'hidden sm:flex items-center')
              }>
                <li className='flex items-center'>
                  <NavLink className='text-sm inline-flex items-center gap-1' to='/jobs/applications'>
                    <PaperclipIcon size={16} />
                    Applications
                  </NavLink>
                </li>
              </ul>

              <NavDropdownMenu>
                <Button
                  className={'rounded-full'} 
                  size='icon' 
                  variant={'ghost'}>
                  <MenuIcon />
                </Button>
              </NavDropdownMenu>
            </div>
            
          </div>
        </nav>
        
        {hero}
      </header>

      <div>
        

        {
          /^(\/jobs)$/.test(location.pathname) && (
            <nav className={
              cn(
                'sm:hidden sticky top-0 mb-4 bg-white dark:bg-zinc-950 py-4 shadow-sm z-10',
              )
            }>
              <div className={
                cn('romvales-container')
              }>
                <Search />
              </div>
            </nav>
          )
        }

        <div className='my-4'>
          {children}
        </div>
      </div>
    </>
  )
}