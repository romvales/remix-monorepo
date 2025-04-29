
import { MigrationJournal } from '@shared/migrator/index.types'

import __journal from './meta/_journal.json'

import migration0000 from './0000_known_amphibian.sql?raw'
import migration0001 from './0001_oval_redwing.sql?raw'
import migration0002 from './0002_good_gamora.sql?raw'
import migration0003 from './0003_overrated_thunderbolts.sql?raw'
import migration0004 from './0004_lovely_sentinels.sql?raw'

export const journal: MigrationJournal = __journal

export const migrations: Record<string, string> = {
  '0000_known_amphibian': migration0000,
  '0001_oval_redwing': migration0001,
  '0002_good_gamora': migration0002,
  '0003_overrated_thunderbolts': migration0003,
  '0004_lovely_sentinels': migration0004,
}