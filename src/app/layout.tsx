import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { cn } from '~/utils/cn'

import '~/styles/globals.css'

export const metadata: Metadata = {
  title: 'Lingua Lair',
  description: 'Alternative to manage internationalization tokens.'
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
          'min-h-dvh overflow-x-hidden bg-background font-sans text-foreground antialiased'
        )}
      >
        {children}
      </body>
    </html>
  )
}
