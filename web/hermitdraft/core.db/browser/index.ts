
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'

import { migrate } from '@shared/migrator'
import { journal, migrations } from './migrations'

import {
  draftsTable as drafts,
  mediaTable as media,
} from './schema'

export const sqlocal = new SQLocalDrizzle('hermitdraft.db')

const { driver, batchDriver } = sqlocal

export const db = drizzle(driver, batchDriver, {
  casing: 'camelCase',
  schema: { drafts, media },
})

export function migrateDatabase() {
  return migrate(db, { journal, migrations })
}