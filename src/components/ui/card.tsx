import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/lib/utils/cn'

const cardOuterVariants = cva('flex flex-col items-center overflow-hidden', {
  variants: {
    variant: {
      default:
        'bg-background shadow-input rounded-[16px] border p-[2px] shadow-[0_0_3px_-1px]',
      transparent: 'border-none border-transparent bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const cardInnerVariants = cva('', {
  variants: {
    variant: {
      default:
        'from-background to-card border-input shadow-primary/50 rounded-[14px] bg-gradient-to-b to-70% shadow-[0_0_2px_0]',
      transparent: 'border-none border-transparent bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const Card = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof cardInnerVariants> & React.HTMLAttributes<HTMLDivElement>
>(({ className, children, variant, ...props }, ref) => (
  <div ref={ref} className={cn(cardOuterVariants({ variant }))} {...props}>
    <div className={cn(cardInnerVariants({ variant, className }))}>
      {children}
    </div>
  </div>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardOuterVariants,
  cardInnerVariants
}
