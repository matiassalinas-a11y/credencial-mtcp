import { brand } from "@/config/brand"
import { appTexts } from "@/data/shared-content"
import { themeStyles } from "@/lib/themeStyles"

export default function ComingSoonScreen() {
  return (
    <div className="screen-scroll screen-enter">
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: themeStyles.headerBackground }}
      >
        <h1 className="text-xl font-extrabold" style={{ color: "#ffffff" }}>
          {appTexts.comingSoon.title}
        </h1>
        <p className="text-xs mt-0.5 font-bold" style={{ color: "rgba(255,255,255,0.62)" }}>
          {brand.shortName}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-16 gap-6 text-center">
        <div
          className="w-20 h-20 rounded-[18px] flex items-center justify-center"
          style={{
            background: "var(--secondary)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--primary)" }}
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>

        <div className="mtcp-card px-5 py-4 max-w-xs">
          <p className="text-sm leading-relaxed text-balance" style={{ color: "var(--muted-foreground)" }}>
            {appTexts.comingSoon.description}
          </p>
        </div>
      </div>
    </div>
  )
}
