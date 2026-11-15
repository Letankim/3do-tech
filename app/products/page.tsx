"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
              <div className="text-2xl font-bold text-primary">3DO TECH</div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/#gioi-thieu" className="text-muted-foreground hover:text-primary transition-colors">
                Giới thiệu
              </Link>
              <Link href="/#doi-tac" className="text-muted-foreground hover:text-primary transition-colors">
                Đối tác
              </Link>
              <Link href="/#lien-he" className="text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Tất cả <span className="text-primary">Sản phẩm</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Khám phá danh mục đầy đủ các sản phẩm và dịch vụ công nghệ mà chúng tôi đã phát triển
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={product.status === "Hoàn thành" ? "default" : "secondary"}>{product.status}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="group-hover:text-primary transition-colors p-0">
                  Chi tiết dự án
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </main>
    </div>
  )
}
