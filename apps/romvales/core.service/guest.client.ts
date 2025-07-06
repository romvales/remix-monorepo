import type geoip from 'fast-geoip'
import { deleteDB, openDB } from 'idb'

import dayjs from '@components/lib/time'
import { z } from 'zod'
import { userSessionConfigSchema } from './guest'

const dbName = 'romvalesJobsDb'
const dbVersion = 2

const createDatabase = async () => {
  return openDB<RomTypes.JobsDBSchema>(dbName, dbVersion, {

    upgrade(db, oldVersion) {
      if (oldVersion < 2) {
        const bookmarksStore = db.createObjectStore('bookmarks', {
          keyPath: 'id',
          autoIncrement: true,
        })
    
        const jobAppsStore = db.createObjectStore('jobApps', {
          keyPath: 'id',
          autoIncrement: true,
        })
  
        const viewsStore = db.createObjectStore('views', {
          keyPath: 'id',
          autoIncrement: true,
        })
  
        bookmarksStore.createIndex('byJob', 'jobId', { unique: true })
        jobAppsStore.createIndex('byContact', 'contact')
        jobAppsStore.createIndex('byJob', 'jobId', { unique: true })
        viewsStore.createIndex('byJob', 'jobId', { unique: true })
      }
  
      const cachesStore = db.createObjectStore('caches', {
        keyPath: 'id',
        autoIncrement: true,
      })
  
      cachesStore.createIndex('byKey', 'key', { unique: true })
    },
  
  })
}

const client = await createDatabase().catch(() => deleteDB(dbName).then(createDatabase))


export async function guestBookmarkJobPost(jobId: string) {
  return client.put('bookmarks', { jobId })
}

export async function guestRemoveBookmark(jobId: string) {
  const tx = client.transaction('bookmarks', 'readwrite')
  const bookmarks = tx.objectStore('bookmarks')
  const byJob = bookmarks.index('byJob')
  const id = await byJob.getKey(jobId)
  if (id) bookmarks.delete(id)
  return tx.done
}

export async function guestIsJobViewed(jobId: string) {
  return client.getFromIndex('views', 'byJob', jobId).then(view => view)
}

export async function guestViewJobPost(job: RomTypes.DirectusSchema['jobs'][number]) {
  const view = await client.getFromIndex('views', 'byJob', job.id)

  if (view) return { viewed: true }
  await client.put('views', { jobId: job.id, viewed: dayjs().toJSON() })

  return { viewed: false }
}

export async function guestApplyJobPost(jobApp: RomTypes.DirectusSchema['jobApplications'][number]) {
  const app = await client.getFromIndex('jobApps', 'byJob', jobApp.job as string)

  if (app) return app
  
  return client.put('jobApps', {
    jobAppId: jobApp.id,
    jobId: jobApp.job as string,
    contact: jobApp.contact as string,
    status: jobApp.status as string,
  })
}

export async function getBookmarks() {
  return client.getAll('bookmarks')
}

export async function getBookmarkByJob(jobId: string) {
  return client.getFromIndex('bookmarks', 'byJob', jobId)
}

export async function getJobApplications() {
  const apps = await client.getAll('jobApps')
  const body = new FormData()

  apps.map(app => body.append(`jobApps[]`, app.jobAppId))

  const req = new Request('/jobs/applications.api?action=getJobApplications', {
    body,
    method: 'post',
    redirect: 'follow',
  })

  const res = await fetch(req).then(res => res.json()).catch(() => { jobApps: null })

  return (res as { jobApps: RomTypes.DirectusSchema['jobApplications'] })?.jobApps
}

type ClientIpInfo = { geo: Awaited<ReturnType<typeof geoip.lookup>> }

export async function getClientIpInfo() {
  const info = await client.getFromIndex('caches', 'byKey', 'client')

  if (info) return info.value as ClientIpInfo

  return fetch('https://api.ipify.org/?format=json')
    .then(async res => {
      const { ip } = await res.json()

      return await fetch(`/jobs/applications.api?action=getGeoIp&ip=${ip}`, { method: 'POST' })
        .then(res => res.json())
    })
    .then(async (value: ClientIpInfo) => {
      const key = 'client'
      
      client.put('caches', { key, value })

      return value
    })
}

export async function updateUserConfig(config: Partial<z.infer<typeof userSessionConfigSchema>>) {
  return fetch('/jobs?action=updateUserConfig', {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}