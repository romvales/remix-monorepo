import dayjs from '@shared/components/lib/time'

import {
  blob,
  int,
  sqliteTable as table,
  text,
} from 'drizzle-orm/sqlite-core'

export type Draft = typeof draftsTable.$inferSelect
export type Media = typeof mediaTable.$inferSelect
export type Folder = typeof foldersTable.$inferSelect

export const foldersTable = table('folders', {
  id: int().primaryKey({ autoIncrement: true }),
  id2: text({ length: 32 }).notNull().unique(),
  author: int().notNull(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  created: int({ mode: 'timestamp' }).notNull().$default(() => dayjs().utc(true).toDate()),
  updated: int({ mode: 'timestamp' }).notNull().$onUpdate(() => dayjs().utc(true).toDate()),
  folder: int(),
  target: text({ enum: [ 'DRAFT', 'MEDIA' ] }).notNull(),
})

export const draftsTable = table('drafts', {
  id: int().primaryKey({ autoIncrement: true }),
  id2: text({ length: 32 }).notNull().unique(),
  author: int().notNull(),
  slug: text().notNull().unique(),
  folder: int(),
  status: text({ enum: [ 'ARC', 'PUB', 'DRAFT', 'EXP' ] }).notNull(),
  created: int({ mode: 'timestamp' }).notNull().$default(() => dayjs().utc(true).toDate()),
  updated: int({ mode: 'timestamp' }).notNull().$onUpdate(() => dayjs().utc(true).toDate()),
  expired: int({ mode: 'timestamp' }),
  published: int({ mode: 'timestamp' }),
  archived: int({ mode: 'timestamp' }),
  title: text().notNull(),
  subheadline: text(),
  desc: text(),
  featuredImageUrl: text(),
  content: blob({ mode: 'json' }),
  images: blob({ mode: 'json' }).$default(() => []),
})

export const mediaTable = table('media', {
  id: int().primaryKey({ autoIncrement: true }),
  id2: text({ length: 32 }).notNull().unique(),
  author: int().notNull(),
  slug: text().notNull().unique(),
  folder: int(),
  created: int({ mode: 'timestamp' }).notNull().$default(() => dayjs().utc(true).toDate()),
  updated: int({ mode: 'timestamp' }).notNull().$onUpdate(() => dayjs().utc(true).toDate()),
  originalName: text().notNull(),
  bin: blob({ mode: 'buffer' }),
  uploaded: int({ mode: 'boolean' }).$default(() => false),
  size: int({ mode: 'number' }).notNull(),
  type: text().notNull(),
})