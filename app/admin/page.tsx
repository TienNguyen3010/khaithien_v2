import type { Metadata } from "next";
import { getRuntimeBindings } from "../../db";
import { AdminDashboard } from "./admin-dashboard";
import { getAdminIdentity } from "./authorization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Quản trị website", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const admin = await getAdminIdentity(true);
  if (!admin) return <main className="admin-unavailable"><h1>Dashboard chưa sẵn sàng</h1><p>Vui lòng tải lại trang hoặc liên hệ người quản trị Sites.</p></main>;
  const { DB } = getRuntimeBindings();
  let stats = { content: 0, media: 0, leads: 0, published: 0 };
  try {
    const results = await DB.batch([
      DB.prepare("SELECT (SELECT count(*) FROM pages) + (SELECT count(*) FROM services) + (SELECT count(*) FROM projects) + (SELECT count(*) FROM posts) AS value"),
      DB.prepare("SELECT count(*) AS value FROM media_assets WHERE 1=1"),
      DB.prepare("SELECT count(*) AS value FROM leads WHERE status = 'new' AND deleted_at IS NULL"),
      DB.prepare("SELECT (SELECT count(*) FROM pages WHERE status = 'published') + (SELECT count(*) FROM services WHERE status = 'published') + (SELECT count(*) FROM projects WHERE status = 'published') + (SELECT count(*) FROM posts WHERE status = 'published') AS value"),
    ]);
    const value = (index: number) => Number((results[index].results?.[0] as { value?: number } | undefined)?.value ?? 0);
    stats = { content: value(0), media: value(1), leads: value(2), published: value(3) };
  } catch { /* The dashboard remains accessible while migrations settle. */ }
  return <AdminDashboard adminName={admin.displayName} initialStats={stats}/>;
}
