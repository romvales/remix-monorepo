import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { FetcherWithComponents, useLoaderData } from '@remix-run/react'
import { getCountryDataList } from 'countries-list'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Textarea } from '@components/ui/textarea'
import { Turnstile } from '@marsidev/react-turnstile'
import { guestApplyJobPost } from '@romvales/core.service/guest.client'
import { loader } from '@romvales/routes/_jobs.jobs.$jobId._index'
import { LoaderCircleIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type JobApplicationDialogProps = {
  application: FetcherWithComponents<{
    ok: boolean
    jobApp: RomTypes.DirectusSchema['jobApplications'][number]
  }>
}

export function JobApplicationDialog({ application }: JobApplicationDialogProps) {
  const { job } = useLoaderData<typeof loader>()
  const countries = useMemo(() => getCountryDataList(), [])
  const [open, setOpen] = useState(false)

  useEffect(() => {

    if (application.state == 'idle' && application.data?.ok) {
      const { jobApp } = application.data
      guestApplyJobPost(jobApp)
      setOpen(false)
    }

  }, [ application ])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>
          Apply now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-left'>
          <DialogTitle>{job.jobTitle}</DialogTitle>
          <DialogDescription>Apply now</DialogDescription>
        </DialogHeader>
        
        <application.Form
          method='post'
          encType='multipart/form-data'
          className='grid gap-2'>

          <input name='job' value={job.id} hidden readOnly aria-hidden aria-readonly />

          <div className='grid grid-cols-2 gap-4'>
            <Label className={'grid gap-2'}>
              <span>First Name</span>
              <Input name='firstName' />
            </Label>
            <Label className={'grid gap-2'}>
              <span>Last Name</span>
              <Input name='lastName' />
            </Label>
          </div>

          <Label className={'grid gap-2'}>
            <span>Email</span>
            <Input type='email' name='email' />
          </Label>

          <Label className={'grid gap-2'}>
            <span>Country</span>
            <Select name='country'>
              <SelectTrigger>
                <SelectValue placeholder='Select country...' />
              </SelectTrigger>
              <SelectContent>
                { countries.map((country, i) => (
                  <SelectItem value={country.name} key={i}>
                    {country.name}
                  </SelectItem>
                )) }
              </SelectContent>
            </Select>
          </Label>

          <div className='grid grid-cols-2 gap-4'>
            <Label className={'grid gap-2'}>
              <span>State</span>
              <Input name='locationState' />
            </Label>

            <Label className={'grid gap-2'}>
              <span>City</span>
              <Input name='locationCity' />
            </Label>

            <Label className={'col-span-2 grid gap-2'}>
              <span>Street Line</span>
              <Textarea name='locationStreet' />
            </Label>
          </div>

          <Label className={'grid gap-2'}>
            <span>Mobile</span>
            <Input type='tel' name='mobile' />
          </Label>

          <Label className='grid gap-2'>
            <span>Updated Resume</span>
            <p className='font-normal text-zinc-400'>Please upload your updated resume.</p>
          </Label>

          <Input type='file' name='resume' accept='.pdf,.docx,.doc' required />

          <br />

          {
            process.env.TURNSTILE_SITE &&
            <Turnstile siteKey={process.env.TURNSTILE_SITE} />
          }

          <DialogFooter>
            <Button type='button' variant={'ghost'}>
              Cancel
            </Button>
            <Button type='submit' className='flex items-center'>
              { application.state == 'submitting' && <LoaderCircleIcon className='animate-spin' /> }
              <span>Submit Application</span>
            </Button>
          </DialogFooter>
        </application.Form>
      </DialogContent>
    </Dialog>
  )
}