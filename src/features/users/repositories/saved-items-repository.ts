import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublishedProductById } from "@/features/products/repositories/product-repository";

export type SavedProductItem = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  name: string;
  model_number: string;
  base_price_inr: number;
  primary_image_url: string | null;
  categorySlug: string;
};

export type SavedComparisonItem = {
  id: string;
  user_id: string;
  name: string;
  product_ids: string[];
  created_at: string;
};

const memorySavedProducts: SavedProductItem[] = [
  {
    id: "sp-1",
    user_id: "demo-user",
    product_id: "hikvision-ds-2cd1043g2-i",
    created_at: "2026-08-01T10:00:00Z",
    name: "Hikvision DS-2CD1043G2-I (4MP IP Bullet)",
    model_number: "DS-2CD1043G2-I",
    base_price_inr: 3200,
    primary_image_url: null,
    categorySlug: "dome-cameras",
  },
];

const memorySavedComparisons: SavedComparisonItem[] = [
  {
    id: "sc-1",
    user_id: "demo-user",
    name: "4MP Outdoor Bullet vs Dome Comparison",
    product_ids: ["hikvision-ds-2cd1043g2-i", "dahua-dh-ipc-hdw1439t1-a-led"],
    created_at: "2026-07-30T14:20:00Z",
  },
];

export async function getSavedProductsForUser(): Promise<SavedProductItem[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("saved_products")
        .select("*, products(*)")
        .eq("user_id", user.id);

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          user_id: item.user_id,
          product_id: item.product_id,
          created_at: item.created_at,
          name: item.products?.name ?? "CCTV Camera",
          model_number: item.products?.model_number ?? "N/A",
          base_price_inr: Number(item.products?.base_price_inr ?? 0),
          primary_image_url: item.products?.primary_image_url ?? null,
          categorySlug: "dome-cameras",
        }));
      }
    }
  } catch {
    // Fallback to memory
  }

  return memorySavedProducts;
}

export async function toggleSaveProduct(productId: string): Promise<boolean> {
  const existing = memorySavedProducts.findIndex((p) => p.product_id === productId);
  if (existing >= 0) {
    memorySavedProducts.splice(existing, 1);
    return false;
  }

  const product = await getPublishedProductById(productId);
  memorySavedProducts.push({
    id: `sp-${Date.now()}`,
    user_id: "demo-user",
    product_id: productId,
    created_at: new Date().toISOString(),
    name: product?.name ?? "CCTV Camera",
    model_number: product?.model_number ?? "N/A",
    base_price_inr: product?.base_price_inr ?? 0,
    primary_image_url: product?.primary_image_url ?? null,
    categorySlug: product?.categorySlug ?? "dome-cameras",
  });
  return true;
}

export async function getSavedComparisonsForUser(): Promise<SavedComparisonItem[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("saved_comparisons")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data && data.length > 0) {
        return data as SavedComparisonItem[];
      }
    }
  } catch {
    // Fallback
  }

  return memorySavedComparisons;
}
