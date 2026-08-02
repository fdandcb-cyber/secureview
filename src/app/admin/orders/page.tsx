import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminOrdersClient } from "./orders-client";

export default async function AdminOrdersPage() {
  await requireAdmin();
  return <AdminOrdersClient />;
}
