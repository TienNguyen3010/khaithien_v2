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
  ('administrator', 'Quản trị viên', 'Toàn quyền cấu hình, nội dung và phân quyền.'),
  ('content-editor', 'Biên tập viên', 'Tạo, sửa và gửi nội dung chờ duyệt.'),
  ('reviewer', 'Người duyệt', 'Duyệt nội dung, quyền công bố và NDA.'),
  ('sales-viewer', 'Kinh doanh', 'Tiếp nhận và cập nhật yêu cầu liên hệ.'),
  ('seo-marketing', 'SEO & Marketing', 'Quản lý metadata, redirect và đo lường.');

INSERT OR IGNORE INTO admin_permissions ("key", description)
VALUES
  ('content.create', 'Tạo nội dung'),
  ('content.review', 'Duyệt nội dung'),
  ('content.publish', 'Xuất bản nội dung'),
  ('lead.read', 'Xem lead'),
  ('lead.update', 'Cập nhật trạng thái lead'),
  ('lead.export', 'Xuất dữ liệu lead'),
  ('seo.manage', 'Quản lý SEO và redirect'),
  ('user.manage', 'Quản lý người dùng và quyền');

INSERT OR IGNORE INTO industries (id, code, name_vi, name_en, slug_vi, slug_en, display_order)
VALUES
  ('industry-corporate', 'corporate', 'Doanh nghiệp', 'Corporate', 'doanh-nghiep', 'corporate', 1),
  ('industry-consumer', 'consumer', 'Hàng tiêu dùng', 'Consumer', 'hang-tieu-dung', 'consumer', 2),
  ('industry-technology', 'technology', 'Công nghệ', 'Technology', 'cong-nghe', 'technology', 3);

INSERT OR IGNORE INTO article_categories (id, code, name_vi, name_en, slug_vi, slug_en)
VALUES
  ('category-event', 'event-strategy', 'Chiến lược sự kiện', 'Event Strategy', 'chien-luoc-su-kien', 'event-strategy'),
  ('category-brand', 'brand-experience', 'Trải nghiệm thương hiệu', 'Brand Experience', 'trai-nghiem-thuong-hieu', 'brand-experience'),
  ('category-production', 'production', 'Sản xuất & vận hành', 'Production & Operations', 'san-xuat-van-hanh', 'production-operations');

INSERT OR IGNORE INTO tags (id, code, name_vi, name_en)
VALUES
  ('tag-brief', 'brief', 'Brief dự án', 'Project Brief'),
  ('tag-event', 'event', 'Sự kiện', 'Event'),
  ('tag-activation', 'activation', 'Kích hoạt thương hiệu', 'Brand Activation');

INSERT OR IGNORE INTO service_translations
  (id, service_id, locale, name, slug, short_description, seo_title, seo_description)
SELECT 'service-vi-' || id, id, 'vi', name, slug, summary, name || ' | Khải Thiên', summary
FROM services;
