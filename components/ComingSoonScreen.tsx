import { ArrowLeft, Clock3, Sparkles } from "lucide-react"
import { appTexts, institutionalInfo } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"

interface ComingSoonScreenProps {
  onBack?: () => void
}

export default function ComingSoonScreen({ onBack }: ComingSoonScreenProps) {
  return (
    <div className="screen-scroll screen-enter">
      <div
        className="relative overflow-hidden px-5 pb-10 pt-12"
        style={{ background: themeStyles.headerBackground }}
      >
        <div className="absolute -right-12 top-3 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.58)" }}>
            {institutionalInfo.shortName}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            {appTexts.comingSoon.title}
          </h1>
          <p className="mt-1 max-w-[280px] text-sm font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
            Seguimos preparando nuevas herramientas para afiliados.
          </p>
        </div>
      </div>

      <div className="-mt-7 flex flex-col items-center px-4 pb-8 text-center">
        <div className="mtcp-card w-full px-6 py-7">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px]" style={{ background: "var(--secondary)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)", color: "var(--primary)" }}>
            <Clock3 size={36} strokeWidth={1.8} />
          </div>

          <div className="mt-5 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
              <Sparkles size={12} strokeWidth={2.3} />
              Próxima etapa
            </span>
            <h2 className="text-xl font-extrabold" style={{ color: "var(--foreground)" }}>
              {appTexts.comingSoon.title}
            </h2>
            <p className="max-w-[280px] text-sm font-medium leading-relaxed text-balance" style={{ color: "var(--muted-foreground)" }}>
              {appTexts.comingSoon.description}
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="mtcp-button-secondary mt-6 inline-flex w-full items-center justify-center gap-2 py-3 text-sm font-extrabold transition-all active:scale-[0.98] active:opacity-80"
            >
              <ArrowLeft size={16} strokeWidth={2.3} />
              Volver al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
