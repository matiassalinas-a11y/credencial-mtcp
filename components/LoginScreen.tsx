"use client"

import { BadgeCheck, ChevronDown, Info, LoaderCircle, LockKeyhole, UserRound } from "lucide-react"
import { brand } from "@/config/brand"
import { appTexts, institutionalInfo } from "@/data/shared-content"
import { useLoginViewModel } from "@/hooks/useLoginViewModel"
import { themeStyles } from "@/lib/themeStyles"
import type { Affiliate } from "@/types/affiliate"
import MtcpLogo from "@/components/MtcpLogo"

interface LoginScreenProps {
  onLogin: (affiliate: Affiliate) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const login = useLoginViewModel({ onLogin })

  return (
    <div className="flex min-h-dvh flex-col screen-enter">
      <div
        className="relative overflow-hidden px-6 pb-16 pt-14 text-center"
        style={{ background: themeStyles.headerBackground }}
      >
        <div className="absolute -right-14 top-5 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -left-20 bottom-1 h-44 w-44 rounded-full bg-white/5" />

        <div className="relative flex flex-col items-center gap-5">
          <MtcpLogo size="lg" variant="light" />
          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.62)" }}>
              {institutionalInfo.shortName}
            </p>
            <h1 className="text-[26px] font-extrabold leading-tight" style={{ color: "#ffffff" }}>
              Credencial Digital
            </h1>
            <p className="max-w-[280px] text-sm font-medium leading-relaxed text-balance" style={{ color: "rgba(255,255,255,0.72)" }}>
              {institutionalInfo.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-9 flex flex-1 flex-col px-4">
        <div className="mtcp-card px-5 py-6">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px]" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
              <LockKeyhole size={21} strokeWidth={2.2} />
            </span>
            <div>
              <h2 className="text-lg font-extrabold" style={{ color: "var(--foreground)" }}>
                {appTexts.login.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {appTexts.login.description}
              </p>
            </div>
          </div>

          <form onSubmit={login.handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dni" className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--muted-foreground)" }}>
                Número de DNI
              </label>
              <div className="relative">
                <UserRound size={18} strokeWidth={2.2} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--primary)" }} />
                <input
                  id="dni"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Ej: 30111222"
                  value={login.dni}
                  onChange={login.handleDniChange}
                  className="w-full rounded-[16px] py-4 pl-11 pr-4 text-lg font-extrabold outline-none transition-all"
                  style={{
                    background: "var(--surface-soft)",
                    border: login.error ? "2px solid var(--destructive)" : "2px solid var(--border)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.08em",
                  }}
                  autoComplete="off"
                  disabled={login.loading}
                  maxLength={10}
                />
              </div>
              {login.error && (
                <div className="mt-1 flex items-start gap-2 rounded-[14px] px-3 py-2.5" style={{ background: "var(--error-soft)", border: "1px solid #fecaca" }}>
                  <Info size={15} strokeWidth={2.2} className="mt-0.5 flex-shrink-0" style={{ color: "var(--destructive)" }} />
                  <p className="text-sm leading-snug" style={{ color: "var(--destructive)" }}>
                    {login.error}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={login.loading || !login.isReady}
              className="w-full py-4 text-base font-extrabold transition-all active:scale-[0.98] disabled:cursor-not-allowed"
              style={{
                borderRadius: "999px",
                background: login.isReady && !login.loading ? "var(--primary)" : "var(--muted)",
                color: login.isReady && !login.loading ? "#ffffff" : "var(--muted-foreground)",
                boxShadow: login.isReady && !login.loading ? "var(--shadow-button)" : "none",
                opacity: login.loading ? 0.72 : 1,
              }}
            >
              {login.loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" size={17} strokeWidth={2.5} />
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
            onClick={login.toggleDevHints}
            className="flex items-center gap-1.5 px-1 py-1 text-xs font-semibold transition-opacity active:opacity-60"
            style={{ color: "var(--muted-foreground)" }}
            type="button"
            aria-expanded={login.showDevHints}
          >
            <Info size={13} strokeWidth={2.1} />
            {appTexts.login.devHintLabel}
            <ChevronDown size={13} strokeWidth={2.5} style={{ transform: login.showDevHints ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
          </button>

          {login.showDevHints && (
            <div className="mt-1 flex flex-col gap-2 rounded-[16px] px-4 py-3" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p className="mtcp-section-label">Solo para desarrollo</p>
              {login.devDnis.map((h) => (
                <button
                  key={h.dni}
                  type="button"
                  onClick={() => login.selectDevDni(h.dni)}
                  className="flex items-center justify-between rounded-[14px] px-3 py-2.5 text-left transition-all active:opacity-70 hover:opacity-90"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span className="min-w-0">
                    <span className="text-xs font-bold" style={{ color: "var(--foreground)", letterSpacing: "0.06em" }}>{h.dni}</span>
                    <span className="ml-2 text-xs" style={{ color: "var(--muted-foreground)" }}>{h.nombre}</span>
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                    {h.estado}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-8 pt-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: "rgba(255,255,255,0.68)", border: "1px solid var(--border)" }}>
          <BadgeCheck size={13} strokeWidth={2.2} style={{ color: "var(--primary)" }} />
          <p className="text-[11px] font-semibold" style={{ color: "var(--muted-foreground)" }}>
            {brand.copyright} / {institutionalInfo.openingHours}
          </p>
        </div>
      </div>
    </div>
  )
}
