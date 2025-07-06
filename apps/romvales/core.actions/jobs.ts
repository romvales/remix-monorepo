import { z, ZodError } from 'zod'

import { parseForm } from '@components/lib/utils'
import { createItem, readItem, readItems, updateItem, uploadFiles } from '@directus/sdk'
import { directus as client } from '@romvales/core.server/client'
import { getJob, updateJob } from '@romvales/core.service/jobs'
import { jobSession } from '@romvales/session'
import { verifyTurnstile } from '@shared/auth/turnstile'
import { transporter } from '@shared/nodemailer'
import { createRandomString } from '@shared/utils/db'
import { ActionFunctionArgs } from '@vercel/remix'
import { omit, uniqBy } from 'lodash-es'

export const jobApplicationSchema = z.object({
  ['cf-turnstile-response']: z.string().min(1),
  job: z.string().uuid().nonempty(),
  firstName: z.string().trim().nonempty(),
  lastName: z.string().trim().nonempty(),
  email: z.string().trim().email().nonempty(),
  country: z.string().trim().nonempty(),
  locationState: z.string().trim().nonempty(),
  locationCity: z.string().trim().nonempty(),
  locationStreet: z.string().trim().nonempty(),
  mobile: z.string().trim().nonempty(),
  resume: z.instanceof(File),
})
  .superRefine(({ resume }, ctx) => {

    if (resume.size > 512_000) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please upload a resume with a minimum 512kb file size.',
        path: ['resume'],
      })
    }

  })

export async function commitJobApplication({ request }: ActionFunctionArgs) {
  const session = await jobSession.getSession(request.headers.get('Cookie'))
  const form = parseForm(await request.formData())

  try {
    const app = jobApplicationSchema.parse(form)
    
    if (!await verifyTurnstile(app['cf-turnstile-response'])) {
      return { ok: false }
    }

    const jobReq = client.request(readItem('jobs', app.job))

    const contactReq = client.request(
      readItems('contacts', {
        filter: {
          email: { _eq: app.email },
        },

        limit: 1,
      })
    ).then(async res => {
      const contact = res.at(0)

      // Create a new contact if the email is not existing
      // in the database.
      if (!contact) {
        const id = createRandomString(32)
        const { firstName, lastName, email, country } = app

        return client.request(
          createItem('contacts', {
            id,
            firstName,
            lastName,
            email,
            country,
            type: 'applicant',
            raw: omit(app, [ 'resume' ]),
            contactFiles: [],
          })
        )
      }

      return contact
    })

    const [job, contact] = await Promise.all([ jobReq, contactReq ])

    if (!job || !contact) {
      return { ok: false }
    }

    const jobAppReq = client.request(
      readItems('jobApplications', {
        filter: {
          job: { _eq: job.id },
          contact: { _eq: contact.id },
        },
      })
    ).then(res => {
      const app = res.at(0)

      if (!app) {
        return client.request(
          createItem('jobApplications', {
            id: createRandomString(32),
            job: job.id,
            contact: contact.id,
          })
        )
      }

      return app
    })

    const file = new FormData()

    const ext = app.resume.name.split('.').at(-1)

    file.append('storage', 'local')
    file.append('filesize', app.resume.size.toString())
    file.append('type', app.resume.type)
    file.append('title', `${app.firstName} ${app.lastName}_Resume.${ext}`)
    file.append('filename_download', `${app.firstName} ${app.lastName}_Resume.${ext}`)
    file.append('folder', 'f2d2e3f5-be37-4a80-b62f-9d83c98dec7c')
    file.append('file', app.resume)

    const uploadResumeReq = client.request(uploadFiles(file))

    const [jobApp, resume] = await Promise.all([ jobAppReq, uploadResumeReq ])

    const applications = job.applications ?? []

    applications.push({
      id: jobApp.id,
      job: job.id,
      contact: contact.id,
      status: 'submitted',
    })

    const updateJobReq = client.request(
      updateItem('jobs', job.id, {
        applications: uniqBy(applications, 'id'),
      })
    )
    
    const updateContactFilesReq = client.request(
      updateItem('contacts', contact.id, {
        resume: resume.id,
      })
    )

    await Promise.all([ updateJobReq, updateContactFilesReq ])

    return Response.json({ ok: true, jobApp }, {
      headers: {
        'Set-Cookie': await jobSession.commitSession(session),
      },
    })
  } catch (e) {

    if (e instanceof ZodError) {
      return {
        ok: false,
        errors: e.format(),
      }
    }

    return { ok: false }
  }

}

export const updateJobStatsSchema = z.object({
  updateViewCount: z.object({
    jobId: z.string().uuid().nonempty(),
  }).nullish(),
})

export async function updateJobStats({ request }: ActionFunctionArgs) {
  const form = parseForm(await request.formData())

  try {
    const { updateViewCount } = updateJobStatsSchema.parse(form)

    if (updateViewCount) {
      const { job } = await getJob(updateViewCount.jobId)
      job.viewCount = Number(job.viewCount ?? '0') + 1
      await updateJob(omit(job, [ 'industries' ]))
      return { ok: true, viewCount: job.viewCount }
    }

  } catch (e) {
    console.error(e)
    return { ok: false }
  }
}

const jobAppsClientSchema = z.object({
  jobApps: z.array(z.string().nonempty()),
})

export async function fetchJobApplicationsState({ request }: ActionFunctionArgs) {
  const data = parseForm(await request.formData())
  const apps = jobAppsClientSchema.parse(data)

  const jobApps = await client.request(
    readItems('jobApplications', {
      filter: {
        id: { _in: apps.jobApps },
      },

      fields: [ 
        '*', 'contact.*', 
        'job.id', 'job.company.*', 'job.jobTitle',
        'job.locationCountry', 'job.locationState', 'job.locationCity',
        'job.created', 'job.updated', 'job.salaryCurrencySymbol',
        'job.salaryMinimum', 'job.salaryMaximum', 'job.salaryUnit',
        'job.jobType', 'job.workMode', 'job.industries.industries_id.name',
      ],
    })
  )

  return { jobApps }
}

const reportJobPostingSchema = z.object({
  jobId: z.string().uuid().nonempty(),
  reportCount: z.number().nullish(),
  message: z.string(),
})

export async function reportJobPosting({ request }: ActionFunctionArgs) {
  const data = parseForm(await request.formData())
  const job = reportJobPostingSchema.parse(data)

  return client.request(
    updateItem('jobs', job.jobId, {
      reportCount: (job.reportCount ?? 0) + 1,
    })
  )
    .then(async () => {
      return transporter.sendMail({
        from: 'no-reply@marketing.romvales.com',
        to: 'rom.vales@outlook.com',
        subject: `New job posting report! [Job#${job.jobId}]`,
        text: job.message,
      }).then(
        () => ({ reported: true })
      )
    })
    .catch(() => {

      return { reported: false }
    })
}