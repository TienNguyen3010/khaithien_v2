"use client";

import { FormEvent, useState } from "react";

type ContentType = "pages" | "services" | "projects" | "posts";
type ContentItem = { id: number; type: ContentType; title: string; slug: string; summary: string | null; body: string | null; status: string; mediaId: number | null; updatedAt: number };
type MediaItem = { id: number; fileName: string; mimeType: string; kind: string; altText: string | null; sizeBytes: number | null; createdAt: number };

const labels: Record<ContentType, string> = { pages: "Trang", services: "Dịch vụ", projects: "Dự án", posts: "Insights" };

export function AdminDashboard({ adminName, initialStats }: { adminName: string; initialStats: Record<string, number> }) {
  const [active, setActive] = useState<"overview" | "content" | "media">("overview");
  const [contentType, setContentType] = useState<ContentType>("projects");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [notice, setNotice] = useState("");

  async function loadContent(type = contentType) {
    const response = await fetch(`/api/admin/content?type=${type}`);
    if (response.ok) setItems((await response.json()).items || []);
  }
  async function loadMedia() {
    const response = await fetch("/api/admin/media");
    if (response.ok) setMedia((await response.json()).items || []);
  }
  async function showContent() { setActive("content"); await Promise.all([loadContent(), loadMedia()]); }
  async function showMedia() { setActive("media"); await loadMedia(); }

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice("Đang lưu...");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/admin/content", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, type: contentType, id: editing?.id }) });
    if (!response.ok) { setNotice("Không thể lưu. Hãy kiểm tra slug hoặc dữ liệu bắt buộc."); return; }
    setNotice(editing ? "Đã cập nhật nội dung." : "Đã tạo nội dung mới.");
    setEditing(null); form.reset(); await loadContent();
  }

  async function archive(item: ContentItem) {
    if (!window.confirm(`Chuyển “${item.title}” sang trạng thái lưu trữ?`)) return;
    const response = await fetch(`/api/admin/content?type=${item.type}&id=${item.id}`, { method: "DELETE" });
    setNotice(response.ok ? "Đã lưu trữ nội dung." : "Không thể cập nhật nội dung.");
    if (response.ok) await loadContent();
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice("Đang tải file...");
    const form = event.currentTarget;
    const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(form) });
    if (!response.ok) { setNotice("Tải file thất bại. File phải đúng định dạng và không quá 25 MB."); return; }
    setNotice("Đã tải file vào thư viện media."); form.reset(); await loadMedia();
  }

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand"><img src="/kt-logo.jpg" alt=""/><div><b>KHẢI THIÊN</b><span>Website Console</span></div></div>
      <nav aria-label="Điều hướng quản trị">
        <button className={active === "overview" ? "active" : ""} onClick={() => setActive("overview")}>Tổng quan</button>
        <button className={active === "content" ? "active" : ""} onClick={() => void showContent()}>Nội dung</button>
        <button className={active === "media" ? "active" : ""} onClick={() => void showMedia()}>Hình ảnh & file</button>
      </nav>
      <a href="/" target="_blank">Xem website ↗</a>
    </aside>
    <main className="admin-main">
      <header className="admin-top"><div><span>Quản trị website</span><strong>{adminName}</strong></div><a href="/signout-with-chatgpt?return_to=/">Đăng xuất</a></header>
      {notice && <div className="admin-notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Đóng">×</button></div>}

      {active === "overview" && <section>
        <div className="admin-title"><div><p>Dashboard</p><h1>Nội dung và cơ hội kinh doanh.</h1></div><button onClick={() => void showContent()}>+ Thêm nội dung</button></div>
        <div className="admin-stats">
          <article><span>Nội dung</span><b>{initialStats.content}</b><small>Trang, dịch vụ, dự án, Insights</small></article>
          <article><span>Media</span><b>{initialStats.media}</b><small>Ảnh, video và tài liệu</small></article>
          <article><span>Lead mới</span><b>{initialStats.leads}</b><small>Đang chờ tiếp nhận</small></article>
          <article><span>Đã xuất bản</span><b>{initialStats.published}</b><small>Nội dung công khai</small></article>
        </div>
        <div className="admin-guide"><div><p className="admin-kicker">Quy trình đề xuất</p><h2>Tạo → kiểm tra → xuất bản.</h2></div><ol><li><b>01</b><span>Tải ảnh hoặc tài liệu vào Media.</span></li><li><b>02</b><span>Tạo nội dung và gắn ảnh đại diện.</span></li><li><b>03</b><span>Lưu nháp để kiểm tra trước khi chọn Published.</span></li></ol></div>
      </section>}

      {active === "content" && <section>
        <div className="admin-title"><div><p>Content management</p><h1>Quản lý nội dung.</h1></div></div>
        <div className="admin-tabs">{(Object.keys(labels) as ContentType[]).map(type => <button key={type} className={contentType === type ? "active" : ""} onClick={() => { setContentType(type); setEditing(null); void loadContent(type); }}>{labels[type]}</button>)}</div>
        <div className="admin-content-layout">
          <form className="admin-editor" onSubmit={saveContent} key={`${contentType}-${editing?.id || "new"}`}>
            <h2>{editing ? `Chỉnh sửa ${labels[contentType].toLowerCase()}` : `Thêm ${labels[contentType].toLowerCase()}`}</h2>
            <label>Tiêu đề / Tên *<input name="title" required defaultValue={editing?.title || ""}/></label>
            <label>Slug *<input name="slug" required pattern="[a-z0-9-]+" placeholder="ten-noi-dung" defaultValue={editing?.slug || ""}/></label>
            <label>Mô tả ngắn<textarea name="summary" rows={3} defaultValue={editing?.summary || ""}/></label>
            <label>Nội dung chi tiết<textarea name="body" rows={7} defaultValue={editing?.body || ""}/></label>
            <div className="admin-row"><label>Trạng thái<select name="status" defaultValue={editing?.status || "draft"}><option value="draft">Bản nháp</option><option value="review">Chờ duyệt</option><option value="published">Xuất bản</option><option value="archived">Lưu trữ</option></select></label><label>Ảnh đại diện<select name="mediaId" defaultValue={editing?.mediaId || ""}><option value="">Không chọn</option>{media.filter(item => item.kind === "image").map(item => <option key={item.id} value={item.id}>#{item.id} · {item.fileName}</option>)}</select></label></div>
            <div className="admin-actions"><button type="submit">{editing ? "Lưu thay đổi" : "Tạo nội dung"}</button>{editing && <button type="button" className="secondary" onClick={() => setEditing(null)}>Hủy</button>}</div>
          </form>
          <div className="admin-list"><div className="admin-list-head"><h2>{labels[contentType]} hiện có</h2><span>{items.length} mục</span></div>{items.length === 0 ? <p className="admin-empty">Chưa có dữ liệu trong nhóm này.</p> : items.map(item => <article key={item.id}><div><span className={`status ${item.status}`}>{item.status}</span><h3>{item.title}</h3><small>/{item.slug}</small></div><div><button onClick={() => setEditing(item)}>Sửa</button><button onClick={() => void archive(item)}>Lưu trữ</button></div></article>)}</div>
        </div>
      </section>}

      {active === "media" && <section>
        <div className="admin-title"><div><p>Media library</p><h1>Hình ảnh và tài liệu.</h1></div></div>
        <form className="admin-upload" onSubmit={uploadMedia}><label>Chọn file *<input type="file" name="file" required accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,application/pdf"/></label><label>Alt text / mô tả<input name="altText" maxLength={250} placeholder="Mô tả nội dung hình ảnh"/></label><button>Tải lên R2</button><small>JPG, PNG, WebP, GIF, MP4 hoặc PDF · tối đa 25 MB.</small></form>
        <div className="admin-media-grid">{media.map(item => <article key={item.id}>{item.kind === "image" ? <img src={`/api/admin/media/${item.id}`} alt={item.altText || item.fileName}/> : <div className="admin-file">{item.kind.toUpperCase()}</div>}<div><b>{item.fileName}</b><span>#{item.id} · {item.sizeBytes ? `${Math.ceil(item.sizeBytes / 1024)} KB` : "—"}</span></div></article>)}</div>
      </section>}
    </main>
  </div>;
}
