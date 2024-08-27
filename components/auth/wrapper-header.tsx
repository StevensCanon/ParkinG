import Image from "next/image"

interface WrapperHeaderProps {
  title: string
  subtitle?: string
}

export function WrapperHeader({ title, subtitle }: WrapperHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 pt-0">
      <Image
        src="/assets/icons/logo.svg"
        alt="Logo"
        width={70}
        height={70}
        className="mb-6 w-auto h-auto"
      />
      <h3 className="text-xl font-extrabold leading-none text-center">
        {title}
      </h3>
      <p className="text-base text-muted-foreground text-center">{subtitle}</p>
    </div>
  )
}
