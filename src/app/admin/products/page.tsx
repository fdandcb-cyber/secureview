import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminProductsClient } from "./products-client";

export default async function AdminProductsPage() {
  await requireAdmin();
  return <AdminProductsClient />;
}
