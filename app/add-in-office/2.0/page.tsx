import type { Metadata } from "next";
import { Download, Apple, ShieldAlert, Zap, MessageSquareWarning, Undo2, Sparkles, Info } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import info from "../../../public/downloads/addin-office-2.0/thong-tin.json";

// Trang tai BAN THU 2.0 (add-in + engine OfficePartyEngine) cho nguoi duoc moi. Khong lien ket tu menu / trang add-in-office,
// khong cho may tim kiem lap chi muc. Tep cai dat: public/downloads/addin-office-2.0 (dung tu tools/gd7/dong_goi.py cua repo engine).
export const metadata: Metadata = {
  title: "Add-in Chuẩn hóa thể thức 2.0 - bản trải nghiệm sớm | 3DO TECH",
  description: "Bản trải nghiệm sớm 2.0 dành cho người được mời.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const base = "/downloads/addin-office-2.0";
type TepTai = keyof typeof info.files;

function kichThuoc(f: TepTai) {
  const mb = info.files[f].size / (1024 * 1024);
  return `${mb.toFixed(1).replace(".", ",")} MB`;
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 5.1 10.4 4v7.2H3zM11.4 3.9 21 2.5v8.7h-9.6zM3 12.2h7.4v7.2L3 18.3zM11.4 12.2H21v8.7l-9.6-1.4z" />
    </svg>
  );
}

const codeCls = "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground";

function NutTai({ tep, nhan, phu, chinh }: { tep: TepTai; nhan: string; phu: string; chinh?: boolean }) {
  return (
    <a
      href={`${base}/${tep}`}
      download
      className={
        chinh
          ? "flex items-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          : "flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 transition-colors hover:border-primary/50"
      }
    >
      <Download className="h-5 w-5 shrink-0" />
      <span className="min-w-0">
        <span className="block font-semibold">{nhan}</span>
        <span className={chinh ? "block text-sm opacity-85" : "block text-sm text-muted-foreground"}>
          {phu} · {kichThuoc(tep)}
        </span>
      </span>
    </a>
  );
}

function Buoc({ so, children }: { so: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {so}
      </span>
      <div className="pt-0.5 text-[0.95rem] leading-relaxed">{children}</div>
    </li>
  );
}

export default function AddInOffice2Page() {
  const diemMoi = [
    { icon: Zap, title: "Chuẩn hóa nhanh hơn", text: "Phần xử lý chạy trong chương trình nền OfficePartyEngine thay vì macro VBA, văn bản dài xong nhanh hơn nhiều." },
    { icon: Info, title: "Hộp thoại tiếng Việt có dấu", text: "Hộp Cài đặt chung (đơn vị ban hành, tùy chọn thể thức, sửa chữ), thanh tiến độ %, kiểm tra chính tả." },
    { icon: MessageSquareWarning, title: "Báo lỗi ngay trong add-in", text: "Gặp văn bản chuẩn hóa sai, bấm Báo lỗi trong add-in để gửi mô tả lỗi cho nhóm phát triển." },
  ];

  return (
    <main className="min-h-screen bg-background">
      <StickyHeader />

      <section className="container-x pt-28 pb-12 sm:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
          <Sparkles className="h-4 w-4" /> Bản trải nghiệm sớm · chỉ dành cho người được mời
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Add-in Chuẩn hóa thể thức văn bản 2.0</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Cảm ơn bạn đã nhận lời dùng thử. Đây là bản mới chưa phát hành rộng rãi, có thể còn lỗi. Vui lòng không chia sẻ đường dẫn này.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Phiên bản {info.version} · engine {info.engine} · cập nhật {info.published.split("-").reverse().join("/")}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <WindowsLogo className="h-5 w-5" /> Windows
            </h2>
            <div className="mt-4 grid gap-3">
              <NutTai tep="CaiDat_ChuanHoaTheThuc.zip" nhan="Tải bộ cài Windows" phu="Một tệp cài đặt .exe" chinh />
              <NutTai tep="Bo_Cai_Dat_Windows.zip" nhan="Bộ cài dự phòng" phu="Dùng khi tệp .exe bị chặn" />
            </div>
            <ol className="mt-6 grid gap-3">
              <Buoc so={1}>Chuột phải tệp .zip vừa tải → <strong>Extract All (Giải nén tất cả)</strong>.</Buoc>
              <Buoc so={2}>Lưu bài, đóng hết Word và Excel.</Buoc>
              <Buoc so={3}>
                Nhấp đúp <code className={codeCls}>CaiDat_ChuanHoaTheThuc.exe</code>, bấm <strong>Yes</strong>. Hiện &quot;CÀI ĐẶT THÀNH CÔNG&quot; là xong.
                <span className="mt-2 block rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-sm">
                  Nếu hiện màn hình xanh &quot;Windows protected your PC&quot;: bấm <em>More info</em> → <em>Run anyway</em>.
                </span>
              </Buoc>
              <Buoc so={4}>Mở lại Word: tab Home có nhóm <strong>THỂ THỨC VĂN BẢN</strong>.</Buoc>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Bộ cài dự phòng: giải nén rồi nhấp đúp <code className={codeCls}>CaiDat_Windows.bat</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Apple className="h-5 w-5" /> macOS
            </h2>
            <div className="mt-4 grid gap-3">
              <NutTai tep="Bo_Cai_Dat_Mac.zip" nhan="Tải bộ cài macOS" phu="Cài bằng .pkg hoặc .sh (Mac Intel và Apple Silicon)" chinh />
            </div>
            <ol className="mt-6 grid gap-3">
              <Buoc so={1}>Nhấp đúp tệp .zip để giải nén.</Buoc>
              <Buoc so={2}>Lưu bài, thoát hẳn Word và Excel bằng <strong>Cmd+Q</strong>.</Buoc>
              <Buoc so={3}>
                <strong>Cách 1:</strong> trong Finder, nhấp đúp <code className={codeCls}>CaiDat_Mac.pkg</code>, bấm <strong>Tiếp tục</strong> → <strong>Cài đặt</strong>.
                <span className="mt-2 block rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-sm">
                  Máy báo &quot;Apple không thể xác minh…&quot;: bấm <em>Xong</em> (không bấm Chuyển vào Thùng rác), vào{" "}
                  <strong>Cài đặt hệ thống → Quyền riêng tư &amp; Bảo mật</strong>, kéo xuống cuối, bấm <em>Vẫn mở</em>, nhập mật khẩu máy rồi bấm <em>Mở</em>.
                </span>
                <span className="mt-3 block">
                  <strong>Cách 2</strong> (không cần bước &quot;Vẫn mở&quot;): mở <strong>Terminal</strong>, kéo tệp{" "}
                  <code className={codeCls}>CaiDat_Mac.sh</code> vào cửa sổ rồi nhấn <strong>Enter</strong>. Báo &quot;permission denied&quot; thì gõ{" "}
                  <code className={codeCls}>bash</code> và một dấu cách, kéo tệp vào rồi nhấn Enter.
                </span>
              </Buoc>
              <Buoc so={4}>
                Mở lại Word: thẻ Home có nhóm <strong>THỂ THỨC VĂN BẢN</strong>. macOS có thể báo &quot;Đã thêm mục nền&quot; OfficePartyEngine: đó là dịch vụ của add-in, đừng tắt.
              </Buoc>
            </ol>
          </div>
        </div>
      </section>

      <section className="container-x pb-12">
        <h2 className="text-2xl font-semibold">Có gì mới so với bản đang dùng</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {diemMoi.map((d) => (
            <div key={d.title} className="rounded-xl border border-border bg-card p-5">
              <d.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{d.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-6 pb-20 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShieldAlert className="h-5 w-5 text-primary" /> Lưu ý khi dùng thử
          </h2>
          <ul className="mt-4 grid gap-2.5 text-[0.95rem] leading-relaxed">
            <li>• Đang dùng bản cũ thì cứ cài đè: thông tin đơn vị, tùy chọn và bản quyền được giữ nguyên.</li>
            <li>• Bộ cài chưa có chữ ký số nên Windows / macOS hiện cảnh báo lần đầu, làm theo hướng dẫn ở trên.</li>
            <li>• Văn bản quan trọng: nên lưu một bản trước khi Chuẩn hóa. Sai thì bấm <strong>Hoàn tác</strong> trên Ribbon.</li>
            <li>
              • Phần mềm diệt virus chặn: mở Windows Security → Virus &amp; threat protection → Protection history, chụp tên mối đe dọa và gửi cho
              người hỗ trợ.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Undo2 className="h-5 w-5 text-primary" /> Gỡ hoặc quay về bản cũ
          </h2>
          <ul className="mt-4 grid gap-2.5 text-[0.95rem] leading-relaxed">
            <li>
              • Windows: chạy lại <code className={codeCls}>CaiDat_ChuanHoaTheThuc.exe</code>, bấm <strong>No</strong> để gỡ (bộ dự phòng:{" "}
              <code className={codeCls}>GoCai_Windows.bat</code>).
            </li>
            <li>
              • macOS: mở Terminal, kéo tệp <code className={codeCls}>GoCai_Mac.sh</code> trong thư mục bộ cài vào rồi nhấn Enter.
            </li>
            <li>
              • Sau khi gỡ, cài lại bản đang phát hành ở trang{" "}
              <a href="/add-in-office" className="font-semibold text-primary hover:underline">
                Add-in Office
              </a>
              .
            </li>
            <li>
              • Cần hỗ trợ: <strong>Mr. Cường</strong>{" "}
              <a href="tel:0774889191" className="font-semibold text-primary hover:underline">
                0774.88.9191
              </a>{" "}
              (Zalo).
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
