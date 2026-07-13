import { NextResponse } from "next/server";
import { getRuntimeBindings } from "../../../../db";
import { getAdminIdentity } from "../../../admin/authorization";

const MAX_SIZE = 25 * 1024 * 1024;
const allowed = new Map([
  ["image/jpeg", "image"], ["image/png", "image"], ["image/webp", "image"], ["image/gif", "image"],
  ["video/mp4", "video"], ["application/pdf", "document"],
]);
function clean(value: FormDataEntryValue | null, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function safeName(value: string) { return value.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-140) || "media"; }

export async function GET() {
  if (!await getAdminIdentity()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const result = await getRuntimeBindings().DB.prepare("SELECT id, file_name AS fileName, mime_type AS mimeType, kind, alt_text AS altText, size_bytes AS sizeBytes, created_at AS createdAt FROM media_assets ORDER BY created_at DESC LIMIT 100").all();
  return NextResponse.json({ items: result.results });
}

export async function POST(request: Request) {
  const admin = await getAdminIdentity();
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File) || file.size < 1 || file.size > MAX_SIZE || !allowed.has(file.type)) return NextResponse.json({ error: "invalid_file" }, { status: 400 });
  const { DB, MEDIA } = getRuntimeBindings();
  if (!MEDIA) return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  const now = Date.now(); const fileName = safeName(file.name); const key = `media/${new Date().toISOString().slice(0,7)}/${crypto.randomUUID()}-${fileName}`;
  try {
    await MEDIA.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    const result = await DB.prepare("INSERT INTO media_assets (storage_key,file_name,mime_type,kind,alt_text,size_bytes,created_at) VALUES (?,?,?,?,?,?,?)")
      .bind(key, fileName, file.type, allowed.get(file.type), clean(form.get("altText"), 250) || null, file.size, now).run();
    await DB.prepare("INSERT INTO activity_logs (admin_user_id,action,entity_type,entity_id,payload,created_at) VALUES (?,'media.upload','media',?,?,?)")
      .bind(admin.userId, String(result.meta.last_row_id), JSON.stringify({ fileName, mimeType: file.type, size: file.size }), now).run();
    return NextResponse.json({ ok: true, id: Number(result.meta.last_row_id) }, { status: 201 });
  } catch {
    try { await MEDIA.delete(key); } catch { /* best effort */ }
    return NextResponse.json({ error: "upload_failed" }, { status: 503 });
  }
}
