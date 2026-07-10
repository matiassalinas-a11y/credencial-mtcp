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
      className="flex-shrink-0 px-2 pt-2"
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(255,255,255,0.96)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.4rem)",
        boxShadow: "var(--shadow-nav)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-stretch rounded-[20px]">
        {items.map((item) => {
          const itemActive = isActive(item.id)
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-1 flex-col items-center justify-center gap-1 transition-all active:scale-95"
              style={{
                minHeight: "58px",
                color: itemActive ? "var(--primary)" : "var(--muted-foreground)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-current={itemActive ? "page" : undefined}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: 42,
                  height: 30,
                  borderRadius: 999,
                  background: itemActive ? "var(--secondary)" : "transparent",
                  color: itemActive ? "var(--primary)" : "var(--muted-foreground)",
                  boxShadow: itemActive ? "inset 0 0 0 1px rgba(20,91,184,0.10)" : "none",
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
