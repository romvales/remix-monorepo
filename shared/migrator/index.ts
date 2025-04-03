import { sql } from 'drizzle-orm'
import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { MigrationConfig, MigrationMeta } from './index.types'

async function sha256(input: string) {
  const encoder = new TextEncoder()
  const uint8 = encoder.encode(input)
  const hashBuf = await crypto.subtle.digest('SHA-256', uint8)
  const hashArray = Array.from(new Uint8Array(hashBuf))
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0'))
  return hex.join('')
}

async function readMigrationFiles(config: MigrationConfig) {
  const { journal, migrations } = config
  const queries: MigrationMeta[] = []

  for (const entry of journal.entries) {
    const migration = migrations[entry.tag]
    const sql = migration.split('--> statement-breakpoint')

    queries.push({
      sql,
      bps: entry.breakpoints,
      folderMillis: entry.when,
      hash: await sha256(migration),
    })
  }

  return queries
}

export async function migrate<TSchema extends Record<string, unknown>>(
  db: SqliteRemoteDatabase<TSchema>,
  config: MigrationConfig
) {
  
  const migrations = await readMigrationFiles(config)

  const drizzleMigrationTable = sql`
  CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at numeric
  )
  `

  await db.run(drizzleMigrationTable)

  type MigrationValuesResult = [ number, string, string ]
  const dbMigrations = await db.values<MigrationValuesResult>(
    sql`
    SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1
    `
  )

  const lastMigration = dbMigrations[0] ?? undefined
  const queries: string[] = []
  
  for (const migration of migrations) {
    if (!lastMigration || Number(lastMigration[2])! < migration.folderMillis) {
      queries.push(
        ...migration.sql,
        `
        INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES ('${migration.hash}', '${migration.folderMillis}')
        `,
      )
    }
  }

  for (const query of queries) await db.run(sql.raw(query))
}