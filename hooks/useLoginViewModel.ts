"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { getAffiliateByDni } from "@/services/affiliateService"
import type { Affiliate } from "@/types/affiliate"

export const devDnis = [
  { dni: "30111222", nombre: "Juan Pérez", estado: "Activo" },
  { dni: "28777888", nombre: "Carlos Gómez", estado: "Período de gracia" },
  { dni: "33444555", nombre: "Roberto Díaz", estado: "Inactivo" },
]

interface UseLoginViewModelOptions {
  onLogin: (affiliate: Affiliate) => void
}

export function useLoginViewModel({ onLogin }: UseLoginViewModelOptions) {
  const [dni, setDni] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDevHints, setShowDevHints] = useState(false)

  const isReady = dni.length >= 7

  function setSanitizedDni(value: string) {
    setDni(value.replace(/\D/g, "").slice(0, 10))
    setError("")
  }

  function handleDniChange(event: ChangeEvent<HTMLInputElement>) {
    setSanitizedDni(event.target.value)
  }

  function selectDevDni(value: string) {
    setSanitizedDni(value)
  }

  function toggleDevHints() {
    setShowDevHints((current) => !current)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isReady) return

    setError("")
    setLoading(true)

    window.setTimeout(() => {
      const found = getAffiliateByDni(dni)
      setLoading(false)

      if (found) {
        onLogin(found)
        return
      }

      setError("No encontramos una credencial asociada a este DNI.")
    }, 600)
  }

  return {
    devDnis,
    dni,
    error,
    handleDniChange,
    handleSubmit,
    isReady,
    loading,
    selectDevDni,
    showDevHints,
    toggleDevHints,
  }
}
