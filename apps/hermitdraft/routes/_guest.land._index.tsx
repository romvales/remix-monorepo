import { cn } from '@components/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Button } from '@components/ui/button'

import { content } from '@hermitdraft/content'

import { Link, MetaFunction } from '@remix-run/react'

import { BrainCogIcon } from 'lucide-react'

export const meta: MetaFunction = () => [
  { title: 'Hermitdraft | Offline-First Writing Tool' }
]

export default function Home() {

  return (
    <main className='land grid gap-12'>
      
      <header className={
        cn(
          'main border-b',
          'py-20 bg-zinc-100',
        )
      }>
        <div className={
          cn(
            'hermitdraft@container',
            'grid gap-2',
          )
        }>
          <h1 className='hermitdraft@h1 mx-auto'>{content.name}</h1>
          <p className='text-xl mx-auto mb-8'>{content.tagline}</p>

          <nav className={
            cn(
              'flex gap-1 mx-auto',
            )
          }>
            {content.nav.map((nav, i) => (
              <Button 
                key={i}
                size={'lg'}
                asChild>
                <Link to={nav.to}>
                  {nav.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <section className='hero'>
        <div className='hermitdraft@container space-y-4'>
          <p>{content.hero.main}</p>

          <ul className={
            cn(
              'grid grid-cols-1 md:grid-cols-2',
              'gap-4',
            )
          }>
            {content.benefits.map((benefit, i) => (
              <li className={
                cn(
                  'rounded-lg shadow',
                  'p-4 bg-zinc-100',
                )
              } key={i}>
                <div>
                  <h3 className='hermitdraft@h3'>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='features'>
        <div className='hermitdraft@container space-y-4'>
          <div>
            <h2 className='hermitdraft@h2'>Features</h2>
            <p>
              Hermitdraft uses modern browser features to store 
              your drafts and files directly on your device:
            </p>
          </div>

          <ul className='text-zinc-600'>
            {content.features.map((feature, i) => (
              <li key={i}>
                <div>
                  <h3 className='hermitdraft@h3 flex items-center gap-1'>
                    <BrainCogIcon size={18} />
                    <span>{feature.title}</span>
                  </h3>
                  <p>{feature.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className='hermitdraft@container'>
          <h2 className='hermitdraft@h2'>{content.convo.title}</h2>
          {content.convo.desc.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
        </div>
      </section>

      <section className='faqs'>
        <div className='hermitdraft@container space-y-4'>
          <div>
            <h2 className='hermitdraft@h2'>{content.faqs.title}</h2>
            <p>{content.faqs.desc}</p>
          </div>

          <Accordion 
            type='single'>
            {content.faqs.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  {item.text}
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p>{item.ans}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className={
        cn(
          'foot-cta',
          'py-20 border-t'
        )
      }>
        <div className={
          cn(
            'hermitdraft@container py-32',
            'grid justify-center gap-4',
            'bg-zinc-50',
          )
        }>  
          <div className='grid gap-1 text-center'>
            <h2 className='hermitdraft@h2'>{content.cta.title}</h2>
            <p>A minimalist writing tool for offline writers</p>
          </div>

          <nav className='flex gap-1 mx-auto'>
            {content.cta.actions.map((nav, i) => (
              <Button key={i} variant={'link'} asChild>
                <Link to={nav.to}>
                  {nav.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </section>

    </main>
  )
}