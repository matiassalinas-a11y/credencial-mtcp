export type BenefitCategory =
  | "Gastronomía"
  | "Turismo"
  | "Automotor"
  | "Hogar"
  | "Educación"
  | "Construcción"
  | "Bienestar"
  | "Eventos"
  | "Indumentaria"
  | "Librería"
  | "Recreación"
  | "Servicios"
  | "Kids"
  | "Otro"

export type Benefit = {
  id: string
  slug: string
  name: string
  category: BenefitCategory
  delegation: string
  region: string
  shortDescription: string
  fullDescription: string
  discount: string
  address?: string
  phone?: string
  whatsapp?: string
  instagram?: string
  email?: string
  ctaLabel?: string
  availabilityText?: string
  secondaryHighlights?: string[]
  conditions?: string[]
  paymentMethods?: string[]
  imageUrl?: string
  coverGradient: string
  featured: boolean
  published: boolean
  sortOrder: number
}

export type BenefitFilters = {
  query?: string
  category?: "Todos" | BenefitCategory
  delegation?: string
  currentAffiliateDelegation?: string
}
