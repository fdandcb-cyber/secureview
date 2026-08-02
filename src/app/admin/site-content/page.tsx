import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminSiteContentClient } from "./site-content-client";

export default async function AdminSiteContentPage() {
  await requireAdmin();
  return <AdminSiteContentClient />;
}
