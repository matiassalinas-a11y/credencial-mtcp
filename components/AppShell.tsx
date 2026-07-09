import type { Affiliate } from "@/types/affiliate"
import type { AppScreen } from "@/types/navigation"
import BottomNavigation from "@/components/BottomNavigation"
import HomeScreen from "@/components/HomeScreen"
import CredentialCard from "@/components/CredentialCard"
import ProfileScreen from "@/components/ProfileScreen"
import ComingSoonScreen from "@/components/ComingSoonScreen"

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
  function renderScreen() {
    switch (activeScreen) {
      case "home":
        return <HomeScreen affiliate={affiliate} onNavigate={onNavigate} />
      case "credential":
        return (
          <CredentialCard
            affiliate={affiliate}
            onBack={() => onNavigate("home")}
          />
        )
      case "profile":
        return <ProfileScreen affiliate={affiliate} onLogout={onLogout} />
      case "benefits":
      case "turismo":
      case "news":
        return <ComingSoonScreen />
      default:
        return <HomeScreen affiliate={affiliate} onNavigate={onNavigate} />
    }
  }

  return (
    <div className="app-frame">
      {renderScreen()}
      <BottomNavigation active={activeScreen} onChange={onNavigate} />
    </div>
  )
}
