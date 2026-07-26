import { Gift, Home, IdCard, UserRound } from "lucide-react"
import type { ComponentType } from "react"
import type { AppScreen } from "@/types/navigation"

interface BottomNavigationProps {
  active: AppScreen
  onChange: (screen: AppScreen) => void
}

const items: { id: AppScreen; label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "credential", label: "Credencial", icon: IdCard },
  { id: "benefits", label: "Beneficios", icon: Gift },
  { id: "profile", label: "Perfil", icon: UserRound },
]

const benefitsGroup: AppScreen[] = ["benefits", "benefitDetail", "turismo", "news"]

export default function BottomNavigation({ active, onChange }: BottomNavigationProps) {
  function isActive(itemId: AppScreen): boolean {
    if (itemId === "benefits") return benefitsGroup.includes(active)
    return active === itemId
  }

  return (
    <nav
      className="flex-shrink-0 px-3 pt-2"
      style={{
        borderTop: "1px solid rgba(20,91,184,0.08)",
        background: "rgba(255,255,255,0.94)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.55rem)",
        boxShadow: "var(--shadow-nav)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div className="flex items-stretch rounded-[22px] border px-1" style={{ borderColor: "rgba(20,91,184,0.07)", background: "rgba(248,250,254,0.82)" }}>
        {items.map((item) => {
          const itemActive = isActive(item.id)
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 transition-all active:scale-95"
              style={{
                minHeight: "58px",
                color: itemActive ? "var(--primary)" : "var(--muted-foreground)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-current={itemActive ? "page" : undefined}
            >
              {itemActive && (
                <span
                  className="absolute top-1 h-1 w-5 rounded-full"
                  style={{ background: "var(--primary)" }}
                />
              )}
              <span
                className="flex items-center justify-center"
                style={{
                  width: 44,
                  height: 32,
                  borderRadius: 999,
                  background: itemActive ? "#ffffff" : "transparent",
                  color: itemActive ? "var(--primary)" : "var(--muted-foreground)",
                  boxShadow: itemActive ? "0 8px 18px rgba(16,42,102,0.10), inset 0 0 0 1px rgba(20,91,184,0.10)" : "none",
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                }}
              >
                <Icon size={21} strokeWidth={itemActive ? 2.5 : 2.1} />
              </span>
              <span
                className="text-[10px] leading-none"
                style={{
                  color: itemActive ? "var(--primary)" : "var(--muted-foreground)",
                  fontWeight: itemActive ? 800 : 600,
                  transition: "color 0.2s, font-weight 0.2s",
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
