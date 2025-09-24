"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Github, Facebook, Send, CheckCircle, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection({ lang = "vi" }: { lang?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() 
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      toast({
        title: t("contact.form.success.title"),
        description: t("contact.form.success.description"),
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } else {
      throw new Error("Failed to send message")
    }
  } catch (error) {
    toast({
      title: t("contact.form.error.title"),
      description: t("contact.form.error.description"),
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}


  return (
    <section
      ref={sectionRef}
      className={`py-10 bg-gradient-to-br from-primary/5 to-accent/5 overflow-x-hidden transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 sm:translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16 px-4 sm:px-0">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              {t("contact.header.title")} <span className="text-primary">{t("contact.header.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              {t("contact.header.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Contact Info */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 sm:-translate-x-0"
              }`}
            >
              <Card className="p-6 sm:p-8 h-full bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden mx-4 sm:mx-0">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('/tech-circuit-pattern.jpg')] bg-repeat opacity-20"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">{t("contact.info.title")}</h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{t("contact.info.email")}</p>
                        <p className="text-white/90">{t("contact.info.emailValue")}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{t("contact.info.phone")}</p>
                        <p className="text-white/90">{t("contact.info.phoneValue")}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{t("contact.info.address")}</p>
                        <p className="text-white/90">{t("contact.info.addressValue")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">{t("contact.info.followMe")}</h4>
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 sm:translate-x-0"
              }`}
            >
              <Card className="p-6 sm:p-8 h-full mx-4 sm:mx-0">
                <h3 className="text-2xl font-bold mb-4">{t("contact.form.title")}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("contact.form.namePlaceholder")}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("contact.form.emailPlaceholder")}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.form.subjectLabel")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t("contact.form.subjectPlaceholder")}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-background resize-none"
                    />
                  </div>

                 <Button
  type="submit"
  size="lg"
  disabled={isSubmitting}
  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold relative overflow-hidden group"
>
  {isSubmitting ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      {t("contact.form.submitting")}
    </>
  ) : (
    <>
      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      {t("contact.form.submitButton")}
    </>
  )}

  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-500 ease-out"></span>
</Button>


                  <p className="text-sm text-muted-foreground text-center">
                    {t("contact.form.consent")}
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}