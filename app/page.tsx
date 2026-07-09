"use client"

import { useEffect, useState } from "react"
import type { Affiliate } from "@/types/affiliate"
import type { AppScreen, AppView } from "@/types/navigation"
import {
  clearCurrentAffiliate,
  getCurrentAffiliate,
  saveCurrentAffiliate,
} from "@/services/affiliateService"
import SplashScreen from "@/components/SplashScreen"
import LoginScreen from "@/components/LoginScreen"
import AppShell from "@/components/AppShell"

export default function Page() {
  const [view, setView] = useState<AppView>("splash")
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const [activeScreen, setActiveScreen] = useState<AppScreen>("home")

  // On first mount: restore session from localStorage.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedAffiliate = getCurrentAffiliate()
      if (savedAffiliate) {
        setAffiliate(savedAffiliate)
        setActiveScreen("home")
        setView("app")
      }
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  function handleEnter() {
    setView("login")
  }

  function handleLogin(found: Affiliate) {
    saveCurrentAffiliate(found)
    setAffiliate(found)
    setActiveScreen("home")
    setView("app")
  }

  function handleLogout() {
    clearCurrentAffiliate()
    setAffiliate(null)
    setActiveScreen("home")
    setView("login")
  }

  if (view === "splash") {
    return (
      <div className="app-frame">
        <SplashScreen onEnter={handleEnter} />
      </div>
    )
  }

  if (view === "login" || !affiliate) {
    return (
      <div className="app-frame">
        <LoginScreen onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <AppShell
      affiliate={affiliate}
      activeScreen={activeScreen}
      onNavigate={setActiveScreen}
      onLogout={handleLogout}
    />
  )
}
