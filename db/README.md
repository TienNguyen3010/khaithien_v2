# Cấu trúc dữ liệu website Khải Thiên

Database sử dụng Cloudflare D1 (SQLite) và Drizzle ORM. File hình ảnh/video được
lưu trong R2 binding `MEDIA`; bảng `media_assets` chỉ lưu metadata và khóa file.

## Nhóm bảng

| Nhóm | Bảng | Mục đích |
| --- | --- | --- |
| Nội dung trang | `pages`, `page_sections` | Quản lý route, SEO và các khối nội dung có thứ tự |
| Dịch vụ | `services` | PR, Event, Production House, Activation và dịch vụ mới |
| Dự án | `projects`, `project_services`, `project_media` | Case study, dịch vụ liên quan và gallery |
| Truyền thông | `media_assets`, `posts` | Metadata hình/video/tài liệu và bài viết |
| Uy tín thương hiệu | `clients`, `testimonials` | Logo khách hàng/đối tác và đánh giá |
| Kinh doanh | `contact_submissions` | Lead từ biểu mẫu liên hệ và trạng thái xử lý |
| Cấu hình | `site_settings` | Thông tin liên hệ, mạng xã hội, SEO mặc định |

## Quan hệ chính

- Một `page` có nhiều `page_sections`.
- Một `project` có nhiều `services` qua `project_services`.
- Một `project` có nhiều hình ảnh qua `project_media`.
- `media_assets` có thể làm ảnh đại diện cho dịch vụ, dự án, bài viết và logo khách hàng.
- Một `client` có thể có nhiều `testimonials`.
- Một `contact_submission` có thể liên kết với dịch vụ khách hàng quan tâm.

## Quy ước dữ liệu

- ID nội bộ dùng số nguyên tự tăng; URL công khai dùng `slug` duy nhất.
- Thời gian được lưu dưới dạng Unix epoch milliseconds.
- Nội dung có trạng thái `draft`, `published` hoặc `archived`.
- Xóa trang/dự án sẽ xóa các bản ghi liên kết; xóa media chỉ đặt liên kết ảnh về `NULL`.
- Không lưu file nhị phân, mật khẩu hoặc token trong D1.
- Lead cần được giới hạn quyền truy cập và có chính sách xóa dữ liệu phù hợp.

## Khởi tạo dữ liệu

Sau khi chạy migration, có thể nạp dữ liệu nền từ `db/seed.sql`.
