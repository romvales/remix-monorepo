import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'

import {
  devices,
  guests,
  payments,
  reservations,
  resorts,
  rooms,
  syncs,
  tasks,
  users,
  workers,
} from './schema'

import { pgMigrations as migrations } from '@shared/migrator/schema'

export type ResortoDrizzleDatabase = ReturnType<typeof createDrizzleFromClient>

export function createDrizzleFromClient(client: PGlite) {

  return drizzle({
    client,
    casing: 'camelCase',
    schema: {
      resorts, rooms, guests, reservations, tasks, users,
      payments, devices, syncs, workers, migrations,
    },
  })
}