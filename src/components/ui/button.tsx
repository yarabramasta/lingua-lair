import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/lib/utils/cn'

const buttonOuterVariants = cva(
  'flex items-center justify-center overflow-hidden rounded-md px-px pt-px pb-[2px] transition-[_--tw-gradient-from,_--tw-gradient-to,_--tw-gradient-stop] duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-radix-solid-10 to-primary shadow-foreground/50 shadow-sm hover:from-radix-solid-10/95 hover:to-primary/95 hover:shadow-md focus-visible:ring-ring active:from-primary active:to-foreground',
        secondary:
          'bg-gradient-to-b from-card to-radix-comp-3 shadow-foreground/20 shadow-sm hover:from-card/95 hover:to-radix-comp-3/95 hover:shadow-md focus-visible:ring-ring active:from-card active:to-secondary',
        outlined:
          'bg-gradient-to-b from-background to-radix-bg-2 shadow-[0_0_3px_-1px] shadow-radix-txt-11 active:from-background active:to-card'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
const buttonInnerVariants = cva(
  'relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-md font-medium text-sm transition-[_--tw-gradient-from,_--tw-gradient-to,_--tw-gradient-stop] duration-300 ease-out',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-primary to-radix-solid-10 text-primary-foreground hover:from-primary/70 hover:to-radix-solid-10/70 hover:text-primary-foreground/90 active:from-foreground active:to-primary active:text-primary-foreground',
        secondary:
          'bg-gradient-to-b from-secondary to-card text-secondary-foreground hover:from-secondary/80 hover:to-card/80 hover:text-secondary-foreground/90 active:from-muted active:to-background active:text-secondary-foreground',
        outlined:
          'bg-gradient-to-b from-background to-radix-bg-2 text-foreground transition-colors hover:text-muted-foreground active:from-background active:to-card active:text-foreground'
      },
      size: {
        default: 'h-9 px-4 py-2',
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
