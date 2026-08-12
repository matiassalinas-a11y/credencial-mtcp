import { appRepositories } from "@/services/appServices"
import type { Benefit, BenefitCategory, BenefitFilters } from "@/types/benefit"

export const benefitCategories: Array<"Todos" | BenefitCategory> = [
  "Todos",
  "Gastronomía",
  "Turismo",
  "Automotor",
  "Hogar",
  "Educación",
  "Construcción",
  "Bienestar",
  "Eventos",
  "Indumentaria",
  "Librería",
  "Recreación",
  "Servicios",
  "Kids",
  "Otro",
]

export function getPublishedBenefits(): Benefit[] {
  return appRepositories.benefits.listPublished()
}

export function getFeaturedBenefits(): Benefit[] {
  return getPublishedBenefits().filter((benefit) => benefit.featured)
}

export function getBenefitBySlug(slug: string): Benefit | undefined {
  return appRepositories.benefits.getBySlug(slug)
}

export function searchBenefits(query: string): Benefit[] {
  return filterBenefits({ query })
}

export function getBenefitsByCategory(category: BenefitCategory | "Todos"): Benefit[] {
  return filterBenefits({ category })
}

export function getBenefitsByDelegation(delegation: string): Benefit[] {
  return filterBenefits({ delegation })
}

export function filterBenefits({
  query = "",
  category = "Todos",
  delegation = "Todas las sedes",
  currentAffiliateDelegation,
}: BenefitFilters): Benefit[] {
  const normalizedQuery = normalize(query)
  const selectedDelegation = delegation === "Mi sede"
    ? currentAffiliateDelegation
    : delegation

  return getPublishedBenefits().filter((benefit) => {
    const matchesQuery = !normalizedQuery || [
      benefit.name,
      benefit.category,
      benefit.shortDescription,
      benefit.fullDescription,
      benefit.delegation,
      benefit.region,
    ].some((value) => normalize(value).includes(normalizedQuery))

    const matchesCategory = category === "Todos" || benefit.category === category
    const matchesDelegation =
      !selectedDelegation ||
      selectedDelegation === "Todas las sedes" ||
      benefit.delegation === "Todas" ||
      benefit.delegation === selectedDelegation ||
      benefit.region === selectedDelegation

    return matchesQuery && matchesCategory && matchesDelegation
  })
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
