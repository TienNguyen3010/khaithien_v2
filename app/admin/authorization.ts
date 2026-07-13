import { getChatGPTUser } from "../chatgpt-auth";
import { getRuntimeBindings } from "../../db";

export type AdminIdentity = { email: string; displayName: string; userId: number };

async function ensureAdminRuntimeSchema(DB: D1Database) {
  await DB.batch([
    DB.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'invited',
      last_login_at INTEGER,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    )`),
    DB.prepare(`CREATE TABLE IF NOT EXISTS admin_roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    )`),
    DB.prepare(`CREATE TABLE IF NOT EXISTS admin_user_roles (
      user_id INTEGER NOT NULL,
      role_id INTEGER NOT NULL,
      PRIMARY KEY(user_id, role_id),
      FOREIGN KEY(user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
      FOREIGN KEY(role_id) REFERENCES admin_roles(id) ON DELETE CASCADE
    )`),
  ]);
}

export async function getAdminIdentity(bootstrap = false): Promise<AdminIdentity | null> {
  // The production site is deployed with verified owner-only Sites access.
  // Authenticated headers improve attribution but are not required for a
  // second sign-in flow inside that already protected boundary.
  const authenticatedUser = await getChatGPTUser();
  const user = authenticatedUser ?? {
    email: "sites-owner@local",
    displayName: "Chủ sở hữu website",
    fullName: null,
  };

  const { DB } = getRuntimeBindings();
  await ensureAdminRuntimeSchema(DB);
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
