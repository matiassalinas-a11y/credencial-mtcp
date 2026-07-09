import type { AffiliateStatus } from "@/types/affiliate"

interface StatusBadgeProps {
  status: AffiliateStatus
  size?: "sm" | "md"
}

const config: Record<
  AffiliateStatus,
  { label: string; bg: string; fg: string; dot: string }
> = {
  activo: {
    label: "Activo",
    bg: "var(--status-active-bg)",
    fg: "var(--status-active-fg)",
    dot: "var(--status-active-dot)",
  },
  gracia: {
    label: "Período de gracia",
    bg: "var(--status-grace-bg)",
    fg: "var(--status-grace-fg)",
    dot: "var(--status-grace-dot)",
  },
  inactivo: {
    label: "Inactivo",
    bg: "var(--status-inactive-bg)",
    fg: "var(--status-inactive-fg)",
    dot: "var(--status-inactive-dot)",
  },
  suspendido: {
    label: "Suspendido",
    bg: "var(--status-suspended-bg)",
    fg: "var(--status-suspended-fg)",
    dot: "var(--status-suspended-dot)",
  },
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const c = config[status]
  const isSmall = size === "sm"

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full ${
        isSmall ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{
        background: c.bg,
        color: c.fg,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.42)",
      }}
    >
      <span
        className={`rounded-full flex-shrink-0 ${isSmall ? "w-1.5 h-1.5" : "w-2 h-2"}`}
        style={{ background: c.dot }}
      />
      {c.label}
    </span>
  )
}
