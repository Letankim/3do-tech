import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

// Dong dau moi khoi: [01] NHAN ———————— ghi chu ben phai
export function SectionHead({
  index,
  label,
  note,
  dark = false,
  children,
}: {
  index?: string
  label: string
  note?: ReactNode
  dark?: boolean
  children?: ReactNode
}) {
  return (
    <Reveal>
      <div className={`flex items-center gap-4 ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>
        <span className="tag whitespace-nowrap">
          {index && <span className="text-brand">[{index}]</span>} {label}
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-ink-line" : "bg-line"}`} aria-hidden />
        {note && <span className="tag hidden whitespace-nowrap sm:inline">{note}</span>}
      </div>
      {children}
    </Reveal>
  )
}
