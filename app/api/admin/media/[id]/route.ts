import { NextResponse } from "next/server";
import { getRuntimeBindings } from "../../../../../db";
import { getAdminIdentity } from "../../../../admin/authorization";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminIdentity()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = Number((await params).id); if (!Number.isInteger(id) || id < 1) return new Response("Not found", { status: 404 });
  const { DB, MEDIA } = getRuntimeBindings();
  const media = await DB.prepare("SELECT storage_key AS storageKey, mime_type AS mimeType, file_name AS fileName FROM media_assets WHERE id=? LIMIT 1").bind(id).first<{ storageKey: string; mimeType: string; fileName: string }>();
  if (!media || !MEDIA) return new Response("Not found", { status: 404 });
  const object = await MEDIA.get(media.storageKey); if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("content-type", media.mimeType); headers.set("cache-control", "private, max-age=300"); headers.set("content-disposition", `inline; filename="${media.fileName.replace(/[\"\\]/g, "-")}"`);
  return new Response(object.body, { headers });
}
