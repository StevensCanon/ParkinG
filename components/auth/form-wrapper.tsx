import { Social } from "@/components/auth/social"
import { BackButton } from "@/components/auth/back-button"
import { WrapperHeader } from "@/components/auth/wrapper-header"

interface FormWrapperProps {
  children?: React.ReactNode
  headerTitle: string
  headerSubtitle?: string
  showSocial?: boolean
  backButtonHref: string
  backButtonLabel: string
}

export function FormWrapper({
  children,
  headerTitle,
  headerSubtitle,
  showSocial,
  backButtonHref,
  backButtonLabel,
}: FormWrapperProps) {
  return (
    <div className="flex flex-col items-center xs:w-[460px] sm:w-[480px] xs:px-8 px-4 py-6 space-y-1.5 rounded-xl xs:shadow-2xl xs:border my-4">
      <WrapperHeader title={headerTitle} subtitle={headerSubtitle} />

      <div className="space-y-5 w-full">{showSocial && <Social />}</div>

      <div className="w-full">{children}</div>
      <BackButton href={backButtonHref} label={backButtonLabel} />
    </div>
  )
}
