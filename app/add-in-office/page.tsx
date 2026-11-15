"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Download, FileText, FileSpreadsheet, CheckCircle2, ShieldCheck, Copy, Check, Laptop, Apple,
  RefreshCw, Sliders, Eye, BookOpen, Zap, CheckCheck, Building2, FileCheck, Layers, Info, Plus, ArrowDownRight,
} from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";

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

  const codeCls = "bg-ink-3 px-1.5 py-0.5 font-mono text-[12px] text-ink-text";
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
            <span className="mt-3 block border-l-2 border-brand bg-brand/10 px-3 py-2 text-xs text-ink-text">
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
            <span className="mt-3 block bg-ink-3 px-3 py-2 font-mono text-xs text-ink-text"><span className="text-brand">$ </span>bash CaiDat_AddIn_Mac.sh</span>
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

  const highlights = [
    { icon: CheckCircle2, title: "1 Cú Click", sub: "Chuẩn hóa toàn bộ" },
    { icon: Building2, title: "Đảng & Chính Quyền", sub: "Tự động nhận diện" },
    { icon: RefreshCw, title: "Cập Nhật Tự Động", sub: "Ngay trên thanh Ribbon" },
    { icon: ShieldCheck, title: "Mã SHA-256", sub: "An toàn & tin cậy" },
  ];
  const wordFeatures = [
    { icon: Building2, title: "Tự Động Nhận Diện Khối", text: <>Tự động nhận biết văn bản thuộc <strong>Khối Đảng</strong> (HD 05-HD/VPTW) hay <strong>Khối Chính quyền</strong> (NĐ 30/2020/NĐ-CP), Công an, Quân đội.</> },
    { icon: Sliders, title: "Chuẩn Hóa Thể Thức 1-Click", text: "Tự động sửa lề trang (trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm), font Times New Roman, Quốc hiệu, Tiêu ngữ, số ký hiệu và chữ ký." },
    { icon: Eye, title: "Xử Lý Tên Cơ Quan Dài", text: "Linh hoạt hạ cỡ chữ hoặc nới lề trái thông minh đối với tên đơn vị dài, ngăn chặn triệt để tình trạng tiêu ngữ bị rớt dòng sai chuẩn." },
    { icon: FileCheck, title: "Báo Cáo Soát Lỗi Trước Khi Ký", text: "Hiển thị báo cáo chi tiết các điểm cần lưu ý (lệch khối, thiếu thông tin, số ký hiệu chưa khớp) để cán bộ kiểm tra trước khi trình ký." },
    { icon: BookOpen, title: "Kho Văn Bản Mẫu Quy Chuẩn", text: "Tạo nhanh văn bản mẫu chuẩn: Nghị quyết, Quyết định, Kế hoạch, Báo cáo, Thông báo, Tờ trình, Công văn, Giấy mời, Biên bản." },
    { icon: RefreshCw, title: "Cập Nhật Trực Tiếp Ribbon", text: "Nút [Cập nhật] trên thanh Ribbon tự động kiểm tra bản mới và cập nhật tức thì mà không cần phải cài đặt lại." },
  ];
  const excelFeatures = [
    { icon: Sliders, title: "Chống Mất Chữ & Che Ô", text: "Tự động tính toán chiều cao dòng và chiều rộng cột, chống triệt để tình trạng ô bị khuất chữ kể cả các ô gộp (merge cells)." },
    { icon: Layers, title: "Tự Động Chọn Chiều Khổ A4", text: "Phân tích chiều rộng bảng để tự động chọn in dọc (Portrait) hoặc in ngang (Landscape) một cách tối ưu nhất." },
    { icon: RefreshCw, title: "Lặp Lại Tiêu Đề Bảng", text: "Tự động lặp lại hàng tiêu đề trên các trang in tiếp theo khi bảng biểu dài nhiều trang." },
    { icon: CheckCheck, title: "Gom Chữ Ký Về Chung Trang", text: "Tự động co giãn hợp lý để đưa phần người ký về chung trang văn bản, không để chữ ký bị đẩy trơ trọi sang trang riêng." },
    { icon: FileSpreadsheet, title: "Đánh Số Trang Tự Động", text: "Tự động chèn footer đánh số trang định dạng \"Trang x/y\" chuẩn chỉnh phục vụ in ấn tài liệu." },
    { icon: Zap, title: "Hỗ Trợ Hoàn Tác Nhanh", text: <>Chỉ cần nhấn <strong>Ctrl+Z</strong> hoặc nút [Hoàn tác] trên Ribbon để khôi phục ngay trạng thái ban đầu của bảng tính.</> },
  ];
  const faqCode = "bg-paper-2 px-1.5 py-0.5 font-mono text-[12px] text-foreground";
  const faqs = [
    {
      q: <>Word/Excel hiện cảnh báo đỏ &quot;SECURITY RISK: Microsoft has blocked macros from running&quot;?</>,
      a: <>Đây là chính sách bảo vệ file tải từ mạng của Windows. Cách mở khóa: Chuột phải vào file <code className={faqCode}>ChuanHoa_VanBanDang.dotm</code> hoặc <code className={faqCode}>ChuanHoa_Excel.xlam</code> &gt; chọn <strong>Properties</strong> &gt; ở góc dưới thẻ General, tích chọn ô <strong>Unblock (Bỏ chặn)</strong> &gt; bấm <strong>OK</strong>.</>,
    },
    {
      q: "Tôi có phải trả phí hay mua mã bản quyền không?",
      a: "Bộ công cụ được phát hành và chia sẻ miễn phí 100% nhằm hỗ trợ cán bộ, công chức, viên chức và người làm văn phòng nâng cao năng suất soạn thảo. Khi có kết nối mạng, phần mềm tự động ghi nhận máy hợp lệ.",
    },
    {
      q: "Cần hỗ trợ kỹ thuật cài đặt thì liên hệ ai?",
      a: (
        <>
          Bạn có thể liên hệ trực tiếp đội ngũ kỹ thuật của chúng tôi:
          <br />• <strong>Mr. Cường (Hỗ trợ kỹ thuật & Add-in)</strong>: <a href="tel:0774889191" className="link-u font-mono font-semibold text-foreground">0774.88.9191</a> (Zalo: 0774.88.9191)
          <br />• <strong>Mr. Kim (Tư vấn giải pháp công nghệ)</strong>: <a href="tel:0865341745" className="link-u font-mono font-semibold text-foreground">0865.341.745</a> (Zalo: 0865.341.745)
        </>
      ),
    },
  ];

  const [tab, setTab] = useState<"word" | "excel">("word");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const primaryFile = clientOS === "mac" ? "Bo_Cai_Dat_AddIn_Mac.zip" : "Bo_Cai_Dat_AddIn_Windows.zip";
  const otherFile = clientOS === "mac" ? "Bo_Cai_Dat_AddIn_Windows.zip" : "Bo_Cai_Dat_AddIn_Mac.zip";
  const features = tab === "word" ? wordFeatures : excelFeatures;

  return (
    <main className="min-h-screen bg-paper">
      <StickyHeader />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-ink text-ink-text">
        <div className="wrap relative grid gap-14 pb-16 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-36">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="tag flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
                <span className="text-brand">[ Add-in Office ]</span>
                <span className="tabular-nums">
                  {release ? `Phiên bản ${release.version}${release.date ? ` · Phát hành ${release.date}` : ""}` : "Phiên bản mới nhất"}
                </span>
                <span className="bg-brand px-1.5 py-0.5 text-ink">Miễn phí 100%</span>
              </p>
            </Reveal>

            <h1 className="mega mt-8 text-[clamp(2.5rem,5.3vw,5.25rem)]">
              <Reveal as="span" className="block">Bộ Add-in Chuẩn Hóa</Reveal>
              <Reveal as="span" delay={80} className="block text-brand">Thể Thức Văn Bản</Reveal>
              <Reveal as="span" delay={160} className="block">&amp; Trang In Excel</Reveal>
            </h1>

            <Reveal delay={220}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-text/75">
                Giải pháp tự động hóa thể thức văn bản hành chính theo <strong className="text-ink-text">Nghị định 30/2020/NĐ-CP</strong> và{" "}
                <strong className="text-ink-text">Hướng dẫn 05-HD/VPTW</strong> (Khối Đảng, Chính quyền, Công an, Quân đội) và căn chỉnh trang in Excel chuẩn A4 hoàn hảo chỉ với 1 cú click chuột.
              </p>
            </Reveal>

            {/* Nut tai theo he dieu hanh; an (van giu cho) cho den khi nhan dang xong de khong nhay giao dien */}
            <Reveal delay={280}>
              <div className={`mt-10 ${clientOS === null ? "invisible" : ""}`}>
                {isDesktopOS ? (
                  <>
                    <div className="flex flex-wrap gap-3">
                      <a href={latestDownload(primaryFile)} download className="btn btn-brand !h-auto min-h-[3.75rem] py-3 !text-base">
                        {clientOS === "mac" ? <Apple className="h-6 w-6" aria-hidden /> : <Laptop className="h-6 w-6" aria-hidden />}
                        <span className="flex flex-col items-start text-left leading-tight">
                          <span>{clientOS === "mac" ? "Tải Bản Cho Máy Mac" : "Tải Bản Cho Windows"}</span>
                          <span className="font-mono text-[11px] font-normal opacity-75">
                            Đúng với máy của bạn · {primaryFile}
                            {fileSizeOf(primaryFile) ? ` · ${fileSizeOf(primaryFile)}` : ""}
                          </span>
                        </span>
                        <Download className="h-5 w-5" aria-hidden />
                      </a>
                      <a href="#huong-dan" className="btn btn-ghost-dark !h-auto min-h-[3.75rem]">
                        <BookOpen className="h-5 w-5" aria-hidden /> Hướng Dẫn Cài Đặt
                      </a>
                    </div>
                    <p className="mt-5 text-sm text-ink-muted">
                      {clientOS === "mac" ? "Bạn dùng máy Windows?" : "Bạn dùng máy Mac?"}{" "}
                      <a href={latestDownload(otherFile)} download className="link-u font-semibold text-ink-text">
                        {clientOS === "mac" ? "Tải bản Windows tại đây" : "Tải bản macOS tại đây"} →
                      </a>
                    </p>
                  </>
                ) : (
                  <div className="space-y-5">
                    <p className="flex max-w-2xl items-start gap-3 border-l-2 border-brand bg-brand/10 px-4 py-3 text-[15px]">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      <span>
                        Add-in chỉ cài được trên <strong>máy tính Windows hoặc Mac</strong> có Microsoft Word/Excel. Nếu bạn đang xem bằng điện thoại hoặc máy tính bảng, hãy mở trang này trên máy tính để tải về và cài đặt.
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href={latestDownload("Bo_Cai_Dat_AddIn_Windows.zip")} download className="btn btn-brand">
                        <Laptop className="h-5 w-5" aria-hidden /> Tải Bản Windows (.zip)
                      </a>
                      <a href={latestDownload("Bo_Cai_Dat_AddIn_Mac.zip")} download className="btn btn-ghost-dark">
                        <Apple className="h-5 w-5" aria-hidden /> Tải Bản macOS (.zip)
                      </a>
                      <a href="#huong-dan" className="btn btn-ghost-dark">
                        <BookOpen className="h-5 w-5" aria-hidden /> Hướng Dẫn Cài Đặt
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Trang A4 voi kich thuoc le: minh hoa dung viec add-in lam */}
          <div className="lg:col-span-5">
            <A4Diagram />
          </div>
        </div>

        <div className="border-t border-ink-line">
          <ul className="wrap grid grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <li
                key={h.title}
                className={`flex items-center gap-4 py-6 ${i % 2 ? "border-l border-ink-line pl-5" : "pr-5"} ${i < 2 ? "border-b border-ink-line lg:border-b-0" : ""} lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-ink-line" : ""}`}
              >
                <h.icon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-semibold">{h.title}</p>
                  <p className="tag mt-0.5 text-ink-muted">{h.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= TAI VE ================= */}
      <section id="tai-ve" className="sec scroll-mt-16 bg-paper">
        <div className="wrap">
          <SectionHead index="01" label="Tải về" note={release ? `v${release.version}` : undefined} />
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <h2 className="title">
                Tải <span className="text-brand-deep">Về</span>
              </h2>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-6 lg:pt-3">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Tải trực tiếp từ máy chủ 3DO TECH. Chọn đúng hệ điều hành của máy tính bạn đang dùng.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 space-y-6">
            {downloadGroups.map((group, gi) => {
              const mine = group.id === clientOS;
              return (
                <Reveal key={group.id} delay={gi * 60} className={`marks bg-paper-3 ${mine ? "text-brand" : "text-foreground/30"}`}>
                  <div className={`border ${mine ? "border-brand" : "border-line"}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 text-foreground sm:px-7">
                      <div className="flex items-center gap-3">
                        <group.icon className="h-5 w-5" />
                        <span className="text-lg font-bold">{group.title}</span>
                        <span className="tag text-muted-foreground">{group.subtitle}</span>
                      </div>
                      {mine && <span className="tag bg-brand px-2 py-1 text-ink">Máy của bạn</span>}
                    </div>

                    <div className="divide-y divide-[color:var(--line)] text-foreground">
                      {group.files.map((file) => {
                        const sha = sha256Of(file.fileName);
                        return (
                          <div key={file.fileName} className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-12 lg:items-center">
                            <div className="lg:col-span-4">
                              <p className="text-lg font-semibold">{file.title}</p>
                              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{file.description}</p>
                              {file.guide && (
                                <a href={file.guide} className="link-u mt-2 inline-flex items-center gap-1.5 text-sm font-semibold">
                                  <BookOpen className="h-3.5 w-3.5" aria-hidden /> Hướng dẫn cài đặt
                                </a>
                              )}
                            </div>
                            <dl className="grid grid-cols-3 gap-x-6 gap-y-2 font-mono text-sm lg:col-span-5">
                              <div>
                                <dt className="tag text-muted-foreground">Phiên bản</dt>
                                <dd className="mt-1">{release?.version ?? "—"}</dd>
                              </div>
                              <div>
                                <dt className="tag text-muted-foreground">Dung lượng</dt>
                                <dd className="mt-1">{fileSizeOf(file.fileName) ?? "—"}</dd>
                              </div>
                              <div>
                                <dt className="tag text-muted-foreground">Ngày</dt>
                                <dd className="mt-1">{release?.date || "—"}</dd>
                              </div>
                            </dl>
                            <div className="lg:col-span-3 lg:text-right">
                              <a href={latestDownload(file.fileName)} download className={`btn w-full lg:w-auto ${file.primary ? "btn-brand" : "btn-ghost"}`}>
                                <Download className="h-4 w-4" aria-hidden /> Tải về
                              </a>
                            </div>
                            {sha && (
                              <div className="flex min-w-0 items-center gap-2 border-t border-dashed border-line pt-4 font-mono text-xs lg:col-span-12">
                                <span className="tag shrink-0 text-muted-foreground">SHA-256</span>
                                <span className="truncate text-foreground/70">{sha}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(sha, file.fileName)}
                                  aria-label="Sao chép SHA-256"
                                  className="tag ml-auto inline-flex shrink-0 items-center gap-1.5 border border-line px-2 py-1 transition-colors hover:bg-ink hover:text-ink-text"
                                >
                                  {copiedKey === file.fileName ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                  {copiedKey === file.fileName ? "Đã chép" : "Chép"}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" aria-hidden />
            <span>
              Phát hành bởi <strong className="text-foreground">VPĐU xã Thạnh Phú</strong> • Tương thích Office 2016, 2019, 2021, 2024 &amp; Microsoft 365.
            </span>
          </p>
        </div>
      </section>

      {/* ================= TINH NANG ================= */}
      <section id="tinh-nang" className="sec scroll-mt-16 border-t border-line bg-paper-2">
        <div className="wrap">
          <SectionHead index="02" label="Tính năng" note={`${wordFeatures.length + excelFeatures.length} tính năng`} />
          <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal className="max-w-2xl">
              <h2 className="title">
                Tính Năng <span className="text-brand-deep">Đột Phá</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Hai bộ công cụ chuyên biệt tối ưu toàn diện quy trình xử lý văn bản và bảng tính.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div role="tablist" aria-label="Chọn ứng dụng" className="inline-flex border border-[color:var(--line-strong)] p-1">
                {([
                  { id: "word", label: "Microsoft Word", icon: FileText },
                  { id: "excel", label: "Microsoft Excel", icon: FileSpreadsheet },
                ] as const).map((x) => (
                  <button
                    key={x.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === x.id}
                    onClick={() => setTab(x.id)}
                    className={`inline-flex h-11 items-center gap-2 whitespace-nowrap px-4 text-sm font-semibold transition-colors sm:px-5 ${tab === x.id ? "bg-ink text-ink-text" : "hover:bg-paper-3"}`}
                  >
                    <x.icon className="h-4 w-4" aria-hidden />
                    {x.label}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <ol key={tab} className="mt-12 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title} className="fade group border-b border-r border-line bg-paper-3 p-7 sm:p-8" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="tag text-muted-foreground">
                    {tab === "word" ? "W" : "X"}.{String(i + 1).padStart(2, "0")}
                  </span>
                  <f.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-brand-deep" aria-hidden />
                </div>
                <h3 className="mt-10 text-xl font-bold leading-snug tracking-tight">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= HUONG DAN ================= */}
      <section id="huong-dan" className="sec scroll-mt-16 bg-ink text-ink-text">
        <div className="wrap">
          <SectionHead dark index="03" label="Hướng dẫn" note="Chỉ cần làm 1 lần" />
          <Reveal className="mt-12 max-w-3xl">
            <h2 className="title">
              Hướng Dẫn <span className="text-brand">Cài Đặt</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Chỉ cần làm 1 lần, bộ công cụ sẽ nằm sẵn trên thanh công cụ của Word &amp; Excel.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px bg-ink-line lg:grid-cols-3">
            {guideColumns.map((col, ci) => {
              const mine = col.id === clientOS;
              return (
                <Reveal key={col.id} delay={ci * 80} className={`scroll-mt-24 p-7 sm:p-8 ${mine ? "bg-ink-3" : "bg-ink"}`}>
                  <div id={`huong-dan-${col.id}`} className="flex scroll-mt-24 items-center gap-3 border-b border-ink-line pb-5">
                    <col.icon className="h-6 w-6 text-brand" />
                    <h3 className="text-xl font-bold">{col.title}</h3>
                    {mine && <span className="tag ml-auto bg-brand px-2 py-1 text-ink">Máy của bạn</span>}
                  </div>
                  <ol className="relative mt-7 space-y-7 before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-px before:bg-ink-line">
                    {col.steps.map((step, i) => {
                      const last = i === col.steps.length - 1 && col.id !== "update";
                      return (
                        <li key={i} className="relative flex gap-4">
                          <span className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center font-mono text-xs font-semibold ${last ? "bg-ok text-ink" : "bg-brand text-ink"}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="pt-0.5 text-[15px] leading-relaxed text-ink-muted">
                            <p className="mb-1 font-semibold text-ink-text">{step.title}</p>
                            {step.body}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOI DAP ================= */}
      <section className="sec bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead index="04" label="Hỏi đáp" />
            <Reveal className="mt-10">
              <h2 className="title">
                Câu Hỏi <span className="text-brand-deep">Thường Gặp</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Giải đáp nhanh các thắc mắc phổ biến trong quá trình cài đặt và sử dụng.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-[color:var(--line-strong)]">
              {faqs.map((f, i) => {
                const on = openFaq === i;
                return (
                  <li key={i} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(on ? null : i)}
                        aria-expanded={on}
                        aria-controls={`faq-${i}`}
                        className="flex w-full items-start gap-5 py-6 text-left"
                      >
                        <span className="tag pt-1.5 text-brand-deep">Q.{String(i + 1).padStart(2, "0")}</span>
                        <span className="flex-1 text-lg font-semibold leading-snug sm:text-xl">{f.q}</span>
                        <Plus className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ${on ? "rotate-45" : ""}`} aria-hidden />
                      </button>
                    </h3>
                    <div id={`faq-${i}`} hidden={!on} className="pb-7 pl-[3.6rem] text-[15px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  </li>
                );
              })}
            </ul>
            <a href="tel:0774889191" className="btn btn-ink mt-10">
              Cần hỗ trợ? Gọi 0774.88.9191 <ArrowDownRight className="h-4 w-4 -rotate-90" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- Trang A4 voi kich thuoc le (ty le that 210 x 297 mm) ---------- */
function A4Diagram() {
  // Trang rong 300 => 1 mm = 300/210 px
  const X = 40, Y = 40, W = 300, H = 424, mm = 300 / 210;
  const L = X + 30 * mm, T = Y + 20 * mm, R = X + W - 15 * mm, B = Y + H - 20 * mm;
  const cx = (L + R) / 2;
  const bar = (x: number, y: number, w: number, h = 3, o = 1, d = 0, k?: string) => (
    <rect key={k ?? `${x}-${y}-${w}`} x={x} y={y} width={w} height={h} fill="currentColor" opacity={o} className="fade" style={{ ["--d" as string]: `${d}ms` }} />
  );
  const body: React.ReactNode[] = [];
  let y = 178;
  [5, 4, 6].forEach((n, p) => {
    for (let i = 0; i < n; i++) {
      const indent = i === 0 ? 14 : 0;
      const w = i === n - 1 ? (R - L) * 0.55 : R - L - indent;
      body.push(bar(L + indent, y, w, 2, 0.35, 900 + (p * 6 + i) * 30, `b-${p}-${i}`));
      y += 10.5;
    }
    y += 6;
  });
  const callout = (pts: string, lx: number, ly: number, text: string, d: number) => (
    <g className="fade" style={{ ["--d" as string]: `${d}ms` }}>
      <polyline points={pts} fill="none" stroke="var(--brand)" strokeWidth="0.8" />
      <circle cx={pts.split(" ")[0].split(",")[0]} cy={pts.split(" ")[0].split(",")[1]} r="2" fill="var(--brand)" />
      <text x={lx} y={ly} fill="var(--brand)" fontSize="11.5" fontFamily="var(--font-mono)" fontWeight="500">{text}</text>
    </g>
  );
  const dim = (x1: number, y1: number, x2: number, y2: number, label: string, lx: number, ly: number, d: number) => (
    <g className="fade" style={{ ["--d" as string]: `${d}ms` }} stroke="var(--ink-muted)" strokeWidth="0.7">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {x1 === x2 ? (
        <>
          <line x1={x1 - 3} y1={y1} x2={x1 + 3} y2={y1} />
          <line x1={x2 - 3} y1={y2} x2={x2 + 3} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 3} x2={x1} y2={y1 + 3} />
          <line x1={x2} y1={y2 - 3} x2={x2} y2={y2 + 3} />
        </>
      )}
      <text x={lx} y={ly} stroke="none" fill="var(--ink-text)" fontSize="10.5" fontFamily="var(--font-mono)">{label}</text>
    </g>
  );

  return (
    <figure className="mx-auto max-w-[30rem]" aria-label="Minh họa trang A4 được căn lề trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm">
      <svg viewBox="0 0 482 504" className="h-auto w-full text-ink-text" role="img" aria-hidden>
        {/* trang giay */}
        <rect x={X} y={Y} width={W} height={H} fill="var(--ink-2)" stroke="var(--ink-text)" strokeOpacity="0.5" strokeWidth="1" className="draw" />
        {/* khung le */}
        <rect x={L} y={T} width={R - L} height={B - T} fill="none" stroke="var(--brand)" strokeWidth="0.8" strokeDasharray="4 3" className="fade" style={{ ["--d" as string]: "700ms" }} />

        {/* tieu de: co quan (trai) va quoc hieu (phai) */}
        {bar(L + 22, T + 10, 74, 3, 0.8, 800)}
        {bar(L + 15, T + 18, 88, 3.5, 1, 820)}
        {bar(L + 51, T + 28, 16, 1.5, 0.7, 840)}
        {bar(R - 124, T + 10, 118, 3.5, 1, 860)}
        {bar(R - 113, T + 18, 96, 3, 0.85, 880)}
        {bar(R - 95, T + 24, 60, 0.8, 0.85, 900)}
        {/* so ky hieu, dia danh ngay thang */}
        {bar(L + 30, T + 40, 58, 2.5, 0.7, 920)}
        {bar(R - 110, T + 40, 96, 2.5, 0.5, 940)}
        {/* ten loai, trich yeu */}
        {bar(cx - 35, T + 68, 70, 5, 1, 960)}
        {bar(cx - 75, T + 79, 150, 3, 0.8, 980)}
        {bar(cx - 15, T + 87, 30, 1, 0.7, 1000)}
        {body}
        {/* noi nhan + chu ky */}
        {bar(L, B - 78, 40, 2.5, 0.8, 1500)}
        {bar(L + 4, B - 70, 55, 1.5, 0.45, 1520)}
        {bar(L + 4, B - 64, 48, 1.5, 0.45, 1540)}
        {bar(L + 4, B - 58, 52, 1.5, 0.45, 1560)}
        {bar(R - 105, B - 78, 70, 3, 1, 1520)}
        {bar(R - 100, B - 70, 60, 3, 0.8, 1540)}
        {bar(R - 106, B - 30, 72, 3.5, 1, 1600)}

        {/* kich thuoc le */}
        {dim(cx, Y, cx, T, "20–25 mm", cx + 6, Y + 18, 1700)}
        {dim(cx, B, cx, Y + H, "20–25 mm", cx + 6, B + 18, 1750)}
        {dim(X, Y + H / 2, L, Y + H / 2, "30–35", X + 2, Y + H / 2 - 7, 1800)}
        {dim(R, Y + H / 2 + 24, X + W, Y + H / 2 + 24, "15–20 mm", X + W + 8, Y + H / 2 + 28, 1850)}

        {/* chu thich */}
        {callout(`${R - 6},${T + 12} ${X + W + 14},${T + 12}`, X + W + 18, T + 15, "QUỐC HIỆU", 1900)}
        {callout(`${R - 6},${T + 20} ${X + W + 14},${T + 28}`, X + W + 18, T + 31, "TIÊU NGỮ", 1950)}
        {callout(`${L + 88},${T + 41} ${L + 100},${T + 54} ${X + W + 14},${T + 54}`, X + W + 18, T + 57, "SỐ, KÝ HIỆU", 2000)}
        {callout(`${R - 4},${y - 120} ${X + W + 14},${y - 120}`, X + W + 18, y - 117, "TIMES NEW ROMAN", 2050)}
        {callout(`${R - 34},${B - 29} ${X + W + 14},${B - 29}`, X + W + 18, B - 26, "CHỮ KÝ", 2100)}
        <text x={X} y={Y + H + 26} fill="var(--ink-muted)" fontSize="10" fontFamily="var(--font-mono)" className="fade" style={{ ["--d" as string]: "600ms" }}>
          A4 · 210 × 297 MM
        </text>
      </svg>
    </figure>
  );
}
