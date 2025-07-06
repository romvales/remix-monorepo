import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: `./apps/${process.env.APP}/core.db/browser/schema.ts`,
  out: `./apps/${process.env.APP}/core.db/browser/migrations`,
})