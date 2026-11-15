"use client"

import { useState } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "mobile", name: "Ứng dụng di động" },
    { id: "web", name: "Website & Web App" },
    { id: "system", name: "Hệ thống quản lý" },
    { id: "ai", name: "AI & Machine Learning" },
    { id: "security", name: "Bảo mật" },
    { id: "cloud", name: "Cloud & DevOps" },
  ]

  const allProducts = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "web",
      description: "Nền tảng thương mại điện tử hoàn chỉnh với tích hợp thanh toán và quản lý kho.",
      image: "/ecommerce-platform-concept.png",
      technologies: ["Next.js", "Node.js", "PostgreSQL"],
      status: "Hoàn thành",
    },
    {
      id: 2,
      title: "Banking Mobile App",
      category: "mobile",
      description: "Ứng dụng ngân hàng di động với bảo mật cao và giao diện thân thiện.",
      image: "/banking-mobile-app.png",
      technologies: ["React Native", "Biometric Auth", "Encryption"],
      status: "Đang phát triển",
    },
    {
      id: 3,
      title: "Hospital Management System",
      category: "system",
      description: "Hệ thống quản lý bệnh viện tích hợp đầy đủ từ đăng ký đến xuất viện.",
      image: "/hospital-management-system-interface.png",
      technologies: ["Vue.js", "Laravel", "MySQL"],
      status: "Hoàn thành",
    },
    {
      id: 4,
      title: "AI Chatbot Platform",
      category: "ai",
      description: "Nền tảng chatbot thông minh với khả năng học máy và xử lý ngôn ngữ tự nhiên.",
      image: "/ai-chatbot-interface.png",
      technologies: ["Python", "TensorFlow", "NLP"],
      status: "Hoàn thành",
    },
    {
      id: 5,
      title: "Security Audit Tool",
      category: "security",
      description: "Công cụ kiểm tra bảo mật tự động cho ứng dụng web và mobile.",
      image: "/security-audit-dashboard.jpg",
      technologies: ["Python", "Docker", "OWASP"],
      status: "Đang phát triển",
    },
    {
      id: 6,
      title: "Cloud Infrastructure",
      category: "cloud",
      description: "Giải pháp hạ tầng đám mây tự động mở rộng với monitoring và logging.",
      image: "/cloud-infrastructure-dashboard.png",
      technologies: ["AWS", "Kubernetes", "Terraform"],
      status: "Hoàn thành",
    },
  ]

  const filteredProducts =
    selectedCategory === "all" ? allProducts : allProducts.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-paper">
      <StickyHeader />

      <section className="bg-ink text-ink-text">
        <div className="wrap pb-12 pt-28 sm:pt-32 lg:pt-40">
          <Reveal>
            <p className="tag text-ink-muted">
              <span className="text-brand">[ Sản phẩm ]</span> {allProducts.length} / Catalog
            </p>
            <h1 className="mega mt-8 text-[clamp(3rem,9vw,8rem)]">
              Tất cả <span className="text-brand">Sản phẩm</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-text/75">
              Khám phá danh mục đầy đủ các sản phẩm và dịch vụ công nghệ mà chúng tôi đã phát triển
            </p>
          </Reveal>
          <div className="-mx-5 mt-12 flex gap-2 overflow-x-auto border-t border-ink-line px-5 pb-1 pt-8 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Lọc theo nhóm">
            {categories.map((category) => {
              const on = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={on}
                  className={`tag shrink-0 border px-3 py-2 transition-colors ${on ? "border-brand bg-brand text-ink" : "border-ink-line text-ink-text/75 hover:border-ink-text hover:text-ink-text"}`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <main className="sec !pt-12">
        <div className="wrap">
          <div className="grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const done = product.status === "Hoàn thành"
              return (
                <Reveal key={product.id} as="article" className="group border-b border-r border-line bg-paper-3 p-5">
                  <div className="aspect-[16/10] overflow-hidden bg-paper-2">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="tag text-muted-foreground">#{String(product.id).padStart(2, "0")}</span>
                    <span className={`tag inline-flex items-center gap-2 ${done ? "text-ok" : "text-brand-deep"}`}>
                      <span className="h-1.5 w-1.5 bg-current" aria-hidden />
                      {product.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">{product.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
                  <p className="tag mt-5 border-t border-line pt-4 text-foreground/70">{product.technologies.join("  /  ")}</p>
                </Reveal>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <p className="py-16 text-center text-lg text-muted-foreground">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
