import { env } from '~/env'

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.DOMAIN !== 'localhost') return `https://${env.DOMAIN}`
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${env.PORT}`
}
