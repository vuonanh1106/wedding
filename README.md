Wedding — Website đám cưới
Mô tả

Website tĩnh dành cho thiệp mời/giới thiệu đám cưới: thông tin cặp đôi, lịch trình, địa điểm (bản đồ), gallery ảnh, form RSVP và thông tin liên hệ.
Dự án dùng HTML, CSS và JavaScript (tệp tĩnh). Dễ triển khai trên GitHub Pages hoặc bất kỳ hosting tĩnh nào.
Tính năng (mẫu / có thể tùy chỉnh)

Trang đơn (single-page) responsive cho cả di động và desktop
Phần giới thiệu cặp đôi
Lịch trình sự kiện (timeline)
Thư viện ảnh / slideshow
Bản đồ vị trí (Google Maps / iframe)
Form RSVP (có thể gửi bằng email hoặc lưu qua dịch vụ bên thứ 3)
Thông tin liên hệ và hướng dẫn di chuyển
Demo

Mở file index.html trực tiếp trên trình duyệt để xem.
Hoặc triển khai bằng GitHub Pages (xem phần Deploy bên dưới).
Cấu trúc thư mục (gợi ý)

index.html
css/
main.css
js/
main.js
images/ (ảnh, banner, gallery)
README.md
Chạy/Preview cục bộ

Cách nhanh (mở index.html trong trình duyệt).
Dùng Python (port 8000):
python3 -m http.server 8000
Mở http://localhost:8000
Hoặc dùng http-server:
npx http-server -c-1
Mở http://localhost:8080
Tùy chỉnh nội dung

Chỉnh sửa index.html để cập nhật:
Tên cặp đôi, ngày giờ, địa điểm
Nội dung phần lịch trình, lời dẫn, chỉ đường
Thay ảnh trong thư mục images/
Sửa CSS trong css/main.css; thêm JS trong js/main.js để xử lý form/animation
Triển khai (GitHub Pages)
