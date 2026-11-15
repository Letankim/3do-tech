"use client"

import { useLanguage } from "@/lib/i18n"

export function MarqueeBand() {
  const { t } = useLanguage()
  const items = [
    t("products.web.title"),
    t("products.mobile.title"),
    t("products.management.title"),
    t("products.ai.title"),
    t("products.cloud.title"),
    t("products.security.title"),
    t("nav.addin"),
  ]
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((x, i) => (
        <li key={i} className="flex items-center whitespace-nowrap px-6 text-[clamp(1.1rem,2.2vw,1.6rem)] font-bold tracking-tight">
          {x}
          <span className="ml-12 text-[0.7em]" aria-hidden>✳</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden border-y border-ink bg-brand py-4 text-ink">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
