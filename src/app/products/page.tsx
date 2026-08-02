"use client";

import Link from "next/link";
import { Filter, ChevronDown, Star } from "lucide-react";
import { useState } from "react";

const categories = [
  { label: "All Products", value: "all" },
  { label: "IP Cameras", value: "ip-cameras" },
  { label: "Analog Cameras", value: "analog-cameras" },
  { label: "NVRs", value: "nvrs" },
  { label: "DVRs", value: "dvrs" },
  { label: "Hard Drives", value: "hdds" },
  { label: "PoE Switches", value: "poe-switches" },
  { label: "Cables & Connectors", value: "cables" },
  { label: "Power Supplies & UPS", value: "power" },
  { label: "Complete Kits", value: "kits" },
  { label: "Accessories", value: "accessories" },
] as const;

const brands = [
  "Hikvision",
  "Dahua",
  "CP Plus",
  "Uniview",
  "Honeywell",
  "Godrej",
] as const;

const products = [
  {
    id: "1",
    name: "Hikvision DS-2CD1043G2-I",
    brand: "Hikvision",
    category: "ip-cameras",
    resolution: "4MP",
    specs: ["4MP · 2.8mm · IP67 · 30m IR · PoE · H.265+"],
    price: "₹3,200",
    rating: 4.5,
    reviews: 128,
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Dahua DH-IPC-HDW1439T1-A-LED",
    brand: "Dahua",
    category: "ip-cameras",
    resolution: "4MP",
    specs: ["4MP · 2.8mm · IP67 · Full-Color · PoE · Built-in Mic"],
    price: "₹3,800",
    rating: 4.3,
    reviews: 87,
    tag: "Full Color",
  },
  {
    id: "3",
    name: "CP Plus CP-UNC-TA41L3-D",
    brand: "CP Plus",
    category: "ip-cameras",
    resolution: "4MP",
    specs: ["4MP · 3.6mm · IP67 · 30m IR · PoE · H.265"],
    price: "₹2,600",
    rating: 4.2,
    reviews: 204,
    tag: "Value Pick",
  },
  {
    id: "4",
    name: "Hikvision DS-7604NXI-K1/4P",
    brand: "Hikvision",
    category: "nvrs",
    resolution: "4ch",
    specs: ["4ch · 4K decode · 4 PoE ports · 40W budget · 1 SATA · H.265+"],
    price: "₹6,500",
    rating: 4.6,
    reviews: 93,
    tag: "Top Rated",
  },
  {
    id: "5",
    name: "Dahua DHI-NVR2104HS-P-S3",
    brand: "Dahua",
    category: "nvrs",
    resolution: "4ch",
    specs: ["4ch · 4K decode · 4 PoE ports · 54W budget · 1 SATA · SMD"],
    price: "₹5,800",
    rating: 4.4,
    reviews: 56,
    tag: null,
  },
  {
    id: "6",
    name: "WD Purple 2TB (WD23PURZ)",
    brand: "Western Digital",
    category: "hdds",
    resolution: "2TB",
    specs: ["2TB · 5400 RPM · CMR · 64MB cache · 24/7 surveillance rated"],
    price: "₹4,800",
    rating: 4.7,
    reviews: 312,
    tag: "Recommended",
  },
  {
    id: "7",
    name: "Seagate SkyHawk 4TB (ST4000VX016)",
    brand: "Seagate",
    category: "hdds",
    resolution: "4TB",
    specs: ["4TB · 5400 RPM · CMR · 256MB cache · ImagePerfect · 180TB/yr"],
    price: "₹8,900",
    rating: 4.6,
    reviews: 198,
    tag: null,
  },
  {
    id: "8",
    name: "TP-Link TL-SG1005P",
    brand: "TP-Link",
    category: "poe-switches",
    resolution: "5-port",
    specs: ["5-port Gigabit · 4 PoE+ ports · 65W budget · Desktop · Unmanaged"],
    price: "₹3,100",
    rating: 4.4,
    reviews: 145,
    tag: "Popular",
  },
  {
    id: "9",
    name: "Hikvision 4-Camera 4MP Kit",
    brand: "Hikvision",
    category: "kits",
    resolution: "4MP",
    specs: ["4× DS-2CD1043G2-I · 1× DS-7604NXI · 1TB Purple · Cat6 cables"],
    price: "₹22,500",
    rating: 4.5,
    reviews: 67,
    tag: "Complete Kit",
  },
  {
    id: "10",
    name: "CP Plus 8ch DVR (CP-UVR-0801F1-IC)",
    brand: "CP Plus",
    category: "dvrs",
    resolution: "8ch",
    specs: ["8ch · 5MP-N decode · 1 SATA · HDMI/VGA · H.265 · Mobile App"],
    price: "₹4,200",
    rating: 4.1,
    reviews: 156,
    tag: null,
  },
  {
    id: "11",
    name: "D-Link Cat6 UTP Cable 305m",
    brand: "D-Link",
    category: "cables",
    resolution: "305m",
    specs: ["Cat6 · UTP · Pure Copper · 23 AWG · 305m box · Grey"],
    price: "₹6,800",
    rating: 4.3,
    reviews: 89,
    tag: "Pure Copper",
  },
  {
    id: "12",
    name: "APC BX1100C-IN UPS",
    brand: "APC",
    category: "power",
    resolution: "1100VA",
    specs: ["1100VA / 660W · 4+2 outlets · AVR · Battery backup · USB"],
    price: "₹5,400",
    rating: 4.5,
    reviews: 231,
    tag: null,
  },
] as const;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory)
      return false;
    if (selectedBrand && p.brand !== selectedBrand) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
            Product Catalog & Specifications
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Browse Verified CCTV Equipment
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
            Every product listed with full specifications explained in plain language.
            No hidden compatibility issues, no ambiguous marketing specs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0 border border-slate-200 self-start sm:self-auto">
          <span>⏱ 2 min catalog scan</span>
        </div>
      </div>

      {/* SEO Bullet Verification Checklist */}
      <div className="mt-6 rounded-card border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          Key Verification Parameters for Products
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>Resolution:</strong> 4MP (2560×1440) recommended for clear face & license plate identification.
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>Environment Rating:</strong> IP67 weather-rated housings essential for Odisha monsoons.
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            <strong>Codec Compression:</strong> H.265+ encoding reduces HDD storage consumption by 50%.
          </li>
        </ul>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {/* Category filter */}
            <div>
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                Category
              </h2>
              <ul className="mt-3 space-y-1">
                {categories.map(({ label, value }) => (
                  <li key={value}>
                    <button
                      onClick={() => setSelectedCategory(value)}
                      className={`w-full rounded-control px-3 py-2 text-left text-sm font-medium transition ${
                        selectedCategory === value
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand filter */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Brand
              </h2>
              <ul className="mt-3 space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className={`w-full rounded-control px-3 py-2 text-left text-sm font-medium transition ${
                      !selectedBrand
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    All Brands
                  </button>
                </li>
                {brands.map((brand) => (
                  <li key={brand}>
                    <button
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full rounded-control px-3 py-2 text-left text-sm font-medium transition ${
                        selectedBrand === brand
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Mobile filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {categories.slice(0, 6).map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                selectedCategory === value
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            <button className="flex items-center gap-1 rounded-control border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-primary-600">
              Sort by: Relevance
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href="/products"
                className="group rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm"
              >
                {/* Image placeholder */}
                <div className="relative flex h-40 items-center justify-center rounded-control bg-slate-50">
                  <span className="text-3xl text-slate-300">📷</span>
                  {product.tag && (
                    <span className="absolute left-2 top-2 rounded-full bg-primary-700 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-950 group-hover:text-primary-700">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {product.specs[0]}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-950">
                      {product.price}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Star
                        className="h-3.5 w-3.5 fill-warning-500 text-warning-500"
                        aria-hidden="true"
                      />
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-card border border-slate-200 bg-white py-16 text-center">
              <p className="text-sm text-slate-500">
                No products found for this filter combination.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBrand(null);
                }}
                className="mt-3 text-sm font-medium text-primary-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
