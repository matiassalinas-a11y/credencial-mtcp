import { mockAffiliateRepository } from "@/services/adapters/mockAffiliateRepository"
import { mockBenefitRepository } from "@/services/adapters/mockBenefitRepository"
import { sharedContentRepository } from "@/services/adapters/sharedContentRepository"

export const appRepositories = {
  affiliates: mockAffiliateRepository,
  benefits: mockBenefitRepository,
  content: sharedContentRepository,
}
