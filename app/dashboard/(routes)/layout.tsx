import { redirect } from "next/navigation"

import { getUserById } from "@/actions/user"
import { currentUser } from "@/lib/auth-user"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const loggedUser = await currentUser()
  const existingUser = await getUserById(loggedUser?.id)

  const missingData =
    existingUser?.emailVerified !== null && !existingUser?.password

  if (missingData) {
    redirect("/auth/complete")
  }

  return <div>{children}</div>
}
