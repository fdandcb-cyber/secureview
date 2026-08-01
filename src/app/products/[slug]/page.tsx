import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProductBySlug } from "@/features/products/repositories/product-repository";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Info, CheckCircle2, ArrowLeft } from "lucide-react";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — Full Verified Specifications`,
    description: product.short_description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sourceLabels = {
    manufacturer: "Manufacturer-stated",
    verified_test: "Independently verified",
    editorial: "Editorial assessment",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/products" className="hover:text-primary-700">
          Products
        </Link>
        <span>/</span>
        <Link href="/products/dome-cameras" className="hover:text-primary-700">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">{product.name}</span>
      </nav>

      {/* Main Product Header Card */}
      <Card className="p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge tone="primary">{product.brandName}</Badge>
              <Badge tone="success">
                {product.warranty_months} Months Warranty
              </Badge>
              {product.is_verified_spec && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Specs
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              {product.name}
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-mono">
              Model Number: {product.model_number}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl font-bold text-slate-950 block">
              ₹{product.base_price_inr.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-500">
              Indicative Price (GST Inclusive)
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">
          {product.long_description || product.short_description}
        </p>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
          <Link href={`/compare?ids=${product.slug}`}>
            <Button variant="primary">Compare This Product</Button>
          </Link>
          <Link href="/plan/quote">
            <Button variant="secondary">Add to Quote</Button>
          </Link>
        </div>
      </Card>

      {/* Resolved Data-Driven Specifications Table with Explainers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">
            Technical Specifications & Explainers
          </h2>
          <span className="text-xs text-slate-500">
            {product.resolvedSpecs.length} specs resolved
          </span>
        </div>

        <div className="space-y-4">
          {product.resolvedSpecs.map((spec) => (
            <Card key={spec.fieldKey} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                    {spec.fieldLabel}
                  </span>
                  <span className="text-lg font-bold text-slate-950 block">
                    {spec.displayValue}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 shrink-0">
                  Source: {sourceLabels[spec.source]}
                </span>
              </div>

              {/* Required Plain Language Explainer */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-control">
                <Info className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950">What this means: </strong>
                  {spec.plainLanguageExplainer}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Warranty Terms Section */}
      <Card className="p-6 bg-primary-50/50 border-primary-200">
        <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary-700" />
          Warranty Coverage & Service Path
        </h3>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">
          {product.warranty_terms}
        </p>
        <div className="mt-4 pt-3 border-t border-primary-200/60 flex items-center justify-between text-xs text-primary-900 font-semibold">
          <span>Official Brand Channel Required</span>
          <Link href="/service/warranty" className="hover:underline">
            Read Warranty Guide →
          </Link>
        </div>
      </Card>
    </div>
  );
}
