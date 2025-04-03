import { migrateDatabase } from './core.db/browser'
import { getMedias, saveMedia } from './core.service/media.client'

await migrateDatabase()

declare let self: DedicatedWorkerGlobalScope

self.addEventListener('message', async e => {
  const media = e.data as HermitTypes.AuthorMedia

  await saveMedia(media)
  console.log(await getMedias(media.author))
})

self.addEventListener('error', async e => {

})

self.addEventListener('offline', async e => {
  
})

export { }
