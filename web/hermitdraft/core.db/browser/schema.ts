import { sql } from 'drizzle-orm'
import {
  blob,
  int,
  sqliteTable as table,
  text,
} from 'drizzle-orm/sqlite-core'

export type Draft = typeof draftsTable.$inferSelect
export type Media = typeof mediaTable.$inferSelect

export const draftsTable = table('drafts', {
  id: int().primaryKey({ autoIncrement: true }),
  id2: text({ length: 32 }).notNull().unique(),
  author: int().notNull(),
  slug: text().notNull().unique(),
  status: text({ enum: [ 'ARC', 'PUB', 'DRAFT', 'EXP' ] }).notNull(),
  created: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updated: int({ mode: 'timestamp' }).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  expired: int({ mode: 'timestamp' }),
  published: int({ mode: 'timestamp' }),
  archived: int({ mode: 'timestamp' }),
  title: text().notNull(),
  subheadline: text(),
  desc: text(),
  featuredImageUrl: text(),
  content: blob({ mode: 'json' }),
})

export const mediaTable = table('media', {
  id: int().primaryKey({ autoIncrement: true }),
  id2: text({ length: 32 }).notNull().unique(),
  author: int().notNull(),
  slug: text().notNull().unique(),
  created: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updated: int({ mode: 'timestamp' }).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  name: text().notNull(),
  bin: blob({ mode: 'buffer' }),
  size: int({ mode: 'number' }).notNull(),
  originalName: text().notNull(),
  type: text().notNull(),
})