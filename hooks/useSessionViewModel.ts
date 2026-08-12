"use client"

import { useEffect, useState } from "react"
import type { Affiliate } from "@/types/affiliate"
import type { AppView } from "@/types/navigation"
import {
  clearCurrentAffiliate,
  getCurrentAffiliate,
  saveCurrentAffiliate,
} from "@/services/sessionService"

export function useSessionViewModel() {
  const [view, setView] = useState<AppView>("splash")
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedAffiliate = getCurrentAffiliate()

      if (savedAffiliate) {
        setAffiliate(savedAffiliate)
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
    setView("app")
  }

  function logout() {
    clearCurrentAffiliate()
    setAffiliate(null)
    setView("login")
  }

  return {
    affiliate,
    enterLogin,
    login,
    logout,
    restored,
    view,
  }
}
