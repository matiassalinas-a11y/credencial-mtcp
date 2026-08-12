"use client"

import { useSessionViewModel } from "@/hooks/useSessionViewModel"
import SplashScreen from "@/components/SplashScreen"
import LoginScreen from "@/components/LoginScreen"
import AppShell from "@/components/AppShell"

export default function Page() {
  const session = useSessionViewModel()

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
        <LoginScreen onLogin={session.login} />
      </div>
    )
  }

  return (
    <AppShell
      affiliate={session.affiliate}
      activeScreen={session.activeScreen}
      onNavigate={session.setActiveScreen}
      onLogout={session.logout}
    />
  )
}
