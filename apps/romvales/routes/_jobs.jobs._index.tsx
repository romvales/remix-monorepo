
import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

import { ClientLoaderFunctionArgs, Link, useLoaderData, useRevalidator } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, replace } from '@vercel/remix'

import { BoltIcon, BookmarkIcon, EyeIcon, MapPinIcon, SquareArrowOutUpRightIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { PreviewJobInfo } from '@romvales/components/jobs/sheet'
import { JobModel } from '@romvales/core.model/job'
import { getBookmarks, guestIsJobViewed } from '@romvales/core.service/guest.client'
import { getOpenJobs } from '@romvales/core.service/jobs'
import { MouseEventHandler } from 'react'

import dayjs from '@components/lib/time'

import { content } from '@romvales/content'
import { updateJobStats } from '@romvales/core.actions/jobs'
import { getCompanies } from '@romvales/core.service/company'
import { updateUserConfigFromCookie } from '@romvales/core.service/guest'
import { userSession } from '@romvales/session'

export const meta: MetaFunction = () => {
  return content.metatags['/jobs']
}

export const action = async (args: ActionFunctionArgs) => {
  const url = new URL(args.request.url)

  switch (url.searchParams.get('action')) {
  case 'updateUserConfig':
    return updateUserConfigFromCookie(args)
  case 'updateJobStats':
    return updateJobStats(args)
  }

  return {}
}

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const session = await userSession.getSession(request.headers.get('Cookie'))
  const config = session.get('config')

  try {
    const jobs = await getOpenJobs(args)
    const companies = await getCompanies({ statsOnly: true })

    return { jobs, companies, config }
  } catch (e) {
    return replace(request.url)
  }
}

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const { jobs, companies, config } = await serverLoader<typeof loader>()

  const bookmarks = new Set((await getBookmarks()).map(bookmark => bookmark.jobId))
  const views = await Promise.all(jobs.items.map(job => guestIsJobViewed(job.id)))

  return { jobs, views, bookmarks, companies, config }
}

clientLoader.hydrate = true as const

export default function Jobs() {
  const { jobs, views, bookmarks, companies, config } = useLoaderData<typeof clientLoader>()
  const revalidator = useRevalidator()

  return (
    <main>
      <div className={
        cn(
          'romvales-container',
        )
      }>

        <div className='flex items-center gap-2 mb-4'>
          <dl className='flex items-center gap-[2px]'>
            <div className='flex items-center gap-1 text-xs'>
              <dt className='order-1'>jobs</dt>
              <dd><data value={jobs.itemCount}>{jobs.itemCount}</data></dd>
            </div>
            <span>·</span>
            <div className='flex items-center gap-1 text-xs'>
              <dt className='order-1'>{ companies.itemCount <= 1 ? 'company' : 'companies' }</dt>
              <dd><data value={jobs.itemCount}>{companies.itemCount}</data></dd>
            </div>
            <span>·</span>
            <address className='text-xs not-italic text-zinc-500'>
              {config?.jobs?.query.country}
            </address>
          </dl>

          <div className='flex-1'>
            <Separator />
          </div>
        
        </div>

        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          { jobs.items.map((job, i) => {
            const company = job.company as RomTypes.DirectusSchema['companies'][number]
            const onBookmark: MouseEventHandler<HTMLButtonElement> = ev => {
              jobModel.bookmarkJob().then(revalidator.revalidate)
              ev.preventDefault()
            }

            const jobModel = JobModel.from(job)
            const view = views ? views[i] : null

            return (
              <li key={job.id}>
                <div className={
                  cn(
                    'border rounded-lg p-4 hover:outline-1 shadow',
                    'dark:border-zinc-700 dark:bg-zinc-800',
                  )
                }>
                  <PreviewJobInfo job={job}>  
                    <div className='flex flex-col max-h-full min-h-[20ch] gap-1'>
                      <div className='flex relative'>
                        <div>
                          <div className='flex items-center gap-1 text-[0.75rem]'>
                            <Avatar className='w-5 h-5'>
                              { company &&  <AvatarImage src={`/assets/${company.logo}`} alt='Profile picture' />  }
                              <AvatarFallback>
                                { company && <span>{ company.companyName?.slice(0, 2).toUpperCase() }</span> || <span>?</span> }
                              </AvatarFallback>
                            </Avatar>
                            {
                              company && <span>Posted for {company.companyName}</span> || <span>Unknown</span>
                            }
                          </div>
                          <h3 className='text-[1.2  rem]'>{job.jobTitle}</h3>
                          <dl className='flex flex-wrap text-xs gap-1'>
                            <div className='flex gap-1 items-center border border-zinc-400 px-2 rounded'>
                              <dt><BoltIcon size={12} /></dt>
                              <dd className='capitalize'>{jobModel.workMode}</dd>
                            </div>
                            <div className='flex gap-1 border border-zinc-400 px-2 rounded'>
                              <dt>{jobModel.currency}</dt>
                              <dd>{jobModel.salaryRange}</dd>
                            </div>
                          </dl>
                        </div>
                        <Button 
                          className={'rounded-full absolute right-[-0.5rem] top-[-0.5rem]'}
                          size={'icon'} 
                          variant={'ghost'}
                          onClick={onBookmark}>
                          <BookmarkIcon className={
                            cn(
                              bookmarks?.has(job.id) ? 'dark:fill-zinc-100' : '',
                            )
                          } />
                        </Button>
                      </div>

                      <div>
                        <dl>
                          <div className='flex items-center gap-1'>
                            <dt><MapPinIcon size={14} /></dt>
                            <dd className='text-sm'>{jobModel.locationSimple}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div className='flex-1 flex justify-between items-end'>
                        <nav className='flex flex-col gap-1 items-start'>
                          <Button className='p-0 h-full' variant={'link'} asChild>
                            <Link className='text-xs' to={`/jobs/${job.id}`}>
                              <SquareArrowOutUpRightIcon />
                              <span className='flex items-center gap-1'>Apply now</span>
                            </Link>
                          </Button>
                          {
                            view && (
                              <p className='text-[0.65rem]'>
                                Viewed {dayjs(view.viewed).fromNow(true)} ago
                              </p>
                            )
                          }
                        </nav>
                        
                        <dl>
                          <div className='flex items-center gap-1'>
                            <dt>
                              <EyeIcon size={14} />
                            </dt>
                            <dd className='text-xs'>{jobModel.viewCount}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      
                    </div>
                  </PreviewJobInfo>
                </div>
              </li>
            )
          }) }
        </ul>

      </div>
    </main>
  )
}