'use client'

import { CheckCircle, Info, Warning, XCircle } from '@phosphor-icons/react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-gradient-to-b! group-[.toaster]:from-foreground! group-[.toaster]:from-40%! group-[.toaster]:to-primary! group-[.toaster]:text-background! group-[.toaster]:ring-foreground/80! group-[.toaster]:border-radix-txt-12/80! group-[.toaster]:ring! group-[.toaster]:border! group-[.toaster]:shadow-sm! group-[.toaster]:shadow-foreground/80! group-[.toaster]:px-4! group-[.toaster]:py-2! group-[.toaster]:rounded-lg!',
          title: 'text-xs text-primary-foreground/90!',
          description: 'text-muted-foreground! text-[0.75rem]'
        }
      }}
      icons={{
        success: (
          <CheckCircle
            size={20}
            weight="duotone"
            color="var(--color-emerald-600)"
          />
        ),
        error: (
          <XCircle
            size={20}
            weight="duotone"
            color="var(--shadcn-destructive)"
          />
        ),
        info: <Info size={20} weight="duotone" color="var(--color-sky-600)" />,
        warning: (
          <Warning size={20} weight="duotone" color="var(--color-amber-500)" />
        )
      }}
      {...props}
    />
  )
}

export { Toaster }
