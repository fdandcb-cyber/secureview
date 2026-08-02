import { requireAdmin } from "@/lib/auth/require-admin";
import { listAllInquiriesForAdmin } from "@/features/inquiries/repositories/inquiry-repository";
import { AdminInquiriesClient } from "./inquiries-client";

export default async function AdminInquiriesPage() {
  await requireAdmin();
  const inquiries = await listAllInquiriesForAdmin();

  return <AdminInquiriesClient initialInquiries={inquiries} />;
}
