import Image from "next/image"
import { brand } from "@/config/brand"

interface SplashScreenProps {
  onEnter: () => void
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden px-6 py-14 screen-enter"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(7, 21, 45, 0.78) 0%, rgba(16, 42, 102, 0.72) 42%, rgba(20, 91, 184, 0.78) 100%),
          linear-gradient(135deg, rgba(11, 36, 72, 0.82), rgba(37, 99, 235, 0.64)),
          url("/assets/heroes/splash-worker-uocra.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.10),transparent_28%),linear-gradient(180deg,rgba(4,12,28,0.20)_0%,rgba(4,12,28,0.04)_44%,rgba(4,12,28,0.36)_100%)]" />

      <div
        className="relative self-end rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur"
        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.54)", border: "1px solid rgba(255,255,255,0.16)" }}
      >
        v1.0 - MVP
      </div>

      <div className="relative flex w-full flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="w-full max-w-[300px] px-2">
            <Image
              src="/assets/heroes/mtcp-logo-full.png"
              alt="M.T.C.P. Mutual de los Trabajadores de la Construcción de la Patagonia"
              width={1848}
              height={671}
              priority
              className="h-auto w-full object-contain"
              style={{
                filter: "brightness(0) invert(1) drop-shadow(0 14px 32px rgba(0,0,0,0.22))",
                opacity: 0.96,
              }}
            />
          </div>

          <div
            className="w-10 h-px mt-2"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />

          <p
            className="mt-1 text-sm font-bold tracking-[0.08em]"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            CONDUCCIÓN RAÚL SILVA
          </p>
        </div>
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center gap-4">
        <button
          onClick={onEnter}
          className="w-full py-4 rounded-full text-base font-extrabold tracking-wide transition-all active:scale-[0.98] active:opacity-90"
          style={{ background: "#ffffff", color: "var(--primary)", boxShadow: "0 16px 34px rgba(0,0,0,0.18)" }}
        >
          Ingresar
        </button>
        <p
          className="text-[11px] text-center"
          style={{ color: "rgba(255,255,255,0.36)" }}
        >
          {brand.copyright} - Todos los derechos reservados
        </p>
      </div>
    </div>
  )
}
