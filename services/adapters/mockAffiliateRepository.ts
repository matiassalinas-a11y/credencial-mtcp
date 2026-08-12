import { mockAffiliates } from "@/data/mockAffiliates"
import type { Affiliate } from "@/types/affiliate"
import type { AffiliateRepository } from "@/types/repositories"

function normalizeDni(dni: string): string {
  return dni.replace(/\D/g, "").trim()
}

export const mockAffiliateRepository: AffiliateRepository = {
  list(): Affiliate[] {
    return mockAffiliates
  },

  getByDni(dni: string): Affiliate | undefined {
    return mockAffiliates.find((affiliate) => affiliate.dni === normalizeDni(dni))
  },

  getByMemberNumber(memberNumber: string): Affiliate | undefined {
    const normalizedMemberNumber = memberNumber.trim().toUpperCase()
    return mockAffiliates.find((affiliate) => affiliate.socio.toUpperCase() === normalizedMemberNumber)
  },
}
