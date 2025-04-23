import { cn } from '@components/lib/utils'
import React from 'react'


type FooterWrapperProps = ComponentProps<{
  hero: React.ReactNode
}>

export function FooterWrapper({ hero, children, className }: FooterWrapperProps) {


  return (
    <>
      {hero}

      <div className={
        cn(
          'romvales-main',
        )
      }>
        <div className={
          cn(
            'space-y-4',
          )
        }>
          {children}
        </div>

        <footer>
          <div className='romvales-container'>
            <section>
              
            </section>
          </div>
        </footer>
      </div>
    </>
  )
}