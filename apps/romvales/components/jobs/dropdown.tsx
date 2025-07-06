import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/dropdown-menu'
import { Link } from '@remix-run/react'
import { JobModel } from '@romvales/core.model/job'
import { PaperclipIcon } from 'lucide-react'

type NavDropdownMenuProps = ComponentProps<{}>

export function NavDropdownMenu({ children }: NavDropdownMenuProps) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem className={'sm:hidden'} asChild>
          <Link to={'/jobs/applications'}>
            <PaperclipIcon size={14} />
            Applications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Saved Jobs
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={'/contact'} reloadDocument>
            Contact
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={'/jobs/about'}>
            About
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={'/jobs/for-employers'}>
            For Employers
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

type PreviewJobInfoMenuProps = ComponentProps<{
  job: RomTypes.DirectusSchema['jobs'][number]
}>

function onShareJobPosting(job: RomTypes.DirectusSchema['jobs'][number]) {
  const jobModel = JobModel.from(job)
  const company = job.company as RomTypes.DirectusSchema['companies'][number]

  return navigator.share({
    title: `${company?.companyName ?? 'Unknown'} - ${jobModel.title}, ${jobModel.locationSimple}`,
    url: `${location.origin}/jobs/${jobModel.id}`,
  })
}

async function onReportJobPosting(job: RomTypes.DirectusSchema['jobs'][number]) {
  const jobModel = JobModel.from(job)
  const data = new FormData()
  const message = prompt('Why are you reporting this job post?')  ?? ''

  data.append('jobId', jobModel.id)
  data.append('+reportCount', job.reportCount?.toString() ?? '0')
  data.append('message', message)

  const req = new Request('/jobs/applications.api?action=reportJobPosting', {
    method: 'POST',
    body: data,
  })

  return fetch(req).then(res => res.json())
}

export function PreviewJobInfoMenu({ job, children }: PreviewJobInfoMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem onClick={() => onShareJobPosting(job)}>
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onReportJobPosting(job)}>
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type JobInfoMenuProps = ComponentProps<{
  job: RomTypes.DirectusSchema['jobs'][number]
}>

export function JobInfoMenu({ job, children }: JobInfoMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem onClick={() => onShareJobPosting(job)}>
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onReportJobPosting(job)}>
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

