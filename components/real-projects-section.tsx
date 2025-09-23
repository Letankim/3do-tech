"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

const realProjects = [
  {
    id: 1,
    title: "Hệ thống quản lý bán hàng VinMart",
    description:
      "Phát triển hệ thống POS và quản lý kho hàng cho chuỗi siêu thị VinMart với hơn 200 cửa hàng trên toàn quốc.",
    image: "/real-project-vinmart.jpg",
    category: "Hệ thống quản lý",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    completedDate: "Tháng 12, 2023",
    teamSize: "8 người",
    client: "VinGroup",
    status: "Hoàn thành",
  },
  {
    id: 2,
    title: "Ứng dụng Banking Mobile TPBank",
    description:
      "Thiết kế và phát triển ứng dụng mobile banking với tính năng chuyển tiền, thanh toán và quản lý tài chính cá nhân.",
    image: "/real-project-tpbank.jpg",
    category: "Ứng dụng di động",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    completedDate: "Tháng 8, 2023",
    teamSize: "12 người",
    client: "TPBank",
    status: "Hoàn thành",
  },
  {
    id: 3,
    title: "Nền tảng E-learning FPT Education",
    description:
      "Xây dựng hệ thống học trực tuyến với video streaming, bài kiểm tra tự động và quản lý tiến độ học tập.",
    image: "/real-project-fpt-edu.jpg",
    category: "Giáo dục",
    technologies: ["Next.js", "Python", "AWS", "Docker"],
    completedDate: "Tháng 6, 2023",
    teamSize: "15 người",
    client: "FPT Education",
    status: "Hoàn thành",
  },
  {
    id: 4,
    title: "Hệ thống IoT Smart Factory",
    description: "Triển khai giải pháp IoT cho nhà máy thông minh, giám sát thiết bị và tối ưu hóa quy trình sản xuất.",
    image: "/real-project-smart-factory.jpg",
    category: "IoT & AI",
    technologies: ["Python", "TensorFlow", "MQTT", "InfluxDB"],
    completedDate: "Tháng 10, 2023",
    teamSize: "10 người",
    client: "Vinamilk",
    status: "Đang triển khai",
  },
  {
    id: 5,
    title: "Website Thương mại điện tử Shopee",
    description: "Phát triển các tính năng mới cho nền tảng Shopee, tối ưu hóa hiệu suất và trải nghiệm người dùng.",
    image: "/real-project-shopee.jpg",
    category: "Thương mại điện tử",
    technologies: ["Vue.js", "Java", "MySQL", "Elasticsearch"],
    completedDate: "Tháng 4, 2023",
    teamSize: "20 người",
    client: "Shopee Vietnam",
    status: "Hoàn thành",
  },
  {
    id: 6,
    title: "Ứng dụng Giao hàng Grab Express",
    description:
      "Tối ưu hóa thuật toán định tuyến và phát triển tính năng theo dõi đơn hàng real-time cho Grab Express.",
    image: "/real-project-grab.jpg",
    category: "Logistics",
    technologies: ["React Native", "Go", "Redis", "Google Maps API"],
    completedDate: "Tháng 2, 2024",
    teamSize: "14 người",
    client: "Grab Vietnam",
    status: "Hoàn thành",
  },
]

export function RealProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("san-pham-thuc-te")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="san-pham-thuc-te" className="py-16 sm:py-20 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4 sm:mb-6">
            Dự án <span className="text-primary">thực tế</span> đã triển khai
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Khám phá những dự án công nghệ mà chúng tôi đã thực hiện thành công cho các doanh nghiệp hàng đầu Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {realProjects.slice(0, 6).map((project, index) => (
            <div
              key={project.id}
              className={`group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={project.status === "Hoàn thành" ? "default" : "outline"}
                    className={project.status === "Hoàn thành" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.completedDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.teamSize}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{project.client}</span>
                  <Button variant="ghost" size="sm" className="h-8 px-3 hover:bg-primary hover:color-white">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-primary text-white hover:bg-white hover:text-primary hover:border-primary transition-colors">
              Xem tất cả dự án
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
