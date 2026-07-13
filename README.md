# Khải Thiên Communication & Entertainment

Website giới thiệu Khải Thiên Communication & Entertainment với các dịch vụ:

- PR & Communication
- Event
- Production House
- Activation

Website công khai: <https://tiennguyen3010.github.io/khaithien_v2/>

## Phiên bản thiết kế mới

Nhánh `codex/website-redesign-v2` chứa phiên bản đa trang được xây dựng từ bộ ba
tài liệu Strategy, Database Design và Technology Stack. Kiến trúc sử dụng
TypeScript, Next.js/vinext, Cloudflare D1, Drizzle ORM và R2 để phù hợp môi
trường Sites; mô hình dữ liệu được giữ tương thích logic với hướng
Payload CMS/PostgreSQL dài hạn.

## Cấu trúc dự án

- `index.html`: bản website tĩnh được GitHub Pages phục vụ trực tiếp.
- `kt-logo.jpg`, `kt-landpage.png`: hình ảnh thương hiệu của website tĩnh.
- `app/`: source giao diện React/Next.js.
- `public/`: tài nguyên công khai và landing page dự phòng.
- `worker/`: entry point cho Cloudflare Worker/vinext.
- `db/`, `drizzle/`: schema 37 bảng, seed và migration có phiên bản.
- `tests/`: kiểm tra HTML render.
- `desgin_web.md`: tài liệu cấu trúc nội dung và định hướng thiết kế mới.
- `examples/`: ví dụ tích hợp D1.
- `build/`: plugin build dành cho Sites/vinext.

Các thư mục sinh tự động như `node_modules`, `.pnpm-store`, `dist`, `.wrangler`
không được lưu trong Git.

## Chạy source trên máy

Yêu cầu Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Kiểm tra dự án:

```bash
npm run lint
npm test
python tests/database-schema.test.py
```

## Xuất bản

GitHub Pages được cấu hình từ nhánh `main`, thư mục gốc. Vì vậy `index.html`
phải luôn nằm ở thư mục gốc của repository. Việc cập nhật source trong các thư
mục khác không ảnh hưởng tới website tĩnh đang hoạt động.

Bản Sites dùng D1 binding `DB` cho nội dung/lead và R2 binding `MEDIA` cho file
brief. Secrets email, CRM, analytics và anti-spam phải được cấu hình bằng secret
manager của môi trường, không đưa vào repository.

## Liên hệ

- Facebook: <https://www.facebook.com/profile.php?id=100082810012676>
- Điện thoại: 076 489 8969
- Email: khaithienmande@gmail.com
- Khu vực: Thủ Đức, TP. Hồ Chí Minh
