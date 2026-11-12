#!/bin/bash
# CaiDat_AddIn_Mac.sh
# Cài đặt trọn bộ Add-in Chuẩn hóa thể thức văn bản (Word & Excel) trên macOS

echo "=============================================================================="
echo "    CÀI ĐẶT ADD-IN CHUẨN HÓA THỂ THỨC VĂN BẢN - WORD & EXCEL (macOS)"
echo "             Văn phòng Đảng ủy xã Thạnh Phú"
echo "=============================================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OFFICE_DIR="$HOME/Library/Group Containers/UBF8T346G9.Office"

# 0. Thoát hẳn Word / Excel: bấm nút đỏ chỉ đóng cửa sổ, app vẫn chạy và không nạp add-in mới.
for APP in "Microsoft Word" "Microsoft Excel"; do
    if pgrep -xq "$APP"; then
        echo "[*] Đang thoát $APP (nhớ lưu bài trước)..."
        osascript -e "tell application \"$APP\" to quit" >/dev/null 2>&1
        for _ in 1 2 3 4 5 6 7 8 9 10; do
            pgrep -xq "$APP" || break
            sleep 1
        done
        if pgrep -xq "$APP"; then
            echo "[!] $APP chưa thoát (có thể đang hỏi lưu bài). Lưu bài, thoát hẳn bằng Cmd+Q rồi chạy lại bộ cài."
            exit 1
        fi
    fi
done

# Thư mục Startup của Office: tên trên ổ đĩa có máy là "User Content.localized/Startup.localized",
# có máy là "User Content/Startup". Chép vào mọi thư mục đang có; chưa có thì tạo theo tên mặc định.
startup_dirs() {
    local app="$1" found=0 uc st
    for uc in "User Content.localized" "User Content"; do
        [ -d "$OFFICE_DIR/$uc" ] || continue
        for st in "Startup.localized" "Startup"; do
            if [ -d "$OFFICE_DIR/$uc/$st" ]; then
                echo "$OFFICE_DIR/$uc/$st/$app"
                found=1
            fi
        done
    done
    [ "$found" = 1 ] || echo "$OFFICE_DIR/User Content.localized/Startup.localized/$app"
}

WORD_OK=0
EXCEL_OK=0

# 1. Cài đặt Add-in cho Word
if [ -f "$SCRIPT_DIR/ChuanHoa_VanBanDang.dotm" ]; then
    while IFS= read -r D; do
        mkdir -p "$D" && cp -f "$SCRIPT_DIR/ChuanHoa_VanBanDang.dotm" "$D/" && \
            xattr -cr "$D/ChuanHoa_VanBanDang.dotm" 2>/dev/null
        [ -f "$D/ChuanHoa_VanBanDang.dotm" ] && WORD_OK=1 && echo "[+] Word: $D"
    done < <(startup_dirs Word)
else
    echo "[!] Không tìm thấy ChuanHoa_VanBanDang.dotm (bỏ qua Word)"
fi

# 2. Cài đặt Add-in cho Excel
if [ -f "$SCRIPT_DIR/ChuanHoa_Excel.xlam" ]; then
    while IFS= read -r D; do
        mkdir -p "$D" && cp -f "$SCRIPT_DIR/ChuanHoa_Excel.xlam" "$D/ChuanHoa_Excel.xlam" && \
            xattr -cr "$D/ChuanHoa_Excel.xlam" 2>/dev/null
        [ -f "$D/ChuanHoa_Excel.xlam" ] && EXCEL_OK=1 && echo "[+] Excel: $D"
    done < <(startup_dirs Excel)
    cp -f "$SCRIPT_DIR/ChuanHoa_Excel.xlam" "$HOME/chuanhoa_excel.xlam"
    xattr -cr "$HOME/chuanhoa_excel.xlam" 2>/dev/null
else
    echo "[!] Không tìm thấy ChuanHoa_Excel.xlam (bỏ qua Excel)"
fi

echo ""
if [ "$WORD_OK" = 1 ] && [ "$EXCEL_OK" = 1 ]; then
    echo "=============================================================================="
    echo "                   CÀI ĐẶT THÀNH CÔNG!"
    echo "=============================================================================="
else
    echo "=============================================================================="
    echo "[!] Cài chưa đủ (Word=$WORD_OK, Excel=$EXCEL_OK). Giải nén hết file .zip rồi chạy lại."
    echo "=============================================================================="
fi
echo "Mở lại Microsoft Word, Excel để dùng:"
echo "- Word: thẻ Home có nhóm [THỂ THỨC VĂN BẢN] với nút [Chuẩn Hóa Thể Thức]."
echo "- Excel: thẻ Home có nút [Chuẩn Hóa Trang In]."
echo "KHÔNG cần (và không nên) mở trực tiếp file .dotm / .xlam."
echo "=============================================================================="
