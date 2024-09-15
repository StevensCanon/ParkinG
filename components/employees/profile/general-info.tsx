"use client"

import { z } from "zod"
import { toast } from "sonner"
import { ChangeEvent, useState } from "react"
import { Loader2, Pencil, User as UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { User } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserDataSchema } from "@/schemas/user"
import { updateUserProfile } from "@/actions/profile-user"
import { Label } from "@/components/ui/label"
import { updateProfileImage } from "@/actions/uploadthing"

interface GeneralInfoProps {
  user: User
}

export function GeneralInfo({ user }: GeneralInfoProps) {
  const [edit, setEdit] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof UserDataSchema>>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      email: user?.email ?? "",
    },
  })

  const { isValid, isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof UserDataSchema>) => {
    try {
      let newImageUrl: string = user?.image!

      if (file) {
        const formData = new FormData()
        formData.append("image", file)

        const response = await updateProfileImage(formData)

        if (response?.success && response.imageUrl) {
          newImageUrl = response.imageUrl
        }

        if (!response?.success) {
          return toast.error("Algo salió mal al subir la imagen.")
        }
      }

      const response = await updateUserProfile(values, newImageUrl)

      if (response.error) {
        toast.error(response.error)
      }

      if (response.success) {
        setEdit(false)
        setImageSrc(null)
        toast.success(response.success)
      }
    } catch (error) {
      toast.error("Algo salió mal!")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024 // Tamaño máximo de la imagen 4MB
      if (file.size > maxSizeInBytes) {
        setImageSrc(null)
        toast.error(
          "La imagen seleccionada excede el tamaño máximo permitido de 4MB."
        )
        return
      }

      setFile(file)

      const src = URL.createObjectURL(file)
      setImageSrc(src)
    }
  }

  return (
    <Card className="border-none bg-zinc-200/35 dark:bg-zinc-900 py-2">
      <div className="flex flex-col sm:flex-row max-sm:items-start justify-between max-sm:gap-4 px-4 pt-4 pb-2 md:px-6 md:py-3">
        <CardHeader className="p-0">
          <CardTitle>Información General</CardTitle>
          <CardDescription>
            Realice cambios en su cuenta aquí. Haz click en guardar cuando estés
            listo.
          </CardDescription>
        </CardHeader>
        {!edit && (
          <Button
            onClick={() => setEdit((prev) => !prev)}
            className="max-sm:w-full text-center bg-zinc-300/70 hover:bg-zinc-300 dark:hover:bg-zinc-500/65 text-primary dark:bg-zinc-500/50 dark:text-white sm:bg-transparent sm:dark:bg-transparent sm:hover:bg-accent sm:hover:text-accent-foreground"
          >
            <Pencil className="size-4 sm:text-primary max-sm:mr-2" />
            <span className="sm:hidden">Editar</span>
          </Button>
        )}
      </div>
      <CardContent className="space-y-2 p-4 md:px-6 md:py-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {edit && (
                <div className="w-[140px] h-[140px] mx-auto rounded-full border mb-3">
                  <label
                    htmlFor="fileInput"
                    className="relative flex items-center justify-center size-full rounded-full cursor-pointer"
                  >
                    <input
                      id="fileInput"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      hidden
                    />
                    {user?.image && !imageSrc && (
                      <Image
                        src={user.image}
                        alt="image file selected"
                        quality={20}
                        width={180}
                        height={180}
                        className="object-cover size-full rounded-full"
                      />
                    )}
                    {!user?.image && !imageSrc && (
                      <div className="flex items-center justify-center size-full bg-accent-foreground/10 dark:bg-accent rounded-full">
                        <UserIcon className="size-2/5" />
                      </div>
                    )}
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt="image file selected"
                        quality={60}
                        width={180}
                        height={180}
                        className="object-cover size-full rounded-full"
                      />
                    )}
                  </label>
                </div>
              )}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    {edit && (
                      <FormControl>
                        <Input
                          variant="largeRounded"
                          className="bg-background/50 ring-main/40 hover:ring-4"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    )}
                    {!edit && (
                      <p className="text-accent-foreground/80 text-[15px]">
                        {field.value}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    {edit && (
                      <FormControl>
                        <Input
                          variant="largeRounded"
                          type="email"
                          placeholder="ej. jhon@gmail.com"
                          disabled
                          {...field}
                        />
                      </FormControl>
                    )}
                    {!edit && (
                      <p className="text-accent-foreground/80 text-[15px]">
                        {field.value}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    {edit && (
                      <FormControl>
                        <Input
                          variant="largeRounded"
                          type="tel"
                          className="bg-background/50 ring-main/40 hover:ring-4"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    )}
                    {!edit && (
                      <p className="text-accent-foreground/80 text-[15px]">
                        {field.value}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!edit && (
                <div>
                  <Label>Rol</Label>
                  <p className="text-accent-foreground/80 text-[15px]">
                    {user.role === "EMPLOYEE"
                      ? "Encargado de turno"
                      : "Administrador"}
                  </p>
                </div>
              )}
              {edit && (
                <div className="pt-3 pb-2 text-end space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEdit((prev) => !prev)}
                    className="font-semibold rounded-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="font-semibold bg-main text-white hover:bg-main/90 rounded-full"
                  >
                    {isSubmitting && (
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    )}
                    Guardar cambios
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
