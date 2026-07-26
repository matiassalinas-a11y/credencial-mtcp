import type { ReactNode } from "react"

interface SectionHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  imageSrc: string
  imagePosition?: string
  compact?: boolean
  variant?: "default" | "compact" | "short"
  children?: ReactNode
}

export default function SectionHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imagePosition,
  compact = false,
  variant,
  children,
}: SectionHeroProps) {
  const resolvedVariant = variant ?? (compact ? "compact" : "default")
  const isShort = resolvedVariant === "short"
  const height = isShort ? 180 : undefined
  const minHeight = isShort ? 170 : resolvedVariant === "compact" ? 198 : 224
  const verticalPadding = isShort ? "pt-8 pb-8" : resolvedVariant === "compact" ? "pt-12 pb-8" : "pt-12 pb-10"

  return (
    <header
      className={`relative overflow-hidden px-5 ${verticalPadding}`}
      style={{
        height,
        minHeight,
        backgroundImage: `
          linear-gradient(135deg, rgba(6, 18, 42, ${isShort ? "0.82" : "0.74"}) 0%, rgba(16, 42, 102, ${isShort ? "0.72" : "0.62"}) 48%, rgba(20, 91, 184, ${isShort ? "0.52" : "0.42"}) 100%),
          url(${imageSrc})
        `,
        backgroundSize: "cover",
        backgroundPosition: imagePosition ?? (isShort ? "center 48%" : "center"),
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,32,0.18)_0%,rgba(5,14,32,0.08)_42%,rgba(5,14,32,0.42)_100%)]" />
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(5,14,32,0.38)] to-transparent ${isShort ? "h-14" : "h-20"}`} />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-end">
        <div className="max-w-[330px]">
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.68)" }}>
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-extrabold leading-tight" style={{ color: "#ffffff" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm font-medium leading-relaxed text-balance" style={{ color: "rgba(255,255,255,0.78)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="mt-5">{children}</div>}
      </div>
    </header>
  )
}
