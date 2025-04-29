import { PGlite } from '@electric-sql/pglite'

import { pgliteMigration } from '@shared/migrator'
import { createDrizzleFromClient, ResortoDrizzleDatabase } from '../core.db/browser.client'

import register from 'promise-worker/register'
import { ResortoCoreWorkerMessageChannel } from './message'

import { CoreWorkerService, InternalWorkerService, PaymentWorkerService, SecurityWorkerService, SyncWorkerService } from '@resorto/core.service/client'
import { merge } from 'lodash-es'
import { journal, migrations } from '../core.db/migrations'

let db: ResortoDrizzleDatabase

register(async (data: MessageEvent['data']) => {
  
  switch(data.chan) {
  case ResortoCoreWorkerMessageChannel.INITIALIZE:
    db = createDrizzleFromClient(
      new PGlite(`idb://${process.env.APP}.datadb`),
    )
    
    await pgliteMigration(db, {
      journal,
      migrations,
      migrationsTable: `___drizzle_migrations`,
    })

    return
  }

  const event = merge(data, { db })

  const results = await Promise.all([
    CoreWorkerService.handleWorkerEvent(event),
    InternalWorkerService.handleWorkerEvent(event),
    SecurityWorkerService.handleWorkerEvent(event),
    SyncWorkerService.handleWorkerEvent(event),
    PaymentWorkerService.handleWorkerEvent(event),
  ])

  return results.find(res => res)
})