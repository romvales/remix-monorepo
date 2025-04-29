import { numeric, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const pgMigrations = pgTable('__drizzle_migrations', {
  id: serial('id').primaryKey(),
  hash: text('hash').notNull(),
  created: numeric('created'),
})
