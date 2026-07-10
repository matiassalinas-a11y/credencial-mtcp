import {
  appTexts,
  delegations,
  institutionalInfo,
  mutualServices,
} from "@/data/shared-content"
import type {
  AppTexts,
  Delegation,
  InstitutionalInfo,
  MutualService,
} from "@/types/shared-content"
import type { NewsItem } from "@/types/content"

export function getBenefits(): MutualService[] {
  return mutualServices
    .filter((service) => service.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getFeaturedBenefits(): MutualService[] {
  return getBenefits().filter((service) => service.featured)
}

export function getBenefitById(id: string): MutualService | undefined {
  return getBenefits().find((service) => service.id === id || service.slug === id)
}

export function getTourismPackages(): MutualService[] {
  return mutualServices.filter((service) => service.id === "construir-viajes")
}

export function getNews(): NewsItem[] {
  return []
}

export function getInstitutionalInfo(): InstitutionalInfo {
  return institutionalInfo
}

export function getDelegations(): Delegation[] {
  return delegations.filter((delegation) => delegation.published)
}

export function getAppTexts(): AppTexts {
  return appTexts
}
