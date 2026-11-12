"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
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

// He dieu hanh cua nguoi xem, chi biet duoc o trinh duyet.
// null = chua nhan dang (luc render phia server va truoc khi hydrate xong).
type ClientOS = "windows" | "mac" | "mobile" | "other";

function detectClientOS(): ClientOS {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean };
  };
  const ua = nav.userAgent || "";
  const hintPlatform = nav.userAgentData?.platform || "";

  // Dien thoai / may tinh bang: khong cai duoc add-in Office.
  if (nav.userAgentData?.mobile) return "mobile";
  if (/Android|iOS/i.test(hintPlatform)) return "mobile";
  if (/Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua)) {
    return "mobile";
  }

  const platform = hintPlatform || nav.platform || "";
  if (/Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) {
    // iPad doi moi bao la "Macintosh"; may Mac that khong co man hinh cam ung da diem.
    return (nav.maxTouchPoints || 0) > 1 ? "mobile" : "mac";
  }
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
  return "other";
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 5.1 10.4 4v7.2H3zM11.4 3.9 21 2.5v8.7h-9.6zM3 12.2h7.4v7.2L3 18.3zM11.4 12.2H21v8.7l-9.6-1.4z" />
    </svg>
  );
}

// useLayoutEffect chay sau hydrate nhung truoc khi trinh duyet ve lai, nen khong nhay giao dien.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AddInOfficePage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [clientOS, setClientOS] = useState<ClientOS | null>(null);

  useIsomorphicLayoutEffect(() => {
    const os = detectClientOS();
    setClientOS(os);
  }, []);
  const isDesktopOS = clientOS === "windows" || clientOS === "mac";

  // File add-in luu ngay trong public/downloads/addin-office cua trang (khong phu thuoc GitHub khi tai).
  // thong-tin.json (phien ban, ngay, dung luong, SHA-256) do tools/phat_hanh.py cua repo add-in ghi moi lan phat hanh.
  const downloadBase = "/downloads/addin-office";
  const latestDownload = (fileName: string) => `${downloadBase}/${fileName}`;
  const [release, setRelease] = useState<{
    version: string;
    date: string;
    assets: Record<string, { size: number; sha256: string | null }>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${downloadBase}/thong-tin.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.version) return;
        const published = data.published ? new Date(data.published) : null;
        setRelease({
          version: data.version,
          date:
            published && !isNaN(published.getTime())
              ? published.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
              : "",
          assets: data.files ?? {},
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

  const winPack = {
    title: "Bộ Cài Đặt Trọn Gói Windows",
    fileName: "Bo_Cai_Dat_AddIn_Windows.zip",
    description: "Gồm cả Word & Excel. Giải nén rồi nhấp đúp CaiDat_AddIn_Windows.bat là xong.",
    guide: "#huong-dan-windows",
    primary: clientOS !== "mac",
  };
  const macPack = {
    title: "Bộ Cài Đặt Trọn Gói macOS",
    fileName: "Bo_Cai_Dat_AddIn_Mac.zip",
    description: "Dành cho Microsoft Office trên máy Mac. Kèm script CaiDat_AddIn_Mac.sh cài đặt tự động.",
    guide: "#huong-dan-mac",
    primary: clientOS === "mac",
  };
  const winGroup = { id: "windows", title: "Windows", subtitle: "Windows 10 / 11", icon: WindowsLogo, files: [winPack] };
  const macGroup = { id: "mac", title: "macOS", subtitle: "Máy Mac (Intel & Apple)", icon: Apple, files: [macPack] };
  const downloadGroups = [
    ...(clientOS === "mac" ? [macGroup, winGroup] : [winGroup, macGroup]),
    {
      id: "files",
      title: "Tệp riêng lẻ",
      subtitle: "Cho người tự cài thủ công",
      icon: Layers,
      files: [
        {
          title: "Add-in Word (ChuanHoa_VanBanDang)",
          fileName: "ChuanHoa_VanBanDang.dotm",
          description: "Tab THỂ THỨC VĂN BẢN trong Word: chuẩn hóa theo NĐ 30/2020 & HD 05 VPTW, tạo văn bản mẫu, rà soát lỗi.",
          guide: null,
          primary: false,
        },
        {
          title: "Add-in Excel (ChuanHoa_Excel)",
          fileName: "ChuanHoa_Excel.xlam",
          description: "Căn trang in A4: chống che ô mất chữ, lặp lại tiêu đề, gom chữ ký về chung trang, đánh số trang x/y.",
          guide: null,
          primary: false,
        },
      ],
    },
  ];

  const codeCls = "px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground";
  const winGuide = {
    id: "windows",
    title: "Windows",
    icon: WindowsLogo,
    steps: [
      { title: "Tải & giải nén", body: <>Tải <code className={codeCls}>Bo_Cai_Dat_AddIn_Windows.zip</code>, chuột phải vào file chọn <strong>Extract All… (Giải nén tất cả)</strong>.</> },
      { title: "Đóng Word & Excel", body: <>Lưu tài liệu đang mở và thoát hẳn Word, Excel.</> },
      {
        title: "Chạy tệp cài đặt",
        body: (
          <>
            Nhấp đúp <code className={codeCls}>CaiDat_AddIn_Windows.bat</code> trong thư mục vừa giải nén.
            <span className="block mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
              Nếu hiện khung xanh SmartScreen: bấm <em>More info (Thông tin khác)</em> → <em>Run anyway (Vẫn chạy)</em>.
            </span>
          </>
        ),
      },
      { title: "Hoàn tất", body: <>Mở Word thấy tab <strong>THỂ THỨC VĂN BẢN</strong>, Excel có <strong>Căn trang in A4</strong>. Dùng ngay, không cần kích hoạt.</> },
    ],
  };
  const macGuide = {
    id: "mac",
    title: "macOS",
    icon: Apple,
    steps: [
      { title: "Tải & giải nén", body: <>Tải <code className={codeCls}>Bo_Cai_Dat_AddIn_Mac.zip</code> và nhấp đúp để giải nén trong Finder.</> },
      {
        title: "Chạy script cài đặt",
        body: (
          <>
            Mở <strong>Terminal</strong>, kéo thả file <code className={codeCls}>CaiDat_AddIn_Mac.sh</code> vào cửa sổ rồi nhấn <strong>Enter</strong>.
            <span className="block mt-2 p-2.5 rounded-lg bg-muted font-mono text-xs text-foreground/80">bash CaiDat_AddIn_Mac.sh</span>
          </>
        ),
      },
      { title: "Cho phép macro", body: <>Mở Word / Excel → Preferences → Security → cho phép macro chạy khi được hỏi.</> },
    ],
  };
  const updateGuide = {
    id: "update",
    title: "Cập nhật bản mới",
    icon: RefreshCw,
    steps: [
      { title: "Bấm [Cập nhật]", body: <>Trên thanh Ribbon của Word hoặc Excel, bấm nút <strong>[Cập nhật]</strong>. Không cần tải lại bộ cài.</> },
      { title: "Đồng ý cập nhật", body: <>Nếu có bản mới, add-in hiện danh sách thay đổi. Chọn <strong>Yes (Có)</strong>.</> },
      { title: "Mở lại Word/Excel", body: <>Đóng hết Word/Excel để bản mới tự nạp. Thiết lập đơn vị cũ được giữ nguyên.</> },
    ],
  };
  const guideColumns = [...(clientOS === "mac" ? [macGuide, winGuide] : [winGuide, macGuide]), updateGuide];

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
              {release ? `Phiên bản ${release.version}${release.date ? ` • Phát hành ${release.date}` : ""}` : "Phiên bản mới nhất"}
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

          {/* Nut tai theo he dieu hanh: Mac -> ban macOS lam nut chinh, Windows -> ban Windows.
              Dien thoai / khong nhan ra: hien du 2 nut kem loi nhac chi cai tren may tinh.
              An (invisible, van giu cho) cho den khi nhan dang xong de khong nhay giao dien. */}
          <div className={`mb-14 ${clientOS === null ? "invisible" : "animate-in fade-in-50 duration-300"}`}>
            {isDesktopOS ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <a
                    href={latestDownload(clientOS === "mac" ? "Bo_Cai_Dat_AddIn_Mac.zip" : "Bo_Cai_Dat_AddIn_Windows.zip")}
                    download
                    className="w-full sm:w-auto"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-lg sm:text-xl font-bold px-10 py-5 sm:py-6 rounded-2xl shadow-xl shadow-primary/30 ring-4 ring-primary/15 hover:scale-105 transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
                    >
                      {clientOS === "mac" ? <Apple className="h-6 w-6" /> : <Laptop className="h-6 w-6" />}
                      <span className="flex flex-col items-start leading-tight text-left">
                        <span>{clientOS === "mac" ? "Tải Bản Cho Máy Mac" : "Tải Bản Cho Windows"}</span>
                        <span className="text-xs sm:text-sm font-medium opacity-85">
                          Đúng với máy của bạn • {clientOS === "mac" ? "Bo_Cai_Dat_AddIn_Mac.zip" : "Bo_Cai_Dat_AddIn_Windows.zip"}
                        </span>
                      </span>
                      <Download className="h-6 w-6 group-hover:translate-y-0.5 transition-transform" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                    </button>
                  </a>

                  <a href="#huong-dan" className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border/80 hover:border-primary/40 text-base sm:text-lg font-medium px-7 py-4 sm:py-5 rounded-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Hướng Dẫn Cài Đặt</span>
                    </button>
                  </a>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground">
                  {clientOS === "mac" ? "Bạn dùng máy Windows?" : "Bạn dùng máy Mac?"}{" "}
                  <a
                    href={latestDownload(clientOS === "mac" ? "Bo_Cai_Dat_AddIn_Windows.zip" : "Bo_Cai_Dat_AddIn_Mac.zip")}
                    download
                    className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {clientOS === "mac" ? "Tải bản Windows tại đây" : "Tải bản macOS tại đây"}
                  </a>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-start gap-2 max-w-2xl px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left text-sm sm:text-base text-foreground">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Add-in chỉ cài được trên <strong>máy tính Windows hoặc Mac</strong> có Microsoft Word/Excel.
                    Nếu bạn đang xem bằng điện thoại hoặc máy tính bảng, hãy mở trang này trên máy tính để tải về và cài đặt.
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <a href={latestDownload("Bo_Cai_Dat_AddIn_Windows.zip")} download className="w-full sm:w-auto">
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

                  <a href={latestDownload("Bo_Cai_Dat_AddIn_Mac.zip")} download className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 bg-background/80 hover:bg-primary/10 text-foreground border border-primary/30 hover:border-primary/60 text-base sm:text-lg font-semibold px-8 py-4 sm:py-5 rounded-xl shadow-xs transition-all duration-300 w-full sm:w-auto"
                    >
                      <Apple className="h-5 w-5 text-primary" />
                      <span>Tải Bản macOS (.zip)</span>
                    </button>
                  </a>

                  <a href="#huong-dan" className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border/80 hover:border-primary/40 text-base sm:text-lg font-medium px-7 py-4 sm:py-5 rounded-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Hướng Dẫn Cài Đặt</span>
                    </button>
                  </a>
                </div>

              </div>
            )}
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

      {/* Khu tai ve: chia theo he dieu hanh, moi dong la mot tep (phien ban, dung luong, ngay, SHA-256). */}
      <section id="tai-ve" className="py-20 lg:py-24 bg-muted/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Tải <span className="text-primary">Về</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Tải trực tiếp từ máy chủ 3DO TECH. Chọn đúng hệ điều hành của máy tính bạn đang dùng.
            </p>
          </div>

          <div className="space-y-8">
            {downloadGroups.map((group) => (
              <div
                key={group.id}
                className={`rounded-2xl border bg-card shadow-xs overflow-hidden ${
                  group.id === clientOS ? "border-primary/50 ring-1 ring-primary/25" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cot bieu tuong he dieu hanh */}
                  <div className="flex md:flex-col items-center md:justify-start gap-3 md:gap-2 px-6 py-5 md:py-8 md:w-44 shrink-0 border-b md:border-b-0 md:border-r bg-muted/30 md:text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <group.icon className="w-7 h-7 md:w-9 md:h-9" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{group.title}</p>
                      <p className="text-xs text-muted-foreground">{group.subtitle}</p>
                      {group.id === clientOS && (
                        <span className="inline-block mt-1.5 text-[11px] font-bold uppercase bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                          Máy của bạn
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cac dong tep */}
                  <div className="flex-1 divide-y">
                    {group.files.map((file) => {
                      const sha = sha256Of(file.fileName);
                      return (
                        <div key={file.fileName} className="px-5 sm:px-7 py-5">
                          <div className="grid grid-cols-3 md:grid-cols-[minmax(0,2.2fr)_1fr_0.8fr_1fr_auto] gap-x-4 gap-y-3 items-center">
                            <div className="col-span-3 md:col-span-1 min-w-0">
                              <p className="font-semibold text-primary text-base">{file.title}</p>
                              <p className="text-xs text-muted-foreground font-mono truncate">{file.fileName}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Phiên bản</p>
                              <p className="text-sm font-medium tabular-nums">{release?.version ?? "—"}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Dung lượng</p>
                              <p className="text-sm font-medium tabular-nums">{fileSizeOf(file.fileName) ?? "—"}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Ngày</p>
                              <p className="text-sm font-medium tabular-nums">{release?.date || "—"}</p>
                            </div>
                            <a href={latestDownload(file.fileName)} download className="col-span-3 md:col-span-1">
                              <Button
                                size="lg"
                                variant={file.primary ? "default" : "outline"}
                                className="w-full md:w-40 gap-2 font-semibold"
                              >
                                <Download className="w-4 h-4" />
                                <span>Tải về</span>
                              </Button>
                            </a>
                          </div>

                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{file.description}</p>

                          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs">
                            {sha && (
                              <div className="flex items-center gap-1.5 min-w-0 font-mono">
                                <span className="font-sans text-muted-foreground shrink-0">SHA-256:</span>
                                <span className="truncate text-foreground/80">{sha}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(sha, file.fileName)}
                                  title="Sao chép SHA-256"
                                  className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                                >
                                  {copiedKey === file.fileName ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            )}
                            {file.guide && (
                              <a
                                href={file.guide}
                                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium hover:underline shrink-0"
                              >
                                <BookOpen className="h-3.5 w-3.5" />
                                Hướng dẫn cài đặt
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-primary shrink-0" />
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

      {/* Huong dan cai dat: cac cot dat canh nhau, cot cua he dieu hanh dang dung dung dau */}
      <section id="huong-dan" className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Hướng Dẫn <span className="text-primary">Cài Đặt</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Chỉ cần làm 1 lần, bộ công cụ sẽ nằm sẵn trên thanh công cụ của Word &amp; Excel.
            </p>
          </div>

          <div className="rounded-2xl border bg-card shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b bg-muted/40">
              <h3 className="font-semibold text-lg">Thông Tin Cài Đặt</h3>
            </div>
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
              {guideColumns.map((col) => (
                <div
                  key={col.id}
                  id={`huong-dan-${col.id}`}
                  className={`p-6 sm:p-7 scroll-mt-24 ${col.id === clientOS ? "bg-primary/[0.04]" : ""}`}
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <col.icon className="w-9 h-9" />
                    </div>
                    <h4 className="font-bold text-lg">{col.title}</h4>
                    {col.id === clientOS && (
                      <span className="mt-2 text-[11px] font-bold uppercase bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                        Máy của bạn
                      </span>
                    )}
                  </div>
                  <ol className="space-y-4">
                    {col.steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0 ${
                            i === col.steps.length - 1 && col.id !== "update"
                              ? "bg-emerald-500 text-white"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                          <p className="font-semibold text-foreground mb-0.5">{step.title}</p>
                          {step.body}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
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
