INSERT OR IGNORE INTO services
  (slug, name, summary, description, display_order, status)
VALUES
  ('pr-communication', 'PR & Communication', 'Chiến lược truyền thông và PR tích hợp.', 'Xây dựng thông điệp, nội dung, quan hệ báo chí và kế hoạch truyền thông phù hợp mục tiêu thương hiệu.', 1, 'published'),
  ('event', 'Event', 'Thiết kế và vận hành sự kiện trọn gói.', 'Từ ý tưởng, sản xuất đến điều phối hiện trường cho lễ ra mắt, hội nghị và sự kiện doanh nghiệp.', 2, 'published'),
  ('production-house', 'Production House', 'Sản xuất nội dung hình ảnh và video.', 'TVC, phim doanh nghiệp, social video, livestream và các sản phẩm truyền thông đa nền tảng.', 3, 'published'),
  ('activation', 'Activation', 'Kích hoạt thương hiệu và kết nối khách hàng.', 'Thiết kế trải nghiệm trực tiếp giúp thương hiệu tạo tương tác và lan tỏa tại điểm chạm.', 4, 'published');

INSERT OR IGNORE INTO site_settings (key, value, "group", description)
VALUES
  ('brand.name', json('"Khải Thiên Communication & Entertainment"'), 'brand', 'Tên thương hiệu'),
  ('contact.phone', json('"076 489 8969"'), 'contact', 'Số điện thoại'),
  ('contact.email', json('"khaithienmande@gmail.com"'), 'contact', 'Email liên hệ'),
  ('contact.location', json('"Thủ Đức, TP. Hồ Chí Minh"'), 'contact', 'Khu vực hoạt động'),
  ('social.facebook', json('"https://www.facebook.com/profile.php?id=100082810012676"'), 'social', 'Facebook fanpage');

INSERT OR IGNORE INTO admin_roles ("key", name, description)
VALUES
  ('owner', 'Chủ sở hữu', 'Toàn quyền cấu hình, nội dung và phân quyền.'),
  ('editor', 'Biên tập viên', 'Tạo, sửa và gửi nội dung chờ duyệt.'),
  ('sales', 'Kinh doanh', 'Tiếp nhận và cập nhật yêu cầu liên hệ.');
