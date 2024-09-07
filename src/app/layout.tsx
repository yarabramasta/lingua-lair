import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'

import { Toaster } from '~/components/ui/sonner'
import { cn } from '~/utils/cn'
import { getBaseUrl } from '~/utils/url'

import '~/styles/globals.css'

export const viewport: Viewport = {
  themeColor: '#282620',
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
  colorScheme: 'only light',
  width: 'device-width'
}

export const metadata: Metadata = {
  title: { default: 'Lingua Lair', template: '%s | Lingua Lair' },
  description: 'Alternative to manage internationalization tokens.',
  robots: { index: false, follow: false },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  metadataBase: new URL(getBaseUrl())
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'min-h-screen bg-background font-sans text-foreground antialiased',
          'selection:bg-secondary selection:text-secondary-foreground'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
