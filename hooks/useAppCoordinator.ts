"use client"

import { useState } from "react"
import type { AppScreen } from "@/types/navigation"

export function useAppCoordinator() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>("home")
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null)
  const [previousScreen, setPreviousScreen] = useState<AppScreen>("benefits")

  function navigate(screen: AppScreen) {
    if (screen !== "benefitDetail") {
      setSelectedBenefit(null)
    }

    setActiveScreen(screen)
  }

  function goToHome() {
    navigate("home")
  }

  function goToCredential() {
    navigate("credential")
  }

  function goToBenefits() {
    navigate("benefits")
  }

  function goToProfile() {
    navigate("profile")
  }

  function openBenefitDetail(benefitSlug: string, backScreen: AppScreen = activeScreen) {
    setSelectedBenefit(benefitSlug)
    setPreviousScreen(backScreen === "benefitDetail" ? "benefits" : backScreen)
    setActiveScreen("benefitDetail")
  }

  function closeBenefitDetail() {
    navigate(previousScreen)
  }

  function resetNavigation() {
    setSelectedBenefit(null)
    setPreviousScreen("benefits")
    setActiveScreen("home")
  }

  return {
    activeScreen,
    closeBenefitDetail,
    goToBenefits,
    goToCredential,
    goToHome,
    goToProfile,
    navigate,
    openBenefitDetail,
    previousScreen,
    resetNavigation,
    selectedBenefit,
  }
}
