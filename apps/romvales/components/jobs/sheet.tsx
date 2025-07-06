import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@components/ui/sheet'
import { JobModel } from '@romvales/core.model/job'
import { BookmarkIcon, CircleDollarSignIcon, EllipsisVerticalIcon, FactoryIcon, MapPinIcon, TimerIcon } from 'lucide-react'

import dayjs from '@components/lib/time'
import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { Link, useLoaderData, useRevalidator } from '@remix-run/react'
import { MouseEventHandler } from 'react'

type PreviewJobInfoProps = ComponentProps<{
  job: RomTypes.DirectusSchema['jobs'][number]
}>

import { clientLoader } from '@romvales/routes/_jobs.jobs._index'
import { PreviewJobInfoMenu } from './dropdown'

export function PreviewJobInfo({ job, children }: PreviewJobInfoProps) {
  const jobModel = new JobModel(job)
  const revalidator = useRevalidator()
  const { bookmarks } = useLoaderData<typeof clientLoader>()

  const onBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    jobModel.bookmarkJob().then(revalidator.revalidate)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className={'overflow-y-auto min-w-full sm:min-w-1/4'}>
        <SheetHeader className='pb-0'>
          <SheetTitle className='text-xl'>{job.jobTitle}</SheetTitle>
          <SheetDescription className='mb-1'>
            <time className='text-sm' dateTime={job.created!}>
              Posted {dayjs(job.created).fromNow()}
            </time>
          </SheetDescription>
          <nav className='flex items-center gap-1'>
            <Button className='flex-1' asChild>
              <Link to={`/jobs/${job.id}`}>
                Apply now
              </Link>
            </Button>
            <Button 
              size={'icon'} 
              variant={'ghost'} 
              onClick={onBookmark}>
              <BookmarkIcon className={
                cn(
                  bookmarks?.has(job.id) ? 'dark:fill-zinc-100' : '',
                )
              } />
            </Button>
            <PreviewJobInfoMenu job={job}>
              <Button size={'icon'} variant={'ghost'}>
                <EllipsisVerticalIcon />
              </Button>
            </PreviewJobInfoMenu>
          </nav>
        </SheetHeader>

        <Separator />

        <main>
          <dl className='space-y-2 text-sm mx-4'>
            <div className='flex items-center gap-1'>
              <dt><MapPinIcon size={16} /></dt>
              <dd>{jobModel.locationSimple}</dd>
            </div>
            <div className='flex items-center gap-1'>
              <dt><FactoryIcon size={16} /></dt>
              <dd>{jobModel.industries}</dd>
            </div>
            <div className='flex items-center gap-1'>
              <dt><TimerIcon size={16} /></dt>
              <dd className='capitalize'>{jobModel.workMode}</dd>
            </div>
            <div className='flex items-center gap-1'>
              <dt><CircleDollarSignIcon size={16} /></dt>
              <dd>{jobModel.currency} {jobModel.salaryRange}</dd>
            </div>
          </dl>

          <div className='mx-4'>
            <article className='prose prose-sm'>
              <div dangerouslySetInnerHTML={{ __html: job.description ?? '' }}></div>
            </article>
          </div>
        </main>
      </SheetContent>
    </Sheet>
  )
}