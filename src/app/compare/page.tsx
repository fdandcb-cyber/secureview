"use client";

import { useState } from "react";
import Link from "next/link";
import { GitCompare, Plus, X, ArrowRight, Check, Minus } from "lucide-react";

const availableProducts = [
  { id: "1", name: "Hikvision DS-2CD1043G2-I", brand: "Hikvision", category: "IP Camera" },
  { id: "2", name: "Dahua DH-IPC-HDW1439T1-A-LED", brand: "Dahua", category: "IP Camera" },
  { id: "3", name: "CP Plus CP-UNC-TA41L3-D", brand: "CP Plus", category: "IP Camera" },
  { id: "4", name: "Hikvision DS-7604NXI-K1/4P", brand: "Hikvision", category: "NVR" },
  { id: "5", name: "Dahua DHI-NVR2104HS-P-S3", brand: "Dahua", category: "NVR" },
] as const;

type ComparisonSpec = {
  label: string;
  values: (string | boolean)[];
  highlight?: boolean;
};

const comparisonData: Record<string, { name: string; brand: string; specs: ComparisonSpec[] }> = {
  "1": {
    name: "Hikvision DS-2CD1043G2-I",
    brand: "Hikvision",
    specs: [
      { label: "Resolution", values: ["4MP (2560×1440)"] },
      { label: "Sensor", values: ['1/3" Progressive CMOS'] },
      { label: "Lens", values: ["2.8mm fixed"] },
      { label: "FOV", values: ["103°"] },
      { label: "Night Vision", values: ["IR 30m"] },
      { label: "WDR", values: ["Digital WDR"] },
      { label: "Weatherproofing", values: ["IP67"] },
      { label: "PoE", values: ["802.3af (max 7W)"] },
      { label: "Codec", values: ["H.265+ / H.265 / H.264"] },
      { label: "ONVIF", values: [true] },
      { label: "Built-in Mic", values: [false] },
      { label: "MicroSD Slot", values: [true] },
      { label: "Price", values: ["₹3,200"] },
    ],
  },
  "2": {
    name: "Dahua DH-IPC-HDW1439T1-A-LED",
    brand: "Dahua",
    specs: [
      { label: "Resolution", values: ["4MP (2688×1520)"] },
      { label: "Sensor", values: ['1/3" Progressive CMOS'] },
      { label: "Lens", values: ["2.8mm fixed"] },
      { label: "FOV", values: ["101°"] },
      { label: "Night Vision", values: ["Full-Color LED 30m"] },
      { label: "WDR", values: ["Digital WDR"] },
      { label: "Weatherproofing", values: ["IP67"] },
      { label: "PoE", values: ["802.3af (max 5.6W)"] },
      { label: "Codec", values: ["H.265 / H.264"] },
      { label: "ONVIF", values: [true] },
      { label: "Built-in Mic", values: [true] },
      { label: "MicroSD Slot", values: [true] },
      { label: "Price", values: ["₹3,800"] },
    ],
  },
  "3": {
    name: "CP Plus CP-UNC-TA41L3-D",
    brand: "CP Plus",
    specs: [
      { label: "Resolution", values: ["4MP (2560×1440)"] },
      { label: "Sensor", values: ['1/3" Progressive CMOS'] },
      { label: "Lens", values: ["3.6mm fixed"] },
      { label: "FOV", values: ["84°"] },
      { label: "Night Vision", values: ["IR 30m"] },
      { label: "WDR", values: ["DWDR"] },
      { label: "Weatherproofing", values: ["IP67"] },
      { label: "PoE", values: ["802.3af (max 7W)"] },
      { label: "Codec", values: ["H.265 / H.264"] },
      { label: "ONVIF", values: [true] },
      { label: "Built-in Mic", values: [false] },
      { label: "MicroSD Slot", values: [false] },
      { label: "Price", values: ["₹2,600"] },
    ],
  },
};

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);

  const addProduct = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeProduct = (id: string) => {
    setSelectedIds(selectedIds.filter((s) => s !== id));
  };

  const selectedProducts = selectedIds
    .map((id) => comparisonData[id])
    .filter(Boolean);

  // Build merged spec rows
  const specLabels = selectedProducts.length > 0
    ? selectedProducts[0].specs.map((s) => s.label)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
            Comparison Engine
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Compare Specs Side by Side
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
            Real specification differences highlighted, with plain-language
            explanations — not marketing feature lists.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0 border border-slate-200 self-start sm:self-auto">
          <span>⏱ 4 min matrix scan</span>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          3 Critical Spec Rows to Compare
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>FOV & Lens:</strong> 2.8mm (103° wide angle) vs 3.6mm (84° focused).
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>Night Vision Type:</strong> Black & White IR (30m) vs Full-Color LED.
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>MicroSD & Mic:</strong> Standalone recording & audio capability.
          </li>
        </ul>
      </div>

      {/* Product selector */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {selectedIds.map((id) => {
          const product = comparisonData[id];
          if (!product) return null;
          return (
            <div
              key={id}
              className="flex items-center gap-2 rounded-full border border-primary-600 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700"
            >
              {product.name.split(" ").slice(0, 2).join(" ")}
              <button
                onClick={() => removeProduct(id)}
                aria-label={`Remove ${product.name}`}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-700/10 transition hover:bg-primary-700/20"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}

        {selectedIds.length < 3 && (
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) addProduct(e.target.value);
                e.target.value = "";
              }}
              className="rounded-full border border-dashed border-slate-300 bg-white px-4 py-2 text-sm text-slate-500 transition hover:border-primary-600 hover:text-primary-700 focus:border-primary-600 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                + Add product ({3 - selectedIds.length} remaining)
              </option>
              {availableProducts
                .filter((p) => !selectedIds.includes(p.id))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison table */}
      {selectedProducts.length >= 2 ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-48 border-b border-slate-200 bg-slate-50 p-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Specification
                </th>
                {selectedProducts.map((product) => (
                  <th
                    key={product.name}
                    className="border-b border-slate-200 bg-slate-50 p-4 text-left"
                  >
                    <p className="text-xs text-slate-500">{product.brand}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-950">
                      {product.name.replace(product.brand + " ", "")}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specLabels.map((label, rowIdx) => {
                const values = selectedProducts.map(
                  (p) => p.specs[rowIdx]?.values[0]
                );
                const allSame = values.every((v) => v === values[0]);

                return (
                  <tr
                    key={label}
                    className={
                      rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }
                  >
                    <td className="sticky left-0 z-10 border-b border-slate-100 bg-inherit p-4 text-sm font-medium text-slate-700">
                      {label}
                    </td>
                    {values.map((value, colIdx) => (
                      <td
                        key={colIdx}
                        className={`border-b border-slate-100 p-4 text-sm ${
                          !allSame
                            ? "font-medium text-slate-950"
                            : "text-slate-700"
                        }`}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="h-5 w-5 text-success-600" />
                          ) : (
                            <Minus className="h-5 w-5 text-slate-300" />
                          )
                        ) : (
                          <span
                            className={
                              !allSame
                                ? "rounded bg-primary-50 px-2 py-0.5"
                                : ""
                            }
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-slate-300 bg-white py-16 text-center">
          <GitCompare
            className="mx-auto h-10 w-10 text-slate-300"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-slate-700">
            Select at least 2 products to compare
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Use the selector above to add products to the comparison
          </p>
        </div>
      )}

      {/* Summary section */}
      {selectedProducts.length >= 2 && (
        <section className="mt-10 rounded-card border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-950">
            Key differences to consider
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
              <span>
                <strong className="text-slate-950">Night vision approach:</strong>{" "}
                IR cameras switch to black-and-white at night. Full-Color LED
                cameras maintain color but need more power and produce visible
                light that may be noticed.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
              <span>
                <strong className="text-slate-950">FOV trade-off:</strong>{" "}
                A wider angle (2.8mm) covers more area but each pixel covers
                more ground — you get coverage at the cost of detail for
                identification at distance.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
              <span>
                <strong className="text-slate-950">Built-in audio:</strong>{" "}
                Useful for entry points and retail — but check local
                regulations on audio recording. Not all NVRs support audio
                passthrough on every channel.
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <Link
              href="/plan/calculators"
              className="inline-flex items-center rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Size your system
            </Link>
            <Link
              href="/plan/quote"
              className="inline-flex items-center rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700"
            >
              Build a quote
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
