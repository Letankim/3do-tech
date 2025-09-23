"use client"

import { useState } from "react"
import { Phone, MessageCircle, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: Phone,
      label: "Gọi điện",
      href: "tel:+0865341745",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: MessageCircle,
      label: "Zalo",
      href: "https://zalo.me/84865341745",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:3do.service@gmail.com",
      color: "bg-accent hover:bg-accent/90",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {contactOptions.map((option, index) => (
            <div
              key={option.label}
              className="contact-tooltip flex items-center justify-end"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mr-3 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-lg">
                {option.label}
              </div>
              <Button asChild size="icon" className={`h-12 w-12 rounded-full shadow-lg ${option.color}`}>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <option.icon className="h-5 w-5 text-white" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`floating-contact h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>
    </div>
  )
}
