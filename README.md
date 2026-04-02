# Hướng dẫn Deploy và Kết nối Google Sheets

Dưới đây là các bước để đưa trang web đặt món của bạn lên mạng và tự động lưu đơn hàng vào Google Sheets.

## 1. Deploy lên Vercel (Miễn phí)

Vercel là nền tảng tốt nhất để chạy ứng dụng Next.js.

1. **Đưa code lên GitHub:**
   - Tạo một repository mới trên GitHub (ví dụ: `food-ordering-app`).
   - Đẩy toàn bộ code trong thư mục `Menus` lên repository này.
2. **Kết nối với Vercel:**
   - Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub.
   - Nhấn **"Add New"** -> **"Project"**.
   - Chọn repository bạn vừa tạo.
   - Nhấn **"Deploy"**. Vercel sẽ tự động thực hiện mọi thứ và cấp cho bạn một đường dẫn (URL) công khai.

---

## 2. Kết nối với Google Sheets qua SheetDB (Miễn phí)

SheetDB cho phép bạn biến một file Google Sheets thành một API Endpoint.

1. **Tạo file Google Sheets:**
   - Tạo một file mới với hàng đầu tiên (Header) gồm các cột: `customer_name`, `items`, `total_price`, `timestamp`.
   - Chia sẻ file này ở chế độ công khai hoặc cấp quyền cho SheetDB (xem hướng dẫn tại SheetDB).
2. **Tạo API trên SheetDB:**
   - Truy cập [sheetdb.io](https://sheetdb.io).
   - Dán URL của file Google Sheets vào ô **"Create new API"**.
   - Bạn sẽ nhận được một **API URL** (ví dụ: `https://sheetdb.io/api/v1/abcdef12345`).
3. **Cập nhật code:**
   - Mở file `app/page.tsx`.
   - Tìm dòng `const API_ENDPOINT = "..."`.
   - Thay URL của SheetDB vào đó.
   - Lưu lại và đẩy code lên GitHub. Vercel sẽ tự động cập nhật web cho bạn!

---

## 3. Lưu ý kỹ thuật

- Trang web sử dụng **Tailwind CSS** cho giao diện đẹp và hiện đại.
- **Lucide-react** được dùng cho các icon sành điệu.
- **Framer Motion** mang lại các hiệu ứng chuyển động mượt mà khi người dùng tương tác.
- Toàn bộ giao diện đã được tối ưu hóa cho thiết bị di động (Mobile First).

Chúc bạn kinh doanh hồng phát! 🍜🔥
