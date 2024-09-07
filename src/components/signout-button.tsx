'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { useServerAction } from 'zsa-react'

import { signoutAction } from '~/actions/auth/signout'
import { cn } from '~/utils/cn'

interface SignoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SignoutButton = forwardRef<HTMLButtonElement, SignoutButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { isPending, executeFormAction } = useServerAction(signoutAction)
    const Comp = asChild ? Slot : 'button'

    return (
      <form action={executeFormAction}>
        <Comp
          type="submit"
          ref={ref}
          {...props}
          className={cn(className)}
          data-disabled={isPending}
          disabled={isPending}
        />
      </form>
    )
  }
)
SignoutButton.displayName = 'SignoutButton'

export default SignoutButton
