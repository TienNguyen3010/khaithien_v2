# Thiết kế tổng thể website Khải Thiên

Tài liệu này mô tả cấu trúc nội dung và định hướng thiết kế website Khải Thiên Communication & Entertainment. Đây là tài liệu thiết kế, không chứa mã nguồn triển khai.

## 1. Cấu trúc website công khai

| Trang | Đường dẫn | Nội dung chính |
| --- | --- | --- |
| Trang chủ | `/` | Tổng quan thương hiệu, dịch vụ, dự án và lời kêu gọi liên hệ |
| Giới thiệu | `/gioi-thieu` | Câu chuyện, tầm nhìn, năng lực và đội ngũ |
| Dịch vụ | `/dich-vu` | Tổng hợp toàn bộ dịch vụ |
| Chi tiết dịch vụ | `/dich-vu/{slug}` | Nội dung, quy trình và dự án liên quan |
| Dự án | `/du-an` | Danh sách sự kiện và case study |
| Chi tiết dự án | `/du-an/{slug}` | Khách hàng, yêu cầu, giải pháp, hình ảnh và kết quả |
| Khách hàng | `/khach-hang` | Logo đối tác và nhận xét khách hàng |
| Tin tức | `/tin-tuc` | Hoạt động, kiến thức truyền thông và sự kiện |
| Bài viết | `/tin-tuc/{slug}` | Nội dung bài viết chi tiết |
| Liên hệ | `/lien-he` | Thông tin công ty và biểu mẫu gửi yêu cầu |
| Chính sách | `/chinh-sach-bao-mat` | Quy định sử dụng dữ liệu khách hàng |
| Trang lỗi | `/404` | Điều hướng người dùng quay lại website |

## 2. Menu chính

### Header

- Logo Khải Thiên
- Giới thiệu
- Dịch vụ
- Dự án
- Tin tức
- Khách hàng
- Nút **Gửi yêu cầu**

### Footer

- Thông tin doanh nghiệp
- Danh mục dịch vụ
- Liên kết nhanh
- Facebook
- Điện thoại, email và địa chỉ
- Chính sách bảo mật
- Thông tin bản quyền

## 3. Cấu trúc trang chủ

Thứ tự nội dung đề xuất:

1. Thanh thông tin liên hệ.
2. Header và menu.
3. Hero: thông điệp thương hiệu, hình ảnh sự kiện và nút liên hệ.
4. Logo khách hàng hoặc đối tác tiêu biểu.
5. Giới thiệu ngắn về Khải Thiên.
6. Bốn nhóm dịch vụ chính.
7. Năng lực nổi bật và số liệu doanh nghiệp.
8. Dự án tiêu biểu.
9. Quy trình thực hiện dự án.
10. Thư viện hình ảnh và video.
11. Đánh giá khách hàng.
12. Tin tức mới nhất.
13. Biểu mẫu nhận yêu cầu.
14. Footer.

Thông điệp chính:

> Kiến tạo sự kiện. Kết nối thương hiệu. Lan tỏa giá trị.

## 4. Hệ thống dịch vụ

Bốn nhóm dịch vụ chính:

- PR & Communication
- Event
- Production House
- Activation

Mỗi trang dịch vụ gồm:

1. Tiêu đề và hình ảnh đại diện.
2. Vấn đề khách hàng thường gặp.
3. Giải pháp của Khải Thiên.
4. Danh sách hạng mục cung cấp.
5. Quy trình triển khai.
6. Dự án liên quan.
7. Câu hỏi thường gặp.
8. Nút yêu cầu báo giá.

## 5. Cấu trúc dự án

Trang danh sách dự án có các bộ lọc:

- Loại dịch vụ
- Năm thực hiện
- Khách hàng
- Dự án nổi bật

Mỗi dự án gồm:

- Tên dự án
- Khách hàng
- Địa điểm và thời gian
- Dịch vụ thực hiện
- Yêu cầu của khách hàng
- Ý tưởng chủ đạo
- Quá trình triển khai
- Hình ảnh và video
- Kết quả đạt được
- Dự án liên quan

Không công bố số liệu hoặc tên khách hàng nếu chưa được xác nhận.

## 6. Biểu mẫu liên hệ

Thông tin thu thập:

- Họ và tên
- Công ty
- Email
- Số điện thoại
- Dịch vụ quan tâm
- Thời gian dự kiến
- Ngân sách dự kiến
- Nội dung yêu cầu
- Đồng ý chính sách dữ liệu

Quy trình xử lý:

```text
Khách gửi yêu cầu
        ↓
Yêu cầu mới
        ↓
Nhân viên liên hệ
        ↓
Xác định nhu cầu
        ↓
Gửi đề xuất hoặc báo giá
        ↓
Hoàn tất hoặc lưu theo dõi
```

## 7. Khu vực quản trị nội dung

Khu vực quản trị tương lai gồm:

- Dashboard tổng quan
- Quản lý trang và các khối nội dung
- Quản lý dịch vụ
- Quản lý dự án
- Quản lý thư viện ảnh và video
- Quản lý khách hàng
- Quản lý đánh giá
- Quản lý tin tức
- Quản lý yêu cầu liên hệ
- Cấu hình SEO
- Cấu hình thông tin doanh nghiệp
- Phân quyền người quản trị

Trạng thái nội dung:

- Bản nháp
- Chờ duyệt
- Đã xuất bản
- Đã lưu trữ

## 8. Định hướng hình ảnh

### Bảng màu dựa trên logo

- **Xanh navy:** màu nền và nhận diện chính.
- **Xanh dương:** nút bấm, liên kết và điểm nhấn.
- **Xanh cyan:** chi tiết hiện đại, đường nét và hiệu ứng.
- **Trắng:** tạo không gian thoáng.
- **Vàng cam:** chỉ dùng cho nút liên hệ quan trọng.

### Phong cách

- Hiện đại, chuyên nghiệp và giàu năng lượng.
- Hình ảnh sự kiện thật chiếm tỷ trọng lớn.
- Khối hình học lấy cảm hứng từ logo.
- Tiêu đề mạnh, nội dung ngắn và rõ.
- Hạn chế hiệu ứng chuyển động gây chậm trang.

## 9. Thiết kế responsive

### Desktop

- Menu đầy đủ.
- Bố cục từ hai đến bốn cột.
- Hình ảnh sự kiện kích thước lớn.

### Tablet

- Menu thu gọn.
- Dịch vụ hiển thị hai cột.
- Nội dung dự án chuyển thành bố cục dọc.

### Mobile

- Menu hamburger.
- Tất cả nội dung hiển thị một cột.
- Nút gọi điện và gửi yêu cầu cố định.
- Hình ảnh nhẹ, ưu tiên tốc độ tải.

## 10. SEO và đo lường

Mỗi trang cần:

- Tiêu đề SEO riêng
- Mô tả SEO
- URL ngắn, không dấu
- Ảnh chia sẻ Facebook
- Alt text cho hình ảnh
- Dữ liệu doanh nghiệp địa phương
- Sitemap và robots
- Google Search Console
- Google Analytics
- Theo dõi lượt gọi điện, gửi biểu mẫu và nhấp Facebook

## 11. Nguyên tắc nội dung

- Chỉ sử dụng hình ảnh dự án được Khải Thiên cho phép công bố.
- Không tự tạo số liệu thành tích hoặc danh sách khách hàng.
- Nội dung dịch vụ phải rõ phạm vi, kết quả và cách triển khai.
- Mỗi trang cần có một hành động chính: liên hệ, yêu cầu báo giá hoặc xem dự án.
- Thông tin điện thoại, email, địa chỉ và mạng xã hội phải thống nhất trên toàn website.

## 12. Phạm vi triển khai đề xuất

### Giai đoạn 1

- Trang chủ
- Giới thiệu
- Dịch vụ
- Dự án
- Liên hệ
- SEO nền tảng

### Giai đoạn 2

- Tin tức
- Khách hàng và đánh giá
- Thư viện video
- Khu vực quản trị nội dung
- Kết nối biểu mẫu với database

### Giai đoạn 3

- Báo cáo yêu cầu khách hàng
- Phân quyền quản trị
- Tự động hóa email thông báo
- Tích hợp công cụ đo lường nâng cao
