import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets'
import { z } from 'zod'

export const env = createEnv({
  extends: [vercel()],
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  shared: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    DOMAIN: z.string().default('localhost'),
    PORT: z
      .string()
      .default('3000')
      .transform(val => Number.parseInt(val, 10))
  },
  server: {
    POSTGRES_URL: z.string().url().min(1)
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DOMAIN: process.env.DOMAIN,
    POSTGRES_URL: process.env.POSTGRES_URL
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
})
