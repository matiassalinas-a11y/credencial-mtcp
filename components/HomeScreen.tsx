import {
  ArrowRight,
  Gift,
  IdCard,
  MapPinned,
  Megaphone,
  Phone,
  Plane,
  UserRound,
} from "lucide-react"
import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import type { Affiliate } from "@/types/affiliate"
import type { Benefit } from "@/types/benefit"
import type { AppScreen } from "@/types/navigation"
import { institutionalInfo } from "@/data/shared-content"
import { getFeaturedBenefits } from "@/services/benefitService"
import SectionHero from "@/components/SectionHero"

interface HomeScreenProps {
  affiliate: Affiliate
  onNavigate: (screen: AppScreen) => void
  onOpenBenefit: (benefitSlug: string) => void
}

const quickLinks: {
  id: AppScreen
  label: string
  description: string
  available: boolean
  icon: ReactNode
}[] = [
  {
    id: "credential",
    label: "Credencial Digital",
    description: "Accedé a tu credencial de afiliado",
    available: true,
    icon: <IdCard size={22} strokeWidth={2} />,
  },
  {
    id: "benefits",
    label: "Beneficios",
    description: "Descuentos y convenios para afiliados",
    available: true,
    icon: <Gift size={22} strokeWidth={2} />,
  },
  {
    id: "turismo",
    label: "Turismo",
    description: "Propuestas y paquetes para afiliados",
    available: false,
    icon: <Plane size={22} strokeWidth={2} />,
  },
  {
    id: "news",
    label: "Novedades",
    description: "Información importante de la Mutual",
    available: false,
    icon: <Megaphone size={22} strokeWidth={2} />,
  },
  {
    id: "profile",
    label: "Perfil",
    description: "Consultá tu ficha institucional",
    available: true,
    icon: <UserRound size={22} strokeWidth={2} />,
  },
]

function getSimpleStatus(affiliate: Affiliate): { label: "Activo" | "Inactivo"; tone: "active" | "inactive" } {
  if (affiliate.estado === "inactivo" || affiliate.estado === "suspendido") {
    return { label: "Inactivo", tone: "inactive" }
  }

  return { label: "Activo", tone: "active" }
}

function SimpleStatusBadge({ affiliate }: { affiliate: Affiliate }) {
  const status = getSimpleStatus(affiliate)

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold"
      style={{
        background: status.tone === "active" ? "var(--status-active-bg)" : "var(--status-inactive-bg)",
        color: status.tone === "active" ? "var(--status-active-fg)" : "var(--status-inactive-fg)",
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: status.tone === "active" ? "var(--status-active-dot)" : "var(--status-inactive-dot)",
        }}
      />
      {status.label}
    </span>
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

function FeaturedBenefitCard({
  benefit,
  onOpenBenefit,
}: {
  benefit: Benefit
  onOpenBenefit: (benefitSlug: string) => void
}) {
  const clickGuard = useDragClickGuard(() => onOpenBenefit(benefit.slug))

  return (
    <button
      type="button"
      {...clickGuard}
      className="mtcp-interactive-card w-[82vw] min-w-[260px] max-w-[316px] flex-none snap-start overflow-hidden text-left"
    >
      <div className="relative min-h-[134px] overflow-hidden p-4" style={{ background: benefit.coverGradient ?? "var(--brand-gradient)" }}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_36%,rgba(255,255,255,0.08)_72%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07152d]/42 to-transparent" />
        <div className="relative flex min-h-[102px] flex-col justify-between">
          <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/16 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.10em] text-white backdrop-blur">
            {benefit.category}
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              Beneficio M.T.C.P.
            </p>
            <p className="mt-1 text-xl font-extrabold leading-tight text-white">
              {benefit.discount}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
            {benefit.name}
          </p>
          <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            <ArrowRight size={14} strokeWidth={2.6} />
          </span>
        </div>
        <p className="mt-2 overflow-hidden text-xs font-medium leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
          {benefit.shortDescription}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--primary)" }}>
          <MapPinned size={12} strokeWidth={2.3} />
          {benefit.region}
        </span>
      </div>
    </button>
  )
}

export default function HomeScreen({ affiliate, onNavigate, onOpenBenefit }: HomeScreenProps) {
  const featuredBenefits = getFeaturedBenefits()
  const carouselDrag = useMouseDragScroll()

  return (
    <div className="screen-scroll screen-enter">
      <SectionHero
        eyebrow="Bienvenido/a"
        title={`Hola, ${affiliate.nombreCorto}`}
        subtitle="Tu espacio digital de afiliado."
        imageSrc="/assets/heroes/home-building-mtcp.jpg"
        imagePosition="center 34%"
      />

      <div className="px-4 -mt-8">
        <div className="mtcp-card overflow-hidden">
          <div className="relative overflow-hidden px-5 pb-4 pt-5" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)" }}>
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-1">
                <p className="mtcp-section-label">Afiliado/a</p>
                <p className="text-xl font-extrabold leading-tight text-balance" style={{ color: "var(--foreground)" }}>
                  {affiliate.nombreCompleto}
                </p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                  DNI {affiliate.dni}
                </p>
              </div>

              <div className="flex-shrink-0 rounded-[14px] px-3 py-2 text-center" style={{ background: "var(--secondary)", border: "1px solid rgba(20,91,184,0.10)" }}>
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                  Socio
                </p>
                <p className="mt-0.5 text-sm font-extrabold" style={{ color: "var(--primary)" }}>
                  {affiliate.socio}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ borderTop: "1px solid rgba(20,91,184,0.08)" }}>
            <SimpleStatusBadge affiliate={affiliate} />
            <button
              onClick={() => onNavigate("credential")}
              className="mtcp-button-primary flex items-center gap-2 px-4 py-2 text-sm font-extrabold active:scale-95 active:opacity-85"
            >
              <IdCard size={15} strokeWidth={2.5} />
              Ver credencial
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between px-5">
          <div>
            <p className="mtcp-section-label">Beneficios destacados</p>
            <h2 className="mt-1 text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
              Destacados para vos
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("benefits")}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold transition-all active:scale-95"
            style={{ background: "var(--secondary)", color: "var(--primary)" }}
          >
            Ver todos
            <ArrowRight size={14} strokeWidth={2.4} />
          </button>
        </div>

        <div
          {...carouselDrag}
          className="flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 [touch-action:pan-x] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] active:cursor-grabbing md:cursor-grab [&::-webkit-scrollbar]:hidden"
        >
          {featuredBenefits.map((benefit) => (
            <FeaturedBenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
          ))}
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-2 px-4">
        <h2 className="mtcp-section-label px-1">Accesos principales</h2>
        <div className="flex flex-col gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="mtcp-interactive-card flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ cursor: "pointer" }}
            >
              <span className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[14px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                {link.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
                  {link.label}
                </span>
                <span className="mt-1 block text-xs font-medium leading-snug" style={{ color: "var(--muted-foreground)" }}>
                  {link.description}
                </span>
              </span>
              {!link.available && (
                <span className="hidden rounded-full px-2 py-0.5 text-[9px] font-bold min-[380px]:inline-flex" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                  Próx.
                </span>
              )}
              <ArrowRight size={17} strokeWidth={2.3} style={{ color: "var(--muted-foreground)" }} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 px-4">
        <div className="mtcp-card flex items-start gap-3 px-5 py-4">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            <Phone size={21} strokeWidth={2.1} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold" style={{ color: "var(--foreground)" }}>
              Contacto institucional
            </p>
            <p className="mt-1 text-xs font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {institutionalInfo.phone} / {institutionalInfo.openingHours}
            </p>
            <p className="mt-2 flex items-start gap-1.5 text-xs font-semibold leading-snug" style={{ color: "var(--primary)" }}>
              <MapPinned size={13} strokeWidth={2.3} className="mt-0.5 flex-shrink-0" />
              {institutionalInfo.mainAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
