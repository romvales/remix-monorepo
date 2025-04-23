import { createClient } from '@shared/directus'

export const directus = createClient<RomTypes.DirectusSchema>()