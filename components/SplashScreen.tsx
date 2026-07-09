import { brand } from "@/config/brand"
import { appTexts, institutionalInfo } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"
import MtcpLogo from "@/components/MtcpLogo"

interface SplashScreenProps {
  onEnter: () => void
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-dvh px-6 py-14 screen-enter"
      style={{ background: themeStyles.headerBackground }}
    >
      <div
        className="self-end rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.54)", border: "1px solid rgba(255,255,255,0.16)" }}
      >
        v1.0 - MVP
      </div>

      <div className="flex flex-col items-center gap-10 w-full">
        <MtcpLogo size="xl" variant="light" />

        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-4xl font-extrabold tracking-widest"
            style={{ color: "#ffffff", letterSpacing: "0.22em" }}
          >
            {institutionalInfo.shortName}
          </h1>
          <p
            className="text-sm font-medium leading-relaxed text-balance max-w-[270px]"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            {institutionalInfo.fullName}
          </p>

          <div
            className="w-10 h-px mt-2"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />

          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mt-1"
            style={{ color: "rgba(255,255,255,0.46)" }}
          >
            {appTexts.credential.title}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
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
