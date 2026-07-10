import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  ExternalLink,
  MapPinned,
  MessageCircle,
  Phone,
} from "lucide-react"
import type { ReactNode } from "react"
import { getBenefitBySlug } from "@/services/benefitService"
import { institutionalInfo } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"

interface BenefitDetailScreenProps {
  benefitSlug: string
  onBack: () => void
}

export default function BenefitDetailScreen({ benefitSlug, onBack }: BenefitDetailScreenProps) {
  const benefit = getBenefitBySlug(benefitSlug)

  if (!benefit) {
    return (
      <div className="screen-scroll screen-enter">
        <div className="px-5 pb-10 pt-12" style={{ background: themeStyles.headerBackground }}>
          <h1 className="text-2xl font-extrabold text-white">Detalle de Beneficio</h1>
        </div>
        <div className="-mt-7 px-4">
          <div className="mtcp-card px-5 py-5">
            <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
              No encontramos este beneficio.
            </p>
            <button onClick={onBack} className="mtcp-button-secondary mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm font-extrabold">
              <ArrowLeft size={16} strokeWidth={2.3} />
              Volver
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-scroll screen-enter">
      <div className="relative overflow-hidden px-5 pb-6 pt-12" style={{ background: themeStyles.headerBackground }}>
        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition-all active:scale-95"
          >
            <ArrowLeft size={19} strokeWidth={2.4} />
          </button>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.66)" }}>
            Detalle de Beneficio
          </p>
        </div>
      </div>

      <div className="-mt-1 pb-8">
        <div className="mx-4 overflow-hidden rounded-[22px]" style={{ background: benefit.coverGradient, boxShadow: "var(--shadow-card)" }}>
          <div className="relative min-h-[230px] overflow-hidden p-5">
            <div className="absolute -right-16 -top-14 h-44 w-44 rounded-full bg-white/14" />
            <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/32 to-transparent" />

            <div className="relative flex min-h-[190px] flex-col justify-between">
              <span className="inline-flex w-fit rounded-full bg-white/18 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur">
                {benefit.category}
              </span>
              <div>
                <p className="text-sm font-bold text-white/78">
                  {benefit.delegation === "Todas" ? benefit.region : benefit.delegation}
                </p>
                <h1 className="mt-1 text-3xl font-extrabold leading-tight text-white">
                  {benefit.name}
                </h1>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold" style={{ color: "var(--primary)" }}>
                  <BadgePercent size={15} strokeWidth={2.4} />
                  {benefit.discount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 px-4">
          <section className="mtcp-card px-5 py-5">
            <p className="mtcp-section-label">{institutionalInfo.shortName}</p>
            <h2 className="mt-1 text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
              {benefit.name}
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {benefit.fullDescription}
            </p>
          </section>

          <section className="mtcp-card overflow-hidden">
            <InfoRow icon={<BadgePercent size={16} strokeWidth={2.2} />} label="Beneficio" value={benefit.discount} />
            <InfoRow icon={<MapPinned size={16} strokeWidth={2.2} />} label="Sede / región" value={benefit.delegation === "Todas" ? benefit.region : benefit.delegation} />
            {benefit.address && (
              <InfoRow icon={<MapPinned size={16} strokeWidth={2.2} />} label="Dirección" value={benefit.address} />
            )}
            {benefit.phone && (
              <InfoRow icon={<Phone size={16} strokeWidth={2.2} />} label="Teléfono" value={benefit.phone} />
            )}
            {benefit.whatsapp && (
              <InfoRow icon={<MessageCircle size={16} strokeWidth={2.2} />} label="WhatsApp" value={benefit.whatsapp} />
            )}
            {benefit.instagram && (
              <InfoRow icon={<ExternalLink size={16} strokeWidth={2.2} />} label="Instagram" value={benefit.instagram} />
            )}
          </section>

          {benefit.conditions && benefit.conditions.length > 0 && (
            <InfoList title="Condiciones" items={benefit.conditions} />
          )}

          {benefit.paymentMethods && benefit.paymentMethods.length > 0 && (
            <InfoList title="Medios de pago" items={benefit.paymentMethods} />
          )}

          <div className="grid grid-cols-1 gap-3">
            {benefit.whatsapp && (
              <a
                href={`https://wa.me/${benefit.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mtcp-button-primary flex items-center justify-center gap-2 py-4 text-sm font-extrabold"
              >
                <MessageCircle size={17} strokeWidth={2.3} />
                Consultar por WhatsApp
              </a>
            )}
            <button onClick={onBack} className="mtcp-button-secondary flex items-center justify-center gap-2 py-4 text-sm font-extrabold">
              <ArrowLeft size={17} strokeWidth={2.3} />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[12px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--muted-foreground)" }}>{label}</p>
        <p className="mt-1 text-sm font-bold leading-snug" style={{ color: "var(--foreground)" }}>{value}</p>
      </div>
    </div>
  )
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mtcp-card px-5 py-5">
      <p className="mtcp-section-label">{title}</p>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <p key={item} className="flex items-start gap-2 text-sm font-medium leading-snug" style={{ color: "var(--muted-foreground)" }}>
            <CheckCircle2 size={15} strokeWidth={2.2} className="mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
            {item}
          </p>
        ))}
      </div>
    </section>
  )
}
