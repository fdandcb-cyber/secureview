"use client";

import { useState } from "react";
import Link from "next/link";
import { GitCompare, X, ArrowRight, Check, Minus } from "lucide-react";
import type { ProductWithSpecs } from "@/features/products/schemas";
import type { SpecComparisonRow } from "@/features/comparison/repositories/comparison-repository";

export function CompareClient({
  initialProducts,
  initialRows,
}: {
  initialProducts: ProductWithSpecs[];
  initialRows: SpecComparisonRow[];
}) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialProducts.map((p) => p.slug)
  );
  const [hideIdentical, setHideIdentical] = useState(false);

  const activeProducts = initialProducts.filter((p) =>
    selectedSlugs.includes(p.slug)
  );

  const displayRows = initialRows.filter(
    (row) => !hideIdentical || !row.allSame
  );

  const handleRemoveProduct = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
            <GitCompare className="h-4 w-4" /> Specification Comparison Matrix
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Side-by-Side Camera Spec Comparison
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Objective parameter comparison with plain-language explainers and verified manufacturer specs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-100 px-3 py-2 rounded-lg">
            <input
              type="checkbox"
              checked={hideIdentical}
              onChange={(e) => setHideIdentical(e.target.checked)}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            Hide Identical Specs
          </label>
        </div>
      </div>

      {activeProducts.length < 2 ? (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <GitCompare className="h-12 w-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">
            Select At Least 2 Products to Compare
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Browse our verified security camera catalog to add models into the comparison matrix.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white font-semibold text-xs rounded-lg hover:bg-primary-600 transition"
          >
            Browse Products Catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 min-w-[200px] w-1/4">Specification Parameter</th>
                  {activeProducts.map((p) => (
                    <th key={p.id} className="p-4 min-w-[220px] relative">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                            {p.brandName}
                          </span>
                          <h3 className="text-sm font-bold text-white leading-snug">
                            {p.name}
                          </h3>
                          <p className="text-xs text-primary-300 font-bold mt-1">
                            ₹{p.base_price_inr.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveProduct(p.slug)}
                          className="p-1 text-slate-400 hover:text-white transition rounded"
                          title="Remove from comparison"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayRows.map((row) => (
                  <tr key={row.fieldKey} className="hover:bg-slate-50 transition">
                    <td className="p-4 bg-slate-50/50">
                      <span className="font-bold text-slate-900 block">{row.fieldLabel}</span>
                      <span className="text-[11px] text-slate-500 italic block mt-0.5">
                        &ldquo;{row.plainLanguageExplainer}&rdquo;
                      </span>
                    </td>
                    {activeProducts.map((p) => {
                      const valObj = row.values.find((v) => v.productSlug === p.slug);
                      const displayVal = valObj ? valObj.displayValue : "N/A";
                      const rawVal = valObj ? valObj.rawValue : false;

                      return (
                        <td key={p.id} className="p-4 font-medium text-slate-800">
                          {typeof rawVal === "boolean" ? (
                            rawVal ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                <Check className="h-4 w-4" /> Supported
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <Minus className="h-4 w-4" /> No
                              </span>
                            )
                          ) : (
                            <span>{displayVal}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
