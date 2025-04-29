import { ActionFunctionArgs, LinksFunction, MetaFunction } from '@vercel/remix'


import { cn } from '@components/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'

import { Button } from '@components/ui/button'
import { Link } from '@remix-run/react'
import { FooterWrapper } from '@romvales/components/layout'
import { content } from '@romvales/content'
import { useState } from 'react'

export const loader = async ({}: ActionFunctionArgs) => {
  return {}
}

export const links: LinksFunction = () => [
  { rel: 'canonical', href: 'https://romvales.com' }
]

export const meta: MetaFunction = () => {
  return content.metatags['/']
}

export default function Home() {
  const { me, faqs } = content
  const { profile, about, services, process } = me
  const { copywriting, design } = services

  return (
    <main>
      <FooterWrapper
        hero={
          <section 
            id='hero'
            className={
              cn(
                'min-h-[18rem] grid items-center',
              )
            }>
            <div className='romvales-container'>
              <div className={
                cn(
                  'py-[4rem] px-[1rem] lg:px-[12rem] text-center space-y-4',
                )
              }>
                <h1 className='hero-h1'>{profile.tagline}</h1>
                <p className='max-w-[48ch] mx-auto'>{profile.motto}</p>

                <nav className='space-x-2'>
                  <Button asChild>
                    <Link to={'/contact'}>
                      Send me a message
                    </Link>
                  </Button>
                </nav>
              </div>
            </div>
          </section>
        }>

        <section id='about'>
          <div className={'romvales-container'}>
            <div className={
              cn(
                'py-[4rem] px-[1rem] lg:px-[8rem] space-y-2',
              )
            }>
              <p className='romvales-h-label'>About</p>
              <h2 className='romvales-h2'>{about.title}</h2>
              {about.descriptions.map((desc, i) => <p className='max-w-[50ch]' key={i}>{desc}</p>)}
            </div>
          </div>
        </section>

        <section id='process'>
          <div className='romvales-container'>
            <div className={
              cn(
                'py-[4rem] px-[1rem] lg:px-[8rem] space-y-2',
              )
            }>
              <p className='romvales-h-label'>Process</p>
              <h2 className='romvales-h2'>{process.title}</h2>
              <p>{process.message}</p>
            </div>

            <ol className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {process.steps.map((step, i) => {
                const [showContent, setShowContent] = useState(false)                

                return (
                  <li 
                    key={i} 
                    onMouseEnter={() => setShowContent(true)}
                    onMouseLeave={() => setShowContent(false)}
                    onFocus={() => setShowContent(true)}
                    className='bg-white dark:bg-zinc-800 rounded-lg p-4 space-y-2 h-[12rem] lg:h-[14rem] shadow'>
                    
                    { !showContent && (
                      <h3 className='uppercase text-sm flex gap-2 items-center'>
                        <div>
                          <span className={'w-5 h-5 flex items-center justify-center border border-zinc-800 dark:border-zinc-100 rounded-full'}>{i+1}</span>
                        </div>
                        {step.title}
                      </h3>
                    ) }

                    { showContent && (
                      <div className='grid items-end h-full'>
                        <p className='text-[0.8rem] lg:text-[0.7rem]'>
                          {step.desc}
                        </p>
                      </div>
                    ) }

                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section id='services'>
          <div>
            <div className={
              cn(
                'romvales-container',
              )
            }>
              <div
                className={
                  cn(
                    'py-[8rem] px-[1rem] lg:px-[8rem] space-y-2'
                  )
                }>
                <p className='romvales-h-label'>Services</p>
                <h2 className='romvales-h1'>{services.title}</h2>
                <p className='max-w-[60ch]'>{services.desc}</p>
              </div>
            </div>

            <section 
              id='copywriting'
              className={
                cn(
                  'mb-4 py-10',
                  'bg-zinc-50 dark:bg-zinc-950',
                )
              }>
              <div
                className={
                  cn(
                    'romvales-container',
                  )
                }>
                <div className='py-[2rem] px-[1rem] lg:px-[4rem] space-y-2'>
                  <p className='romvales-h-label'>Copy</p>
                  <div>
                    <h3 className='romvales-h3'>{copywriting.title}</h3>
                    <h4 className='romvales-h4'>{copywriting.desc}</h4>
                  </div>
                  <p>{copywriting.message}</p>
                </div>

                <ul className={
                  cn(
                    'grid gap-4 md:grid-cols-3 px-[1rem] lg:px-[4rem]',
                  )
                }>
                  {copywriting.experiences.map((exp, i) => (
                    <li key={i}>
                      <h5 className='text-sm uppercase mb-2'>{exp.title}</h5>
                      <ol>
                        {exp.packages.map((pkg, i) => (
                          <li key={i} className='text-sm flex gap-1 items-center text-zinc-700 dark:text-zinc-500'>
                            {pkg.name}
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section 
              id='design'
              className={
                cn(
                  'py-10 bg-zinc-50 dark:bg-zinc-950',
                )
              }>
              <div
                className={
                  cn(
                    'romvales-container',
                  )
                }>
                <div className='py-[2rem] px-[1rem] lg:px-[4rem]'>
                  <p className='romvales-h-label'>Graphic design</p>
                  <h3 className='romvales-h3'>{design.title}</h3>
                  <h4 className='romvales-h4'>{design.desc}</h4>
                  <p>{design.message}</p>
                </div>

                <div className='px-[1rem] lg:px-[4rem]'>
                  <h5 className='uppercase text-sm mb-2'>Design Packages</h5>
                  <ol>
                    {design.packages.map((pkg, i) => (
                      <li key={i} className={
                        cn(
                          'text-sm flex gap-1 items-center text-zinc-700 dark:text-zinc-500',
                        )
                      }>
                        {pkg.name}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section id='faqs'>
          <div className='romvales-container '>
            <div className={
              cn(
                'max-w-[30rem] mx-auto py-4',
              )
            }>
              <p className='romvales-h-label'>FAQs</p>
              <h2 className='romvales-h1'>Got any questions? I'm here to answer.</h2>
            </div>

            <Accordion 
              type='single'
              className={
                cn(
                  'max-w-[30rem] mx-auto',
                )
              }>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>
                    <span className='text-zinc-900 dark:text-zinc-50'>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.ans?.map((p, i) => <p key={i}>{p}</p>)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </FooterWrapper>

    </main>
  )
}