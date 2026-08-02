import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminQuotesClient } from "./quotes-client";

export default async function AdminQuotesPage() {
  await requireAdmin();
  return <AdminQuotesClient />;
}
