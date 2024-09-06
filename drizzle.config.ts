import type { Config } from 'drizzle-kit'

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is required')
}

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.POSTGRES_URL },
  schemaFilter: ['public', 'auth', 'lingua']
} satisfies Config
