import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminBrandsClient } from "./brands-client";

export default async function AdminBrandsPage() {
  await requireAdmin();
  return <AdminBrandsClient />;
}
