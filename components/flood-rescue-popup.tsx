"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloodRescuePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative min-h-[400px] flex items-center justify-center p-8"
          style={{
            backgroundImage: "url(https://vietdaily.vn/wp-content/uploads/2024/06/image-37-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 flex flex-col items-center w-full max-w-lg gap-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Trang Web Hỗ Trợ Người Dân Gặp Lũ Lụt
            </h2>
            <p className="text-base md:text-lg text-white/90">
              Chúng tôi đang xây dựng hệ thống đăng ký tìm kiếm hỗ trợ để giúp đỡ người dân vượt qua khó khăn.
            </p>
            <Button
              size="lg"
              className="w-full max-w-xs px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-transform transform hover:scale-105"
              onClick={() => (window.location.href = "https://cuuho.3docorp.vn")}
            >
              Đi Đến Trang Web
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}