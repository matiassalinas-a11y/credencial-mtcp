"use client"

import { useState } from "react"
import { brand } from "@/config/brand"
import { appTexts, institutionalInfo } from "@/data/shared-content"
import type { Affiliate } from "@/types/affiliate"
import { getAffiliateByDni } from "@/services/affiliateService"
import { themeStyles } from "@/lib/themeStyles"
import MtcpLogo from "@/components/MtcpLogo"

interface LoginScreenProps {
  onLogin: (affiliate: Affiliate) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [dni, setDni] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDevHints, setShowDevHints] = useState(false)

  const isReady = dni.length >= 7

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isReady) return
    setError("")
    setLoading(true)

    window.setTimeout(() => {
      const found = getAffiliateByDni(dni)
      setLoading(false)
      if (found) {
        onLogin(found)
      } else {
        setError("No encontramos una credencial asociada a este DNI.")
      }
    }, 600)
  }

  return (
    <div className="flex flex-col min-h-dvh screen-enter">
      <div
        className="flex flex-col items-center justify-center gap-5 px-6 pt-14 pb-14"
        style={{ background: themeStyles.headerBackground }}
      >
        <MtcpLogo size="lg" variant="light" />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.58)" }}>
            {institutionalInfo.shortName}
          </p>
          <h1 className="text-2xl font-extrabold tracking-wide" style={{ color: "#ffffff" }}>
            {appTexts.credential.title}
          </h1>
          <p className="text-xs font-medium leading-relaxed text-balance max-w-[260px]" style={{ color: "rgba(255,255,255,0.68)" }}>
            {institutionalInfo.fullName}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 -mt-7">
        <div className="mtcp-card px-5 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
              {appTexts.login.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {appTexts.login.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="dni"
                className="text-sm font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Número de DNI
              </label>
              <input
                id="dni"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ej: 30111222"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value.replace(/\D/g, "").slice(0, 10))
                  setError("")
                }}
                className="w-full rounded-[16px] px-4 py-3.5 text-lg font-bold outline-none transition-all"
                style={{
                  background: "var(--surface-soft)",
                  border: error
                    ? "2px solid var(--destructive)"
                    : "2px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.08em",
                }}
                autoComplete="off"
                disabled={loading}
                maxLength={10}
              />
              {error && (
                <div
                  className="flex items-start gap-2 rounded-[14px] px-3 py-2.5 mt-0.5"
                  style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm leading-snug" style={{ color: "#dc2626" }}>
                    {error}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isReady}
              className="w-full py-4 text-base font-extrabold transition-all active:scale-[0.98] disabled:cursor-not-allowed"
              style={{
                borderRadius: "999px",
                background: isReady && !loading ? "var(--primary)" : "var(--muted)",
                color: isReady && !loading ? "#ffffff" : "var(--muted-foreground)",
                boxShadow: isReady && !loading ? "0 10px 24px rgba(20, 91, 184, 0.24)" : "none",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Buscando...
                </span>
              ) : (
                appTexts.login.submitLabel
              )}
            </button>
          </form>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowDevHints((v) => !v)}
            className="flex items-center gap-1.5 px-1 py-1 text-xs font-semibold transition-opacity active:opacity-60"
            style={{ color: "var(--muted-foreground)" }}
            type="button"
            aria-expanded={showDevHints}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            {appTexts.login.devHintLabel}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: showDevHints ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showDevHints && (
            <div
              className="mt-1 rounded-[16px] px-4 py-3 flex flex-col gap-2"
              style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
            >
              <p className="mtcp-section-label">
                Solo para desarrollo
              </p>
              {[
                { dni: "30111222", nombre: "Juan Pérez", estado: "Activo" },
                { dni: "28777888", nombre: "Carlos Gómez", estado: "Período de gracia" },
                { dni: "33444555", nombre: "Roberto Díaz", estado: "Inactivo" },
              ].map((h) => (
                <button
                  key={h.dni}
                  type="button"
                  onClick={() => { setDni(h.dni); setError("") }}
                  className="flex items-center justify-between rounded-[14px] px-3 py-2.5 text-left transition-all active:opacity-70 hover:opacity-90"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span>
                    <span className="text-xs font-bold" style={{ color: "var(--foreground)", letterSpacing: "0.06em" }}>{h.dni}</span>
                    <span className="text-xs ml-2" style={{ color: "var(--muted-foreground)" }}>{h.nombre}</span>
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "var(--secondary)", color: "var(--primary)" }}
                  >
                    {h.estado}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] py-8" style={{ color: "var(--muted-foreground)" }}>
        {brand.copyright} · {institutionalInfo.phone} · {institutionalInfo.openingHours}
      </p>
    </div>
  )
}
