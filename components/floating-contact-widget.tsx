"use client"

import { useState } from "react"
import { Phone, Mail, Plus } from "lucide-react"

function ZaloIcon({ className }: { className?: string }) {
  return <span className={className} style={{ backgroundImage: "url('/zalo.png')", backgroundSize: "cover", width: 20, height: 20, display: "block" }} />
}

const OPTIONS = [
  { icon: Phone, href: "tel:0774889191", label: "Gọi Mr. Cường", sub: "0774.88.9191" },
  { icon: ZaloIcon, href: "https://zalo.me/0774889191", label: "Zalo Mr. Cường", sub: "Kỹ thuật Add-in" },
  { icon: Phone, href: "tel:0865341745", label: "Gọi Mr. Kim", sub: "0865.341.745" },
  { icon: ZaloIcon, href: "https://zalo.me/0865341745", label: "Zalo Mr. Kim", sub: "Tư vấn giải pháp" },
  { icon: Mail, href: "mailto:3do.service@gmail.com", label: "Email hỗ trợ", sub: "3do.service@gmail.com" },
]

export function FloatingContactWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <ul className="contact-tooltip w-64 border border-ink-line bg-ink text-ink-text shadow-2xl" aria-label="Liên hệ nhanh">
          {OPTIONS.map((o) => (
            <li key={o.label} className="border-b border-ink-line last:border-b-0">
              <a href={o.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-ink-3">
                <o.icon className="h-5 w-5 shrink-0 text-brand" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{o.label}</span>
                  <span className="block truncate font-mono text-xs text-ink-muted">{o.sub}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        className="grid h-14 w-14 place-items-center bg-brand text-ink shadow-lg transition-transform hover:scale-105"
      >
        <Plus className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
    </div>
  )
}
