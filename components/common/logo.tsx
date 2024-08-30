import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <Image
        src="/assets/icons/logo.svg"
        alt="Logo"
        width={50}
        height={50}
        className="w-[60px] h-auto"
      />
      <p className="font-bold text-xl select-none text-white">ParkGenius</p>
    </div>
  )
}
