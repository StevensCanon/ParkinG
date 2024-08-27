import { SignOutButton } from "@/components/auth/sign-out-button"
import { currentUser } from "@/lib/auth-user"

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div>
      <SignOutButton />
      <p>Welcome {user?.name}</p>
    </div>
  )
}
