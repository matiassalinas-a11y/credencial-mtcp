import { appRepositories } from "@/services/appServices"
import type {
  AppTexts,
  Delegation,
  InstitutionalInfo,
  MutualService,
} from "@/types/shared-content"
import type { NewsItem } from "@/types/content"

export function getBenefits(): MutualService[] {
  return appRepositories.content.listPublishedServices()
}

export function getFeaturedBenefits(): MutualService[] {
  return getBenefits().filter((service) => service.featured)
}

export function getBenefitById(id: string): MutualService | undefined {
  return appRepositories.content.getServiceById(id)
}

export function getTourismPackages(): MutualService[] {
  return appRepositories.content.listTourismPackages()
}

export function getNews(): NewsItem[] {
  return appRepositories.content.listNews()
}

export function getInstitutionalInfo(): InstitutionalInfo {
  return appRepositories.content.getInstitutionalInfo()
}

export function getDelegations(): Delegation[] {
  return appRepositories.content.listDelegations()
}

export function getAppTexts(): AppTexts {
  return appRepositories.content.getAppTexts()
}
