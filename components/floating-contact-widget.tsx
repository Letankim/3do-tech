"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Plus, X } from "lucide-react"

function ZaloIcon({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: "url('/zalo.png')",
        backgroundSize: "cover",
        width: "24px",
        height: "24px",
      }}
    />
  )
}

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: Phone,
      href: "tel:+0865341745",
      color: "bg-green-500 hover:bg-green-600",
      label: "Phone",
    },
    {
      icon: ZaloIcon,
      href: "https://zalo.me/84865341745",
      color: "bg-blue-500 hover:bg-blue-600",
      label: "Zalo",
    },
    {
      icon: Mail,
      href: "mailto:3do.service@gmail.com",
      color: "bg-purple-500 hover:bg-purple-600",
      label: "Email",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Contact Options */}
        {contactOptions.map((option, index) => {
          const IconComponent = option.icon
          return (
            <div
              key={index}
              className={`absolute right-0 transition-all duration-300 ease-out ${
                isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
              style={{
                bottom: `${(index + 1) * 60}px`,
                transitionDelay: isOpen ? `${index * 100}ms` : `${(contactOptions.length - index - 1) * 50}ms`,
              }}
            >
              <div className="flex items-center justify-end mb-2">
                <div
                  className={`mr-3 px-3 py-1 rounded-lg bg-black/80 text-white text-sm whitespace-nowrap transition-all duration-200 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100 + 150}ms` : "0ms",
                  }}
                >
                  {option.label}
                </div>
                <Button
                  asChild
                  size="icon"
                  className={`h-12 w-12 rounded-full shadow-lg ${option.color} transition-all duration-200 hover:scale-110`}
                >
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Toggle Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <div className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
          </div>
        </Button>
      </div>
    </div>
  )
}
