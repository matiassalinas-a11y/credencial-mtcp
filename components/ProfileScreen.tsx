import type { Affiliate } from "@/types/affiliate"
import { themeStyles } from "@/lib/themeStyles"
import StatusBadge from "@/components/StatusBadge"

interface ProfileScreenProps {
  affiliate: Affiliate
  onLogout: () => void
}

function DataRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-3.5"
      style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}
    >
      <span
        className="text-[11px] font-extrabold uppercase tracking-wider flex-shrink-0"
        style={{ color: "var(--muted-foreground)", minWidth: 100 }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold text-right leading-snug"
        style={{ color: "var(--foreground)" }}
      >
        {value}
      </span>
    </div>
  )
}

export default function ProfileScreen({ affiliate, onLogout }: ProfileScreenProps) {
  const initials = affiliate.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="screen-scroll screen-enter">
      <div
        className="px-5 pt-12 pb-10 flex flex-col items-center gap-4"
        style={{ background: themeStyles.headerBackground }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.14)",
            border: "2px solid rgba(255,255,255,0.32)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
          }}
        >
          <span className="text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            {initials}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-xl font-extrabold text-center" style={{ color: "#ffffff" }}>
            {affiliate.nombreCompleto}
          </h1>
          <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.62)" }}>
            Socio {affiliate.socio}
          </p>
          <div className="mt-0.5">
            <StatusBadge status={affiliate.estado} size="sm" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-5 flex flex-col gap-4 pb-6">
        <div className="mtcp-card overflow-hidden">
          <div
            className="px-5 py-3.5 flex items-center gap-2"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p className="mtcp-section-label">
              Ficha del afiliado
            </p>
          </div>

          <div className="px-5">
            <DataRow label="Nombre" value={affiliate.nombreCompleto} />
            <DataRow label="DNI" value={affiliate.dni} />
            <DataRow label="N° de socio" value={affiliate.socio} />
            <DataRow label="Sede" value={affiliate.sede} />
            <DataRow label="Empresa" value={affiliate.empresa} />
            <DataRow label="Alta" value={affiliate.fechaAlta} />
            <DataRow label="Vencimiento" value={affiliate.fechaVencimiento} last />
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mtcp-button-secondary w-full py-4 text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] active:opacity-80"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Ingresar otro DNI
        </button>
      </div>
    </div>
  )
}
