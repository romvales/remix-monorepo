import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Textarea } from '@components/ui/textarea'

import {
  RadioGroup,
  RadioGroupItem,
} from '@components/ui/radio-group'


import { ActionFunctionArgs, data, LinksFunction, LoaderFunctionArgs, MetaFunction } from '@vercel/remix'

import { Link, useFetcher, useNavigate } from '@remix-run/react'
import { FooterWrapper } from '@romvales/components/layout'
import { content } from '@romvales/content'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Badge } from '@components/ui/badge'
import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
import { Turnstile } from '@marsidev/react-turnstile'
import { SelectItemIndicator } from '@radix-ui/react-select'
import { storeContactToDirectus } from '@romvales/core.actions/contact'
import { directus } from '@romvales/core.server/client'
import { userSession } from '@romvales/session'
import { flushPendingMessagesFromSession } from '@shared/directus/contact.actions'
import { getCountryDataList } from 'countries-list'
import { AlertCircleIcon, Check, LoaderCircleIcon } from 'lucide-react'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'

export const action = async (args: ActionFunctionArgs) => {
  return await storeContactToDirectus(args)
}

export const meta: MetaFunction = () => {
  return content.metatags['/contact']
}

export const links: LinksFunction = () => [
  { rel: 'canonical', href: 'https://romvales.com/contact' }
]

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const session = await userSession.getSession(request.headers.get('Cookie'))

  return data({}, {
    headers: {
      'Set-Cookie': await userSession.commitSession(
        await flushPendingMessagesFromSession(
          directus,
          session,
        )
      ),
    },
  })
}

export default function Contact() {
  const navigate = useNavigate()
  const countries = useMemo(() => getCountryDataList(), [])
  const { contact, me: { profile }, industries } = content

  const formRef = useRef<HTMLFormElement>(null)
  const [services, setServices] = useState<string[]>([])
  const form = useFetcher<typeof storeContactToDirectus>()

  useEffect(() => {

    if (form.state == 'idle' && form.data?.ok) {
      const ref = formRef.current!
      ref.reset()
      setServices([])
    }

  }, [ form ])

  return (
    <main>
      <FooterWrapper
        hero={
          <section className='hero'>
            <div className='romvales-container'>
              <div className={
                cn(
                  'py-[4rem] px-[1rem] xl:px-[12rem] mx-auto',
                  'grid justify-center',
                )
              }>
                <div className='lg:mx-[1rem]'>
                  <h1 className='romvales-h1'>{contact.sub}</h1>
                  <p>{contact.message}</p>
                </div>

                <nav className='lg:mx-[1rem]'>
                  <Button variant={'secondary'} asChild>
                    <Link to={`mailto:${profile.name} <${profile.email}>`}>
                      {contact.button}
                    </Link>
                  </Button>
                </nav>
              </div>
            </div>
          </section>
        }>
        
        <section className='contact'>
          <div className='romvales-container'>
        
          <form.Form
            ref={formRef}
            method='post'
            encType='multipart/form-data'
            className={
              cn(
                'grid gap-4',
                'max-w-[60ch] mx-auto',
                'bg-white dark:bg-zinc-900 rounded p-4',
              )
            }>

            <div>
              <h2 className='romvales-h2'>Contact form</h2>
            </div>

            {contact.props.map((field, i) => {
              const { typ, attrs, name } = field

              let input: React.ReactNode = <></>

              switch (typ) {
              case 'form':
                input = (
                  <Input name={attrs.name} placeholder={attrs.placeholder ?? ''} />
                )

                break
              case 'form+gender':
                return (
                  <div key={i}>
                    <Label>Gender</Label>
                    <RadioGroup 
                      className={
                        cn(
                          'grid grid-cols-3',
                        )
                      }
                      name={attrs.name}>

                      <Label className='flex items-center gap-1'>
                        <RadioGroupItem value='male' />
                        <span>Male</span>
                      </Label>

                      <Label className='flex items-center gap-1'>
                        <RadioGroupItem value='female' />
                        <span>Female</span>
                      </Label>

                      <Label className='flex items-center gap-1'>
                        <RadioGroupItem value='other' />
                        <span>Other</span>
                      </Label>

                    </RadioGroup>
                  </div>
                )
              case 'form+message':
                input = (
                  <Textarea name={attrs.name} placeholder={attrs.placeholder ?? ''} />
                )
                break

              case 'form+country':
                input = (
                  <Select name={attrs.name}>
                    <SelectTrigger>
                      <SelectValue placeholder='What country are you coming from?' />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country, i) => (
                        <SelectItem key={i} value={country.name}>
                          <span>{country.name}</span>
                          <SelectItemIndicator />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
                break
              
              case 'form+industry':
                input = (
                  <Select name={attrs.name}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select which industry you are working' />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry, i) => (
                        <SelectItem key={i} value={industry}>
                          <span>{industry}</span>
                          <SelectItemIndicator />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
                break
              case 'form+service':
                const { me: { services: { copywriting, design } } } = content
                const [open, setOpen] = useState<boolean>()

                const onCommandToggle = async (pkg: string) => {
                  const items = new Set(services)

                  if (items.has(pkg)) items.delete(pkg)
                  else items.add(pkg)

                  setServices(Array.from(items))
                }

                return (
                  <Fragment key={i}>
                    <Label>{name}</Label>
                    <div className={
                      cn(
                        services.length ? 'flex flex-wrap gap-1' : 'hidden'
                      )
                    }>
                      {services.map((service, i) => (
                        <Badge className='text-[0.6rem]' key={i}>
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          className={
                            cn(
                              'border',
                            )
                          }
                          variant={'outline'}>
                          {
                            services.length ? `Selected (${services.length})` : 'Select services'
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='p-1'>
                        <Command>
                          <CommandList>
                            {copywriting.experiences.map((exp, i) => (
                              <CommandGroup key={i} heading={exp.title}>
                                {exp.packages.map((pkg, i) => (
                                  <CommandItem 
                                    key={i}
                                    className={'flex items-center justify-between'}
                                    onSelect={() => onCommandToggle(pkg.name)}>
                                    <span>{pkg.name}</span>
                                    { new Set(services).has(pkg.name) && <Check /> }
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}

                            <CommandGroup heading={'Graphic design'}>
                              {design.packages.map((pkg, i) => (
                                <CommandItem 
                                  key={i}
                                  className={'flex items-center justify-between'}
                                  onSelect={() => onCommandToggle(pkg.name)}>
                                  <span>{pkg.name}</span>
                                  { new Set(services).has(pkg.name) && <Check /> }
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {services.map((service, i) => (
                      <input key={i} className='hidden' name={`${attrs.name}s[]`} hidden aria-hidden value={service} readOnly />
                    ))}
                  </Fragment>
                )
              }

              return (
                <Label className='grid gap-1' key={i}>
                  <span>{name}</span>
                  {input}
                </Label>
              )
            })}

            { 
              process.env.TURNSTILE_SITE && 
              <Turnstile siteKey={process.env.TURNSTILE_SITE} />
            }

            {
              form.data?.ok &&
              <Alert className='grid gap-1'>
                <AlertTitle className='flex items-center gap-1'>
                  <AlertCircleIcon size={14} />
                  Form submission complete
                </AlertTitle>
                <AlertDescription>
                  I'll get in touch with you soon, {form.data.name}!
                </AlertDescription>
              </Alert>
            }

            <div>
              <Button>
                { form.state == 'submitting' && <LoaderCircleIcon className='animate-spin' /> }
                <span>Send message</span>
              </Button>
            </div>
          </form.Form>

          </div>
        </section>

      </FooterWrapper>
    </main>
  )
}