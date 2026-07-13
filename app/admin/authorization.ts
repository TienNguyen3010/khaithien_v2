import { getChatGPTUser } from "../chatgpt-auth";
import { getRuntimeBindings } from "../../db";

export type AdminIdentity = { email: string; displayName: string; userId: number };

export async function getAdminIdentity(bootstrap = false): Promise<AdminIdentity | null> {
  const user = await getChatGPTUser();
  if (!user) return null;

  const { DB } = getRuntimeBindings();
  const existing = await DB.prepare(
    "SELECT id, email, display_name AS displayName FROM admin_users WHERE lower(email) = lower(?) AND status = 'active' LIMIT 1",
  ).bind(user.email).first<{ id: number; email: string; displayName: string }>();
  if (existing) return { email: existing.email, displayName: existing.displayName, userId: existing.id };

  const count = await DB.prepare("SELECT count(*) AS total FROM admin_users WHERE status = 'active'").first<{ total: number }>();
  if (!bootstrap || Number(count?.total ?? 0) > 0) return null;

  const now = Date.now();
  await DB.batch([
    DB.prepare("INSERT OR IGNORE INTO admin_roles (key, name, description, created_at) VALUES ('administrator', 'Quản trị viên', 'Toàn quyền quản trị website.', ?)").bind(now),
    DB.prepare("INSERT OR IGNORE INTO admin_users (email, display_name, status, created_at, updated_at) VALUES (?, ?, 'active', ?, ?)").bind(user.email, user.displayName, now, now),
    DB.prepare(`INSERT OR IGNORE INTO admin_user_roles (user_id, role_id)
      SELECT u.id, r.id FROM admin_users u, admin_roles r
      WHERE lower(u.email) = lower(?) AND r.key = 'administrator'`).bind(user.email),
  ]);

  const created = await DB.prepare(
    "SELECT id, email, display_name AS displayName FROM admin_users WHERE lower(email) = lower(?) AND status = 'active' LIMIT 1",
  ).bind(user.email).first<{ id: number; email: string; displayName: string }>();
  return created ? { email: created.email, displayName: created.displayName, userId: created.id } : null;
}
