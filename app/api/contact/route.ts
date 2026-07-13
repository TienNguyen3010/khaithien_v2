import { NextResponse } from "next/server";
import { getRuntimeBindings } from "../../../db";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeFileName(value: string) {
  return value.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-120) || "brief";
}

export async function POST(request: Request) {
  let uploadedKey: string | null = null;
  try {
    const form = await request.formData();
    if (clean(form.get("website"), 100)) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const name = clean(form.get("name"), 120);
    const company = clean(form.get("company"), 160);
    const jobTitle = clean(form.get("jobTitle"), 120);
    const email = clean(form.get("email"), 160).toLowerCase();
    const phone = clean(form.get("phone"), 40);
    const serviceInterest = clean(form.get("serviceInterest"), 80);
    const projectType = clean(form.get("projectType"), 120);
    const objective = clean(form.get("objective"), 1500);
    const plannedStart = clean(form.get("plannedStart"), 80);
    const location = clean(form.get("location"), 250);
    const attendeeValue = clean(form.get("attendeeCount"), 12);
    const attendeeCount = attendeeValue ? Number.parseInt(attendeeValue, 10) : null;
    const budgetRange = clean(form.get("budgetRange"), 80);
    const message = clean(form.get("message"), 4000);
    const preferredChannel = clean(form.get("preferredChannel"), 20);
    const preferredContactTime = clean(form.get("preferredContactTime"), 120);
    const privacyConsent = form.get("privacyConsent") === "true";
    const marketingConsent = form.get("marketingConsent") === "true";
    const idempotencyKey = clean(form.get("idempotencyKey"), 80) || crypto.randomUUID();

    if (!name || !email || !phone || !serviceInterest || !objective || !message || !privacyConsent) {
      return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email) || (attendeeCount !== null && (!Number.isFinite(attendeeCount) || attendeeCount < 1))) {
      return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
    }

    const file = form.get("briefFile");
    if (file instanceof File && file.size > 0 && (!ACCEPTED_FILE_TYPES.has(file.type) || file.size > MAX_FILE_SIZE)) {
      return NextResponse.json({ ok: false, error: "invalid_attachment" }, { status: 400 });
    }

    const { DB, MEDIA } = getRuntimeBindings();
    const duplicate = await DB.prepare("SELECT id FROM leads WHERE idempotency_key = ? LIMIT 1").bind(idempotencyKey).first();
    if (duplicate) return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });

    const contactId = crypto.randomUUID();
    const leadId = crypto.randomUUID();
    const now = Date.now();
    let mediaId: number | null = null;

    if (file instanceof File && file.size > 0) {
      if (!MEDIA) return NextResponse.json({ ok: false, error: "attachment_service_unavailable" }, { status: 503 });
      uploadedKey = `briefs/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      await MEDIA.put(uploadedKey, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
      const media = await DB.prepare(`INSERT INTO media_assets
        (storage_key, file_name, mime_type, kind, size_bytes, created_at)
        VALUES (?, ?, ?, 'document', ?, ?)`)
        .bind(uploadedKey, safeFileName(file.name), file.type, file.size, now)
        .run();
      mediaId = Number(media.meta.last_row_id);
    }

    const source = clean(form.get("utmSource"), 100) || "website";
    const medium = clean(form.get("utmMedium"), 100) || null;
    const campaign = clean(form.get("utmCampaign"), 160) || null;
    const landingPage = clean(form.get("landingPage"), 500) || "/gui-brief";
    const referrer = clean(form.get("referrer"), 500) || null;

    const statements = [
      DB.prepare(`INSERT INTO contacts
        (id, full_name, company_name, job_title, email, phone, preferred_channel, locale, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'vi', ?, ?)`)
        .bind(contactId, name, company || null, jobTitle || null, email, phone, preferredChannel || null, now, now),
      DB.prepare(`INSERT INTO leads
        (id, contact_id, service_id, status, priority, subject, message, source, idempotency_key, submitted_at, created_at, updated_at)
        VALUES (?, ?, (SELECT id FROM services WHERE slug = ? LIMIT 1), 'new', 'normal', ?, ?, ?, ?, ?, ?, ?)`)
        .bind(leadId, contactId, serviceInterest, projectType || serviceInterest, message, source, idempotencyKey, now, now, now),
      DB.prepare(`INSERT INTO project_briefs
        (lead_id, project_type, objective, expected_start_date, location_text, attendee_count, budget_range, budget_status, requirements, preferred_contact_time, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(leadId, projectType || null, objective, plannedStart || null, location || null, attendeeCount, budgetRange || null, budgetRange ? "range" : "undetermined", message, preferredContactTime || null, now, now),
      DB.prepare(`INSERT INTO consents
        (id, contact_id, lead_id, consent_type, status, policy_version, capture_source, captured_at)
        VALUES (?, ?, ?, 'privacy', 'granted', '2026-07', 'brief-form', ?)`)
        .bind(crypto.randomUUID(), contactId, leadId, now),
      DB.prepare(`INSERT INTO lead_activities
        (id, lead_id, activity_type, new_status, content, occurred_at)
        VALUES (?, ?, 'submission', 'new', 'Brief submitted from website', ?)`)
        .bind(crypto.randomUUID(), leadId, now),
      DB.prepare(`INSERT INTO lead_attributions
        (id, lead_id, touch_type, source, medium, campaign, landing_page, referrer, captured_at)
        VALUES (?, ?, 'submission', ?, ?, ?, ?, ?, ?)`)
        .bind(crypto.randomUUID(), leadId, source, medium, campaign, landingPage, referrer, now),
    ];
    if (marketingConsent) {
      statements.push(DB.prepare(`INSERT INTO consents
        (id, contact_id, lead_id, consent_type, status, policy_version, capture_source, captured_at)
        VALUES (?, ?, ?, 'marketing', 'granted', '2026-07', 'brief-form', ?)`)
        .bind(crypto.randomUUID(), contactId, leadId, now));
    }
    if (mediaId !== null) {
      statements.push(DB.prepare("INSERT INTO lead_attachments (lead_id, media_id, attachment_type, created_at) VALUES (?, ?, 'brief', ?)")
        .bind(leadId, mediaId, now));
    }
    await DB.batch(statements);

    return NextResponse.json({ ok: true, reference: leadId.slice(0, 8).toUpperCase() }, { status: 201 });
  } catch {
    if (uploadedKey) {
      try { await getRuntimeBindings().MEDIA?.delete(uploadedKey); } catch { /* cleanup is best effort */ }
    }
    return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }
}
