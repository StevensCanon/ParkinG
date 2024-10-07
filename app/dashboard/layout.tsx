import { redirect } from "next/navigation"

import { getUserById } from "@/actions/user"
import { currentUser } from "@/lib/auth-user"
import { DesktopSidebar } from "@/components/dashboard/navigation/desktop-sidebar"
import { Navbar } from "@/components/dashboard/navigation/navbar"

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

  return (
    <div className="flex h-full">
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
      <div className="flex flex-col size-full">
        <Navbar />
        <main className="flex-1 lg:p-6 p-4 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
