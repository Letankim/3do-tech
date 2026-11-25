"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Download, FileText, FileSpreadsheet, ShieldCheck, ArrowRight, Copy, Check, Laptop, Apple,
  RefreshCw, Sliders, Eye, BookOpen, Zap, CheckCheck, Building2, FileCheck, Layers, Info, Phone, Undo2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { InstallGuideDialog, daAnHuongDan, kindOfFile, type InstallKind } from "@/components/install-guide-dialog";

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
  const [huongDan, setHuongDan] = useState<InstallKind | null>(null);
  // Goc nho "quay lai ban 1.0": tep ban 1.0 van nam o public/downloads/addin-office (thong-tin.json cua tools/phat_hanh.py). Chi doc phien ban + dung luong.
  const [ban1, setBan1] = useState<{ version: string; sizes: Record<string, number> } | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/downloads/addin-office/thong-tin.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d?.version) return;
        const sizes: Record<string, number> = {};
        for (const [k, v] of Object.entries(d.files ?? {})) sizes[k] = (v as { size: number }).size;
        setBan1({ version: String(d.version), sizes });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const dungLuong = (tep: string) => {
    const n = ban1?.sizes[tep];
    return n ? ` · ${Math.round(n / 1024)} KB` : "";
  };

  // Bam tai: viec tai van chay nhu thuong; ~0,5 giay sau hien hop thoai huong dan dung loai tep (tru dien thoai, hoac khi nguoi dung chon "Khong hien lai").
  const khiBamTai = (tep: string) => {
    if (clientOS === "mobile" || daAnHuongDan()) return;
    window.setTimeout(() => setHuongDan(kindOfFile(tep)), 500);
  };

  useIsomorphicLayoutEffect(() => {
    const os = detectClientOS();
    setClientOS(os);
  }, []);
  const isDesktopOS = clientOS === "windows" || clientOS === "mac";

  // Nguoi dung MOI tai ban 2.0 (add-in + engine OfficePartyEngine) tu public/downloads/addin-office-2.0; thong-tin.json o do ghi
  // phien ban, ngay, dung luong, SHA-256 (do tools/gd7/dong_goi.py cua repo engine tao). Thu muc public/downloads/addin-office (ban 1.0,
  // do tools/phat_hanh.py cua repo add-in ghi) GIU NGUYEN: dong nghiep dang dung 1.0 van cap nhat tu version.json tren GitHub Releases.
  const downloadBase = "/downloads/addin-office-2.0";
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
          version: String(data.version).replace(/\s*\(.*\)\s*$/, ""),
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
    if (!size) return null;
    return size >= 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(1).replace(".", ",")} MB` : `${Math.round(size / 1024)} KB`;
  };
  const sha256Of = (fileName: string) => release?.assets[fileName]?.sha256 ?? null;

  const winPack = {
    title: "Bộ cài Windows (một tệp .exe)",
    fileName: "CaiDat_ChuanHoaTheThuc.zip",
    description: "Gồm Word, Excel và chương trình nền OfficePartyEngine. Giải nén rồi nhấp đúp CaiDat_ChuanHoaTheThuc.exe, bấm Yes.",
    guide: "#huong-dan-windows",
    primary: clientOS !== "mac",
  };
  const winBackup = {
    title: "Bộ cài dự phòng Windows",
    fileName: "Bo_Cai_Dat_Windows.zip",
    description: "Dùng khi tệp .exe hoặc add-in bị Kaspersky / phần mềm diệt virus chặn. Giải nén rồi nhấp đúp CaiDat_Windows.bat.",
    guide: "#huong-dan-windows",
    primary: false,
  };
  const macPack = {
    title: "Bộ cài macOS (.pkg)",
    fileName: "CaiDat_ChuanHoaTheThuc_Mac.pkg",
    description: "Một tệp cho Mac Intel và Apple Silicon. Nhấp đúp, bấm Tiếp tục → Cài đặt.",
    guide: "#huong-dan-mac",
    primary: clientOS === "mac",
  };
  const macBackup = {
    title: "Bộ cài dự phòng macOS (.zip)",
    fileName: "Bo_Cai_Dat_Mac.zip",
    description: "Cài bằng Terminal (CaiDat_Mac.sh), không cần bước \"Vẫn mở\".",
    guide: "#huong-dan-mac",
    primary: false,
  };
  const winGroup = { id: "windows", title: "Windows", subtitle: "Windows 10 / 11", icon: WindowsLogo, files: [winPack, winBackup] };
  const macGroup = { id: "mac", title: "macOS", subtitle: "Máy Mac (Intel & Apple)", icon: Apple, files: [macPack, macBackup] };
  const downloadGroups = clientOS === "mac" ? [macGroup, winGroup] : [winGroup, macGroup];

  const codeCls = "rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground";
  const winGuide = {
    id: "windows",
    title: "Windows",
    icon: WindowsLogo,
    steps: [
      { title: "Tải & giải nén", body: <>Tải <code className={codeCls}>CaiDat_ChuanHoaTheThuc.zip</code>, chuột phải vào file chọn <strong>Extract All… (Giải nén tất cả)</strong>.</> },
      { title: "Đóng Word & Excel", body: <>Lưu tài liệu đang mở và thoát hẳn Word, Excel.</> },
      {
        title: "Chạy tệp cài đặt",
        body: (
          <>
            Nhấp đúp <code className={codeCls}>CaiDat_ChuanHoaTheThuc.exe</code>, bấm <strong>Yes</strong>. Hiện &quot;CÀI ĐẶT THÀNH CÔNG&quot; là xong.
            <span className="mt-2 block rounded-lg border border-signal/25 bg-signal/10 p-2.5 text-xs text-foreground">
              Nếu hiện khung xanh SmartScreen: bấm <em>More info (Thông tin khác)</em> → <em>Run anyway (Vẫn chạy)</em>.
            </span>
            <span className="mt-2 block text-xs text-muted-foreground">
              Tệp .exe hoặc add-in bị Kaspersky / phần mềm diệt virus chặn? Tải <code className={codeCls}>Bo_Cai_Dat_Windows.zip</code>, giải nén rồi nhấp
              đúp <code className={codeCls}>CaiDat_Windows.bat</code>.
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
      { title: "Thoát Word & Excel", body: <>Lưu bài, thoát hẳn Word và Excel bằng <strong>Cmd+Q</strong>.</> },
      {
        title: "Cách 1: cài bằng .pkg",
        body: (
          <>
            Tải <code className={codeCls}>CaiDat_ChuanHoaTheThuc_Mac.pkg</code>, nhấp đúp trong Finder, bấm <strong>Tiếp tục</strong> → <strong>Cài đặt</strong>.
            <span className="mt-2 block rounded-lg border border-signal/25 bg-signal/10 p-2.5 text-xs text-foreground">
              Máy báo &quot;Apple không thể xác minh…&quot;: bấm <em>Xong</em> (không bấm Chuyển vào Thùng rác), vào <strong>Cài đặt hệ thống → Quyền riêng tư &amp; Bảo mật</strong>,
              kéo xuống cuối, bấm <em>Vẫn mở</em>, nhập mật khẩu máy rồi bấm <em>Mở</em>.
            </span>
          </>
        ),
      },
      {
        title: "Cách 2: bộ cài dự phòng (.zip)",
        body: (
          <>
            Tải <code className={codeCls}>Bo_Cai_Dat_Mac.zip</code>, nhấp đúp để giải nén. Mở <strong>Terminal</strong>, kéo tệp <code className={codeCls}>CaiDat_Mac.sh</code> vào cửa sổ rồi nhấn <strong>Enter</strong>.
            <span className="mt-2 block rounded-lg bg-muted p-2.5 font-mono text-xs text-foreground">bash CaiDat_Mac.sh</span>
          </>
        ),
      },
      { title: "Hoàn tất", body: <>Mở lại Word: thẻ Home có nhóm <strong>THỂ THỨC VĂN BẢN</strong>. macOS có thể báo &quot;Đã thêm mục nền&quot; OfficePartyEngine: đó là dịch vụ của add-in, đừng tắt.</> },
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

  const wordFeatures = [
    {
      icon: Building2,
      title: "Ba nhóm người dùng",
      text: <>Chọn một lần nhóm <strong>Cán bộ</strong> (Đảng, Đoàn, Chính quyền, Công an, Quân đội), <strong>Giáo viên</strong> hoặc <strong>Văn phòng</strong>: thanh công cụ chỉ hiện đúng những nút bạn cần. Giáo viên có chuẩn hóa đề và mẫu riêng, văn phòng có đơn từ và hợp đồng.</>,
    },
    { icon: Building2, title: "Tự động nhận diện khối", text: <>Nhận biết văn bản thuộc <strong>khối Đảng</strong> (HD 05-HD/VPTW), <strong>Đoàn TNCS</strong> (HD 29), <strong>Chính quyền</strong> (NĐ 30/2020/NĐ-CP), Công an, Quân đội.</> },
    { icon: Sliders, title: "Chuẩn hóa thể thức 1 click", text: "Sửa lề trang, font Times New Roman, Quốc hiệu, Tiêu ngữ, số ký hiệu và chữ ký đúng quy định của từng khối. Tên cơ quan dài tự hạ cỡ chữ hoặc nới cột, không để tiêu ngữ rớt dòng." },
    { icon: FileCheck, title: "Báo cáo soát lỗi trước khi ký", text: "Liệt kê điểm cần lưu ý (lệch khối, thiếu thông tin, số ký hiệu chưa khớp) để cán bộ kiểm tra trước khi trình ký." },
    { icon: BookOpen, title: "Kho văn bản mẫu quy chuẩn", text: "Tạo nhanh Nghị quyết, Quyết định, Kế hoạch, Báo cáo, Thông báo, Tờ trình, Công văn, Giấy mời, Biên bản." },
    { icon: FileText, title: "Chuẩn hóa đề kiểm tra", text: "Dành cho giáo viên: chuẩn hóa đề kiểm tra trắc nghiệm chỉ một cú click, kèm bộ mẫu văn bản riêng cho giáo viên." },
    { icon: Layers, title: "Đơn từ, hợp đồng, khen thưởng", text: "Tạo nhanh đơn xin nghỉ phép, giấy ủy quyền, bản cam kết, hợp đồng lao động, hợp đồng thuê nhà, tờ trình và báo cáo thành tích thi đua - khen thưởng." },
    { icon: CheckCheck, title: "Chính tả, văn phong, sửa chữ", text: "Soát lỗi chính tả tiếng Việt và văn phong hành chính, gợi ý ngay trong văn bản. Đổi mã TCVN3 sang Unicode, xóa dấu cách thừa, đặt dấu, đọc số tiền thành chữ." },
    { icon: RefreshCw, title: "Xuất / Nhập cấu hình, cập nhật ngay trên Ribbon", text: "Chuyển toàn bộ thiết lập đơn vị sang máy khác bằng một file. Nút [Cập nhật] nằm cạnh nút Chuẩn hóa." },
  ];
  const excelFeatures = [
    { icon: Sliders, title: "Chống mất chữ và che ô", text: "Tính lại chiều cao dòng, độ rộng cột, kể cả ô gộp (merge cells), để không ô nào bị khuất chữ." },
    { icon: Layers, title: "Tự chọn chiều khổ A4", text: "Phân tích độ rộng bảng để chọn in dọc (Portrait) hoặc in ngang (Landscape) tối ưu." },
    { icon: RefreshCw, title: "Lặp lại tiêu đề bảng", text: "Tự lặp hàng tiêu đề ở các trang in tiếp theo khi bảng dài nhiều trang." },
    { icon: CheckCheck, title: "Gom chữ ký về chung trang", text: "Co giãn hợp lý để phần người ký nằm cùng trang, không bị đẩy trơ trọi sang trang riêng." },
    { icon: FileSpreadsheet, title: "Đánh số trang tự động", text: "Chèn footer \"Trang x/y\" chuẩn chỉnh cho tài liệu in ấn." },
    { icon: Zap, title: "Hoàn tác nhanh", text: <>Nhấn <strong>Ctrl+Z</strong> hoặc nút [Hoàn tác] trên Ribbon để quay về trạng thái ban đầu.</> },
    { icon: Layers, title: "Sắp xếp đúng thứ tự tiếng Việt", text: "Sắp theo tên (đúng thứ tự tiếng Việt), ngày hoặc số. Dòng tiêu đề, dòng tổng cộng và khối chữ ký đứng yên, STT tự đánh lại." },
    { icon: Sliders, title: "Chuẩn hóa họ tên và ngày", text: "Viết hoa đúng họ tên (NGUYỄN văn a thành Nguyễn Văn A), đưa ngày gõ tay về dạng dd/mm/yyyy, tách hoặc gộp cột Họ đệm và Tên." },
    { icon: Eye, title: "Tô dòng trùng", text: "Tô màu cam các dòng trùng để bạn tự kiểm tra, không xóa bất cứ dòng nào của bạn." },
  ];
  const faqs = [
    {
      q: "Word/Excel hiện cảnh báo đỏ \"SECURITY RISK: Microsoft has blocked macros from running\"?",
      a: <>Đây là chính sách bảo vệ file tải từ mạng của Windows (thường gặp khi cài bằng bộ cài dự phòng). Cách mở khóa: chuột phải vào tệp <code className={codeCls}>.zip</code> vừa tải → <strong>Properties</strong> → ở góc dưới thẻ General, tích ô <strong>Unblock (Bỏ chặn)</strong> → <strong>OK</strong>, rồi giải nén và cài lại.</>,
    },
    {
      q: "Máy báo virus hoặc chặn tệp cài đặt, có phải mã độc không?",
      a: (
        <>
          Không phải mã độc. Bộ công cụ xử lý văn bản ngay trên máy bạn và không gửi nội dung văn bản đi đâu. Vì bộ cài còn mới và chưa có chữ ký số (chứng nhận trả phí của Microsoft),
          nên đôi khi Windows báo nhầm. Bản này đã được <strong>Kaspersky</strong> và <strong>Microsoft</strong> kiểm tra, cả hai đều không phát hiện mối đe dọa (24/11/2026).
          <span className="mt-4 grid gap-4 sm:grid-cols-2">
            <figure className="m-0 sm:col-span-2 sm:max-w-lg">
              <a href="/images/add-in-office/kiem-tra-kaspersky.png" target="_blank" rel="noopener" className="block">
                <img
                  src="/images/add-in-office/kiem-tra-kaspersky.png"
                  alt="Kết quả quét của Kaspersky: không có tên mối đe dọa, 0 phát hiện"
                  loading="lazy"
                  className="w-full rounded-lg border border-border bg-background"
                />
              </a>
              <figcaption className="mt-1.5 text-xs text-muted-foreground">Kaspersky: 0 phát hiện. Bấm vào ảnh để xem lớn.</figcaption>
            </figure>
          </span>
          <span className="mt-4 block">
            Nếu Windows vẫn chặn, bạn làm như sau: mở <strong>Windows Security → Virus &amp; threat protection → Protection history</strong>, bấm vào mục vừa bị chặn,
            chọn <strong>Actions → Allow on device</strong> (hoặc <em>Restore</em>), rồi chạy lại bộ cài. Chỉ làm vậy với tệp tải từ trang này.
          </span>
          <span className="mt-2 block">
            Chưa rõ cách làm? Hỏi <strong>Bé Đô</strong> ở góc màn hình, hoặc gọi Mr. Cường để được chỉ từng bước.
          </span>
        </>
      ),
    },
    {
      q: "Tôi có phải trả phí hay mua mã bản quyền không?",
      a: "Bộ công cụ được phát hành và chia sẻ miễn phí 100% nhằm hỗ trợ cán bộ, công chức, viên chức và người làm văn phòng nâng cao năng suất soạn thảo. Khi có kết nối mạng, phần mềm tự động ghi nhận máy hợp lệ.",
    },
    {
      q: "Cần hỗ trợ kỹ thuật cài đặt thì liên hệ ai?",
      a: (
        <>
          Bạn liên hệ trực tiếp đội ngũ kỹ thuật:
          <span className="mt-2 block">
            • <strong>Mr. Cường</strong> (hỗ trợ kỹ thuật và Add-in): <a href="tel:0774889191" className="font-semibold text-primary hover:underline">0774.88.9191</a> (có Zalo)
          </span>
          <span className="block">
            • <strong>Mr. Kim</strong> (tư vấn giải pháp công nghệ): <a href="tel:0865341745" className="font-semibold text-primary hover:underline">0865.341.745</a> (có Zalo)
          </span>
        </>
      ),
    },
  ];

  const fileWin = "CaiDat_ChuanHoaTheThuc.zip";
  const fileMac = "CaiDat_ChuanHoaTheThuc_Mac.pkg";
  const primaryFile = clientOS === "mac" ? fileMac : fileWin;
  const otherFile = clientOS === "mac" ? fileWin : fileMac;
  const btnPrimary =
    "inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-primary px-6 py-2.5 whitespace-nowrap text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90";
  const btnGhost =
    "inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 whitespace-nowrap text-base font-semibold transition-colors hover:border-primary/50";

  return (
    <main className="min-h-screen bg-background">
      <StickyHeader />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-24">
          <div>
            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> Miễn phí 100%
              </span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">
                {release ? `Phiên bản ${release.version}${release.date ? `, ${release.date}` : ""}` : "Phiên bản mới nhất"}
              </span>
            </div>

            <h1 className="display mt-6">
              Chuẩn hóa thể thức văn bản Word <span className="text-primary">và trang in Excel</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Soạn văn bản đúng chuẩn chỉ với một cú click. Thể thức văn bản hành chính theo <strong className="text-foreground">Nghị định 30/2020/NĐ-CP</strong> và{" "}
              <strong className="text-foreground">Hướng dẫn 05-HD/VPTW</strong>, cho khối <strong className="text-foreground">Đảng, Đoàn, Chính quyền, Công an, Quân đội</strong>. Có thêm đề kiểm tra cho <strong className="text-foreground">giáo viên</strong>,
              đơn từ và hợp đồng cho <strong className="text-foreground">nhân viên văn phòng</strong>, kiểm tra chính tả, và căn trang in Excel chuẩn A4.
            </p>

            {/* Nut tai theo he dieu hanh. An (van giu cho) cho den khi nhan dang xong de khong nhay giao dien. */}
            <div className={`mt-9 ${clientOS === null ? "invisible" : ""}`}>
              {isDesktopOS ? (
                <>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={latestDownload(primaryFile)} download onClick={() => khiBamTai(primaryFile)} className={btnPrimary}>
                      {clientOS === "mac" ? <Apple className="h-6 w-6" aria-hidden /> : <Laptop className="h-6 w-6" aria-hidden />}
                      <span className="flex flex-col items-start text-left leading-tight">
                        <span>{clientOS === "mac" ? "Tải bản cho máy Mac" : "Tải bản cho Windows"}</span>
                        <span className="text-xs font-normal opacity-80">{primaryFile}{fileSizeOf(primaryFile) ? ` · ${fileSizeOf(primaryFile)}` : ""}</span>
                      </span>
                      <Download className="h-5 w-5" aria-hidden />
                    </a>
                    <a href="#huong-dan" className={btnGhost}>
                      <BookOpen className="h-5 w-5" aria-hidden /> Hướng dẫn cài đặt
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {clientOS === "mac" ? "Bạn dùng máy Windows?" : "Bạn dùng máy Mac?"}{" "}
                    <a href={latestDownload(otherFile)} download onClick={() => khiBamTai(otherFile)} className="font-semibold text-primary underline underline-offset-4">
                      {clientOS === "mac" ? "Tải bản Windows" : "Tải bản macOS"}
                    </a>
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex max-w-xl items-start gap-2.5 rounded-xl border border-signal/30 bg-signal/10 px-4 py-3 text-sm">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    <span>
                      Add-in chỉ cài được trên <strong>máy tính Windows hoặc Mac</strong> có Microsoft Word/Excel. Đang xem trên điện thoại hoặc máy tính bảng thì hãy mở trang này trên máy tính để tải về.
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={latestDownload(fileWin)} download onClick={() => khiBamTai(fileWin)} className={btnPrimary}>
                      <Laptop className="h-5 w-5" aria-hidden /> Tải bản Windows (.zip)
                    </a>
                    <a href={latestDownload(fileMac)} download onClick={() => khiBamTai(fileMac)} className={btnGhost}>
                      <Apple className="h-5 w-5" aria-hidden /> Tải bản macOS (.pkg)
                    </a>
                  </div>
                </div>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                <a href="#ban-1-0" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <Undo2 className="h-4 w-4" aria-hidden />
                  <span className="underline-offset-4 hover:underline">Cần quay lại bản 1.0?</span>
                </a>
              </p>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Kèm mã SHA-256 để kiểm tra</li>
              <li className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" aria-hidden /> Office 2016 đến Microsoft 365</li>
              <li className="inline-flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary" aria-hidden /> Cập nhật ngay trên Ribbon</li>
            </ul>
          </div>

          {/* Trang A4 voi kich thuoc le: minh hoa dung viec add-in lam */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/70 p-5 sm:p-8">
            <A4Diagram />
          </div>
        </div>
      </section>

      {/* ===== Tai ve ===== */}
      <section id="tai-ve" className="section-y scroll-mt-16 border-y border-border bg-card">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Tải về</span>
            <h2 className="h2 mt-4">Chọn đúng bộ cho máy của bạn</h2>
            <p className="lead mt-4">Tải trực tiếp từ máy chủ 3DO TECH, kèm phiên bản, dung lượng và mã SHA-256 từng tệp.</p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {downloadGroups.map((group) => (
              <Reveal
                key={group.id}
                className={`overflow-hidden rounded-2xl border bg-background ${group.id === clientOS ? "border-primary/60 ring-1 ring-primary/20" : "border-border"}`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center gap-4 border-b border-border bg-muted/50 px-6 py-5 md:w-52 md:shrink-0 md:flex-col md:items-start md:justify-start md:gap-3 md:border-b-0 md:border-r md:py-7">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                      <group.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-bold">{group.title}</p>
                      <p className="text-xs text-muted-foreground">{group.subtitle}</p>
                      {group.id === clientOS && (
                        <span className="mt-2 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary-foreground">Máy của bạn</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 divide-y divide-border">
                    {group.files.map((file) => {
                      const sha = sha256Of(file.fileName);
                      return (
                        <div key={file.fileName} className="px-5 py-5 sm:px-7">
                          <div className="grid grid-cols-3 items-center gap-x-4 gap-y-3 md:grid-cols-[minmax(0,2.2fr)_1fr_0.8fr_1fr_auto]">
                            <div className="col-span-3 min-w-0 md:col-span-1">
                              <p className="font-semibold">{file.title}</p>
                              <p className="truncate font-mono text-xs text-muted-foreground">{file.fileName}</p>
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
                            <a
                              href={latestDownload(file.fileName)}
                              download
                              onClick={() => khiBamTai(file.fileName)}
                              className={`col-span-3 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition md:col-span-1 md:w-40 ${
                                file.primary ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-card hover:border-primary/50"
                              }`}
                            >
                              <Download className="h-4 w-4" aria-hidden /> Tải về
                            </a>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{file.description}</p>

                          <div className="mt-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-5">
                            {sha && (
                              <div className="flex min-w-0 items-center gap-1.5 font-mono">
                                <span className="shrink-0 font-sans text-muted-foreground">SHA-256:</span>
                                <span className="truncate text-foreground/80">{sha}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(sha, file.fileName)}
                                  aria-label="Sao chép SHA-256"
                                  className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                  {copiedKey === file.fileName ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            )}
                            {file.guide && (
                              <a href={file.guide} className="inline-flex shrink-0 items-center gap-1 font-medium text-primary hover:underline">
                                <BookOpen className="h-3.5 w-3.5" aria-hidden /> Hướng dẫn cài đặt
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Khung tai ban 1.0: luon hien, duoc nhay toi tu dong "Can quay lai ban 1.0?" o dau trang (#ban-1-0; :target lam khung noi len nhe). */}
          <div
            id="ban-1-0"
            className="mt-8 rounded-2xl border border-border bg-background p-5 text-sm leading-relaxed text-muted-foreground transition-shadow duration-500 target:border-primary/60 target:ring-2 target:ring-primary/30 sm:px-7"
          >
            <p className="flex items-center gap-1.5 font-semibold text-foreground">
              <Undo2 className="h-4 w-4 text-primary" aria-hidden /> Cần quay lại bản 1.0?
            </p>
            <div className="mt-1.5">
              <p>
                Bản 1.0{ban1 ? ` (${ban1.version})` : ""} vẫn được giữ lại cho ai muốn dùng lại. Bạn làm theo 3 bước:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Gỡ bản hiện tại trước.</strong> Windows: chạy lại <code className={codeCls}>CaiDat_ChuanHoaTheThuc.exe</code>, bấm <strong>No</strong>. Mac: mở Terminal, kéo tệp{" "}
                  <code className={codeCls}>GoCai_Mac.sh</code> (trong bộ <code className={codeCls}>Bo_Cai_Dat_Mac.zip</code>) vào rồi nhấn Enter.
                </li>
                <li>
                  <strong className="text-foreground">Tải bản 1.0:</strong>{" "}
                  <a href="/downloads/addin-office/Bo_Cai_Dat_AddIn_Windows.zip" download className="font-semibold text-primary underline underline-offset-4">
                    Windows (.zip{dungLuong("Bo_Cai_Dat_AddIn_Windows.zip")})
                  </a>
                  {" · "}
                  <a href="/downloads/addin-office/Bo_Cai_Dat_AddIn_Mac.zip" download className="font-semibold text-primary underline underline-offset-4">
                    macOS (.zip{dungLuong("Bo_Cai_Dat_AddIn_Mac.zip")})
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Cài đặt:</strong> Windows giải nén rồi nhấp đúp <code className={codeCls}>CaiDat_AddIn_Windows.bat</code>. Mac giải nén, mở Terminal, kéo{" "}
                  <code className={codeCls}>CaiDat_AddIn_Mac.sh</code> vào rồi nhấn Enter. Mở lại Word / Excel.
                </li>
              </ol>
            </div>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>Phát hành bởi <strong className="text-foreground">3Do-Hubs</strong>. Tương thích Office 2016, 2019, 2021, 2024 và Microsoft 365.</span>
          </p>
        </div>
      </section>

      {/* ===== Tinh nang ===== */}
      <section id="tinh-nang" className="section-y scroll-mt-16">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Tính năng</span>
            <h2 className="h2 mt-4">Hai bộ công cụ cho văn bản và bảng tính</h2>
            <p className="lead mt-4">Làm đúng quy chuẩn ngay từ đầu, bớt thời gian căn chỉnh thủ công trước khi trình ký.</p>
          </Reveal>

          <Tabs defaultValue="word" className="mt-10 w-full">
            <TabsList className="h-12 w-full max-w-sm rounded-xl bg-muted p-1">
              <TabsTrigger value="word" className="gap-2 rounded-lg text-sm font-semibold">
                <FileText className="h-4 w-4 text-primary" aria-hidden /> Word
              </TabsTrigger>
              <TabsTrigger value="excel" className="gap-2 rounded-lg text-sm font-semibold">
                <FileSpreadsheet className="h-4 w-4 text-success" aria-hidden /> Excel
              </TabsTrigger>
            </TabsList>

            {[
              { v: "word", items: wordFeatures },
              { v: "excel", items: excelFeatures },
            ].map((tab) => (
              <TabsContent key={tab.v} value={tab.v} className="mt-8">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                  {tab.items.map((f) => (
                    <div key={f.title} className="bg-card p-6 sm:p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                        <f.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold leading-snug">{f.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ===== Huong dan ===== */}
      <section id="huong-dan" className="section-y scroll-mt-16 border-y border-border bg-card">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Hướng dẫn</span>
            <h2 className="h2 mt-4">Cài một lần, dùng ngay trên Word và Excel</h2>
            <p className="lead mt-4">Làm theo các bước của đúng hệ điều hành. Cột của máy bạn được đặt lên đầu.</p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {guideColumns.map((col) => (
              <Reveal
                key={col.id}
                className={`scroll-mt-24 rounded-2xl border p-6 sm:p-7 ${col.id === clientOS ? "border-primary/60 bg-accent/40" : "border-border bg-background"}`}
              >
                <div id={`huong-dan-${col.id}`} className="flex items-center gap-3 scroll-mt-24">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                    <col.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold">{col.title}</h3>
                  {col.id === clientOS && (
                    <span className="ml-auto rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary-foreground">Máy của bạn</span>
                  )}
                </div>
                <ol className="mt-6 space-y-5">
                  {col.steps.map((step, i) => (
                    <li key={i} className="flex gap-3.5">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                          i === col.steps.length - 1 && col.id !== "update" ? "bg-success text-white" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                        <p className="mb-0.5 font-semibold text-foreground">{step.title}</p>
                        {step.body}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Hỏi đáp</span>
            <h2 className="h2 mt-4">Câu hỏi thường gặp</h2>
            <p className="lead mt-4">Giải đáp nhanh các thắc mắc khi cài đặt và sử dụng.</p>
            <a
              href="tel:0774889191"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="h-4 w-4" aria-hidden /> Gọi hỗ trợ 0774.88.9191
            </a>
          </Reveal>

          <Reveal delay={80}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-2xl border border-border bg-card px-6">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <InstallGuideDialog kind={huongDan} onClose={() => setHuongDan(null)} />
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
      <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="0.8" />
      <circle cx={pts.split(" ")[0].split(",")[0]} cy={pts.split(" ")[0].split(",")[1]} r="2" fill="var(--primary)" />
      <text x={lx} y={ly} fill="var(--primary)" fontSize="11.5" fontFamily="var(--font-be-vietnam), sans-serif" fontWeight="600">{text}</text>
    </g>
  );
  const dim = (x1: number, y1: number, x2: number, y2: number, label: string, lx: number, ly: number, d: number) => (
    <g className="fade" style={{ ["--d" as string]: `${d}ms` }} stroke="var(--muted-foreground)" strokeWidth="0.7">
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
      <text x={lx} y={ly} stroke="none" fill="var(--foreground)" fontSize="10.5" fontFamily="var(--font-be-vietnam), sans-serif">{label}</text>
    </g>
  );

  return (
    <figure className="mx-auto max-w-[30rem]" aria-label="Minh họa trang A4 được căn lề trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm">
      <svg viewBox="0 0 482 504" className="h-auto w-full text-foreground" role="img" aria-hidden>
        {/* trang giay */}
        <rect x={X} y={Y} width={W} height={H} fill="var(--card)" stroke="var(--foreground)" strokeOpacity="0.35" strokeWidth="1" className="draw" />
        {/* khung le */}
        <rect x={L} y={T} width={R - L} height={B - T} fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="4 3" className="fade" style={{ ["--d" as string]: "700ms" }} />

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
        <text x={X} y={Y + H + 26} fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-be-vietnam), sans-serif" className="fade" style={{ ["--d" as string]: "600ms" }}>
          A4 · 210 × 297 MM
        </text>
      </svg>
    </figure>
  );
}
