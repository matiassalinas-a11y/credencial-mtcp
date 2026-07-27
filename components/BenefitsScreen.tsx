"use client"

import {
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Car,
  ChevronDown,
  FerrisWheel,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  MapPinned,
  MessageCircle,
  Phone,
  Search,
  Shirt,
  Sparkles,
  Utensils,
  Plane,
} from "lucide-react"
import type { Affiliate } from "@/types/affiliate"
import type { Benefit } from "@/types/benefit"
import { delegations, institutionalInfo } from "@/data/shared-content"
import {
  benefitCategories,
  filterBenefits,
  getFeaturedBenefits,
} from "@/services/benefitService"
import SectionHero from "@/components/SectionHero"

interface BenefitsScreenProps {
  affiliate: Affiliate
  onOpenBenefit: (benefitSlug: string) => void
}

const fixedDelegations = [
  "Todas las sedes",
  "Mi sede",
  "Comodoro Rivadavia",
  "Esquel",
  "Sarmiento",
  "Camarones",
  "Río Gallegos",
  "El Calafate",
  "28 de Noviembre",
  "Puerto San Julián",
  "Gobernador Gregores",
]

const categoryIcons: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  gastronomia: Utensils,
  turismo: Plane,
  automotor: Car,
  hogar: Home,
  educacion: GraduationCap,
  construccion: HardHat,
  bienestar: HeartPulse,
  eventos: CalendarDays,
  indumentaria: Shirt,
  libreria: BookOpen,
  recreacion: FerrisWheel,
  servicios: BriefcaseBusiness,
}

const categoryStyles: Record<string, { background: string; color: string; border: string }> = {
  gastronomia: { background: "#FFF8E6", color: "#C2410C", border: "rgba(194, 65, 12, 0.12)" },
  turismo: { background: "#EEF4FF", color: "#2563EB", border: "rgba(37, 99, 235, 0.12)" },
  automotor: { background: "#F1F5F9", color: "#334155", border: "rgba(51, 65, 85, 0.12)" },
  hogar: { background: "#ECF9FF", color: "#0284C7", border: "rgba(2, 132, 199, 0.12)" },
  educacion: { background: "#EEF2FF", color: "#4F46E5", border: "rgba(79, 70, 229, 0.12)" },
  construccion: { background: "#FFF4EA", color: "#D9480F", border: "rgba(217, 72, 15, 0.12)" },
  bienestar: { background: "#FFF1F4", color: "#DB2777", border: "rgba(219, 39, 119, 0.12)" },
  eventos: { background: "#F7EEFF", color: "#7E22CE", border: "rgba(126, 34, 206, 0.12)" },
  indumentaria: { background: "#FFF0F7", color: "#DB2777", border: "rgba(219, 39, 119, 0.12)" },
  libreria: { background: "#EEF2FF", color: "#4F46E5", border: "rgba(79, 70, 229, 0.12)" },
  recreacion: { background: "#EAFBFC", color: "#0E7490", border: "rgba(14, 116, 144, 0.12)" },
  servicios: { background: "#ECFDF5", color: "#047857", border: "rgba(4, 120, 87, 0.12)" },
  kids: { background: "#F3FCE8", color: "#4D7C0F", border: "rgba(77, 124, 15, 0.12)" },
  otro: { background: "#F1F5F9", color: "#475569", border: "rgba(71, 85, 105, 0.12)" },
}

function getDelegationOptions(): string[] {
  const sharedCities = delegations
    .filter((delegation) => delegation.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((delegation) => delegation.city)

  return Array.from(new Set([...fixedDelegations, ...sharedCities]))
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function getContactSummary(benefit: Benefit): string {
  if (benefit.availabilityText) return benefit.availabilityText
  if (benefit.whatsapp) return "WhatsApp disponible"
  if (benefit.phone) return benefit.phone
  if (benefit.address) return benefit.address
  return benefit.delegation === "Todas" ? benefit.region : benefit.delegation
}

function getBenefitLocation(benefit: Benefit): string {
  if (benefit.address) return benefit.address
  return benefit.delegation === "Todas" ? benefit.region : benefit.delegation
}

function getCtaLabel(benefit: Benefit): string {
  if (benefit.ctaLabel) return benefit.ctaLabel

  const name = normalizeKey(benefit.name)

  if (benefit.whatsapp && name.includes("beauty")) return "Turnos online"
  if (name.includes("materiales")) return "Consultar materiales"
  if (benefit.whatsapp) return "Consultar"
  return "Ver beneficio"
}

function BenefitCover({
  benefit,
  size = "large",
}: {
  benefit: Benefit
  size?: "large" | "medium" | "compact"
}) {
  const minHeight = size === "large" ? 172 : size === "medium" ? 132 : 108

  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight,
        background: benefit.coverGradient,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_36%,rgba(255,255,255,0.08)_72%,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07152d]/48 to-transparent" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/22 bg-white/16 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.10em] text-white backdrop-blur">
            <Sparkles size={12} strokeWidth={2.4} />
            {benefit.category}
          </span>
          {benefit.featured && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: "var(--primary)" }}>
              Destacado
            </span>
          )}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/72">
            Beneficio M.T.C.P.
          </p>
          <p className={size === "compact" ? "mt-1 text-base font-extrabold leading-tight text-white" : "mt-1 text-2xl font-extrabold leading-tight text-white"}>
            {benefit.discount}
          </p>
          {benefit.secondaryHighlights?.[0] && size !== "compact" && (
            <p className="mt-1 text-xs font-bold leading-tight text-white/78">
              {benefit.secondaryHighlights[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function useDragClickGuard(onOpen: () => void) {
  const pointerStart = useRef({ x: 0, y: 0 })
  const dragged = useRef(false)

  return {
    onPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
      pointerStart.current = { x: event.clientX, y: event.clientY }
      dragged.current = false
    },
    onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
      const deltaX = Math.abs(event.clientX - pointerStart.current.x)
      const deltaY = Math.abs(event.clientY - pointerStart.current.y)

      if (deltaX > 8 || deltaY > 8) {
        dragged.current = true
      }
    },
    onClick(event: ReactMouseEvent<HTMLButtonElement>) {
      if (dragged.current) {
        event.preventDefault()
        event.stopPropagation()
        dragged.current = false
        return
      }

      onOpen()
    },
  }
}

function useMouseDragScroll() {
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  })

  return {
    onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
      if (event.pointerType !== "mouse") return

      dragState.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: event.currentTarget.scrollLeft,
      }
    },
    onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
      if (!dragState.current.active) return

      const deltaX = event.clientX - dragState.current.startX
      event.currentTarget.scrollLeft = dragState.current.scrollLeft - deltaX
    },
    onPointerUp() {
      dragState.current.active = false
    },
    onPointerCancel() {
      dragState.current.active = false
    },
  }
}

function SectionTitle({
  label,
  title,
  subtitle,
  action,
}: {
  label?: string
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        {label && <p className="mtcp-section-label">{label}</p>}
        <h2 className="mt-1 text-lg font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

function FeaturedBenefitCard({
  benefit,
  onOpenBenefit,
}: {
  benefit: Benefit
  onOpenBenefit: (benefitSlug: string) => void
}) {
  const clickGuard = useDragClickGuard(() => onOpenBenefit(benefit.slug))
  const location = getBenefitLocation(benefit)

  return (
    <button
      type="button"
      {...clickGuard}
      className="mtcp-interactive-card w-[84vw] min-w-[292px] max-w-[342px] flex-none snap-start overflow-hidden text-left"
    >
      <BenefitCover benefit={benefit} />
      <div className="flex min-h-[206px] flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-base font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
              {benefit.name}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--primary)" }}>
              <MapPinned size={12} strokeWidth={2.3} />
              {benefit.delegation === "Todas" ? benefit.region : benefit.delegation}
            </p>
          </div>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            <ArrowRight size={15} strokeWidth={2.6} />
          </span>
        </div>

        <p className="mt-3 overflow-hidden text-sm font-medium leading-relaxed [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
          {benefit.shortDescription}
        </p>

        <p className="mt-3 inline-flex min-w-0 items-start gap-1.5 text-[11px] font-semibold leading-snug" style={{ color: "var(--muted-foreground)" }}>
          <MapPinned size={13} strokeWidth={2.3} className="mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
          <span className="overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {location}
          </span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-bold" style={{ color: "var(--muted-foreground)" }}>
            {benefit.whatsapp ? <MessageCircle size={13} strokeWidth={2.3} /> : <Phone size={13} strokeWidth={2.3} />}
            <span className="truncate">{getContactSummary(benefit)}</span>
          </span>
          <span className="rounded-full px-3 py-1.5 text-xs font-extrabold" style={{ background: "var(--primary)", color: "#ffffff" }}>
            {getCtaLabel(benefit)}
          </span>
        </div>
      </div>
    </button>
  )
}

function CategoryCard({
  category,
  active,
  onSelect,
}: {
  category: (typeof benefitCategories)[number]
  active: boolean
  onSelect: () => void
}) {
  const Icon = categoryIcons[normalizeKey(category)] ?? BriefcaseBusiness
  const style = categoryStyles[normalizeKey(category)] ?? {
    background: "var(--secondary)",
    color: "var(--primary)",
    border: "rgba(20, 91, 184, 0.09)",
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="min-h-[112px] rounded-[20px] px-4 py-4 text-left transition-all active:scale-[0.98]"
      style={{
        background: active
          ? `linear-gradient(135deg, ${style.color}, var(--primary-dark))`
          : style.background,
        border: active ? `1px solid ${style.color}` : `1px solid ${style.border}`,
        boxShadow: active ? "var(--shadow-button)" : "var(--shadow-card)",
        color: active ? "#ffffff" : style.color,
      }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[15px]"
        style={{
          background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.56)",
          color: active ? "#ffffff" : style.color,
        }}
      >
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <span className="mt-3 block text-sm font-extrabold leading-tight">
        {category}
      </span>
    </button>
  )
}

function RecentBenefitCard({
  benefit,
  onOpenBenefit,
}: {
  benefit: Benefit
  onOpenBenefit: (benefitSlug: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenBenefit(benefit.slug)}
      className="mtcp-interactive-card overflow-hidden text-left"
    >
      <BenefitCover benefit={benefit} size="medium" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                {benefit.category}
              </span>
              <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ background: "var(--success-soft)", color: "var(--status-active-fg)" }}>
                Nuevo
              </span>
            </div>
            <p className="mt-3 text-base font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
              {benefit.name}
            </p>
          </div>
          <ArrowRight size={18} strokeWidth={2.4} className="mt-1 flex-shrink-0" style={{ color: "var(--primary)" }} />
        </div>
        <p className="mt-2 text-sm font-extrabold" style={{ color: "var(--primary)" }}>
          {benefit.discount}
        </p>
        <p className="mt-2 overflow-hidden text-xs font-medium leading-relaxed [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
          {benefit.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: "var(--surface-soft)", color: "var(--muted-foreground)" }}>
            <MapPinned size={12} strokeWidth={2.2} />
            {benefit.delegation === "Todas" ? benefit.region : benefit.delegation}
          </span>
          {benefit.paymentMethods?.[0] && (
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: "var(--surface-soft)", color: "var(--muted-foreground)" }}>
              {benefit.paymentMethods[0]}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function CompactBenefitCard({
  benefit,
  onOpenBenefit,
}: {
  benefit: Benefit
  onOpenBenefit: (benefitSlug: string) => void
}) {
  const location = getBenefitLocation(benefit)

  return (
    <button
      type="button"
      onClick={() => onOpenBenefit(benefit.slug)}
      className="mtcp-interactive-card overflow-hidden text-left"
    >
      <div className="flex">
        <div className="w-[108px] flex-shrink-0">
          <BenefitCover benefit={benefit} size="compact" />
        </div>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
                {benefit.name}
              </p>
              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: "var(--primary)" }}>
                {benefit.category}
              </p>
            </div>
            <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
              <ArrowRight size={14} strokeWidth={2.6} />
            </span>
          </div>

          <p className="mt-2 text-xs font-extrabold" style={{ color: "var(--primary)" }}>
            {benefit.discount}
          </p>
          <p className="mt-2 overflow-hidden text-xs font-medium leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
            {benefit.shortDescription}
          </p>
          <p className="mt-2 inline-flex min-w-0 items-start gap-1 text-[10px] font-semibold leading-snug" style={{ color: "var(--muted-foreground)" }}>
            <MapPinned size={12} strokeWidth={2.2} className="mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
            <span className="overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {location}
            </span>
          </p>
        </div>
      </div>
    </button>
  )
}

export default function BenefitsScreen({ affiliate, onOpenBenefit }: BenefitsScreenProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof benefitCategories)[number]>("Todos")
  const [delegation, setDelegation] = useState("Todas las sedes")
  const carouselDrag = useMouseDragScroll()

  const delegationOptions = useMemo(() => getDelegationOptions(), [])
  const editorialCategories = useMemo(
    () => benefitCategories.filter((item) => !["Todos", "Kids", "Otro"].includes(item)),
    []
  )
  const results = useMemo(
    () =>
      filterBenefits({
        query,
        category,
        delegation,
        currentAffiliateDelegation: affiliate.sede,
      }),
    [affiliate.sede, category, delegation, query]
  )
  const featured = useMemo(
    () =>
      getFeaturedBenefits().filter((benefit) =>
        results.some((result) => result.id === benefit.id)
      ),
    [results]
  )
  const recent = useMemo(
    () => [...results].sort((a, b) => b.sortOrder - a.sortOrder).slice(0, 3),
    [results]
  )

  return (
    <div className="screen-scroll screen-enter">
      <SectionHero
        eyebrow={institutionalInfo.shortName}
        title="Beneficios"
        subtitle="Descuentos y convenios para afiliados M.T.C.P."
        imageSrc="/assets/heroes/benefits-hero.svg"
        variant="short"
      />

      <div className="mt-3 flex flex-col gap-7 px-4 pb-8">
        <section className="flex flex-col gap-3">
          <SectionTitle
            label="Promociones exclusivas"
            title="Beneficios destacados"
            subtitle="Descuentos y promociones exclusivas para afiliados."
            action={
              <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                {featured.length}
              </span>
            }
          />

          {featured.length > 0 ? (
            <div
              {...carouselDrag}
              className="-mx-4 flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 [touch-action:pan-x] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] active:cursor-grabbing md:cursor-grab [&::-webkit-scrollbar]:hidden"
            >
              {featured.map((benefit) => (
                <FeaturedBenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <section className="flex flex-col gap-3">
          <SectionTitle
            title="Categorías de Convenios"
            subtitle="Explorá nuestras categorías de servicios pensadas para vos."
          />
          <div className="grid grid-cols-2 gap-3">
            {editorialCategories.map((item) => (
              <CategoryCard
                key={item}
                category={item}
                active={category === item}
                onSelect={() => setCategory(item)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <SectionTitle
            title="Últimos convenios agregados"
            subtitle="Descubrí los nuevos acuerdos que hemos conseguido para nuestros afiliados."
          />
          {recent.length > 0 ? (
            recent.map((benefit) => (
              <RecentBenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
            ))
          ) : (
            <EmptyState />
          )}
        </section>

        <section className="mtcp-filter-panel space-y-3 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mtcp-section-label">Buscar en beneficios</p>
              <p className="mt-1 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                Usá búsqueda, sede o categoría para afinar el listado.
              </p>
            </div>
          </div>

          <label className="relative block">
            <Search size={18} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--primary)" }} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar beneficio"
              className="w-full rounded-[16px] py-3.5 pl-11 pr-4 text-sm font-semibold outline-none"
              style={{
                background: "var(--surface-soft)",
                border: "1px solid rgba(20, 91, 184, 0.10)",
                color: "var(--foreground)",
              }}
            />
          </label>

          <label className="relative block">
            <MapPinned size={18} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--primary)" }} />
            <select
              value={delegation}
              onChange={(event) => setDelegation(event.target.value)}
              className="w-full appearance-none rounded-[16px] py-3.5 pl-11 pr-10 text-sm font-extrabold outline-none"
              style={{
                background: "var(--surface-soft)",
                border: "1px solid rgba(20, 91, 184, 0.10)",
                color: "var(--foreground)",
              }}
            >
              {delegationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={17} strokeWidth={2.5} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          </label>

          {category !== "Todos" && (
            <button
              type="button"
              onClick={() => setCategory("Todos")}
              className="mtcp-button-secondary flex min-h-0 w-full items-center justify-center gap-2 py-3 text-xs font-extrabold"
            >
              Ver todas las categorías
            </button>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <SectionTitle
            label="Listado general"
            title="Todos los beneficios"
          />

          {results.length > 0 ? (
            results.map((benefit) => (
              <CompactBenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
            ))
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mtcp-card px-5 py-6 text-center">
      <p className="text-sm font-extrabold" style={{ color: "var(--foreground)" }}>
        No encontramos beneficios para esta búsqueda.
      </p>
      <p className="mt-1 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
        Probá con otra categoría, sede o palabra clave.
      </p>
    </div>
  )
}
