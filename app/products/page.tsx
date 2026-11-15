"use client"

import { useState } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"

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
    <div className="min-h-screen bg-background">
      <StickyHeader />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
                <div className="container-x relative pb-10">
          <span className="eyebrow">Sản phẩm</span>
          <h1 className="display mt-4 max-w-3xl !text-[clamp(2rem,4.6vw,3.25rem)]">
            Tất cả <span className="text-primary">sản phẩm</span>
          </h1>
          <p className="lead mt-5 max-w-2xl">Danh mục đầy đủ các sản phẩm và dịch vụ công nghệ mà chúng tôi đã phát triển.</p>

          <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Lọc theo nhóm">
            {categories.map((category) => {
              const on = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={on}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <main className="pb-20 pt-6 sm:pb-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const done = product.status === "Hoàn thành"
              return (
                <article key={product.id} className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${done ? "text-success" : "text-signal"}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      {product.status}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug">{product.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{product.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {product.technologies.map((tech) => (
                        <li key={tech} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">{tech}</li>
                      ))}
                    </ul>
                  </div>
                </article>
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
