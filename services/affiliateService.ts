import { mockAffiliates } from "@/data/mockAffiliates"
import type { Affiliate } from "@/types/affiliate"

const CURRENT_AFFILIATE_DNI_KEY = "mtcp_affiliate_dni"

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

export function getCurrentAffiliate(): Affiliate | undefined {
  if (typeof window === "undefined") return undefined

  const savedDni = window.localStorage.getItem(CURRENT_AFFILIATE_DNI_KEY)
  if (!savedDni) return undefined

  const affiliate = getAffiliateByDni(savedDni)
  if (!affiliate) {
    clearCurrentAffiliate()
    return undefined
  }

  return affiliate
}

export function saveCurrentAffiliate(affiliate: Affiliate): void {
  if (typeof window === "undefined") return

  window.localStorage.setItem(CURRENT_AFFILIATE_DNI_KEY, affiliate.dni)
}

export function clearCurrentAffiliate(): void {
  if (typeof window === "undefined") return

  window.localStorage.removeItem(CURRENT_AFFILIATE_DNI_KEY)
}
