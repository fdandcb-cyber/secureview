import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedProductsByCategory } from "@/features/products/repositories/product-repository";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dome & Bullet Cameras Catalog — Verified Specifications",
  description:
    "Browse verified 4MP and 4K IP security cameras with plain-language spec explainers and channel warranty status.",
};

export default async function DomeCamerasCategoryPage() {
  const products = await listPublishedProductsByCategory("dome-cameras");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Category Header */}
      <div className="border-b border-slate-200 pb-6">
        <Badge tone="primary" className="mb-2">
          Category Catalog
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Dome & Bullet Security Cameras
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
          Indoor and outdoor security cameras backed by verified specifications,
          field of view ratings, and plain-language technical explainers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block"
          >
            <Card className="h-full transition hover:border-primary-600 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">{product.brandName}</Badge>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.warranty_months} Months Warranty
                  </span>
                </div>

                <h2 className="mt-4 text-base font-bold text-slate-950 group-hover:text-primary-700">
                  {product.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Model: {product.model_number}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                  {product.short_description}
                </p>

                {/* Resolved specs preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                  {product.resolvedSpecs.slice(0, 3).map((spec) => (
                    <div
                      key={spec.fieldKey}
                      className="flex items-center justify-between text-slate-700"
                    >
                      <span className="text-slate-500">{spec.fieldLabel}:</span>
                      <span className="font-semibold text-slate-900">
                        {spec.displayValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-950">
                  ₹{product.base_price_inr.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-semibold text-primary-700 group-hover:underline">
                  View Full Specs →
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
