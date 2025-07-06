import { cn } from '@components/lib/utils'
import { Separator } from '@components/ui/separator'

import { ClientLoaderFunctionArgs, Link, useFetcher, useLoaderData, useRevalidator } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, replace } from '@vercel/remix'

import { JobApplicationDialog } from '@romvales/components/jobs/dialog'
import { commitJobApplication } from '@romvales/core.actions/jobs'
import { getJob } from '@romvales/core.service/jobs'

import { Button } from '@components/ui/button'
import { JobModel } from '@romvales/core.model/job'
import { getBookmarkByJob, guestViewJobPost } from '@romvales/core.service/guest.client'
import { BookmarkIcon, CircleDollarSignIcon, EllipsisVerticalIcon, FactoryIcon, MapIcon, TimerIcon } from 'lucide-react'
import { MouseEventHandler, useEffect } from 'react'
import invariant from 'tiny-invariant'

import dayjs from '@components/lib/time'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'
import { JobInfoMenu } from '@romvales/components/jobs/dropdown'

export const meta: MetaFunction<typeof loader> = args => {
  invariant(args.data, 'Missing data property in the meta function.')
  const { job } = args.data
  const jobModel = JobModel.from(job)
  const company = job.company as RomTypes.DirectusSchema['companies'][number]

  return [
    { title: `${company?.companyName ?? 'Unknown'} - ${job.jobTitle}, ${jobModel.locationSimple}` },
  ]
}

export const action = async (args: ActionFunctionArgs) => {
  return commitJobApplication(args)
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.jobId, 'Missing jobId from URL parameter.')
  
  try {
    const url = new URL(request.url)
    const { job } = await getJob(params.jobId)

    return { job }
  } catch {
    return replace(request.url)
  }
}

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const { job } = await serverLoader<typeof loader>()
  const bookmark = await getBookmarkByJob(job.id)
  return { job, bookmark }
}

clientLoader.hydrate = true as const

export default function JobInfo() {
  const { job, bookmark } = useLoaderData<typeof clientLoader>()
  const jobModel = JobModel.from(job)
  const fetcher = useFetcher()
  const application = useFetcher<{
    ok: boolean
    jobApp: RomTypes.DirectusSchema['jobApplications'][number]
  }>()

  const revalidator = useRevalidator()
  const company = job.company as RomTypes.DirectusSchema['companies'][number]

  useEffect(() => {

    guestViewJobPost(job).then(({ viewed }) => {
      if (!viewed) {
        const data = new FormData()
        data.append('updateViewCount.jobId', job.id)
        fetcher.submit(data, {
          action: '/jobs?action=updateJobStats',
          encType: 'multipart/form-data',
          method: 'post',
        })
      }
    })

  }, [])

  const onBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    jobModel.bookmarkJob().then(revalidator.revalidate)
  }

  return (
    <main>
      <section className={
        cn(
          'romvales-container',
        )
      }>
        <div className={
          cn(
            'grid gap-4 md:grid-cols-8',
          )
        }>
          
          <div className={
            cn(
              'md:col-span-5 lg:col-span-6',
              'space-y-4',
            )
          }>
            {
              application.state == 'idle' && application.data?.ok && (
                <Alert className={
                  cn(
                    'bg-green-300/20 border-green-400/50 dark:text-white',
                  )
                }>
                  <AlertTitle className='romvales-h3 capitalize'>Your application was sent!</AlertTitle>
                  <AlertDescription className='flex flex-wrap'>
                    You can view updates on your application here:
                    <Link to='/jobs/applications'>https://romvales.com/jobs/applications</Link>
                  </AlertDescription>
                </Alert>
              )
            }

            <time className='text-xs dark:text-zinc-500' dateTime={job.created!}>
              Posted {dayjs(job.created).fromNow()}
            </time>
            <div className='flex items-center justify-between'>
              <h1 className='romvales-h1 capitalize'>{job.jobTitle}</h1>
              <nav className='flex items-center'>
                <Button 
                  className='rounded-full' 
                  size='icon' 
                  variant={'ghost'}
                  onClick={onBookmark}>
                  <BookmarkIcon className={
                    cn(
                      bookmark ? 'dark:fill-zinc-100' : '',
                    )
                  } />
                </Button>
                <JobInfoMenu job={job}>
                  <Button
                    className='rounded-full'
                    size={'icon'}
                    variant={'ghost'}>
                    <EllipsisVerticalIcon />
                  </Button>
                </JobInfoMenu>
              </nav>
            </div>

            <div className='flex items-center gap-1 text-base'>
              <Avatar className='w-8 h-8'>
                { company &&  <AvatarImage className='rounded-full' src={`/assets/${company.logo}`} alt='Profile picture' />  }
                <AvatarFallback>
                  { company && <span>{ company.companyName?.slice(0, 2).toUpperCase() }</span> || <span>?</span> }
                </AvatarFallback>
              </Avatar>
              {
                company && <span>{company.companyName}</span> || <span>Unknown</span>
              }
            </div>

            <section className={
              cn(
                'md:hidden',
              )
            }>
              <JobApplicationDialog application={application} />
            </section>

            <section className='space-y-4'>

              <dl className='space-y-2 text-sm'>
                <div className='flex items-center gap-1'>
                  <dt><MapIcon size={16} /></dt>
                  <dd>{jobModel.locationSimple}</dd>
                </div>
                <div className='flex items-center gap-1'>
                  <dt><FactoryIcon size={16} /></dt>
                  <dd>{jobModel.industries}</dd>
                </div>
                <div className='flex items-center gap-1'>
                  <dt><TimerIcon size={16} /></dt>
                  <dd className='capitalize'>{jobModel.jobType}</dd>
                </div>
                <div className='flex items-center gap-1'>
                  <dt><CircleDollarSignIcon size={16} /></dt>
                  <dd>{jobModel.currency} {jobModel.salaryRange}</dd>
                </div>
              </dl>

              <p>{job.briefDescription}</p>
            </section>
            
            <Separator />

            <article className='prose prose-zinc dark:prose-invert !max-w-none'>
              <div dangerouslySetInnerHTML={{ __html: job.description! }}></div>
            </article>
          </div>

          <div className={
            cn(
              'hidden md:grid md:col-span-3 lg:col-span-2',
            )
          }>
            <JobApplicationDialog application={application} />
          </div>
          
        </div>
      </section>
    </main>
  )
}