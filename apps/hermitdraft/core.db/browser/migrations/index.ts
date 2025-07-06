
import { MigrationJournal } from '@shared/migrator/index.types'

import __journal from './meta/_journal.json'

import _0000 from './0000_stiff_lockjaw.sql?raw'

export const journal: MigrationJournal = __journal

export const migrations: Record<string, string> = {
  '0000_stiff_lockjaw': _0000,
}