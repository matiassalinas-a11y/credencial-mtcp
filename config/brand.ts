import { institutionalInfo } from "@/data/shared-content/institutionalInfo"

export const brand = {
  shortName: institutionalInfo.shortName,
  fullName: institutionalInfo.fullName,
  appName: `Credencial Digital ${institutionalInfo.shortName}`,
  copyright: `© 2026 ${institutionalInfo.shortName}`,
  colors: {
    primary: "#145bb8",
    secondary: "#2563EB",
    background: "#f5f7f9",
    text: "#212121",
  },
  contact: {
    phones: [
      institutionalInfo.phone,
      ...(institutionalInfo.secondaryPhone ? [institutionalInfo.secondaryPhone] : []),
    ],
    whatsapp: institutionalInfo.whatsapp,
    address: institutionalInfo.mainAddress,
    openingHours: institutionalInfo.openingHours,
    email: institutionalInfo.email,
  },
  social: {
    website: "Sitio web institucional pendiente",
    facebook: institutionalInfo.facebook ?? "Facebook institucional pendiente",
    instagram: institutionalInfo.instagram ?? "Instagram institucional pendiente",
  },
} as const

export type BrandConfig = typeof brand
