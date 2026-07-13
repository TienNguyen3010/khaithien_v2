interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const assetPaths = new Set([
  "/landing.html",
  "/kt-logo.jpg",
  "/kt-landpage.png",
  "/og.png",
  "/favicon.svg",
]);

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function saveContact(request: Request, env: Env) {
  try {
    const data = (await request.json()) as Record<string, unknown>;
    const name = text(data.name, 120);
    const phone = text(data.phone, 40);
    const message = text(data.message, 4000);
    const consent = data.consent === true || data.consent === "true";

    if (!name || !phone || !message || !consent) {
      return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
    }

    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT,
      phone TEXT NOT NULL,
      service_interest TEXT,
      planned_start TEXT,
      budget_range TEXT,
      message TEXT NOT NULL,
      consent INTEGER NOT NULL DEFAULT 0,
      source TEXT NOT NULL DEFAULT 'website-v2',
      status TEXT NOT NULL DEFAULT 'new',
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    )`).run();

    await env.DB.prepare(`INSERT INTO contact_submissions
      (name, company, email, phone, service_interest, planned_start, budget_range, message, consent, source, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'website-v2', 'new')`)
      .bind(
        name,
        text(data.company, 160) || null,
        text(data.email, 160) || null,
        phone,
        text(data.serviceInterest, 80) || null,
        text(data.plannedStart, 80) || null,
        text(data.budgetRange, 80) || null,
        message,
      )
      .run();

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return saveContact(request, env);
    }

    if (assetPaths.has(url.pathname) || url.pathname.startsWith("/assets/")) {
      return env.ASSETS.fetch(request);
    }

    if (request.method === "GET" || request.method === "HEAD") {
      const landingUrl = new URL("/landing.html", request.url);
      return env.ASSETS.fetch(new Request(landingUrl, request));
    }

    return new Response("Method Not Allowed", { status: 405 });
  },
};
