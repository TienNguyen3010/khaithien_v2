# Cấu trúc dữ liệu website Khải Thiên

Database triển khai sử dụng Cloudflare D1 (SQLite) và Drizzle ORM; mô hình logic
bám theo thiết kế PostgreSQL/Payload để có thể chuyển đổi ở giai đoạn vận hành
lớn hơn. File hình ảnh/video/tài liệu được lưu trong R2 binding `MEDIA`; bảng
`media_assets` chỉ lưu metadata và object key.

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
| Quản trị | `admin_users`, `admin_roles`, `admin_user_roles` | Tài khoản quản trị và phân quyền |
| Kiểm duyệt | `content_revisions`, `activity_logs` | Quy trình duyệt nội dung và lịch sử thao tác |
| Song ngữ | `page_translations`, `service_translations`, `project_translations` | Nội dung VI/EN và SEO theo locale |
| Taxonomy | `industries`, `article_categories`, `tags`, `article_tags` | Bộ lọc và phân loại có kiểm soát |
| CRM-lite | `contacts`, `leads`, `project_briefs`, `lead_activities`, `lead_attributions` | Tách người liên hệ, cơ hội, brief và lịch sử xử lý |
| Privacy | `consents` | Consent tách riêng theo mục đích và phiên bản chính sách |
| SEO | `redirects` | Redirect có kiểm soát khi thay đổi URL |
| RBAC | `admin_permissions`, `admin_role_permissions` | Quyền chi tiết theo `resource.action` |

## Quan hệ chính

- Một `page` có nhiều `page_sections`.
- Một `project` có nhiều `services` qua `project_services`.
- Một `project` có nhiều hình ảnh qua `project_media`.
- `media_assets` có thể làm ảnh đại diện cho dịch vụ, dự án, bài viết và logo khách hàng.
- Một `client` có thể có nhiều `testimonials`.
- Một `contact` có thể tạo nhiều `leads`; mỗi lead có một `project_brief`, nhiều
  hoạt động, attribution, consent và file đính kèm.
- Người quản trị nhận nhiều vai trò qua `admin_user_roles`.
- Mỗi lần chỉnh nội dung có thể lưu một bản duyệt trong `content_revisions`.

## Quy ước dữ liệu

- Bảng nền tảng cũ dùng số nguyên; lớp nghiệp vụ mới dùng UUID dạng text để
  đồng bộ an toàn giữa D1, CRM và PostgreSQL trong tương lai.
- Thời gian được lưu dưới dạng Unix epoch milliseconds.
- Nội dung có trạng thái `draft`, `published` hoặc `archived`.
- Xóa trang/dự án sẽ xóa các bản ghi liên kết; xóa media chỉ đặt liên kết ảnh về `NULL`.
- Không lưu file nhị phân, mật khẩu hoặc token trong D1.
- Lead cần được giới hạn quyền truy cập và có chính sách xóa dữ liệu phù hợp.

## Khởi tạo dữ liệu

Sau khi chạy migration, có thể nạp dữ liệu nền từ `db/seed.sql`.
