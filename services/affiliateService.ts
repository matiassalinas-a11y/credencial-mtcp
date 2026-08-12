import { appRepositories } from "@/services/appServices"
import type { Affiliate } from "@/types/affiliate"

export function getAffiliateByDni(dni: string): Affiliate | undefined {
  return appRepositories.affiliates.getByDni(dni)
}

export function getAffiliateByMemberNumber(memberNumber: string): Affiliate | undefined {
  return appRepositories.affiliates.getByMemberNumber(memberNumber)
}
