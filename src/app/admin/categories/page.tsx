import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminCategoriesClient } from "./categories-client";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  return <AdminCategoriesClient />;
}
