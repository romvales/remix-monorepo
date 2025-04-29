import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: `./web/${process.env.APP}/core.db/schema.ts`,
  out: `./web/${process.env.APP}/core.db/migrations`,
})