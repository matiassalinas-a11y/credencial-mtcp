import type { Affiliate, AffiliateStatus } from "@/types/affiliate"
import type { AppScreen } from "@/types/navigation"
import { appTexts } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"
import MtcpLogo from "@/components/MtcpLogo"
import StatusBadge from "@/components/StatusBadge"

interface HomeScreenProps {
  affiliate: Affiliate
  onNavigate: (screen: AppScreen) => void
}

const statusMessages: Record<AffiliateStatus, { text: string; color: string }> = {
  activo: { text: "Tu credencial se encuentra vigente.", color: "var(--status-active-fg)" },
  gracia: { text: "Tu credencial se encuentra en período de gracia.", color: "var(--status-grace-fg)" },
  inactivo: { text: "Tu credencial no se encuentra vigente.", color: "var(--status-inactive-fg)" },
  suspendido: { text: "Credencial suspendida.", color: "var(--status-suspended-fg)" },
}

const quickLinks: { id: AppScreen; label: string; active: boolean; icon: React.ReactNode }[] = [
  {
    id: "credential",
    label: "Credencial",
    active: true,
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M13 10h4M13 14h3" />
      </svg>
    ),
  },
  {
    id: "benefits",
    label: "Beneficios",
    active: false,
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: "turismo",
    label: "Turismo",
    active: false,
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "news",
    label: "Noticias",
    active: false,
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Perfil",
    active: true,
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
]

export default function HomeScreen({ affiliate, onNavigate }: HomeScreenProps) {
  const msg = statusMessages[affiliate.estado]

  return (
    <div className="screen-scroll screen-enter">
      <div
        className="px-5 pt-12 pb-9 flex items-center justify-between"
        style={{ background: themeStyles.headerBackground }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.58)" }}>
            {appTexts.credential.title}
          </p>
          <h1 className="text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            Hola, {affiliate.nombreCorto}
          </h1>
        </div>
        <MtcpLogo size="sm" variant="light" />
      </div>

      <div className="px-4 -mt-5">
        <div className="mtcp-card overflow-hidden">
          <div className="relative px-5 pt-5 pb-4 overflow-hidden" style={{ background: "var(--brand-gradient-soft)" }}>
            <div
              className="absolute -right-10 -top-10 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "rgba(20,91,184,0.07)" }}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="mtcp-section-label">
                  Afiliado/a
                </p>
                <p className="text-xl font-extrabold leading-tight text-balance" style={{ color: "var(--foreground)" }}>
                  {affiliate.nombreCompleto}
                </p>
                <p className="text-sm font-medium mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  DNI {affiliate.dni}
                </p>
              </div>
              <div
                className="flex-shrink-0 rounded-[14px] px-3 py-2 text-center"
                style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
              >
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                  Socio
                </p>
                <p className="text-sm font-extrabold mt-0.5" style={{ color: "var(--primary)" }}>
                  {affiliate.socio}
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-3.5 flex items-center justify-between gap-3" style={{ borderTop: "1px solid var(--border)" }}>
            <StatusBadge status={affiliate.estado} size="sm" />
            <button
              onClick={() => onNavigate("credential")}
              className="mtcp-button-primary flex items-center gap-2 px-4 py-2 text-sm font-extrabold transition-all active:scale-95 active:opacity-80"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <circle cx="8" cy="12" r="2" />
                <path d="M13 10h4M13 14h3" />
              </svg>
              Ver credencial
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-2">
        <h2 className="mtcp-section-label px-1">
          Estado de afiliación
        </h2>
        <div className="mtcp-card overflow-hidden">
          <div className="px-5 py-3.5 flex items-center justify-between gap-3">
            <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Estado actual</span>
            <StatusBadge status={affiliate.estado} size="sm" />
          </div>
          <div style={{ height: 1, background: "var(--border)" }} />
          <div className="px-5 py-3.5 flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Fecha de alta</span>
            <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{affiliate.fechaAlta}</span>
          </div>
          <div style={{ height: 1, background: "var(--border)" }} />
          <div className="px-5 py-3.5 flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Vencimiento</span>
            <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{affiliate.fechaVencimiento}</span>
          </div>
          <div style={{ height: 1, background: "var(--border)" }} />
          <div
            className="px-5 py-3.5 flex items-start gap-2.5"
            style={{ background: "var(--secondary)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" style={{ color: msg.color }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-sm font-medium leading-snug" style={{ color: "var(--muted-foreground)" }}>
              {msg.text}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-2">
        <h2 className="mtcp-section-label px-1">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="flex flex-col items-center gap-2.5 rounded-[16px] px-2 py-4 transition-all active:scale-95 active:opacity-70"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                cursor: "pointer",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 42,
                  height: 42,
                  background: link.active ? "var(--secondary)" : "var(--surface-soft)",
                  color: link.active ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                {link.icon}
              </span>
              <span
                className="text-xs font-bold text-center leading-tight text-balance"
                style={{ color: link.active ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {link.label}
              </span>
              {!link.active && (
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "var(--secondary)", color: "var(--primary)" }}
                >
                  Próx.
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
