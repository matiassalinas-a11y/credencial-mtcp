import { BadgeCheck, BriefcaseBusiness, Building2, CalendarDays, IdCard, LogOut, MapPinned, UserRound } from "lucide-react"
import type { ReactNode } from "react"
import type { Affiliate } from "@/types/affiliate"
import { institutionalInfo } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"
import StatusBadge from "@/components/StatusBadge"

interface ProfileScreenProps {
  affiliate: Affiliate
  onLogout: () => void
}

function DataRow({ icon, label, value, last }: { icon: ReactNode; label: string; value: string; last?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-3.5" style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}>
      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[12px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </p>
        <p className="mt-1 text-sm font-bold leading-snug" style={{ color: "var(--foreground)" }}>
          {value}
        </p>
      </div>
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
        className="relative flex flex-col items-center gap-4 overflow-hidden px-5 pb-12 pt-12"
        style={{ background: themeStyles.headerBackground }}
      >
        <div className="absolute -right-12 top-2 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-white/5" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.14)", border: "2px solid rgba(255,255,255,0.32)", boxShadow: "0 12px 30px rgba(0,0,0,0.14)" }}>
          <span className="text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            {initials}
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-1.5 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.58)" }}>
            Ficha institucional
          </p>
          <h1 className="text-xl font-extrabold" style={{ color: "#ffffff" }}>
            {affiliate.nombreCompleto}
          </h1>
          <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.68)" }}>
            Socio {affiliate.socio}
          </p>
          <div className="mt-1">
            <StatusBadge status={affiliate.estado} size="sm" />
          </div>
        </div>
      </div>

      <div className="-mt-8 flex flex-col gap-4 px-4 pb-6">
        <div className="mtcp-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)" }}>
            <BadgeCheck size={16} strokeWidth={2.2} style={{ color: "var(--primary)" }} />
            <div>
              <p className="text-sm font-extrabold" style={{ color: "var(--foreground)" }}>
                Datos del afiliado
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                {institutionalInfo.shortName}
              </p>
            </div>
          </div>

          <div className="px-5">
            <DataRow icon={<UserRound size={16} strokeWidth={2.2} />} label="Nombre" value={affiliate.nombreCompleto} />
            <DataRow icon={<IdCard size={16} strokeWidth={2.2} />} label="DNI" value={affiliate.dni} />
            <DataRow icon={<BadgeCheck size={16} strokeWidth={2.2} />} label="Número de socio" value={affiliate.socio} />
            <DataRow icon={<MapPinned size={16} strokeWidth={2.2} />} label="Sede" value={affiliate.sede} />
            <DataRow icon={<BriefcaseBusiness size={16} strokeWidth={2.2} />} label="Empresa" value={affiliate.empresa} />
            <DataRow icon={<CalendarDays size={16} strokeWidth={2.2} />} label="Alta" value={affiliate.fechaAlta} />
            <DataRow icon={<CalendarDays size={16} strokeWidth={2.2} />} label="Vencimiento" value={affiliate.fechaVencimiento} last />
          </div>
        </div>

        <div className="mtcp-card flex items-start gap-3 px-5 py-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            <Building2 size={19} strokeWidth={2.1} />
          </span>
          <div>
            <p className="text-sm font-extrabold" style={{ color: "var(--foreground)" }}>
              {institutionalInfo.shortName}
            </p>
            <p className="mt-1 text-xs font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {institutionalInfo.mainAddress}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mtcp-button-secondary flex w-full items-center justify-center gap-2.5 py-4 text-sm font-extrabold transition-all active:scale-[0.98] active:opacity-80"
        >
          <LogOut size={17} strokeWidth={2.3} />
          Ingresar otro DNI
        </button>
      </div>
    </div>
  )
}
