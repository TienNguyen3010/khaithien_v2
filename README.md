# Khải Thiên Communication & Entertainment

Website giới thiệu Khải Thiên Communication & Entertainment với các dịch vụ:

- PR & Communication
- Event
- Production House
- Activation

Website công khai: <https://tiennguyen3010.github.io/khaithien/>

## Phiên bản thiết kế mới

Nhánh `codex/website-redesign-v2` chứa phiên bản đa trang được xây dựng theo
`desgin_web.md`. Phiên bản này độc lập với `main`, gồm các route giới thiệu,
dịch vụ, dự án, khách hàng, tin tức, liên hệ, chính sách bảo mật và API lưu yêu
cầu vào D1.

## Cấu trúc dự án

- `index.html`: bản website tĩnh được GitHub Pages phục vụ trực tiếp.
- `kt-logo.jpg`, `kt-landpage.png`: hình ảnh thương hiệu của website tĩnh.
- `app/`: source giao diện React/Next.js.
- `public/`: tài nguyên công khai và landing page dự phòng.
- `worker/`: entry point cho Cloudflare Worker/vinext.
- `db/`, `drizzle/`: cấu hình và schema cơ sở dữ liệu.
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
```

## Xuất bản

GitHub Pages được cấu hình từ nhánh `main`, thư mục gốc. Vì vậy `index.html`
phải luôn nằm ở thư mục gốc của repository. Việc cập nhật source trong các thư
mục khác không ảnh hưởng tới website tĩnh đang hoạt động.

## Liên hệ

- Facebook: <https://www.facebook.com/profile.php?id=100082810012676>
- Điện thoại: 076 489 8969
- Email: khaithienmande@gmail.com
- Khu vực: Thủ Đức, TP. Hồ Chí Minh
