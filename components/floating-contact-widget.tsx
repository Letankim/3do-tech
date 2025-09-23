"use client"

import { useState } from "react"
import { Phone, Mail, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

// Custom Zalo Icon Component
function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.394c-1.339 1.394-3.467 2.251-5.894 2.251-2.427 0-4.555-.857-5.894-2.251C4.767 15.055 4.25 13.564 4.25 12c0-1.564.517-3.055 1.856-4.394C7.445 6.212 9.573 5.355 12 5.355c2.427 0 4.555.857 5.894 2.251C19.233 8.945 19.75 10.436 19.75 12c0 1.564-.517 3.055-1.856 4.394z"/>
      <path d="M15.5 9.5h-7c-.276 0-.5.224-.5.5v4c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5v-4c0-.276-.224-.5-.5-.5zm-1 3.5h-5v-2h5v2z"/>
    </svg>
  )
}

// Custom Chat Icon Component  
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 11H6V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
    </svg>
  )
}

export function FloatingContactWidget() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: Phone,
      label: t("contact.widget.phone"),
      href: "tel:+0865341745",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: ZaloIcon,
      label: t("contact.widget.zalo"),
      href: "https://zalo.me/84865341745",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Mail,
      label: t("contact.widget.email"),
      href: "mailto:3do.service@gmail.com",
      color: "bg-red-500 hover:bg-red-600",
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
              <div className="mr-3 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-lg border">
                {option.label}
              </div>
              <Button asChild size="icon" className={`h-12 w-12 rounded-full shadow-lg ${option.color} transition-all duration-200 hover:scale-105`}>
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
      <div className="relative group">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={`floating-contact h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <ChatIcon className="h-6 w-6 text-white" />}
        </Button>
      </div>
    </div>
  )
}