export type AdminIdentity = { email: string; displayName: string; userId: number };

const sitesOwner: AdminIdentity = {
  email: "sites-owner@local",
  displayName: "Chủ sở hữu website",
  userId: 0,
};

/**
 * This dashboard is published behind Sites owner-only access. Authentication
 * is enforced before the request reaches the application. Keeping page
 * identity independent from request headers and D1 prevents a temporary
 * database or header issue from taking down the whole dashboard.
 */
export async function getAdminIdentity(): Promise<AdminIdentity> {
  return sitesOwner;
}
