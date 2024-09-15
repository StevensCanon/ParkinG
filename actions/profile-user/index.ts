"use server"

import { z } from "zod"
import { ChangePasswordSchema, UserDataSchema } from "@/schemas/user"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { getUserById } from "../user"
import { currentUser } from "@/lib/auth-user"

export async function updateUserProfile(
  userData: z.infer<typeof UserDataSchema>,
  image: string
) {
  const loggedUser = await currentUser()
  const result = UserDataSchema.safeParse(userData)

  if (result.error) {
    return { error: "Datos inváidos!" }
  }

  const { name, phone } = result.data

  try {
    const existingUser = await getUserById(loggedUser?.id!)

    if (!existingUser) {
      return { error: "El usuario no existe!" }
    }

    await db.user.update({
      where: { id: loggedUser?.id },
      data: {
        name,
        phone,
        image,
      },
    })

    revalidatePath("/dashboard")
    return { success: "Datos actualizados correctamente." }
  } catch (error) {
    return { error: "Algo salio mal en el proceso." }
  }
}

export async function changePassword(
  passwordCredentials: z.infer<typeof ChangePasswordSchema>
) {
  const loggedUser = await currentUser()
  const result = ChangePasswordSchema.safeParse(passwordCredentials)

  if (result.error) {
    return { error: "Datos inváidos!" }
  }

  const { oldPassword, newPassword } = result.data

  try {
    const existingUser = await getUserById(loggedUser?.id!)

    if (!existingUser) {
      return { error: "El usuario no existe!" }
    }

    const passwordMatch = await bcrypt.compare(
      oldPassword,
      existingUser?.password!
    )

    if (!passwordMatch) {
      return { error: "Contraseña antigua incorrecta." }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })
  } catch (error) {
    return { error: "Algo salio mal en el proceso." }
  }
}
