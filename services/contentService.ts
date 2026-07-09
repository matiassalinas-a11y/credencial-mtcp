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
  return mutualServices.filter((service) => service.published)
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
