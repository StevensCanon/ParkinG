import UserAvatar from "@/components/common/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "../ui/card"
import { currentUser } from "@/lib/auth-user"
import { SettingsIcon, UserRound } from "lucide-react"

interface UserButtonProps {
  className?: string
}

export async function UserButton({ className }: UserButtonProps) {
  const loggedUser = await currentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button className="select-none">
          <UserAvatar own />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={5}
        className="w-[264px] lg:mr-3 ml-3 bg-slate-50 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent-foreground/5 dark:bg-accent-foreground/10">
          <UserAvatar own />
          <div className="flex items-center space-x-2 truncate">
            <div className="overflow-x-hidden">
              <p className="truncate w-full text-[15.5px] font-semibold">
                {loggedUser?.name}
              </p>
              <p className="truncate w-full text-sm text-gray-500 dark:text-gray-400">
                {loggedUser?.email}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2">
          <UserRound className="size-4 mr-2" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2">
          <SettingsIcon className="size-4 mr-2" />
          Account settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
