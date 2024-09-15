import { currentUser } from "@/lib/auth-user"
import { getUserById } from "@/actions/user"
import { ChangePassword } from "@/components/employees/profile/change-password"
import { GeneralInfo } from "@/components/employees/profile/general-info"
import { ProfileHeader } from "@/components/employees/profile/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProfilePage() {
  const loggedUser = await currentUser()

  const user = await getUserById(loggedUser?.id!)

  return (
    <div className="space-y-6 xs:space-y-12 sm:px-5 md:px-8 overflow-x-hidden">
      <ProfileHeader
        name={user?.name!}
        email={user?.email!}
        image={user?.image!}
      />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start gap-2 bg-transparent p-0">
          <TabsTrigger
            value="general"
            className="rounded-full  data-[state=active]:bg-accent"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-full data-[state=active]:bg-accent"
          >
            Contraseña
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="rounded-full data-[state=active]:bg-accent"
          >
            Horario
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralInfo user={user!} />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="schedule">
          <div>Proximamente horario del empleado</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
