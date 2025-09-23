"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
  { code: "vi" as Language, name: "Tiếng Việt", flag: "VN" },
  { code: "en" as Language, name: "English", flag: "US" },
  { code: "zh" as Language, name: "中文", flag: "CN" },
  { code: "ja" as Language, name: "日本語", flag: "JP" },
  { code: "ko" as Language, name: "한국어", flag: "KR" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-sm font-semibold hover:bg-primary/10 transition-colors border rounded-md"
        >
          {currentLanguage && (
            <ReactCountryFlag
              countryCode={currentLanguage.flag}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
              aria-label={currentLanguage.name}
            />
          )}
          <ChevronDown className="h-3 w-3 ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setIsOpen(false)
            }}
            className={`cursor-pointer flex items-center gap-2 ${
              language === lang.code ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <ReactCountryFlag
              countryCode={lang.flag}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
              aria-label={lang.name}
            />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
