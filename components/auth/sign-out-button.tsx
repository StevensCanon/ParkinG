"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { logout } from "@/actions/auth"

export function SignOutButton() {
  const handleClick = async () => {
    try {
      await logout()
    } catch (error) {
      toast.error("Algo salió mal al cerrar sesión.")
    }
  }

  return <Button onClick={handleClick}>Cerrar sesión</Button>
}
