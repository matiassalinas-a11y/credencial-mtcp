import { brand } from "@/config/brand"

interface MtcpLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "light" | "dark"
}

const sizes = {
  sm: { outer: "w-9 h-9", svgSize: 18, text: "text-[9px]" },
  md: { outer: "w-12 h-12", svgSize: 22, text: "text-[11px]" },
  lg: { outer: "w-16 h-16", svgSize: 28, text: "text-sm" },
  xl: { outer: "w-24 h-24", svgSize: 40, text: "text-xl" },
}

export default function MtcpLogo({ size = "md", variant = "dark" }: MtcpLogoProps) {
  const s = sizes[size]
  const isLight = variant === "light"

  return (
    <div
      className={`${s.outer} rounded-[16px] flex flex-col items-center justify-center gap-0.5 flex-shrink-0`}
      style={{
        background: isLight ? "rgba(255,255,255,0.14)" : "var(--brand-gradient)",
        border: isLight ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(20,91,184,0.18)",
        boxShadow: isLight ? "none" : "0 10px 24px rgba(20,91,184,0.18)",
      }}
    >
      <svg
        width={s.svgSize}
        height={s.svgSize}
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 18h18M6.5 18c0-5.2 3.4-9 7.5-9s7.5 3.8 7.5 9"
          stroke="rgba(255,255,255,0.88)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="4" y="17" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        <path
          d="M10 15v-4l2 2.5 2-4 2 4 2-2.5v4"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`${s.text} font-extrabold leading-none tracking-wider`}
        style={{ color: "rgba(255,255,255,0.94)" }}
      >
        {brand.shortName}
      </span>
    </div>
  )
}
