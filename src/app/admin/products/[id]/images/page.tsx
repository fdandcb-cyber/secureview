import { requireAdmin } from "@/lib/auth/require-admin";
import { ProductImagesClient } from "./images-client";

export default async function ProductImagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const resolvedParams = await params;
  return <ProductImagesClient productId={resolvedParams.id} />;
}
