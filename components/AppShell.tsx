"use client"

import type { Affiliate } from "@/types/affiliate"
import type { useAppCoordinator } from "@/hooks/useAppCoordinator"
import BottomNavigation from "@/components/BottomNavigation"
import HomeScreen from "@/components/HomeScreen"
import CredentialCard from "@/components/CredentialCard"
import ProfileScreen from "@/components/ProfileScreen"
import ComingSoonScreen from "@/components/ComingSoonScreen"
import BenefitsScreen from "@/components/BenefitsScreen"
import BenefitDetailScreen from "@/components/BenefitDetailScreen"

interface AppShellProps {
  affiliate: Affiliate
  coordinator: ReturnType<typeof useAppCoordinator>
  onLogout: () => void
}

export default function AppShell({
  affiliate,
  coordinator,
  onLogout,
}: AppShellProps) {
  function renderScreen() {
    switch (coordinator.activeScreen) {
      case "home":
        return (
          <HomeScreen
            affiliate={affiliate}
            onNavigate={coordinator.navigate}
            onOpenBenefit={(benefitSlug) => coordinator.openBenefitDetail(benefitSlug, "home")}
          />
        )
      case "credential":
        return (
          <CredentialCard
            affiliate={affiliate}
            onBack={coordinator.goToHome}
          />
        )
      case "benefits":
        return (
          <BenefitsScreen
            affiliate={affiliate}
            onOpenBenefit={(benefitSlug) => coordinator.openBenefitDetail(benefitSlug, "benefits")}
          />
        )
      case "benefitDetail":
        return (
          <BenefitDetailScreen
            benefitSlug={coordinator.selectedBenefit ?? ""}
            onBack={coordinator.closeBenefitDetail}
          />
        )
      case "profile":
        return <ProfileScreen affiliate={affiliate} onLogout={onLogout} />
      case "turismo":
      case "news":
        return <ComingSoonScreen onBack={coordinator.goToHome} />
      default:
        return (
          <HomeScreen
            affiliate={affiliate}
            onNavigate={coordinator.navigate}
            onOpenBenefit={(benefitSlug) => coordinator.openBenefitDetail(benefitSlug, "home")}
          />
        )
    }
  }

  return (
    <div className="app-frame">
      {renderScreen()}
      <BottomNavigation active={coordinator.activeScreen} onChange={coordinator.navigate} />
    </div>
  )
}
