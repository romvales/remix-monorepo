
import { deleteDB, openDB } from 'idb'

const dbName = 'hermitdraft'
const dbVersion = 1

function openDb() {
  return openDB(dbName, dbVersion, {
    upgrade(db) {
      const mediaStore = db.createObjectStore('media', { keyPath: 'id2' })

      mediaStore.createIndex('slug', 'slug', { unique: true })
    },

    terminated() {
      
    },
  })
}

function deleteDb() {
  return deleteDB(dbName)
}

export async function persistMediaToStore(media: Partial<HermitTypes.AuthorMedia>) {
  const db = await openDb()
  const tx = db.transaction('media', 'readwrite')
  const store = tx.objectStore('media')

  await store.put(media)
  await tx.done

  db.close()

  return media
}

export async function getMediaFromStore(slug: string) {
  const db = await openDb()
  const tx = db.transaction('media', 'readonly')
  const store = tx.objectStore('media')
  const index = store.index('slug')

  const media = await index.get(slug) as HermitTypes.AuthorMedia
  await tx.done

  db.close()

  return media
}