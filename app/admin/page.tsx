import type { Metadata } from "next";
import { AdminDashboard } from "./admin-dashboard";
import { getAdminIdentity } from "./authorization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Quản trị website", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const admin = await getAdminIdentity();
  return <AdminDashboard adminName={admin.displayName} initialStats={{ content: 0, media: 0, leads: 0, published: 0 }}/>;
}
