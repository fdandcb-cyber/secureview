import { compareProductsBySlugs } from "@/features/comparison/repositories/comparison-repository";
import { CompareClient } from "./compare-client";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string; slugs?: string }>;
}) {
  const resolvedParams = await searchParams;
  const paramString = resolvedParams.ids ?? resolvedParams.slugs ?? "hikvision-ds-2cd1043g2-i,dahua-dh-ipc-hdw1439t1-a-led";
  const targetSlugs = paramString.split(",").map((s) => s.trim()).filter(Boolean);

  const { products, rows } = await compareProductsBySlugs(targetSlugs);

  return <CompareClient initialProducts={products} initialRows={rows} />;
}
