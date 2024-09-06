import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./src/env.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: !process.env.VERCEL_ENV ? 'standalone' : undefined,
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2']
  },
  eslint: { ignoreDuringBuilds: true }
}

export default nextConfig
