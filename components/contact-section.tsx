"use client"

import type React from "react"
import { useState } from "react"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight } from "lucide-react"
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


  const field =
    "peer w-full border-0 border-b border-[color:var(--input)] bg-transparent px-0 pb-3 pt-7 text-lg outline-none transition-colors placeholder:text-transparent focus:border-ink focus:ring-0"
  const label =
    "tag pointer-events-none absolute left-0 top-1 text-muted-foreground transition-colors peer-focus:text-brand-deep"

  return (
    <section id="lien-he" className="sec bg-paper">
      <div className="wrap">
        <SectionHead index="06" label={t("nav.contact")} note="24H" />

        <Reveal className="mt-12 max-w-4xl">
          <h2 className="title">
            {t("contact.header.title")} <span className="text-brand-deep">{t("contact.header.titleHighlight")}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("contact.header.description")}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="tag text-muted-foreground">{t("contact.info.title")}</h3>
            <dl className="mt-5 border-t border-line">
              <div className="border-b border-line py-5">
                <dt className="tag text-muted-foreground">{t("contact.info.email")}</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${t("contact.info.emailValue")}`} className="link-u text-xl font-semibold">{t("contact.info.emailValue")}</a>
                </dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="tag text-muted-foreground">{t("contact.info.phone")}</dt>
                <dd className="mt-1.5 space-y-2">
                  <a href="tel:0774889191" className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="link-u font-mono text-xl font-semibold">0774.88.9191</span>
                    <span className="text-sm text-muted-foreground">Mr. Cường · Kỹ thuật Add-in</span>
                  </a>
                  <a href="tel:0865341745" className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="link-u font-mono text-xl font-semibold">0865.341.745</span>
                    <span className="text-sm text-muted-foreground">Mr. Kim · Tư vấn giải pháp</span>
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="tag text-muted-foreground">{t("contact.info.address")}</dt>
                <dd className="mt-1.5 text-xl font-semibold">{t("contact.info.addressValue")}</dd>
              </div>
              <div className="py-5">
                <dt className="tag text-muted-foreground">{t("contact.info.followMe")}</dt>
                <dd className="mt-2 flex gap-6 font-semibold">
                  <a href="https://www.youtube.com/@3DO-Corp" target="_blank" rel="noopener noreferrer" className="link-u">YouTube ↗</a>
                  <a href="https://www.facebook.com/profile.php?id=61581499790956" target="_blank" rel="noopener noreferrer" className="link-u">Facebook ↗</a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="marks bg-paper-3 p-6 text-foreground/40 sm:p-10">
              <div className="flex items-center justify-between text-foreground">
                <h3 className="text-2xl font-bold tracking-tight">{t("contact.form.title")}</h3>
                <span className="tag text-muted-foreground">FORM / 01</span>
              </div>
              <div className="mt-6 grid gap-x-8 text-foreground md:grid-cols-2">
                <div className="relative mt-4">
                  <input id="name" name="name" type="text" placeholder={t("contact.form.namePlaceholder")} value={formData.name} onChange={handleInputChange} required className={field} />
                  <label htmlFor="name" className={label}>{t("contact.form.nameLabel")}</label>
                </div>
                <div className="relative mt-4">
                  <input id="email" name="email" type="email" placeholder={t("contact.form.emailPlaceholder")} value={formData.email} onChange={handleInputChange} required className={field} />
                  <label htmlFor="email" className={label}>{t("contact.form.emailLabel")}</label>
                </div>
              </div>
              <div className="relative mt-4 text-foreground">
                <input id="subject" name="subject" type="text" placeholder={t("contact.form.subjectPlaceholder")} value={formData.subject} onChange={handleInputChange} required className={field} />
                <label htmlFor="subject" className={label}>{t("contact.form.subjectLabel")}</label>
              </div>
              <div className="relative mt-4 text-foreground">
                <textarea id="message" name="message" rows={4} placeholder={t("contact.form.messagePlaceholder")} value={formData.message} onChange={handleInputChange} required className={`${field} resize-none`} />
                <label htmlFor="message" className={label}>{t("contact.form.messageLabel")}</label>
              </div>
              <div className="mt-10 flex flex-col gap-5 text-foreground sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">{t("contact.form.consent")}</p>
                <button type="submit" disabled={isSubmitting} className="btn btn-ink disabled:opacity-60">
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submitButton")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
