"use client"

import { useState } from "react"
import type { Affiliate } from "@/types/affiliate"
import type { AppScreen } from "@/types/navigation"
import BottomNavigation from "@/components/BottomNavigation"
import HomeScreen from "@/components/HomeScreen"
import CredentialCard from "@/components/CredentialCard"
import ProfileScreen from "@/components/ProfileScreen"
import ComingSoonScreen from "@/components/ComingSoonScreen"
import BenefitsScreen from "@/components/BenefitsScreen"
import BenefitDetailScreen from "@/components/BenefitDetailScreen"

interface AppShellProps {
  affiliate: Affiliate
  activeScreen: AppScreen
  onNavigate: (screen: AppScreen) => void
  onLogout: () => void
}

export default function AppShell({
  affiliate,
  activeScreen,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [selectedBenefitSlug, setSelectedBenefitSlug] = useState<string | null>(null)
  const [benefitDetailBackScreen, setBenefitDetailBackScreen] = useState<AppScreen>("benefits")

  function handleNavigate(screen: AppScreen) {
    if (screen !== "benefitDetail") {
      setSelectedBenefitSlug(null)
    }
    onNavigate(screen)
  }

  function handleOpenBenefit(benefitSlug: string, backScreen: AppScreen = activeScreen) {
    setSelectedBenefitSlug(benefitSlug)
    setBenefitDetailBackScreen(backScreen === "benefitDetail" ? "benefits" : backScreen)
    onNavigate("benefitDetail")
  }

  function renderScreen() {
    switch (activeScreen) {
      case "home":
        return (
          <HomeScreen
            affiliate={affiliate}
            onNavigate={handleNavigate}
            onOpenBenefit={(benefitSlug) => handleOpenBenefit(benefitSlug, "home")}
          />
        )
      case "credential":
        return (
          <CredentialCard
            affiliate={affiliate}
            onBack={() => handleNavigate("home")}
          />
        )
      case "benefits":
        return (
          <BenefitsScreen
            affiliate={affiliate}
            onOpenBenefit={(benefitSlug) => handleOpenBenefit(benefitSlug, "benefits")}
          />
        )
      case "benefitDetail":
        return (
          <BenefitDetailScreen
            benefitSlug={selectedBenefitSlug ?? ""}
            onBack={() => handleNavigate(benefitDetailBackScreen)}
          />
        )
      case "profile":
        return <ProfileScreen affiliate={affiliate} onLogout={onLogout} />
      case "turismo":
      case "news":
        return <ComingSoonScreen onBack={() => handleNavigate("home")} />
      default:
        return (
          <HomeScreen
            affiliate={affiliate}
            onNavigate={handleNavigate}
            onOpenBenefit={(benefitSlug) => handleOpenBenefit(benefitSlug, "home")}
          />
        )
    }
  }

  return (
    <div className="app-frame">
      {renderScreen()}
      <BottomNavigation active={activeScreen} onChange={handleNavigate} />
    </div>
  )
}
