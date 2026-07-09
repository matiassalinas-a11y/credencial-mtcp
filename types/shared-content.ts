export type InstitutionalStats = {
  years: string
  affiliates: string
  benefits: string
  delegations: string
  provinces: string
}

export type InstitutionalInfo = {
  shortName: string
  fullName: string
  description: string
  footerDescription: string
  mainAddress: string
  city: string
  province: string
  region: string
  phone: string
  secondaryPhone?: string
  whatsapp: string
  email: string
  facebook?: string
  instagram?: string
  openingHours: string
  mission: string
  vision: string
  values: string
  stats: InstitutionalStats
}

export type MutualService = {
  id: string
  name: string
  category: string
  description: string
  address?: string
  phone?: string
  whatsapp?: string
  instagram?: string
  openingHours?: string
  ctaLabel?: string
  ctaUrl?: string
  badges: string[]
  published: boolean
  featured: boolean
  sortOrder: number
}

export type Delegation = {
  id: string
  province: string
  city: string
  address?: string
  phone: string
  whatsapp: string
  email: string
  openingHours: string
  responsible?: string
  isMainOffice: boolean
  published: boolean
  sortOrder: number
}

export type AppTexts = {
  login: {
    title: string
    description: string
    submitLabel: string
    devHintLabel: string
  }
  home: {
    title: string
    description: string
    cta: string
  }
  credential: {
    title: string
    description: string
    activeStatus: string
    pendingStatus: string
    reviewStatus: string
    rejectedStatus: string
  }
  benefits: {
    title: string
    description: string
  }
  tourism: {
    title: string
    description: string
    financingLabel: string
  }
  news: {
    title: string
    description: string
    emptyState: string
  }
  contact: {
    title: string
    description: string
  }
  help: {
    title: string
    description: string
  }
  comingSoon: {
    title: string
    description: string
  }
}
