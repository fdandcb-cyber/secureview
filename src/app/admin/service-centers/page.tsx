import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminServiceCentersClient } from "./service-centers-client";

export default async function AdminServiceCentersPage() {
  await requireAdmin();
  return <AdminServiceCentersClient />;
}
