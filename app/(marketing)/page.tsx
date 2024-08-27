"use client"

import { useRouter } from "next/navigation"

import { SparklesCore } from "@/components/common/parkles"
import { Spotlight } from "@/components/common/spot-light"
import { Button } from "@/components/ui/button"

export default function MarketingPage() {
  const router = useRouter()

  return (
    <div className="min-h-full h-full">
      <div className="min-h-full w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden p-4">
        <div className="flex justify-end items-center w-full absolute top-0 z-50 py-4 px-6 space-x-3">
          <Button variant="ghost" onClick={() => router.push("/auth/login")}>
            Inicia Sesión
          </Button>
          <Button onClick={() => router.push("/auth/register")}>
            Regístrate
          </Button>
        </div>
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]" />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="md:text-7xl xs:text-6xl max-xs:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Impulsa tu negocio <br /> con ParkGenius
          </h1>
          <p className="mt-4 font-normal md:text-lg text-neutral-300 max-w-lg text-center mx-auto">
            Controla, organiza y maximiza tu operación con una solución diseñada
            para simplificar tu negocio.
          </p>
        </div>
      </div>
    </div>
  )
}
