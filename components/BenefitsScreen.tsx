"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  MapPinned,
  Search,
  Sparkles,
} from "lucide-react"
import type { Affiliate } from "@/types/affiliate"
import type { Benefit } from "@/types/benefit"
import { delegations, institutionalInfo } from "@/data/shared-content"
import {
  benefitCategories,
  filterBenefits,
  getFeaturedBenefits,
} from "@/services/benefitService"
import { themeStyles } from "@/lib/themeStyles"

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

function getDelegationOptions(): string[] {
  const sharedCities = delegations
    .filter((delegation) => delegation.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((delegation) => delegation.city)

  return Array.from(new Set([...fixedDelegations, ...sharedCities]))
}

function BenefitCover({ benefit, compact = false }: { benefit: Benefit; compact?: boolean }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: compact ? 112 : 150,
        background: benefit.coverGradient,
      }}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/16" />
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/28 to-transparent" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/18 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.10em] text-white backdrop-blur">
          <Sparkles size={12} strokeWidth={2.4} />
          {benefit.category}
        </span>
        <p className="text-xl font-extrabold leading-tight text-white">
          {benefit.discount}
        </p>
      </div>
    </div>
  )
}

function FeaturedBenefitCard({ benefit, onOpenBenefit }: { benefit: Benefit; onOpenBenefit: (benefitSlug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpenBenefit(benefit.slug)}
      className="w-[236px] flex-none overflow-hidden rounded-[20px] text-left transition-all active:scale-[0.98] active:opacity-85"
      style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      <BenefitCover benefit={benefit} compact />
      <div className="p-4">
        <p className="text-sm font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
          {benefit.name}
        </p>
        <p className="mt-1 overflow-hidden text-xs font-medium leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
          {benefit.shortDescription}
        </p>
        <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--primary)" }}>
          <MapPinned size={12} strokeWidth={2.3} />
          {benefit.region}
        </p>
      </div>
    </button>
  )
}

function BenefitCard({ benefit, onOpenBenefit }: { benefit: Benefit; onOpenBenefit: (benefitSlug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpenBenefit(benefit.slug)}
      className="mtcp-card overflow-hidden text-left transition-all active:scale-[0.98] active:opacity-85"
    >
      <div className="flex">
        <div className="w-[104px] flex-shrink-0">
          <BenefitCover benefit={benefit} compact />
        </div>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
                {benefit.name}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "var(--muted-foreground)" }}>
                {benefit.category}
              </p>
            </div>
            <ArrowRight size={17} strokeWidth={2.4} className="mt-1 flex-shrink-0" style={{ color: "var(--primary)" }} />
          </div>

          <p className="mt-2 overflow-hidden text-xs font-medium leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ color: "var(--muted-foreground)" }}>
            {benefit.shortDescription}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--primary)" }}>
            <MapPinned size={12} strokeWidth={2.3} />
            {benefit.delegation === "Todas" ? benefit.region : benefit.delegation}
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

  const delegationOptions = useMemo(() => getDelegationOptions(), [])
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

  return (
    <div className="screen-scroll screen-enter">
      <div className="relative overflow-hidden px-5 pb-10 pt-12" style={{ background: themeStyles.headerBackground }}>
        <div className="absolute -right-12 top-3 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.58)" }}>
            {institutionalInfo.shortName}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            Beneficios
          </h1>
          <p className="mt-1 max-w-[300px] text-sm font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            Descuentos y convenios para afiliados M.T.C.P.
          </p>
        </div>
      </div>

      <div className="-mt-7 flex flex-col gap-5 px-4 pb-8">
        <section className="mtcp-card space-y-3 px-4 py-4">
          <label className="relative block">
            <Search size={18} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--primary)" }} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar beneficio"
              className="w-full rounded-[16px] py-3.5 pl-11 pr-4 text-sm font-semibold outline-none"
              style={{
                background: "var(--surface-soft)",
                border: "1px solid var(--border)",
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
                border: "1px solid var(--border)",
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
        </section>

        <section className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {benefitCategories.map((item) => {
            const active = category === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className="flex-none rounded-full px-3.5 py-2 text-xs font-extrabold transition-all active:scale-95"
                style={{
                  background: active ? "var(--primary)" : "var(--card)",
                  color: active ? "#ffffff" : "var(--muted-foreground)",
                  border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
                  boxShadow: active ? "var(--shadow-button)" : "none",
                }}
              >
                {item}
              </button>
            )
          })}
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="mtcp-section-label">Beneficios destacados</p>
              <h2 className="mt-1 text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
                Destacados para vos
              </h2>
            </div>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
              {featured.length}
            </span>
          </div>

          {featured.length > 0 ? (
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {featured.map((benefit) => (
                <FeaturedBenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <section className="flex flex-col gap-3">
          <div>
            <p className="mtcp-section-label">Todos los beneficios</p>
            <h2 className="mt-1 text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
              {results.length} resultado{results.length === 1 ? "" : "s"}
            </h2>
          </div>

          {results.length > 0 ? (
            results.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} onOpenBenefit={onOpenBenefit} />
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
