"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useLanguage, type Language } from "@/lib/i18n"
import ReactCountryFlag from "react-country-flag"

const languages = [
  { code: "vi" as Language, name: "Tiếng Việt", short: "VI", flag: "VN" },
  { code: "en" as Language, name: "English", short: "EN", flag: "US" },
  { code: "zh" as Language, name: "中文", short: "ZH", flag: "CN" },
  { code: "ja" as Language, name: "日本語", short: "JA", flag: "JP" },
  { code: "ko" as Language, name: "한국어", short: "KO", flag: "KR" },
]

export function LanguageSwitcher({ dark = true }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const current = languages.find((l) => l.code === language) ?? languages[0]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        aria-label="Chọn ngôn ngữ"
        className={`tag inline-flex h-9 items-center gap-2 border px-3 transition-colors ${
          dark ? "border-ink-line text-ink-text hover:border-ink-text" : "border-line text-foreground hover:border-foreground"
        }`}
      >
        <ReactCountryFlag countryCode={current.flag} svg style={{ width: "1.05em", height: "1.05em" }} aria-hidden />
        {current.short}
        <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-sm">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setIsOpen(false)
            }}
            className={`flex cursor-pointer items-center gap-2 rounded-sm ${language === lang.code ? "font-semibold" : ""}`}
          >
            <ReactCountryFlag countryCode={lang.flag} svg style={{ width: "1.1em", height: "1.1em" }} aria-hidden />
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && <span className="h-1.5 w-1.5 bg-brand" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
