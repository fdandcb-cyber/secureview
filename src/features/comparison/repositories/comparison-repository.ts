import { getPublishedProductBySlug } from "@/features/products/repositories/product-repository";
import type { ProductWithSpecs } from "@/features/products/schemas";

export type SpecComparisonRow = {
  fieldKey: string;
  fieldLabel: string;
  plainLanguageExplainer: string;
  isComparisonDefault: boolean;
  values: Array<{
    productSlug: string;
    productName: string;
    displayValue: string;
    rawValue: string | number | boolean;
  }>;
  allSame: boolean;
};

export async function compareProductsBySlugs(
  slugs: string[]
): Promise<{
  products: ProductWithSpecs[];
  rows: SpecComparisonRow[];
  error?: string;
}> {
  if (slugs.length < 2) {
    return {
      products: [],
      rows: [],
      error: "Select at least 2 products to compare.",
    };
  }

  const fetched = await Promise.all(slugs.map((s) => getPublishedProductBySlug(s)));
  const validProducts = fetched.filter((p): p is ProductWithSpecs => p !== null);

  if (validProducts.length < 2) {
    return {
      products: validProducts,
      rows: [],
      error: "One or more compared products could not be loaded.",
    };
  }

  // Collect all unique specs across compared products
  const specMap = new Map<
    string,
    { fieldKey: string; fieldLabel: string; plainLanguageExplainer: string; isComparisonDefault: boolean }
  >();

  validProducts.forEach((p) => {
    p.resolvedSpecs.forEach((s) => {
      if (!specMap.has(s.fieldKey)) {
        specMap.set(s.fieldKey, {
          fieldKey: s.fieldKey,
          fieldLabel: s.fieldLabel,
          plainLanguageExplainer: s.plainLanguageExplainer,
          isComparisonDefault: s.isComparisonDefault,
        });
      }
    });
  });

  const rows: SpecComparisonRow[] = Array.from(specMap.values()).map((meta) => {
    const values = validProducts.map((p) => {
      const spec = p.resolvedSpecs.find((s) => s.fieldKey === meta.fieldKey);
      return {
        productSlug: p.slug,
        productName: p.name,
        displayValue: spec ? spec.displayValue : "N/A",
        rawValue: spec ? spec.rawValue : "N/A",
      };
    });

    const firstVal = values[0]?.displayValue;
    const allSame = values.every((v) => v.displayValue === firstVal);

    return {
      ...meta,
      values,
      allSame,
    };
  });

  // Sort rows putting default comparison fields first
  rows.sort((a, b) => Number(b.isComparisonDefault) - Number(a.isComparisonDefault));

  return { products: validProducts, rows };
}
