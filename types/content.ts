import type {
  InstitutionalInfo as SharedInstitutionalInfo,
  MutualService,
} from "@/types/shared-content"

export type Benefit = MutualService

export type TourismPackage = MutualService

export interface NewsItem {
  id: string
  title: string
  summary: string
  publishedAt: string
  status: "draft" | "published"
}

export type InstitutionalInfo = SharedInstitutionalInfo
