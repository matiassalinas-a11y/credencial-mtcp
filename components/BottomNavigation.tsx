import type { AppScreen } from "@/types/navigation"

interface BottomNavigationProps {
  active: AppScreen
  onChange: (screen: AppScreen) => void
}

const items: { id: AppScreen; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: "home",
    label: "Inicio",
    icon: (active) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" fill={active ? "white" : "none"} stroke={active ? "white" : "currentColor"} />
      </svg>
    ),
  },
  {
    id: "credential",
    label: "Credencial",
    icon: (active) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" fill={active ? "white" : "none"} stroke={active ? "white" : "currentColor"} />
        <path d="M13 10h4M13 14h3" stroke={active ? "white" : "currentColor"} />
      </svg>
    ),
  },
  {
    id: "benefits",
    label: "Beneficios",
    icon: (active) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Perfil",
    icon: (active) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="none" />
      </svg>
    ),
  },
]

const benefitsGroup: AppScreen[] = ["benefits", "turismo", "news"]

export default function BottomNavigation({ active, onChange }: BottomNavigationProps) {
  function isActive(itemId: AppScreen): boolean {
    if (itemId === "benefits") return benefitsGroup.includes(active)
    return active === itemId
  }

  return (
    <nav
      className="flex-shrink-0 flex items-stretch px-2 pt-2"
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(255,255,255,0.96)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.35rem)",
        boxShadow: "var(--shadow-nav)",
        backdropFilter: "blur(16px)",
      }}
    >
      {items.map((item) => {
        const active = isActive(item.id)
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
            style={{
              minHeight: "58px",
              color: active ? "var(--primary)" : "var(--muted-foreground)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="relative flex items-center justify-center"
              style={{
                width: 44,
                height: 30,
                borderRadius: 999,
                background: active ? "var(--primary)" : "transparent",
                color: active ? "#ffffff" : "var(--muted-foreground)",
                boxShadow: active ? "0 8px 18px rgba(20,91,184,0.22)" : "none",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
              }}
            >
              {item.icon(active)}
            </span>
            <span
              className="text-[10px] leading-none"
              style={{
                color: active ? "var(--primary)" : "var(--muted-foreground)",
                fontWeight: active ? 800 : 600,
                transition: "color 0.2s, font-weight 0.2s",
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
