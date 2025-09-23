"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-background border-t">
      {/* Newsletter section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Nhận tin tức công nghệ mới nhất</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Đăng ký để nhận thông tin về xu hướng công nghệ, tips phát triển và các ưu đãi đặc biệt từ 3DO TECH
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 text-base"
              />
              <Button className="group p-4">
                Đăng ký
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    <img onClick={()=> {
                      router.push("/");
                    }} src="/logo.png" alt="Logo footer" className="w-[60px] h-[60px] object-contain"/>
                  </span>
                </div>
                <span className="text-2xl font-bold">3DO TECH</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Đối tác tin cậy trong hành trình chuyển đổi số của doanh nghiệp. Chúng tôi mang đến những giải pháp công
                nghệ tiên tiến và dịch vụ chuyên nghiệp.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Dịch vụ</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/services/web-development"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Phát triển Website
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mobile-app"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Ứng dụng Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/system-integration"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Tích hợp hệ thống
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ai-solutions"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Giải pháp AI
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cloud-services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Dịch vụ Cloud
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cybersecurity"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Bảo mật mạng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Công ty</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
                    Đội ngũ
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div>Tầng 15, Tòa nhà ABC</div>
                    <div>123 Đường Nguyễn Huệ</div>
                    <div>Quận 1, TP. Hồ Chí Minh</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">+84 123 456 789</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">hello@3dotech.vn</span>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div>Thứ 2 - Thứ 6: 8:00 - 18:00</div>
                    <div>Thứ 7: 8:00 - 12:00</div>
                    <div>Chủ nhật: Nghỉ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">© 2025 3DO TECH. Tất cả quyền được bảo lưu.</div>

          <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:space-x-6 sm:space-y-0">
  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
    Chính sách bảo mật
  </Link>
  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
    Điều khoản sử dụng
  </Link>
  <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
    Chính sách Cookie
  </Link>
</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
