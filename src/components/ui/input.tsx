'use client'

import * as React from 'react'
import { ArrowElbowRightUp, Eye, EyeSlash } from '@phosphor-icons/react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'
import { cn } from '~/utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [capsLockActive, setCapsLockActive] = React.useState(false)

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
      event
    ) => {
      const capsLockOn = event.getModifierState('CapsLock')
      setCapsLockActive(capsLockOn)
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const inputClasses = cn(
      'border-input bg-radix-bg-2/80 shadow-foreground/20 file:bg-secondary placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-radix-txt-11/70! relative flex h-9 w-full rounded-md border py-1 px-3 text-sm shadow-[0_1px_2px_-1px] backdrop-blur-sm transition-colors file:border-0 file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      Icon && 'pl-10',
      type === 'password' && (!capsLockActive ? 'pr-8' : 'pr-16'),
      className
    )

    return (
      <div className={cn('relative', className)}>
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon />
          </div>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={inputClasses}
          onKeyDown={handleKeyPress}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-x-1 pr-3">
            {showPassword ? (
              <EyeSlash
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={15}
                color="var(--shadcn-muted-fg)"
              />
            ) : (
              <Eye
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={15}
                color="var(--shadcn-muted-fg)"
              />
            )}
            {capsLockActive && type === 'password' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ArrowElbowRightUp
                      size={15}
                      color="var(--shadcn-muted-fg)"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Caps Lock is on!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
