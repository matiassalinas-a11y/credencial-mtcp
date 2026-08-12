import type { Affiliate } from "@/types/affiliate"
import type { Benefit } from "@/types/benefit"
import type { NewsItem } from "@/types/content"
import type {
  AppTexts,
  Delegation,
  InstitutionalInfo,
  MutualService,
} from "@/types/shared-content"

export interface AffiliateRepository {
  list(): Affiliate[]
  getByDni(dni: string): Affiliate | undefined
  getByMemberNumber(memberNumber: string): Affiliate | undefined
}

export interface BenefitRepository {
  list(): Benefit[]
  listPublished(): Benefit[]
  getBySlug(slug: string): Benefit | undefined
}

export interface ContentRepository {
  listServices(): MutualService[]
  listPublishedServices(): MutualService[]
  getServiceById(id: string): MutualService | undefined
  listTourismPackages(): MutualService[]
  listNews(): NewsItem[]
  getInstitutionalInfo(): InstitutionalInfo
  listDelegations(): Delegation[]
  getAppTexts(): AppTexts
}
