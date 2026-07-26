import { ArrowLeft, Clock3, Sparkles } from "lucide-react"
import { appTexts, institutionalInfo } from "@/data/shared-content"
import SectionHero from "@/components/SectionHero"

interface ComingSoonScreenProps {
  onBack?: () => void
}

export default function ComingSoonScreen({ onBack }: ComingSoonScreenProps) {
  return (
    <div className="screen-scroll screen-enter">
      <SectionHero
        eyebrow={institutionalInfo.shortName}
        title={appTexts.comingSoon.title}
        subtitle="Seguimos preparando nuevas herramientas para afiliados."
        imageSrc="/assets/heroes/coming-soon-hero.svg"
        compact
      />

      <div className="-mt-7 flex flex-col items-center px-4 pb-8 text-center">
        <div className="mtcp-card w-full px-6 py-7">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px]" style={{ background: "var(--secondary)", border: "1px solid rgba(20,91,184,0.10)", boxShadow: "var(--shadow-card)", color: "var(--primary)" }}>
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
