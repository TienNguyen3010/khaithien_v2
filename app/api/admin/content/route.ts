import { NextResponse } from "next/server";
import { getRuntimeBindings } from "../../../../db";
import { getAdminIdentity } from "../../../admin/authorization";

type ContentType = "pages" | "services" | "projects" | "posts";
const allowedTypes = new Set<ContentType>(["pages", "services", "projects", "posts"]);
const allowedStatuses = new Set(["draft", "review", "published", "archived"]);

function contentType(value: string | null): ContentType | null {
  return value && allowedTypes.has(value as ContentType) ? value as ContentType : null;
}
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function numericId(value: unknown) { const id = Number(value); return Number.isInteger(id) && id > 0 ? id : null; }

const listQueries: Record<ContentType, string> = {
  pages: "SELECT id, 'pages' AS type, title, slug, meta_description AS summary, NULL AS body, status, NULL AS mediaId, updated_at AS updatedAt FROM pages ORDER BY updated_at DESC LIMIT 100",
  services: "SELECT id, 'services' AS type, name AS title, slug, summary, description AS body, status, cover_media_id AS mediaId, updated_at AS updatedAt FROM services ORDER BY updated_at DESC LIMIT 100",
  projects: "SELECT id, 'projects' AS type, title, slug, summary, description AS body, status, cover_media_id AS mediaId, updated_at AS updatedAt FROM projects ORDER BY updated_at DESC LIMIT 100",
  posts: "SELECT id, 'posts' AS type, title, slug, excerpt AS summary, content AS body, status, cover_media_id AS mediaId, updated_at AS updatedAt FROM posts ORDER BY updated_at DESC LIMIT 100",
};

export async function GET(request: Request) {
  if (!await getAdminIdentity()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const type = contentType(new URL(request.url).searchParams.get("type"));
  if (!type) return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  const result = await getRuntimeBindings().DB.prepare(listQueries[type]).all();
  return NextResponse.json({ items: result.results });
}

export async function POST(request: Request) {
  const admin = await getAdminIdentity();
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const data = await request.json() as Record<string, unknown>;
    const type = contentType(clean(data.type, 20));
    const id = numericId(data.id);
    const title = clean(data.title, 250);
    const slug = clean(data.slug, 250).toLowerCase();
    const summary = clean(data.summary, 1000) || null;
    const body = clean(data.body, 12000) || summary;
    const status = clean(data.status, 20);
    const mediaId = numericId(data.mediaId);
    if (!type || !title || !/^[a-z0-9-]+$/.test(slug) || !allowedStatuses.has(status)) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    const { DB } = getRuntimeBindings();
    const now = Date.now();

    let statement: D1PreparedStatement;
    if (type === "pages") {
      statement = id
        ? DB.prepare("UPDATE pages SET title=?, slug=?, meta_title=?, meta_description=?, status=?, updated_at=? WHERE id=?").bind(title, slug, title, summary, status, now, id)
        : DB.prepare("INSERT INTO pages (slug,title,meta_title,meta_description,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?)").bind(slug, title, title, summary, status, now, now);
    } else if (type === "services") {
      statement = id
        ? DB.prepare("UPDATE services SET name=?, slug=?, summary=?, description=?, status=?, cover_media_id=?, updated_at=? WHERE id=?").bind(title, slug, summary, body, status, mediaId, now, id)
        : DB.prepare("INSERT INTO services (slug,name,summary,description,status,cover_media_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)").bind(slug, title, summary, body, status, mediaId, now, now);
    } else if (type === "projects") {
      statement = id
        ? DB.prepare("UPDATE projects SET title=?, slug=?, summary=?, description=?, status=?, cover_media_id=?, published_at=CASE WHEN ?='published' THEN coalesce(published_at,?) ELSE published_at END, updated_at=? WHERE id=?").bind(title, slug, summary, body, status, mediaId, status, now, now, id)
        : DB.prepare("INSERT INTO projects (slug,title,summary,description,status,cover_media_id,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)").bind(slug, title, summary, body, status, mediaId, status === "published" ? now : null, now, now);
    } else {
      statement = id
        ? DB.prepare("UPDATE posts SET title=?, slug=?, excerpt=?, content=?, status=?, cover_media_id=?, published_at=CASE WHEN ?='published' THEN coalesce(published_at,?) ELSE published_at END, updated_at=? WHERE id=?").bind(title, slug, summary, body || "", status, mediaId, status, now, now, id)
        : DB.prepare("INSERT INTO posts (slug,title,excerpt,content,status,cover_media_id,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)").bind(slug, title, summary, body || "", status, mediaId, status === "published" ? now : null, now, now);
    }
    const result = await statement.run();
    await DB.prepare("INSERT INTO activity_logs (admin_user_id,action,entity_type,entity_id,payload,created_at) VALUES (?,?,?,?,?,?)")
      .bind(admin.userId, id ? "content.update" : "content.create", type, String(id || result.meta.last_row_id), JSON.stringify({ title, slug, status }), now).run();
    return NextResponse.json({ ok: true, id: id || Number(result.meta.last_row_id) }, { status: id ? 200 : 201 });
  } catch {
    return NextResponse.json({ error: "save_failed" }, { status: 409 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAdminIdentity();
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const type = contentType(url.searchParams.get("type"));
  const id = numericId(url.searchParams.get("id"));
  if (!type || !id) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const { DB } = getRuntimeBindings(); const now = Date.now();
  await DB.prepare(`UPDATE ${type} SET status='archived', updated_at=? WHERE id=?`).bind(now, id).run();
  await DB.prepare("INSERT INTO activity_logs (admin_user_id,action,entity_type,entity_id,created_at) VALUES (?,'content.archive',?,?,?)").bind(admin.userId, type, String(id), now).run();
  return NextResponse.json({ ok: true });
}
