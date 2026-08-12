import {
  appTexts,
  delegations,
  institutionalInfo,
  mutualServices,
} from "@/data/shared-content"
import type { NewsItem } from "@/types/content"
import type {
  AppTexts,
  Delegation,
  InstitutionalInfo,
  MutualService,
} from "@/types/shared-content"
import type { ContentRepository } from "@/types/repositories"

function sortByOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder)
}

export const sharedContentRepository: ContentRepository = {
  listServices(): MutualService[] {
    return sortByOrder(mutualServices)
  },

  listPublishedServices(): MutualService[] {
    return sortByOrder(mutualServices.filter((service) => service.published))
  },

  getServiceById(id: string): MutualService | undefined {
    return this.listPublishedServices().find((service) => service.id === id || service.slug === id)
  },

  listTourismPackages(): MutualService[] {
    return mutualServices.filter((service) => service.id === "construir-viajes")
  },

  listNews(): NewsItem[] {
    return []
  },

  getInstitutionalInfo(): InstitutionalInfo {
    return institutionalInfo
  },

  listDelegations(): Delegation[] {
    return sortByOrder(delegations.filter((delegation) => delegation.published))
  },

  getAppTexts(): AppTexts {
    return appTexts
  },
}
