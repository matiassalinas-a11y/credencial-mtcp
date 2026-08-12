"use client"

import { useAppCoordinator } from "@/hooks/useAppCoordinator"
import { useSessionViewModel } from "@/hooks/useSessionViewModel"
import SplashScreen from "@/components/SplashScreen"
import LoginScreen from "@/components/LoginScreen"
import AppShell from "@/components/AppShell"
import type { Affiliate } from "@/types/affiliate"

export default function Page() {
  const session = useSessionViewModel()
  const coordinator = useAppCoordinator()

  function handleLogin(affiliate: Affiliate) {
    coordinator.resetNavigation()
    session.login(affiliate)
  }

  function handleLogout() {
    coordinator.resetNavigation()
    session.logout()
  }

  if (session.view === "splash") {
    return (
      <div className="app-frame">
        <SplashScreen onEnter={session.enterLogin} />
      </div>
    )
  }

  if (session.view === "login" || !session.affiliate) {
    return (
      <div className="app-frame">
        <LoginScreen onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <AppShell
      affiliate={session.affiliate}
      coordinator={coordinator}
      onLogout={handleLogout}
    />
  )
}
