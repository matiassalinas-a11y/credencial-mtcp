"use client"

import { useEffect, useState } from "react"
import type { Affiliate } from "@/types/affiliate"
import type { AppScreen, AppView } from "@/types/navigation"
import {
  clearCurrentAffiliate,
  getCurrentAffiliate,
  saveCurrentAffiliate,
} from "@/services/sessionService"

export function useSessionViewModel() {
  const [view, setView] = useState<AppView>("splash")
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const [activeScreen, setActiveScreen] = useState<AppScreen>("home")
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedAffiliate = getCurrentAffiliate()

      if (savedAffiliate) {
        setAffiliate(savedAffiliate)
        setActiveScreen("home")
        setView("app")
      }

      setRestored(true)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  function enterLogin() {
    setView("login")
  }

  function login(found: Affiliate) {
    saveCurrentAffiliate(found)
    setAffiliate(found)
    setActiveScreen("home")
    setView("app")
  }

  function logout() {
    clearCurrentAffiliate()
    setAffiliate(null)
    setActiveScreen("home")
    setView("login")
  }

  return {
    activeScreen,
    affiliate,
    enterLogin,
    login,
    logout,
    restored,
    setActiveScreen,
    view,
  }
}
