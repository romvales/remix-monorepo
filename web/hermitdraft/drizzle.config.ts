import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: `./web/${process.env.APP}/core.db/browser/schema.ts`,
  out: `./web/${process.env.APP}/core.db/browser/migrations`,
})