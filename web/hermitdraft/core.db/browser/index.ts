
import { migrate } from '@shared/migrator'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { journal, migrations } from './migrations'

import {
  draftsTable as drafts,
  foldersTable as folders,
  mediaTable as media,
} from './schema'

export async function initialize() {
  const sqlocal = new SQLocalDrizzle(`hermitdraft.db`)
  const { driver, batchDriver } = sqlocal

  const db = drizzle(driver, batchDriver, {
    casing: 'camelCase',
    schema: {
      folders,
      drafts,
      media,
    },
  })

  try {
    await migrate(db, { journal, migrations })
  } catch {
    // DANGER: Deletes the sqlite of the user entirely!!!!!!!!!!
    sqlocal.deleteDatabaseFile()
    await migrate(db, { journal, migrations })
  }
  return { sqlocal, db }
}