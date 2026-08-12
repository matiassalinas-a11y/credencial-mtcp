import { mockAffiliates } from "@/data/mockAffiliates"
import type { Affiliate } from "@/types/affiliate"

function normalizeDni(dni: string): string {
  return dni.replace(/\D/g, "").trim()
}

export function getAffiliateByDni(dni: string): Affiliate | undefined {
  return mockAffiliates.find((affiliate) => affiliate.dni === normalizeDni(dni))
}

export function getAffiliateByMemberNumber(memberNumber: string): Affiliate | undefined {
  const normalizedMemberNumber = memberNumber.trim().toUpperCase()
  return mockAffiliates.find((affiliate) => affiliate.socio.toUpperCase() === normalizedMemberNumber)
}
