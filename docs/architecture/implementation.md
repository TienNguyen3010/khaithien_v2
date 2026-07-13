# Khải Thiên website — implementation profile

## Quyết định kiến trúc

Ba tài liệu đầu vào thống nhất đích dài hạn là TypeScript + Next.js + Payload
CMS + PostgreSQL + object storage. Bản đang xuất bản trên Cloudflare Sites dùng
Next.js/vinext + D1 + R2 để chạy được ngay trên hạ tầng hiện tại, nhưng giữ cùng
bounded context và tên miền nghiệp vụ để có thể chuyển sang PostgreSQL/Payload
mà không thay đổi kiến trúc thông tin công khai.

## Lớp website

- Giao diện mobile-first, semantic HTML, điều hướng bàn phím và reduced motion.
- Sitemap, robots, metadata, Open Graph và Organization structured data.
- Design system navy/blue/cyan/white; hình học dựa trên logo; ảnh dự án thật.
- Một CTA chính: **Gửi brief dự án**; case study và Insights làm bằng chứng.

## Lớp dữ liệu

- Content: pages, blocks, translations, services, projects, Insights và taxonomy.
- Governance: workflow, revision, RBAC, permission và audit.
- CRM-lite: contacts → leads → project briefs; activity, attribution và consent.
- Media: metadata trong D1, bytes trong R2; quyền sử dụng được quản lý ở content.
- Migration Drizzle có version; browser không truy cập database trực tiếp.

## Form brief

- Backend validation, honeypot, idempotency key và prepared statements.
- Consent xử lý brief tách khỏi consent marketing.
- File tối đa 10 MB, whitelist MIME; dữ liệu nguồn chiến dịch được lưu có giới hạn.
- Lead, brief, consent, activity và attribution được ghi cùng một D1 batch.

## Phần cần cấu hình khi go-live

- SMTP/Resend/SendGrid để gửi email xác nhận và thông báo Sales.
- Turnstile hoặc WAF rate limiting cho chống bot theo production domain.
- GA4/GTM chỉ sau khi chốt consent banner và measurement plan.
- Payload CMS/PostgreSQL khi đội vận hành cần UI biên tập và workflow đầy đủ.
- Chính sách retention, SLA xử lý lead, quyền công bố dự án và NDA phải được chủ
  sở hữu dữ liệu phê duyệt trước khi nhập dữ liệu thật.
