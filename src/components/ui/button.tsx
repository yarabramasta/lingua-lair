import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '~/utils/cn'

const buttonOuterVariants = cva(
  'flex items-center justify-center overflow-hidden rounded-md pt-px px-px pb-[2px] transition-[_--tw-gradient-from,_--tw-gradient-to,_--tw-gradient-stop] duration-300 ease-out focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  {
    variants: {
      variant: {
        default:
          'from-radix-solid-10 to-primary hover:from-radix-solid-10/95 hover:to-primary/95 focus-visible:ring-ring active:from-primary active:to-foreground shadow-foreground/50 bg-gradient-to-b shadow-sm hover:shadow-md',
        secondary:
          'focus-visible:ring-ring shadow-foreground/20 from-card to-radix-comp-3 hover:from-card/95 hover:to-radix-comp-3/95 active:from-card active:to-secondary bg-gradient-to-b shadow-sm hover:shadow-md',
        outlined:
          'shadow-radix-txt-11 from-background to-radix-bg-2 active:from-background active:to-card bg-gradient-to-b shadow-[0_0_3px_-1px]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
const buttonInnerVariants = cva(
  'relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-[_--tw-gradient-from,_--tw-gradient-to,_--tw-gradient-stop] duration-300 ease-out',
  {
    variants: {
      variant: {
        default:
          'text-primary-foreground from-primary to-radix-solid-10 hover:from-primary/70 hover:to-radix-solid-10/70 active:from-foreground active:to-primary hover:text-primary-foreground/90 active:text-primary-foreground bg-gradient-to-b',
        secondary:
          'from-secondary to-card text-secondary-foreground hover:text-secondary-foreground/90 hover:from-secondary/80 hover:to-card/80 active:from-muted active:to-background active:text-secondary-foreground bg-gradient-to-b',
        outlined:
          'text-foreground hover:text-muted-foreground from-background to-radix-bg-2 active:from-background active:to-card active:text-foreground bg-gradient-to-b transition-colors'
      },
      size: {
        default: 'h-9 py-2 px-4',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonInnerVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <div
        className={cn(
          buttonOuterVariants({
            variant,
            className: className?.includes('w-fit') ? 'w-fit' : ''
          })
        )}
        data-disabled={props.disabled}
      >
        <Comp
          className={cn(buttonInnerVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonOuterVariants, buttonInnerVariants }
