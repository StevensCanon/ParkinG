import { User } from "lucide-react"

import { currentUser } from "@/lib/auth-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  own?: boolean
}

export default async function UserAvatar({ src, own }: UserAvatarProps) {
  const loggedUser = await currentUser()

  return (
    <Avatar className="size-9">
      <AvatarImage src={own ? loggedUser?.image ?? "" : src} alt="User image" />
      <AvatarFallback>
        <User className="size-5 shrink-0" />
      </AvatarFallback>
    </Avatar>
  )
}
