import { mockBenefits } from "@/data/mockBenefits"
import type { Benefit } from "@/types/benefit"
import type { BenefitRepository } from "@/types/repositories"

function sortByOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder)
}

export const mockBenefitRepository: BenefitRepository = {
  list(): Benefit[] {
    return sortByOrder(mockBenefits)
  },

  listPublished(): Benefit[] {
    return sortByOrder(mockBenefits.filter((benefit) => benefit.published))
  },

  getBySlug(slug: string): Benefit | undefined {
    return this.listPublished().find((benefit) => benefit.slug === slug || benefit.id === slug)
  },
}
