import type { User } from 'lucia'

import SignoutButton from '../signout-button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export default function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative h-8 w-8 rounded-full hover:opacity-90"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://avatars.jakerunzer.com/${user.username}`}
            />
            <AvatarFallback>
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a
              href="https://lingua-lair.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignoutButton asChild>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </SignoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
