import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the complete public website structure", async () => {
  const routes = [
    "app/page.tsx",
    "app/gioi-thieu/page.tsx",
    "app/dich-vu/page.tsx",
    "app/dich-vu/[slug]/page.tsx",
    "app/du-an/page.tsx",
    "app/du-an/[slug]/page.tsx",
    "app/insights/page.tsx",
    "app/insights/[slug]/page.tsx",
    "app/lien-he/page.tsx",
    "app/gui-brief/page.tsx",
    "app/chinh-sach-bao-mat/page.tsx",
    "app/dieu-khoan-su-dung/page.tsx",
    "app/not-found.tsx",
    "app/sitemap.ts",
    "app/robots.ts",
  ];
  await Promise.all(routes.map((route) => access(new URL(route, root))));
});

test("homepage and shared content use the approved Khai Thien messaging", async () => {
  const [home, content, layout, worker] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("worker/index.ts", root), "utf8"),
  ]);
  assert.match(home, /Kiến tạo sự kiện/);
  assert.match(content, /PR & Integrated Communication/);
  assert.match(content, /Creative & Production/);
  assert.match(content, /Event Management/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(worker, /vinext\/server\/app-router-entry/);
});

test("contact workflow writes to D1 and declares required fields", async () => {
  const [route, schema] = await Promise.all([
    readFile(new URL("app/api/contact/route.ts", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
  ]);
  assert.match(route, /INSERT INTO contacts/);
  assert.match(route, /INSERT INTO leads/);
  assert.match(route, /INSERT INTO project_briefs/);
  assert.match(route, /INSERT INTO consents/);
  assert.match(route, /MEDIA\.put/);
  assert.match(route, /serviceInterest/);
  assert.match(route, /budgetRange/);
  assert.match(schema, /contentRevisions/);
  assert.match(schema, /adminUserRoles/);
  assert.match(schema, /leadAttributions/);
  assert.match(schema, /serviceTranslations/);
});
