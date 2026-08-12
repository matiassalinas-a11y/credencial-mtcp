"use client"

import { useMemo, useState } from "react"
import { delegations } from "@/data/shared-content"
import {
  benefitCategories,
  filterBenefits,
  getFeaturedBenefits,
} from "@/services/benefitService"
import type { Affiliate } from "@/types/affiliate"
import type { BenefitCategory } from "@/types/benefit"

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

interface UseBenefitsViewModelOptions {
  affiliate: Affiliate
}

export function useBenefitsViewModel({ affiliate }: UseBenefitsViewModelOptions) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"Todos" | BenefitCategory>("Todos")
  const [delegation, setDelegation] = useState("Todas las sedes")

  const delegationOptions = useMemo(() => getDelegationOptions(), [])
  const categoryOptions = useMemo(
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

  function clearCategory() {
    setCategory("Todos")
  }

  return {
    category,
    categoryOptions,
    clearCategory,
    delegation,
    delegationOptions,
    featured,
    hasFeatured: featured.length > 0,
    hasRecent: recent.length > 0,
    hasResults: results.length > 0,
    query,
    recent,
    results,
    setCategory,
    setDelegation,
    setQuery,
  }
}
