"use client"

import { useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { appTexts } from "@/data/shared-content"
import type { Affiliate, AffiliateStatus } from "@/types/affiliate"
import { themeStyles } from "@/lib/themeStyles"
import StatusBadge from "@/components/StatusBadge"

interface CredentialCardProps {
  affiliate: Affiliate
  onBack: () => void
}

const credentialMessages: Record<AffiliateStatus, { text: string }> = {
  activo: { text: "Credencial vigente." },
  gracia: { text: "Credencial en período de gracia." },
  inactivo: { text: "Credencial inactiva." },
  suspendido: { text: "Credencial suspendida." },
}

function FieldBlock({
  label,
  value,
  variant = "default",
}: {
  label: string
  value: string
  variant?: "default" | "name" | "company"
}) {
  const isName = variant === "name"
  const isCompany = variant === "company"
  const valueClassName = isName
    ? "text-[12px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1E2F55]"
    : isCompany
      ? "text-[10.5px] font-semibold leading-[1.1] text-[#1E2F55]"
      : "text-[11px] font-semibold leading-[1.1] text-[#1E2F55]"
  const valueStyle = isName
    ? {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
      }
    : {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap" as const,
      }

  return (
    <div className="min-w-0 border-b border-[#E2E8F0] pb-[clamp(5px,1.7vw,7px)]">
      <span className="mb-1 block font-extrabold uppercase leading-none tracking-[0.05em] text-[#145BB8] text-[8px]">
        {label}
      </span>
      <span className={`block min-w-0 ${valueClassName}`} style={valueStyle}>
        {value || "-"}
      </span>
    </div>
  )
}

function TwoColumnFields({
  left,
  right,
}: {
  left: { label: string; value: string }
  right: { label: string; value: string }
}) {
  return (
    <div className="grid grid-cols-2 gap-[clamp(18px,6vw,28px)] border-b border-[#E2E8F0] pb-[clamp(5px,1.7vw,7px)]">
      <div className="min-w-0">
        <span className="mb-1 block font-extrabold uppercase leading-none tracking-[0.05em] text-[#145BB8] text-[8px]">
          {left.label}
        </span>
        <span className="block truncate font-semibold leading-[1.1] text-[#1E2F55] text-[11px]">
          {left.value || "-"}
        </span>
      </div>
      <div className="min-w-0">
        <span className="mb-1 block font-extrabold uppercase leading-none tracking-[0.05em] text-[#145BB8] text-[8px]">
          {right.label}
        </span>
        <span className="block truncate font-semibold leading-[1.1] text-[#1E2F55] text-[11px]">
          {right.value || "-"}
        </span>
      </div>
    </div>
  )
}

function CredentialFront({ affiliate }: { affiliate: Affiliate }) {
  const beneficiaryName = affiliate.beneficiaryName?.trim() || "Titular"

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_18px_rgba(20,40,70,0.18)] [backface-visibility:hidden]">
      <Image
        src="/assets/credential/credential-front-header.png"
        alt="Logos Conduccion Raul Silva y M.T.C.P."
        width={1004}
        height={248}
        priority
        className="block w-full flex-none"
      />

      <div className="flex min-h-0 flex-1 flex-col justify-center px-[clamp(18px,6.2vw,24px)] pb-[clamp(14px,4.2vw,20px)] pt-[clamp(12px,3.6vw,17px)] font-sans">
        <div className="grid gap-[clamp(6px,1.8vw,8px)]">
          <FieldBlock label="Nombre" value={affiliate.nombreCompleto} variant="name" />
          <FieldBlock label="Sede" value={affiliate.sede} />
          <TwoColumnFields
            left={{ label: "D.N.I.", value: affiliate.dni }}
            right={{ label: "Socio N°", value: affiliate.socio }}
          />
          <FieldBlock label="Beneficiario/a" value={beneficiaryName} />
          <FieldBlock label="Empresa" value={affiliate.empresa} variant="company" />
        </div>
      </div>
    </div>
  )
}

function CredentialBack() {
  return (
    <div
      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_18px_rgba(20,40,70,0.18)] [backface-visibility:hidden]"
      style={{ transform: "rotateY(180deg)" }}
    >
      <Image
        src="/assets/credential/credential-back.jpg"
        alt="Dorso de la credencial"
        width={800}
        height={517}
        className="h-full w-full object-contain"
      />
    </div>
  )
}

function CredentialFlipCard({ affiliate }: { affiliate: Affiliate }) {
  const [isFlipped, setIsFlipped] = useState(false)

  function toggleCard() {
    setIsFlipped((current) => !current)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleCard()
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Credencial M.T.C.P., toca para girar"
        aria-pressed={isFlipped}
        onClick={toggleCard}
        onKeyDown={handleKeyDown}
        className="w-full max-w-[380px] cursor-pointer outline-none [perspective:1500px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        style={{ aspectRatio: "1004 / 790", maxWidth: "min(380px, 92vw)" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] [transform-style:preserve-3d]"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <CredentialFront affiliate={affiliate} />
          <CredentialBack />
        </div>
      </div>

      <p className="text-center text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
        Toca la tarjeta para girarla
      </p>
    </div>
  )
}

export default function CredentialCard({ affiliate, onBack }: CredentialCardProps) {
  const msg = credentialMessages[affiliate.estado]

  return (
    <div className="screen-scroll screen-enter">
      <div
        className="flex items-center gap-3 px-5 pb-5 pt-12"
        style={{ background: themeStyles.headerBackground }}
      >
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
          aria-label="Volver"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-extrabold" style={{ color: "#ffffff" }}>Mi Credencial</h1>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.62)" }}>{appTexts.credential.title}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 px-4">
        <CredentialFlipCard affiliate={affiliate} />

        <div className="mtcp-card flex items-center justify-between gap-3 px-5 py-4">
          <StatusBadge status={affiliate.estado} />
          <p className="text-right text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
            {msg.text}
          </p>
        </div>

        <button
          onClick={onBack}
          className="mtcp-button-secondary flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold transition-all active:scale-[0.98] active:opacity-80"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
