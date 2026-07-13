import { getRuntimeBindings } from "../../../../db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id); if (!Number.isInteger(id) || id < 1) return new Response("Not found", { status: 404 });
  const { DB, MEDIA } = getRuntimeBindings();
  const media = await DB.prepare(`SELECT m.storage_key AS storageKey,m.mime_type AS mimeType,m.file_name AS fileName
    FROM media_assets m WHERE m.id=? AND (
      EXISTS(SELECT 1 FROM services s WHERE s.cover_media_id=m.id AND s.status='published') OR
      EXISTS(SELECT 1 FROM projects p WHERE p.cover_media_id=m.id AND p.status='published') OR
      EXISTS(SELECT 1 FROM posts a WHERE a.cover_media_id=m.id AND a.status='published')
    ) LIMIT 1`).bind(id).first<{ storageKey: string; mimeType: string; fileName: string }>();
  if (!media || !MEDIA) return new Response("Not found", { status: 404 });
  const object = await MEDIA.get(media.storageKey); if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("content-type", media.mimeType); headers.set("cache-control", "public, max-age=3600, stale-while-revalidate=86400"); headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}
