"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Facebook, Send, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection({ lang = "vi" }: { lang?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()
  const { t } = useLanguage()

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


  const info = [
    { icon: Mail, label: t("contact.info.email"), node: <span>{t("contact.info.emailValue")}</span> },
    {
      icon: Phone,
      label: t("contact.info.phone"),
      node: (
        <div className="space-y-1">
          <a href="tel:0774889191" className="block hover:underline">
            <strong>0774.88.9191</strong> <span className="text-sm text-muted-foreground">Mr. Cường · Kỹ thuật Add-in</span>
          </a>
          <a href="tel:0865341745" className="block hover:underline">
            <strong>0865.341.745</strong> <span className="text-sm text-muted-foreground">Mr. Kim · Tư vấn giải pháp</span>
          </a>
        </div>
      ),
    },
    { icon: MapPin, label: t("contact.info.address"), node: <span>{t("contact.info.addressValue")}</span> },
  ]

  return (
    <section id="lien-he" className="section-y border-t border-border bg-card">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("nav.contact")}</span>
          <h2 className="h2 mt-4">
            {t("contact.header.title")} <span className="text-primary">{t("contact.header.titleHighlight")}</span>
          </h2>
          <p className="lead mt-4">{t("contact.header.description")}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-xl font-bold">{t("contact.info.title")}</h3>
            <ul className="mt-6 space-y-6">
              {info.map((it, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <it.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{it.label}</p>
                    <div className="mt-0.5 font-medium">{it.node}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-medium text-muted-foreground">{t("contact.info.followMe")}</p>
              <div className="mt-3 flex gap-2">
                <a href="https://www.youtube.com/@3DO-Corp" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-lg border border-border transition-colors hover:border-primary/50 hover:text-primary">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61581499790956" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-lg border border-border transition-colors hover:border-primary/50 hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-xl font-bold">{t("contact.form.title")}</h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
                  <Input id="name" name="name" type="text" placeholder={t("contact.form.namePlaceholder")} value={formData.name} onChange={handleInputChange} required className="h-11 bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
                  <Input id="email" name="email" type="email" placeholder={t("contact.form.emailPlaceholder")} value={formData.email} onChange={handleInputChange} required className="h-11 bg-card" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("contact.form.subjectLabel")}</Label>
                <Input id="subject" name="subject" type="text" placeholder={t("contact.form.subjectPlaceholder")} value={formData.subject} onChange={handleInputChange} required className="h-11 bg-card" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
                <Textarea id="message" name="message" rows={5} placeholder={t("contact.form.messagePlaceholder")} value={formData.message} onChange={handleInputChange} required className="resize-none bg-card" />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 w-full rounded-xl text-base font-semibold">
                {isSubmitting ? t("contact.form.submitting") : (<>{t("contact.form.submitButton")} <Send className="ml-2 h-4 w-4" aria-hidden /></>)}
              </Button>
              <p className="text-center text-xs text-muted-foreground">{t("contact.form.consent")}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
