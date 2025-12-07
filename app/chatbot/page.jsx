"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ShieldCheck,
  Database,
  LayoutGrid,
  ArrowRight,
  Menu,
  X,
  Bot,
  FileText,
  Lock,
  Server,
  ChevronDown,
  ChevronUp,
  Building2,
  Users2,
  BrainCircuit,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTryNow = () => {
    window.location.href = "tel:0774889191";
  };

  const features = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Trung tâm Tri thức Tập trung",
      description:
        "Tự động tổng hợp dữ liệu từ Google Drive, Notion, Confluence và PDF nội bộ vào một nguồn duy nhất.",
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: "Tra cứu Ngữ nghĩa Chính xác",
      description:
        "Nhân viên không cần nhớ từ khóa. AI hiểu ngữ cảnh câu hỏi để trích xuất câu trả lời chính xác từ tài liệu.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Bảo mật Dữ liệu Cấp Doanh nghiệp",
      description:
        "Tuân thủ tiêu chuẩn ISO/IEC 27001. Dữ liệu được mã hóa đầu cuối và phân quyền truy cập theo cấp bậc.",
    },
    {
      icon: <Server className="w-6 h-6 text-blue-600" />,
      title: "Triển khai On-Premise",
      description:
        "Tùy chọn cài đặt trên máy chủ riêng của doanh nghiệp (Private Cloud) để đảm bảo quyền riêng tư tuyệt đối.",
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-blue-600" />,
      title: "Hỗ trợ Đào tạo & Onboarding",
      description:
        "Giảm 80% thời gian đào tạo nhân viên mới nhờ trợ lý ảo giải đáp mọi quy trình nghiệp vụ 24/7.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6 text-blue-600" />,
      title: "Tích hợp Workplace",
      description:
        "Sử dụng ngay trên Microsoft Teams, Slack, Zalo Work hoặc nhúng trực tiếp vào Portal nội bộ.",
    },
  ];

  const solutions = [
    {
      role: "Phòng Nhân sự (HR)",
      desc: "Tự động hóa trả lời về chính sách lương, bảo hiểm, nghỉ phép.",
      icon: <Users2 className="w-5 h-5" />,
    },
    {
      role: "Phòng Kỹ thuật (IT)",
      desc: "Hỗ trợ troubleshot sự cố, hướng dẫn cài đặt phần mềm tự động.",
      icon: <Server className="w-5 h-5" />,
    },
    {
      role: "Phòng Kinh doanh (Sales)",
      desc: "Tra cứu nhanh thông tin sản phẩm, báo giá và tài liệu đấu thầu.",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "Liên hệ",
      period: "",
      desc: "Dành cho nhóm nhỏ trải nghiệm",
      features: ["Tìm kiếm tài liệu", "Tìm kiếm cơ bản", "Hỗ trợ qua Email"],
      isPopular: false,
      btnText: "Đăng ký ngay",
    },
    {
      name: "Business",
      price: "Liên hệ",
      period: "",
      desc: "Giải pháp chuẩn cho SMEs",
      features: [
        "Không giới hạn tài liệu",
        "50 User truy cập",
        "Phân quyền dữ liệu",
        "API Integration",
        "Support 24/7",
      ],
      isPopular: true,
      btnText: "Dùng thử miễn phí",
    },
    {
      name: "Enterprise",
      price: "Liên hệ",
      period: "",
      desc: "Dành cho tập đoàn lớn",
      features: [
        "Triển khai Private Cloud",
        "SSO Login",
        "Audit Logs",
        "SLA Cam kết 99.9%",
        "Quản lý account riêng",
      ],
      isPopular: false,
      btnText: "Liên hệ tư vấn",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur border-slate-200 py-3 shadow-sm"
            : "bg-white border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              3Do<span className="text-blue-700">Tech</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#solutions"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Giải pháp
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#security"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Bảo mật
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Chi phí
            </a>
            <button
              onClick={handleTryNow}
              className="px-5 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded hover:bg-blue-800 transition-all shadow-sm"
            >
              Truy cập Dashboard
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 shadow-lg flex flex-col gap-4">
            <a
              href="#solutions"
              className="text-slate-700 font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Giải pháp
            </a>
            <a
              href="#features"
              className="text-slate-700 font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tính năng
            </a>
            <button
              onClick={handleTryNow}
              className="w-full py-3 bg-blue-700 text-white font-bold rounded"
            >
              Truy cập Dashboard
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Corporate Style */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 relative overflow-hidden">
        {/* Abstract Geometric Background instead of Blobs */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-50 transform skew-x-12 translate-x-20"></div>
          <div className="absolute left-0 bottom-0 w-full h-1/2 bg-slate-100 transform -skew-y-6 translate-y-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-6">
                Giải pháp doanh nghiệp 4.0
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Quản trị tri thức & <br />
                <span className="text-blue-700">Tư vấn nội bộ thông minh</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Biến tài liệu rải rác của doanh nghiệp thành một trợ lý ảo am
                hiểu mọi quy trình. Giúp nhân viên truy xuất thông tin chính xác
                trong tích tắc, giảm tải cho bộ phận Back-office.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleTryNow}
                  className="px-8 py-4 bg-blue-700 text-white font-bold rounded shadow-lg shadow-blue-900/10 hover:bg-blue-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Dùng thử liên hệ
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleTryNow}
                  className="px-8 py-4 bg-white text-slate-700 font-bold rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  Đặt lịch Demo 1:1
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-slate-900">50+</p>
                  <p className="text-sm text-slate-500">Doanh nghiệp lớn</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">2M+</p>
                  <p className="text-sm text-slate-500">Tài liệu đã số hóa</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">ISO</p>
                  <p className="text-sm text-slate-500">27001 Certified</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-w-md mx-auto animate-fade-in-up">
                <div className="bg-[#2563EB] p-4 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Trợ lý ảo Nội bộ
                      </h3>
                      <p className="text-xs text-blue-100 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>{" "}
                        Trực tuyến
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-white/80">
                    <LayoutGrid className="w-5 h-5 cursor-pointer hover:text-white" />
                  </div>
                </div>

                <div className="h-[400px] bg-[#F8FAFC] p-4 overflow-y-auto space-y-5">
                  <div className="text-center text-xs text-slate-400 my-4">
                    Hôm nay, 09:41
                  </div>

                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-slate-600">
                        NV
                      </span>
                    </div>
                    <div className="bg-[#2563EB] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                      <p className="text-sm text-white">
                        Quy trình thanh toán công tác phí tháng này có thay đổi
                        gì không?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-200">
                      <Bot className="w-4 h-4 text-blue-700" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 max-w-[90%]">
                      <p className="text-sm text-slate-700 mb-3">
                        Chào bạn, dựa trên văn bản{" "}
                        <strong>Số 12/QD-TCKT</strong> ban hành ngày 01/11/2025,
                        có 02 điểm mới về thanh toán công tác phí:
                      </p>
                      <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1 mb-3">
                        <li>
                          Định mức lưu trú tăng lên{" "}
                          <strong>800.000đ/ngày</strong> đối với các thành phố
                          trực thuộc TƯ.
                        </li>
                        <li>
                          Hóa đơn điện tử phải được upload lên hệ thống ERP
                          trước ngày 25 hàng tháng.
                        </li>
                      </ul>
                      <div className="bg-slate-50 p-2 rounded border border-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-100">
                        <FileText className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-medium text-blue-600 underline">
                          Xem chi tiết QD-12-TCKT.pdf
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-colors shadow-sm">
                      Tải mẫu đơn xin nghỉ phép
                    </span>
                    <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-colors shadow-sm">
                      Hướng dẫn VPN
                    </span>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-3 bg-white border-t border-slate-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nhập câu hỏi nội bộ..."
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      disabled
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded text-white hover:bg-blue-700">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-[10px] text-slate-400">
                      Powered by 3dotech Secure Core
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Giải quyết bài toán "Thông tin bị phân mảnh"
            </h2>
            <p className="text-slate-600 text-lg">
              Nhân viên mất trung bình 20% thời gian làm việc chỉ để tìm kiếm
              thông tin nội bộ. Chúng tôi giúp bạn lấy lại khoảng thời gian đó.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-100 p-8 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4 text-blue-700 shadow-sm">
                  {sol.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {sol.role}
                </h3>
                <p className="text-slate-600">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-20 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Tính năng cốt lõi
            </h2>
            <div className="w-20 h-1 bg-blue-600 mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-all">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section (Important for B2B) */}
      <section
        id="security"
        className="py-20 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/20 skew-x-12"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-900 border border-blue-700 rounded text-blue-300 text-xs font-bold mb-4">
                SECURITY FIRST
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bảo mật là ưu tiên hàng đầu
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Hệ thống được thiết kế với kiến trúc Zero Trust. Dữ liệu của
                doanh nghiệp bạn không bao giờ được chia sẻ hoặc dùng để huấn
                luyện mô hình chung.
              </p>
              <ul className="space-y-4">
                {[
                  "Mã hóa AES-256 bit cho dữ liệu lưu trữ",
                  "Tuân thủ GDPR và ISO 27001",
                  "Triển khai trên Private VPC (Virtual Private Cloud)",
                  "Audit Log chi tiết mọi truy cập",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                <Lock className="w-8 h-8 text-blue-500" />
                <div>
                  <h4 className="font-bold text-lg">Security Report</h4>
                  <p className="text-xs text-slate-400">Real-time monitoring</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Data Encryption</span>
                    <span className="text-green-400 font-mono">100%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 w-full h-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Access Control</span>
                    <span className="text-green-400 font-mono">Verified</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 w-full h-full"></div>
                  </div>
                </div>
                <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30 text-sm text-blue-200 mt-4">
                  Hệ thống tự động phát hiện và ngăn chặn các truy cập bất
                  thường từ IP lạ.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Chi phí đầu tư linh hoạt
            </h2>
            <p className="text-slate-600 mt-4">
              Không có chi phí ẩn. Tùy chỉnh theo quy mô nhân sự của bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col p-8 rounded-lg border ${
                  plan.isPopular
                    ? "border-blue-600 ring-1 ring-blue-600 shadow-xl bg-blue-50/10"
                    : "border-slate-200 bg-white hover:border-slate-300"
                } transition-all`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
                <button
                  onClick={handleTryNow}
                  className={`w-full py-2.5 mb-8 rounded font-semibold text-sm transition-colors ${
                    plan.isPopular
                      ? "bg-blue-700 text-white hover:bg-blue-800"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {plan.btnText}
                </button>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-blue-700" />
                <span className="text-xl font-bold text-slate-900">
                  3dotech
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Nền tảng quản trị tri thức và trợ lý ảo nội bộ hàng đầu Việt
                Nam. Giúp doanh nghiệp vận hành thông minh hơn.
              </p>
              <div className="mt-6 text-sm font-semibold text-slate-900">
                Hotline: 1900 1234
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">
                Sản phẩm
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">
                Doanh nghiệp
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Khách hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Tài liệu HDSD
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Yêu cầu Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700">
                    Liên hệ Sales
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2025 3dotech Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900">
                Điều khoản
              </a>
              <a href="#" className="hover:text-slate-900">
                Bảo mật
              </a>
              <a href="#" className="hover:text-slate-900">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
