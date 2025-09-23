"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { ExternalLink, Calendar, Users, Search } from "lucide-react"
import { useState, useMemo } from "react"

const allProjects = [
  {
    id: 1,
    title: "Hệ thống quản lý bán hàng VinMart",
    description:
      "Phát triển hệ thống POS và quản lý kho hàng cho chuỗi siêu thị VinMart với hơn 200 cửa hàng trên toàn quốc. Hệ thống bao gồm quản lý sản phẩm, báo cáo doanh thu, và tích hợp thanh toán đa dạng.",
    image: "/real-project-vinmart.jpg",
    category: "Hệ thống quản lý",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    completedDate: "Tháng 12, 2023",
    teamSize: "8 người",
    client: "VinGroup",
    status: "Hoàn thành",
    duration: "8 tháng",
  },
  {
    id: 2,
    title: "Ứng dụng Banking Mobile TPBank",
    description:
      "Thiết kế và phát triển ứng dụng mobile banking với tính năng chuyển tiền, thanh toán và quản lý tài chính cá nhân. Ứng dụng hỗ trợ sinh trắc học và bảo mật đa lớp.",
    image: "/real-project-tpbank.jpg",
    category: "Ứng dụng di động",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Biometric"],
    completedDate: "Tháng 8, 2023",
    teamSize: "12 người",
    client: "TPBank",
    status: "Hoàn thành",
    duration: "10 tháng",
  },
  {
    id: 3,
    title: "Nền tảng E-learning FPT Education",
    description:
      "Xây dựng hệ thống học trực tuyến với video streaming, bài kiểm tra tự động và quản lý tiến độ học tập. Hỗ trợ hơn 100,000 học viên đồng thời.",
    image: "/real-project-fpt-edu.jpg",
    category: "Giáo dục",
    technologies: ["Next.js", "Python", "AWS", "Docker", "WebRTC"],
    completedDate: "Tháng 6, 2023",
    teamSize: "15 người",
    client: "FPT Education",
    status: "Hoàn thành",
    duration: "12 tháng",
  },
  {
    id: 4,
    title: "Hệ thống IoT Smart Factory",
    description:
      "Triển khai giải pháp IoT cho nhà máy thông minh, giám sát thiết bị và tối ưu hóa quy trình sản xuất. Giảm 30% chi phí vận hành và tăng 25% hiệu suất.",
    image: "/real-project-smart-factory.jpg",
    category: "IoT & AI",
    technologies: ["Python", "TensorFlow", "MQTT", "InfluxDB", "Grafana"],
    completedDate: "Tháng 10, 2023",
    teamSize: "10 người",
    client: "Vinamilk",
    status: "Đang triển khai",
    duration: "6 tháng",
  },
  {
    id: 5,
    title: "Website Thương mại điện tử Shopee",
    description:
      "Phát triển các tính năng mới cho nền tảng Shopee, tối ưu hóa hiệu suất và trải nghiệm người dùng. Cải thiện tốc độ tải trang 40% và tăng conversion rate 15%.",
    image: "/real-project-shopee.jpg",
    category: "Thương mại điện tử",
    technologies: ["Vue.js", "Java", "MySQL", "Elasticsearch", "Kafka"],
    completedDate: "Tháng 4, 2023",
    teamSize: "20 người",
    client: "Shopee Vietnam",
    status: "Hoàn thành",
    duration: "14 tháng",
  },
  {
    id: 6,
    title: "Ứng dụng Giao hàng Grab Express",
    description:
      "Tối ưu hóa thuật toán định tuyến và phát triển tính năng theo dõi đơn hàng real-time cho Grab Express. Giảm 20% thời gian giao hàng trung bình.",
    image: "/real-project-grab.jpg",
    category: "Logistics",
    technologies: ["React Native", "Go", "Redis", "Google Maps API", "WebSocket"],
    completedDate: "Tháng 2, 2024",
    teamSize: "14 người",
    client: "Grab Vietnam",
    status: "Hoàn thành",
    duration: "9 tháng",
  },
  {
    id: 7,
    title: "Hệ thống CRM Bất động sản",
    description:
      "Phát triển hệ thống quản lý khách hàng và dự án bất động sản với tính năng phân tích dữ liệu và báo cáo chi tiết.",
    image: "/real-project-crm.jpg",
    category: "Hệ thống quản lý",
    technologies: ["Angular", "C#", "SQL Server", "Power BI"],
    completedDate: "Tháng 1, 2024",
    teamSize: "6 người",
    client: "Novaland",
    status: "Hoàn thành",
    duration: "7 tháng",
  },
  {
    id: 8,
    title: "App Đặt lịch Y tế",
    description: "Ứng dụng đặt lịch khám bệnh trực tuyến với tính năng tư vấn từ xa và quản lý hồ sơ bệnh án điện tử.",
    image: "/real-project-healthcare.jpg",
    category: "Y tế",
    technologies: ["Flutter", "Firebase", "Node.js", "MongoDB"],
    completedDate: "Tháng 11, 2023",
    teamSize: "9 người",
    client: "Bệnh viện Chợ Rẫy",
    status: "Hoàn thành",
    duration: "8 tháng",
  },
  {
    id: 9,
    title: "Nền tảng Fintech P2P",
    description: "Xây dựng nền tảng cho vay ngang hàng với AI credit scoring và hệ thống quản lý rủi ro tự động.",
    image: "/real-project-fintech.jpg",
    category: "Fintech",
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "Kubernetes"],
    completedDate: "Tháng 3, 2024",
    teamSize: "16 người",
    client: "Tima",
    status: "Đang triển khai",
    duration: "11 tháng",
  },
]

const categories = [
  "Tất cả",
  "Hệ thống quản lý",
  "Ứng dụng di động",
  "Giáo dục",
  "IoT & AI",
  "Thương mại điện tử",
  "Logistics",
  "Y tế",
  "Fintech",
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = selectedCategory === "Tất cả" || project.category === selectedCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Dự án <span className="text-primary">thực tế</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed mb-8">
            Khám phá portfolio đầy đủ các dự án công nghệ mà 3DO TECH đã thực hiện thành công
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm dự án..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3.5 text-base h-12"
                />
              </div>
            </div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm hover:bg-primary/80 hover:text-white"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {
                  filteredProjects.length > 0 && (
                    <div className="mb-8">
                    <p className="text-muted-foreground">
                      Hiển thị {filteredProjects.length} dự án
                      {selectedCategory !== "Tất cả" && ` trong danh mục "${selectedCategory}"`}
                    </p>
                  </div>
              )
          }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={project.status === "Hoàn thành" ? "default" : "outline"}
                      className={
                        project.status === "Hoàn thành" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
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
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-primary block">{project.client}</span>
                      <span className="text-xs text-muted-foreground">Thời gian: {project.duration}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-3 hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-0 flex flex-col justify-center align-center">
            <span className="text-center">
                <svg data-v-ad307406="" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="m-auto lucide animal-icon flip lucide-animal-icon lucide-animal animal-icon flip"><path d="M13 16a3 3 0 0 1 2.24 5"></path><path d="M18 12h.01"></path><path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path><path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path></svg>
            </span>
              <p className="text-muted-foreground text-lg">Không tìm thấy dự án nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
