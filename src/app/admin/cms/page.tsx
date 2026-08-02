import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminCMSClient } from "./cms-client";

export default async function AdminCMSPage() {
  await requireAdmin();
  return <AdminCMSClient />;
}
