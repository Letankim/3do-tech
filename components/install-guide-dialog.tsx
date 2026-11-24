"use client";

// Hop thoai huong dan cai dat hien ra ngay sau khi nguoi dung bam tai add-in (viec tai van chay binh thuong, hop thoai chi di kem).
// Noi dung theo dung loai tep vua bam; "Xem huong dan day du" cuon toi cot huong dan (#huong-dan-windows / #huong-dan-mac) va lam no sang len.
import React, { useEffect, useRef, useState } from "react";
import { Apple, BookOpen, Download, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export type InstallKind = "winExe" | "winBat" | "macPkg" | "macZip";

const KHOA_AN = "addin-huong-dan-an";

export function kindOfFile(fileName: string): InstallKind {
  if (/\.pkg$/i.test(fileName)) return "macPkg";
  if (/Mac/i.test(fileName)) return "macZip";
  if (/Bo_Cai_Dat_Windows/i.test(fileName)) return "winBat";
  return "winExe";
}

export function daAnHuongDan(): boolean {
  try {
    return localStorage.getItem(KHOA_AN) === "1";
  } catch {
    return false;
  }
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 5.1 10.4 4v7.2H3zM11.4 3.9 21 2.5v8.7h-9.6zM3 12.2h7.4v7.2L3 18.3zM11.4 12.2H21v8.7l-9.6-1.4z" />
    </svg>
  );
}

const code = "rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground";
const Luu = ({ children }: { children: React.ReactNode }) => (
  <span className="mt-1.5 block rounded-md border border-signal/25 bg-signal/10 px-2.5 py-1.5 text-xs leading-relaxed text-foreground">{children}</span>
);

type Buoc = { tieuDe: React.ReactNode; luu?: React.ReactNode };
type NoiDung = { os: "windows" | "mac"; tieuDe: string; tep: string; buoc: Buoc[]; meo: React.ReactNode };

const NOI_DUNG: Record<InstallKind, NoiDung> = {
  winExe: {
    os: "windows",
    tieuDe: "Cài đặt trên Windows",
    tep: "CaiDat_ChuanHoaTheThuc.zip",
    buoc: [
      { tieuDe: <>Chuột phải tệp .zip vừa tải, chọn <b>Extract All (Giải nén tất cả)</b>.</> },
      { tieuDe: <>Lưu bài đang làm, đóng hết <b>Word</b> và <b>Excel</b>.</> },
      {
        tieuDe: <>Nhấp đúp <span className={code}>CaiDat_ChuanHoaTheThuc.exe</span>, bấm <b>Yes</b>.</>,
        luu: <>Hiện khung xanh &quot;Windows protected your PC&quot;? Bấm <b>More info</b> rồi <b>Run anyway</b>.</>,
      },
      { tieuDe: <>Hiện <b>CÀI ĐẶT THÀNH CÔNG</b> là xong. Mở lại Word: tab <b>Home</b> có nhóm <b>THỂ THỨC VĂN BẢN</b>.</> },
    ],
    meo: <>Windows Security báo virus? Đó là báo nhầm vì bộ cài chưa có chữ ký số: vào <b>Protection history</b>, chọn mục vừa bị chặn, bấm <b>Actions → Allow on device</b>.</>,
  },
  winBat: {
    os: "windows",
    tieuDe: "Cài đặt trên Windows (bộ dự phòng)",
    tep: "Bo_Cai_Dat_Windows.zip",
    buoc: [
      { tieuDe: <>Chuột phải tệp .zip, chọn <b>Extract All (Giải nén tất cả)</b>.</> },
      { tieuDe: <>Lưu bài đang làm, đóng hết <b>Word</b> và <b>Excel</b>.</> },
      {
        tieuDe: <>Nhấp đúp <span className={code}>CaiDat_Windows.bat</span>, chờ cửa sổ báo cài xong.</>,
        luu: <>Hiện khung xanh SmartScreen? Bấm <b>More info</b> rồi <b>Run anyway</b>.</>,
      },
      { tieuDe: <>Mở lại Word: tab <b>Home</b> có nhóm <b>THỂ THỨC VĂN BẢN</b>.</> },
    ],
    meo: <>Thư mục <span className={code}>thanh_phan</span> chứa chương trình và add-in: không cần mở, không xóa, không chạy riêng tệp nào trong đó.</>,
  },
  macPkg: {
    os: "mac",
    tieuDe: "Cài đặt trên macOS",
    tep: "CaiDat_ChuanHoaTheThuc_Mac.pkg",
    buoc: [
      { tieuDe: <>Lưu bài, thoát hẳn Word và Excel bằng <b>Cmd+Q</b>.</> },
      {
        tieuDe: <>Trong Finder, nhấp đúp tệp <span className={code}>.pkg</span>.</>,
        luu: <>Máy báo &quot;Not Opened&quot;? Bấm <b>Done (Xong)</b>, đừng bấm <i>Move to Trash</i>.</>,
      },
      {
        tieuDe: <>Vào <b>System Settings → Privacy &amp; Security</b>, kéo xuống cuối, bấm <b>Open Anyway (Vẫn mở)</b> và nhập mật khẩu máy.</>,
        luu: <>Dòng này chỉ hiện sau khi bạn đã mở tệp .pkg một lần và giữ khoảng 1 giờ.</>,
      },
      { tieuDe: <>Bấm <b>Continue → Install</b>. Hộp &quot;access data from other apps&quot; thì chọn <b>Allow</b>. Mở lại Word: tab <b>Home</b> có nhóm <b>THỂ THỨC VĂN BẢN</b>.</> },
    ],
    meo: <>macOS có thể báo &quot;Đã thêm mục nền&quot; <b>OfficePartyEngine</b>: đó là chương trình nền của add-in, cứ để nguyên nhé.</>,
  },
  macZip: {
    os: "mac",
    tieuDe: "Cài đặt trên macOS (bộ dự phòng)",
    tep: "Bo_Cai_Dat_Mac.zip",
    buoc: [
      { tieuDe: <>Nhấp đúp tệp .zip để giải nén. Lưu bài, thoát hẳn Word và Excel bằng <b>Cmd+Q</b>.</> },
      {
        tieuDe: <>Mở <b>Terminal</b>, kéo tệp <span className={code}>CaiDat_Mac.sh</span> vào cửa sổ rồi nhấn <b>Enter</b>.</>,
        luu: <>Báo &quot;permission denied&quot;? Gõ <span className={code}>bash</span> và một dấu cách, kéo tệp vào rồi nhấn Enter.</>,
      },
      { tieuDe: <>Mở lại Word: tab <b>Home</b> có nhóm <b>THỂ THỨC VĂN BẢN</b>.</> },
    ],
    meo: <>Cách này không cần bước &quot;Open Anyway&quot; trong Privacy &amp; Security.</>,
  },
};

function nhayToiHuongDan(os: "windows" | "mac") {
  const dich = document.getElementById(`huong-dan-${os}`)?.parentElement;
  if (!dich) return;
  const it = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  dich.scrollIntoView({ behavior: it ? "auto" : "smooth", block: "center" });
  // Vien sang bang style (khong dung class: khung nay do Reveal quan ly className va se ghi de khi cuon toi).
  const cu = { boxShadow: dich.style.boxShadow, transition: dich.style.transition };
  dich.style.transition = "box-shadow .5s ease";
  dich.style.boxShadow = "0 0 0 2px var(--primary), 0 0 0 9px color-mix(in oklab, var(--primary) 16%, transparent)";
  window.setTimeout(() => {
    dich.style.boxShadow = cu.boxShadow;
    window.setTimeout(() => (dich.style.transition = cu.transition), 600);
  }, 2600);
}

export function InstallGuideDialog({ kind, onClose }: { kind: InstallKind | null; onClose: () => void }) {
  const [khongHienLai, setKhongHienLai] = useState(false);
  // Giu noi dung cu trong luc hop thoai dang dong lai (hieu ung mo dan), de khong nhay chu.
  const gan = useRef<InstallKind>("winExe");
  if (kind) gan.current = kind;
  const nd = NOI_DUNG[gan.current];

  useEffect(() => {
    if (kind) setKhongHienLai(false);
  }, [kind]);

  const dong = (nhayToi?: boolean) => {
    try {
      if (khongHienLai) localStorage.setItem(KHOA_AN, "1");
    } catch {}
    onClose();
    if (nhayToi) window.setTimeout(() => nhayToiHuongDan(nd.os), 220);
  };

  const Logo = nd.os === "mac" ? Apple : WindowsLogo;

  return (
    <Dialog open={!!kind} onOpenChange={(mo) => !mo && dong()}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <div className="flex items-start gap-3.5 px-6 pb-4 pt-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <Logo className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Download className="h-3.5 w-3.5 animate-pulse text-primary motion-reduce:animate-none" aria-hidden /> Tệp đang được tải về
            </p>
            <DialogTitle className="mt-0.5 text-lg font-bold leading-snug">{nd.tieuDe}</DialogTitle>
            <DialogDescription className="mt-0.5 truncate font-mono text-xs">{nd.tep}</DialogDescription>
          </div>
        </div>

        <ol className="px-6 pb-4">
          {nd.buoc.map((b, i) => (
            <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
              {i < nd.buoc.length - 1 && <span aria-hidden className="absolute left-[13px] top-8 h-[calc(100%-1.5rem)] w-px bg-border" />}
              <span
                className={`z-[1] grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full text-xs font-bold ${
                  i === nd.buoc.length - 1 ? "bg-success text-white" : "bg-primary text-primary-foreground"
                }`}
              >
                {i + 1}
              </span>
              <div className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                <p className="text-foreground">{b.tieuDe}</p>
                {b.luu && <Luu>{b.luu}</Luu>}
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-6 mb-5 flex items-start gap-2 rounded-lg bg-muted/70 px-3 py-2.5 text-[13px] leading-relaxed text-muted-foreground">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <p>
            {nd.meo} Cần giúp thêm? Hỏi <b className="text-foreground">Bé Đô</b> ở góc màn hình, bạn sẽ được chỉ từng bước.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border bg-muted/30 px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <Checkbox checked={khongHienLai} onCheckedChange={(v) => setKhongHienLai(v === true)} aria-label="Không hiện lại hướng dẫn này" />
            Không hiện lại
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => dong(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              <BookOpen className="h-4 w-4 text-primary" aria-hidden /> Xem đầy đủ
            </button>
            <button
              type="button"
              onClick={() => dong()}
              className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
