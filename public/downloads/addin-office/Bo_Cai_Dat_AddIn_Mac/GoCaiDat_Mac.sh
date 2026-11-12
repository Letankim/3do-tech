#!/bin/bash
# GoCaiDat_Mac.sh
# Gỡ Add-in Chuẩn hóa thể thức văn bản (Word & Excel) trên macOS.
# Chỉ xóa 2 file add-in; không đụng tới văn bản hay cài đặt khác của Office.

echo "=============================================================================="
echo "        GỠ CÀI ĐẶT ADD-IN CHUẨN HÓA THỂ THỨC VĂN BẢN - WORD & EXCEL (macOS)"
echo "=============================================================================="

OFFICE_DIR="$HOME/Library/Group Containers/UBF8T346G9.Office"

# 0. Thoát hẳn Word / Excel: add-in đang được nạp thì gỡ xong vẫn còn nút tới khi thoát.
for APP in "Microsoft Word" "Microsoft Excel"; do
    if pgrep -xq "$APP"; then
        echo "[*] Đang thoát $APP (nhớ lưu bài trước)..."
        osascript -e "tell application \"$APP\" to quit" >/dev/null 2>&1
        for _ in 1 2 3 4 5 6 7 8 9 10; do
            pgrep -xq "$APP" || break
            sleep 1
        done
        if pgrep -xq "$APP"; then
            echo "[!] $APP chưa thoát (có thể đang hỏi lưu bài). Lưu bài, thoát hẳn bằng Cmd+Q rồi chạy lại."
            exit 1
        fi
    fi
done

DA_GO=0
xoa() {
    if [ -f "$1" ]; then
        rm -f "$1" && echo "[-] Đã xóa: $1" && DA_GO=1
    fi
}

# 1. Xóa add-in trong mọi thư mục Startup (tên có hoặc không có đuôi .localized, như bộ cài)
for uc in "User Content.localized" "User Content"; do
    for st in "Startup.localized" "Startup"; do
        xoa "$OFFICE_DIR/$uc/$st/Word/ChuanHoa_VanBanDang.dotm"
        xoa "$OFFICE_DIR/$uc/$st/Excel/ChuanHoa_Excel.xlam"
    done
done

# 2. Bản Excel phụ bộ cài chép vào thư mục người dùng, và file tạm của nút Cập nhật
xoa "$HOME/chuanhoa_excel.xlam"
xoa "$HOME/cn_capnhat_WORD.tmp"
xoa "$HOME/cn_capnhat_EXCEL.tmp"

echo ""
echo "=============================================================================="
if [ "$DA_GO" = 1 ]; then
    echo "                   GỠ CÀI ĐẶT THÀNH CÔNG!"
    echo "Mở lại Word / Excel: nhóm [THỂ THỨC VĂN BẢN] và nút [Chuẩn Hóa Trang In] đã biến mất."
    echo "Nếu Excel báo không tìm thấy chuanhoa_excel.xlam: vào Công cụ > Phần bổ trợ Excel,"
    echo "bỏ tích ChuanHoa_Excel rồi OK."
else
    echo "Không tìm thấy add-in nào trên máy (có thể đã gỡ trước đó)."
fi
echo "=============================================================================="
