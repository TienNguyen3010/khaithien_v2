import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { contactSubmissions } from "../../../db/schema";

function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, unknown>;
    const name = clean(data.name, 120); const phone = clean(data.phone, 40); const email = clean(data.email, 160); const message = clean(data.message, 4000); const consent = data.consent === "true" || data.consent === true;
    if (!name || !phone || !message || !consent) return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
    await getDb().insert(contactSubmissions).values({ name, company: clean(data.company, 160) || null, email: email || null, phone, serviceInterest: clean(data.serviceInterest, 80) || null, plannedStart: clean(data.plannedStart, 80) || null, budgetRange: clean(data.budgetRange, 80) || null, message, consent: true, source: "website-v2", status: "new" });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 }); }
}
