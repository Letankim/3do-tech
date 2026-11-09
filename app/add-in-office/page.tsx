"use client";

import React, { useEffect, useState } from "react";
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  Laptop, 
  Apple, 
  RefreshCw, 
  HelpCircle, 
  Sliders, 
  Eye, 
  BookOpen, 
  Zap, 
  CheckCheck, 
  Building2, 
  FileCheck, 
  Layers, 
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

export default function AddInOfficePage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Luon lay ban moi nhat tu GitHub Releases: phat hanh ban moi khong can sua trang nay.
  const releaseRepo = "CuongBC195/add-in-office";
  const latestDownload = (fileName: string) =>
    `https://github.com/${releaseRepo}/releases/latest/download/${fileName}`;
  const [release, setRelease] = useState<{
    version: string;
    date: string;
    assets: Record<string, { size: number; sha256: string | null }>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${releaseRepo}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.tag_name) return;
        const assets: Record<string, { size: number; sha256: string | null }> = {};
        for (const a of data.assets ?? []) {
          const digest: string | undefined = a.digest;
          assets[a.name] = {
            size: a.size,
            sha256: digest?.startsWith("sha256:") ? digest.slice(7) : null,
          };
        }
        setRelease({
          version: data.tag_name,
          date: new Date(data.published_at).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          assets,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const fileSizeOf = (fileName: string) => {
    const size = release?.assets[fileName]?.size;
    return size ? `${Math.round(size / 1024)} KB` : null;
  };
  const sha256Of = (fileName: string) => release?.assets[fileName]?.sha256 ?? null;

  const downloadFiles = [
    {
      id: "win-pack",
      title: "Bộ Cài Đặt Trọn Gói Windows",
      badge: "Khuyên Dùng",
      icon: Laptop,
      fileName: "Bo_Cai_Dat_AddIn_Windows.zip",
      fileSize: fileSizeOf("Bo_Cai_Dat_AddIn_Windows.zip"),
      description: "Tích hợp cả Word & Excel. Tự động cài đặt 1-click qua file CaiDat_AddIn_Windows.bat trong 3 giây.",
      localUrl: latestDownload("Bo_Cai_Dat_AddIn_Windows.zip"),
      sha256: null,
      highlight: true
    },
    {
      id: "mac-pack",
      title: "Bộ Cài Đặt Trọn Gói macOS",
      badge: "macOS",
      icon: Apple,
      fileName: "Bo_Cai_Dat_AddIn_Mac.zip",
      fileSize: fileSizeOf("Bo_Cai_Dat_AddIn_Mac.zip"),
      description: "Dành riêng cho Microsoft Office trên macOS. Kèm script CaiDat_AddIn_Mac.sh cài đặt thuận tiện.",
      localUrl: latestDownload("Bo_Cai_Dat_AddIn_Mac.zip"),
      sha256: null,
      highlight: false
    },
    {
      id: "word-addin",
      title: "Add-in Word (ChuanHoa_VanBanDang)",
      badge: "Word Only",
      icon: FileText,
      fileName: "ChuanHoa_VanBanDang.dotm",
      fileSize: fileSizeOf("ChuanHoa_VanBanDang.dotm"),
      description: "Thêm tab THỂ THỨC VĂN BẢN vào Word: chuẩn hóa Nghị định 30/2020 & HD 05 VPTW, tạo văn bản mẫu, rà soát lỗi.",
      localUrl: latestDownload("ChuanHoa_VanBanDang.dotm"),
      sha256: sha256Of("ChuanHoa_VanBanDang.dotm"),
      highlight: false
    },
    {
      id: "excel-addin",
      title: "Add-in Excel (ChuanHoa_Excel)",
      badge: "Excel Only",
      icon: FileSpreadsheet,
      fileName: "ChuanHoa_Excel.xlam",
      fileSize: fileSizeOf("ChuanHoa_Excel.xlam"),
      description: "Thêm công cụ Căn trang in A4: chống che ô mất chữ, lặp lại tiêu đề, gom chữ ký về chung trang, đánh số trang x/y.",
      localUrl: latestDownload("ChuanHoa_Excel.xlam"),
      sha256: sha256Of("ChuanHoa_Excel.xlam"),
      highlight: false
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <main className="min-h-screen bg-background font-sans antialiased selection:bg-primary/20">
      {/* Tái sử dụng Sticky Header đồng bộ với trang chính */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/50">
        {/* Animated background glows đồng bộ với trang chính */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              {release ? `Phiên bản ${release.version} • Phát hành ${release.date}` : "Phiên bản mới nhất"}
            </span>
            <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              Miễn phí 100%
            </span>
          </div>

          {/* Heading đồng bộ style trang chính */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight">
            Bộ Add-in Chuẩn Hóa <br />
            <span className="text-primary">Thể Thức Văn Bản & Trang In Excel</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-balance max-w-4xl mx-auto mb-10 leading-relaxed">
            Giải pháp tự động hóa thể thức văn bản hành chính theo{" "}
            <strong className="text-foreground">Nghị định 30/2020/NĐ-CP</strong> và{" "}
            <strong className="text-foreground">Hướng dẫn 05-HD/VPTW</strong> (Khối Đảng, Chính quyền, Công an, Quân đội) 
            và căn chỉnh trang in Excel chuẩn A4 hoàn hảo chỉ với 1 cú click chuột.
          </p>

          {/* Action Buttons: Đã tinh chỉnh Hover thanh lịch, không bị xanh lá đột ngột */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href={latestDownload("Bo_Cai_Dat_AddIn_Windows.zip")}>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg font-semibold px-8 py-4 sm:py-5 rounded-xl shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
              >
                <Laptop className="h-5 w-5" />
                <span>Tải Bản Windows (.zip)</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
              </button>
            </a>

            <a href={latestDownload("Bo_Cai_Dat_AddIn_Mac.zip")}>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-background/80 hover:bg-primary/10 text-foreground border border-primary/30 hover:border-primary/60 text-base sm:text-lg font-semibold px-8 py-4 sm:py-5 rounded-xl shadow-xs transition-all duration-300 w-full sm:w-auto"
              >
                <Apple className="h-5 w-5 text-primary" />
                <span>Tải Bản macOS (.zip)</span>
              </button>
            </a>

            <a href="#huong-dan">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border/80 hover:border-primary/40 text-base sm:text-lg font-medium px-7 py-4 sm:py-5 rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <BookOpen className="h-5 w-5" />
                <span>Hướng Dẫn Cài Đặt</span>
              </button>
            </a>
          </div>

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left pt-8 border-t border-border/60 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm border shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">1 Cú Click</p>
                <p className="text-muted-foreground text-xs">Chuẩn hóa toàn bộ</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm border shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Đảng & Chính Quyền</p>
                <p className="text-muted-foreground text-xs">Tự động nhận diện</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm border shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Cập Nhật Tự Động</p>
                <p className="text-muted-foreground text-xs">Ngay trên thanh Ribbon</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm border shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Mã SHA-256</p>
                <p className="text-muted-foreground text-xs">An toàn & tin cậy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Hub Section (100% Tải Nội Bộ, Không Link GitHub) */}
      <section id="tai-ve" className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Trung Tâm <span className="text-primary">Tải Về Nội Bộ</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Tải trực tiếp tốc độ cao từ máy chủ 3DO TECH. Toàn bộ file đã được kiểm định an toàn và sẵn sàng sử dụng.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {downloadFiles.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={item.id}
                  className={`group relative p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-xl ${
                    item.highlight 
                      ? "border-primary/50 ring-1 ring-primary/30 bg-card" 
                      : "border-border hover:border-primary/30 bg-card"
                  }`}
                >
                  {item.highlight && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-xs uppercase">
                      Bản Phổ Biến Nhất
                    </div>
                  )}

                  <div>
                    <div className="flex items-center mb-5">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mr-4 text-primary shrink-0">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-mono">
                          <span>{item.fileName}</span>
                          {item.fileSize && (
                            <>
                              <span>•</span>
                              <span className="text-primary font-semibold">{item.fileSize}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {item.sha256 && (
                      <div className="mb-6 p-3 rounded-lg bg-muted/60 border border-border text-xs flex items-center justify-between gap-2 font-mono">
                        <div className="truncate">
                          <span className="text-muted-foreground font-sans mr-1">SHA-256:</span>
                          <span className="text-foreground/90">{item.sha256}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                          onClick={() => handleCopy(item.sha256!, item.id)}
                          title="Sao chép SHA-256"
                        >
                          {copiedKey === item.id ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <a href={item.localUrl} className="block w-full">
                      <Button 
                        size="lg"
                        className="w-full gap-2 text-base font-semibold shadow-md group relative overflow-hidden" 
                        variant={item.highlight ? "default" : "outline"}
                      >
                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        <span>Tải Về Trực Tiếp</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                      </Button>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span>Phát hành bởi <strong>VPĐU xã Thạnh Phú</strong> • Tương thích Office 2016, 2019, 2021, 2024 & Microsoft 365.</span>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section id="tinh-nang" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Tính Năng <span className="text-primary">Đột Phá</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Hai bộ công cụ chuyên biệt tối ưu toàn diện quy trình xử lý văn bản và bảng tính.
            </p>
          </div>

          <Tabs defaultValue="word" className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 w-full max-w-md h-12 p-1 bg-muted rounded-xl">
                <TabsTrigger value="word" className="gap-2 font-semibold text-sm rounded-lg">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>Microsoft Word</span>
                </TabsTrigger>
                <TabsTrigger value="excel" className="gap-2 font-semibold text-sm rounded-lg">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>Microsoft Excel</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Word */}
            <TabsContent value="word" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Tự Động Nhận Diện Khối</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động nhận biết văn bản thuộc <strong>Khối Đảng</strong> (HD 05-HD/VPTW) hay <strong>Khối Chính quyền</strong> (NĐ 30/2020/NĐ-CP), Công an, Quân đội.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Chuẩn Hóa Thể Thức 1-Click</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động sửa lề trang (trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm), font Times New Roman, Quốc hiệu, Tiêu ngữ, số ký hiệu và chữ ký.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Xử Lý Tên Cơ Quan Dài</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Linh hoạt hạ cỡ chữ hoặc nới lề trái thông minh đối với tên đơn vị dài, ngăn chặn triệt để tình trạng tiêu ngữ bị rớt dòng sai chuẩn.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-4">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Báo Cáo Soát Lỗi Trước Khi Ký</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hiển thị báo cáo chi tiết các điểm cần lưu ý (lệch khối, thiếu thông tin, số ký hiệu chưa khớp) để cán bộ kiểm tra trước khi trình ký.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Kho Văn Bản Mẫu Quy Chuẩn</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tạo nhanh văn bản mẫu chuẩn: Nghị quyết, Quyết định, Kế hoạch, Báo cáo, Thông báo, Tờ trình, Công văn, Giấy mời, Biên bản.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-500 mb-4">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Cập Nhật Trực Tiếp Ribbon</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nút [Cập nhật] trên thanh Ribbon tự động kiểm tra bản mới và cập nhật tức thì mà không cần phải cài đặt lại.
                  </p>
                </Card>
              </div>
            </TabsContent>

            {/* Tab Excel */}
            <TabsContent value="excel" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Chống Mất Chữ & Che Ô</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động tính toán chiều cao dòng và chiều rộng cột, chống triệt để tình trạng ô bị khuất chữ kể cả các ô gộp (merge cells).
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-500 mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Tự Động Chọn Chiều Khổ A4</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Phân tích chiều rộng bảng để tự động chọn in dọc (Portrait) hoặc in ngang (Landscape) một cách tối ưu nhất.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Lặp Lại Tiêu Đề Bảng</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động lặp lại hàng tiêu đề trên các trang in tiếp theo khi bảng biểu dài nhiều trang.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-4">
                    <CheckCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Gom Chữ Ký Về Chung Trang</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động co giãn hợp lý để đưa phần người ký về chung trang văn bản, không để chữ ký bị đẩy trơ trọi sang trang riêng.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 mb-4">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Đánh Số Trang Tự Động</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tự động chèn footer đánh số trang định dạng &quot;Trang x/y&quot; chuẩn chỉnh phục vụ in ấn tài liệu.
                  </p>
                </Card>

                <Card className="p-6 border-border hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-500 mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Hỗ Trợ Hoàn Tác Nhanh</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chỉ cần nhấn <strong>Ctrl+Z</strong> hoặc nút [Hoàn tác] trên Ribbon để khôi phục ngay trạng thái ban đầu của bảng tính.
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Step by Step Installation Guide */}
      <section id="huong-dan" className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Hướng Dẫn <span className="text-primary">Cài Đặt Đơn Giản</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Chỉ cần thực hiện 1 lần duy nhất, bộ công cụ sẽ tích hợp vĩnh viễn vào thanh công cụ của Word & Excel.
            </p>
          </div>

          <Tabs defaultValue="windows" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-3 w-full max-w-lg h-12 p-1 bg-muted rounded-xl">
                <TabsTrigger value="windows" className="gap-2 text-sm font-semibold rounded-lg">
                  <Laptop className="w-4 h-4" />
                  <span>Windows</span>
                </TabsTrigger>
                <TabsTrigger value="macos" className="gap-2 text-sm font-semibold rounded-lg">
                  <Apple className="w-4 h-4" />
                  <span>macOS</span>
                </TabsTrigger>
                <TabsTrigger value="update" className="gap-2 text-sm font-semibold rounded-lg">
                  <RefreshCw className="w-4 h-4" />
                  <span>Cập Nhật Mới</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Windows Installation */}
            <TabsContent value="windows" className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Tải & Giải Nén Tệp Cài Đặt</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tải file <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Bo_Cai_Dat_AddIn_Windows.zip</code> về máy. 
                      Nhấp chuột phải vào file chọn <strong>Extract All... (Giải nén tất cả)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Đóng Toàn Bộ Word & Excel</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lưu lại tài liệu đang mở và thoát hẳn các cửa sổ Microsoft Word, Microsoft Excel đang chạy trên máy tính.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Chạy Tệp Cài Đặt Tự Động</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Mở thư mục vừa giải nén, nhấp đúp vào tệp <code className="px-1.5 py-0.5 rounded bg-primary/10 font-mono text-xs font-bold text-primary">CaiDat_AddIn_Windows.bat</code>.
                    </p>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
                      <strong>Lưu ý:</strong> Nếu Windows SmartScreen hiện thông báo bảo vệ màu xanh, bạn bấm <em>&quot;More info&quot; (Thông tin khác)</em> rồi chọn <em>&quot;Run anyway&quot; (Vẫn chạy)</em>.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Hoàn Tất & Khởi Động Sử Dụng</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Màn hình báo cài đặt thành công! Mở Word sẽ thấy tab <strong>THỂ THỨC VĂN BẢN</strong> và mở Excel sẽ có công cụ <strong>Căn trang in A4</strong>. Sử dụng ngay không cần kích hoạt.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* macOS Installation */}
            <TabsContent value="macos" className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Tải & Giải Nén Bản Cho Mac</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tải <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Bo_Cai_Dat_AddIn_Mac.zip</code> và giải nén trong Finder.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Chạy Script Cài Đặt Terminal</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Mở ứng dụng <strong>Terminal</strong>, kéo thả file <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">CaiDat_AddIn_Mac.sh</code> vào cửa sổ Terminal và nhấn <strong>Enter</strong>.
                    </p>
                    <div className="p-3 rounded-lg bg-muted font-mono text-xs text-foreground/80">
                      bash CaiDat_AddIn_Mac.sh
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-card border shadow-xs">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Cấp Quyền Cho Macro Trong Word/Excel</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Mở Word / Excel &gt; Preferences &gt; Security &gt; chọn cho phép Macro hoạt động khi được yêu cầu.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Update Guide */}
            <TabsContent value="update" className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="p-8 rounded-xl bg-card border shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">Cập Nhật Phiên Bản Mới Trực Tiếp Trên Ribbon</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Bạn không cần phải tải lại hoặc chạy lại bộ cài mỗi khi có phiên bản mới. Add-in đã tích hợp sẵn tính năng tự kiểm tra phiên bản:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Trên thanh Ribbon của Word hoặc Excel, bấm vào nút <strong>[Cập nhật]</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Nếu có bản cập nhật mới, hệ thống hiển thị thông báo thay đổi. Bạn chọn <strong>Yes (Có)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Đóng toàn bộ cửa sổ Word/Excel để phiên bản mới tự động nạp. Toàn bộ thiết lập đơn vị trước đó được giữ nguyên!</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Câu Hỏi <span className="text-primary">Thường Gặp</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Giải đáp nhanh các thắc mắc phổ biến trong quá trình cài đặt và sử dụng.
            </p>
          </div>

          <div className="space-y-5">
            <Card className="p-6 border-border hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold mb-2.5 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                <span>Word/Excel hiện cảnh báo đỏ &quot;SECURITY RISK: Microsoft has blocked macros from running&quot;?</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
                Đây là chính sách bảo vệ file tải từ mạng của Windows. Cách mở khóa: Chuột phải vào file <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">ChuanHoa_VanBanDang.dotm</code> hoặc <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">ChuanHoa_Excel.xlam</code> &gt; chọn <strong>Properties</strong> &gt; ở góc dưới thẻ General, tích chọn ô <strong>Unblock (Bỏ chặn)</strong> &gt; bấm <strong>OK</strong>.
              </p>
            </Card>

            <Card className="p-6 border-border hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold mb-2.5 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                <span>Tôi có phải trả phí hay mua mã bản quyền không?</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
                Bộ công cụ được phát hành và chia sẻ miễn phí 100% nhằm hỗ trợ cán bộ, công chức, viên chức và người làm văn phòng nâng cao năng suất soạn thảo. Khi có kết nối mạng, phần mềm tự động ghi nhận máy hợp lệ.
              </p>
            </Card>

            <Card className="p-6 border-border hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold mb-2.5 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                <span>Cần hỗ trợ kỹ thuật cài đặt thì liên hệ ai?</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
                Bạn có thể liên hệ trực tiếp đội ngũ kỹ thuật của chúng tôi:
                <br />• <strong>Mr. Cường (Hỗ trợ kỹ thuật & Add-in)</strong>: <a href="tel:0774889191" className="text-primary font-semibold hover:underline">0774.88.9191</a> (Zalo: 0774.88.9191)
                <br />• <strong>Mr. Kim (Tư vấn giải pháp công nghệ)</strong>: <a href="tel:0865341745" className="text-primary font-semibold hover:underline">0865.341.745</a> (Zalo: 0865.341.745)
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tái sử dụng Footer đồng bộ với trang chính */}
      <Footer />
    </main>
  );
}
