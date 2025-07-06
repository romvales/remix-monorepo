import { cn } from '@components/lib/utils'
import { ClientLoaderFunctionArgs, Link, useLoaderData, useRevalidator } from '@remix-run/react'
import { JobModel } from '@romvales/core.model/job'
import { getJobApplications } from '@romvales/core.service/guest.client'
import { LoaderFunctionArgs, MetaFunction } from '@vercel/remix'
import { useEffect } from 'react'

import dayjs from '@components/lib/time'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { content } from '@romvales/content'
import { startCase } from 'lodash-es'
import { BoltIcon, CircleUserIcon, EllipsisVerticalIcon, InfoIcon, TimerIcon } from 'lucide-react'

export const meta: MetaFunction = () => {
  return content.metatags['/jobs/applications']
}

export const loader = async (args: LoaderFunctionArgs) => {
  return {}
}

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const data = await serverLoader<typeof loader>()
  const jobApps = await getJobApplications()

  return { ...data, jobApps }
}

clientLoader.hydrate = true as const


export function HydrateFallback() {
  return (
    <main>
      <section>

      </section>
    </main>
  )
}

export default function JobApps() {
  const { jobApps } = useLoaderData<typeof clientLoader>()
  const revalidator = useRevalidator()

  useEffect(() => {

    // If jobApps resolves to null, revalidate the state until it receives a value.
    if (!jobApps) revalidator.revalidate()

  }, [ jobApps ])

  return ( 
    <main>
      <section>
        <div className='romvales-container'>
          <div>
            <h1 className='romvales-h2'>Job Applications</h1>
            <p>Manage your pending job applications.</p>
          </div>
        </div>
      </section>
      <section>
        <div className={
          cn(
            'romvales-container',
          )
        }>
          
          {
            jobApps?.length && (
              <ul className={
                cn(
                  'grid lg:grid-cols-2 gap-4',
                )
              }>
                {jobApps.map(app => {
                  const jobModel = JobModel.from(app.job as RomTypes.DirectusSchema['jobs'][number])
                  const company = jobModel.raw.company as RomTypes.DirectusSchema['companies'][number]
                  const contact = app.contact as RomTypes.DirectusSchema['contacts'][number]

                  return (
                    <li key={app.id}>
                      <div className={
                        cn(
                          'p-4 rounded border shadow',
                          'dark:bg-zinc-800 dark:border-zinc-700',
                        )
                      }>
                        <div>
                          <div className='flex justify-between relative'>
                            <p className='text-xs dark:text-zinc-500 space-x-1'>
                              <time dateTime={app.created!}>
                                Applied on {dayjs(app.created!).format('MMMM DD, YYYY')}
                              </time>
                              <span>•</span>
                              <time dateTime={app.updated!}>
                                Updated {dayjs(app.updated!).fromNow()}
                              </time>
                            </p>
                            <Button className='absolute right-0 rounded-full' size={'icon'} variant={'ghost'}>
                              <EllipsisVerticalIcon />
                            </Button>
                          </div>

                          

                          <Button className='px-0' variant={'link'} asChild>
                            <Link to={`/jobs/${jobModel.id}`}>
                              <h2 className='romvales-h3'>{jobModel.title}</h2>
                            </Link>
                          </Button>

                          <div className='flex items-center gap-2 mb-4'>
                            <div className='flex items-center gap-2 text-sm'>
                              <Avatar className='w-5 h-5'>
                                { company &&  <AvatarImage className='rounded-full' src={`/assets/${company.logo}`} alt='Profile picture' />  }
                                <AvatarFallback>
                                  { company && <span>{ company.companyName?.slice(0, 2).toUpperCase() }</span> || <span>?</span> }
                                </AvatarFallback>
                              </Avatar>
                              {
                                company && <span>{company.companyName}</span> || <span>Unknown</span>
                              }
                            </div>
                          
                            <p className='flex gap-1 items-center text-xs'><span className='text-xs'>•</span> {jobModel.locationSimple}</p>
                          </div>
                        </div>

                        <dl className='flex flex-wrap text-xs gap-1'>
                          <div className='flex gap-1 items-center border border-zinc-400 px-2 rounded'>
                            <dt><BoltIcon size={12} /></dt>
                            <dd className='capitalize'>{jobModel.workMode}</dd>
                          </div>
                          <div className='flex gap-1 items-center border border-zinc-400 px-2 rounded'>
                            <dt>{jobModel.currency}</dt>
                            <dd>{jobModel.salaryRange}</dd>
                          </div>
                          <div className='flex gap-1 items-center border border-zinc-400 px-2 rounded'>
                            <dt><TimerIcon size={12} /></dt>
                            <dd className='capitalize'>{jobModel.jobType}</dd>
                          </div>
                        </dl>

                        <br />
                        
                        <div className='flex items-center justify-between'>
                          <p 
                            className='flex items-center gap-1'
                            role='alert' 
                            aria-live='assertive'>
                            <InfoIcon size={14} />
                            <p className='text-xs'>{startCase(app.status!)}</p>
                          </p>
                          <p className='uppercase mr-2 flex items-center gap-1'>
                            <CircleUserIcon className='text-zinc-600' size={16} />
                            <span className='text-zinc-600 font-light text-sm'>{contact.firstName} {contact.lastName}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }
        </div>
      </section>
    </main>
  )
}