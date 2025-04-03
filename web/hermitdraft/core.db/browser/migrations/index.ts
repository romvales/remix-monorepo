
import { MigrationJournal } from '@shared/migrator/index.types'

import __journal from './meta/_journal.json'

import migration0000 from './0000_first_cammi.sql?raw'

export const journal: MigrationJournal = __journal

export const migrations: Record<string, string> = {
  '0000_first_cammi': migration0000,
}