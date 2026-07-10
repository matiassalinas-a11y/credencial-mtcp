export type AffiliateStatus = "activo" | "gracia" | "inactivo" | "suspendido"

export interface Affiliate {
  id: string
  nombreCompleto: string
  nombreCorto: string
  beneficiaryName?: string
  dni: string
  socio: string
  sede: string
  empresa: string
  estado: AffiliateStatus
  fechaAlta: string
  fechaVencimiento: string
}
