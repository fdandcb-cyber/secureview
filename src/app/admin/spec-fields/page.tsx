import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminSpecFieldsClient } from "./spec-fields-client";

export default async function AdminSpecFieldsPage() {
  await requireAdmin();
  return <AdminSpecFieldsClient />;
}
