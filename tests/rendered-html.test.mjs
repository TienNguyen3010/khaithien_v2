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
    "app/khach-hang/page.tsx",
    "app/tin-tuc/page.tsx",
    "app/tin-tuc/[slug]/page.tsx",
    "app/lien-he/page.tsx",
    "app/chinh-sach-bao-mat/page.tsx",
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
  assert.match(content, /PR & Communication/);
  assert.match(content, /Production House/);
  assert.match(layout, /application\/ld\+json/);
  assert.doesNotMatch(worker, /landing\.html/);
});

test("contact workflow writes to D1 and declares required fields", async () => {
  const [route, schema] = await Promise.all([
    readFile(new URL("app/api/contact/route.ts", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
  ]);
  assert.match(route, /contactSubmissions/);
  assert.match(route, /serviceInterest/);
  assert.match(route, /budgetRange/);
  assert.match(schema, /contentRevisions/);
  assert.match(schema, /adminUserRoles/);
});
