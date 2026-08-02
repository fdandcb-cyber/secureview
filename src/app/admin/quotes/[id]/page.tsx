import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminQuoteDetailClient } from "./quote-detail-client";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const resolvedParams = await params;
  return <AdminQuoteDetailClient quoteId={resolvedParams.id} />;
}
