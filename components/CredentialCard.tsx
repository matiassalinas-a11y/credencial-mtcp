import { appTexts, institutionalInfo } from "@/data/shared-content"
import type { Affiliate, AffiliateStatus } from "@/types/affiliate"
import { themeStyles } from "@/lib/themeStyles"
import MtcpLogo from "@/components/MtcpLogo"
import StatusBadge from "@/components/StatusBadge"

interface CredentialCardProps {
  affiliate: Affiliate
  onBack: () => void
}

const credentialMessages: Record<AffiliateStatus, { text: string }> = {
  activo: { text: "Credencial vigente." },
  gracia: { text: "Credencial en período de gracia." },
  inactivo: { text: "Credencial inactiva." },
  suspendido: { text: "Credencial suspendida." },
}

function FieldBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
        style={{ color: "#BFD3FF" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold leading-snug"
        style={{ color: "#ffffff" }}
      >
        {value}
      </span>
    </div>
  )
}

export default function CredentialCard({ affiliate, onBack }: CredentialCardProps) {
  const msg = credentialMessages[affiliate.estado]

  return (
    <div className="screen-scroll screen-enter">
      <div
        className="px-5 pt-12 pb-5 flex items-center gap-3"
        style={{ background: themeStyles.headerBackground }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
          aria-label="Volver"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-extrabold" style={{ color: "#ffffff" }}>Mi Credencial</h1>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.62)" }}>{appTexts.credential.title}</p>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4 mt-4">
        <div
          className="mtcp-credential-card overflow-hidden"
          style={{
            background: themeStyles.credentialBackground,
            position: "relative",
          }}
        >
          <div className="credential-watermark" style={{ opacity: 0.42 }}>
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
              <circle cx="180" cy="180" r="100" stroke="#BFD3FF" strokeWidth="22" fill="none" />
              <circle cx="180" cy="180" r="65" stroke="#BFD3FF" strokeWidth="14" fill="none" />
              <circle cx="180" cy="180" r="32" stroke="#BFD3FF" strokeWidth="9" fill="none" />
            </svg>
          </div>

          <div
            className="relative flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(191,211,255,0.22)" }}
          >
            <div className="flex items-center gap-3">
              <MtcpLogo size="sm" variant="light" />
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,0.96)" }}>
                  {institutionalInfo.shortName}
                </p>
                <p className="text-[9px] leading-tight font-semibold" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 172 }}>
                  {institutionalInfo.fullName}
                </p>
              </div>
            </div>
            <StatusBadge status={affiliate.estado} size="sm" />
          </div>

          <div className="relative px-5 pt-5 pb-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em]" style={{ color: "#BFD3FF" }}>
              Nombre y apellido
            </p>
            <p className="text-2xl font-extrabold mt-1 leading-tight text-balance" style={{ color: "#ffffff" }}>
              {affiliate.nombreCompleto}
            </p>
          </div>

          <div
            className="relative grid grid-cols-2 gap-x-5 gap-y-4 px-5 pb-5"
            style={{ borderTop: "1px solid rgba(191,211,255,0.22)", paddingTop: "1rem" }}
          >
            <FieldBlock label="DNI" value={affiliate.dni} />
            <FieldBlock label="N° Socio" value={affiliate.socio} />
            <FieldBlock label="Sede" value={affiliate.sede} />
            <FieldBlock label="Empresa" value={affiliate.empresa} />
            <FieldBlock label="Fecha de alta" value={affiliate.fechaAlta} />
            <FieldBlock label="Vencimiento" value={affiliate.fechaVencimiento} />
          </div>

          <div
            className="relative px-5 py-2.5 flex items-center justify-between"
            style={{ background: "rgba(7,20,48,0.38)", borderTop: "1px solid rgba(191,211,255,0.18)" }}
          >
            <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "rgba(255,255,255,0.62)" }}>
              {institutionalInfo.shortName} Patagonia
            </p>
            <p className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.62)" }}>
              credencial-digital.mtcp.org.ar
            </p>
          </div>
        </div>

        <div className="mtcp-card px-5 py-4 flex items-center justify-between gap-3">
          <StatusBadge status={affiliate.estado} />
          <p className="text-sm font-bold text-right" style={{ color: "var(--muted-foreground)" }}>
            {msg.text}
          </p>
        </div>

        <button
          onClick={onBack}
          className="mtcp-button-secondary w-full py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-[0.98] active:opacity-80"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
