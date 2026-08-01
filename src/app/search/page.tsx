import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, FileText, Package, BookOpen, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the entire CCTV & Security Knowledge Platform — articles, products, guides, glossary terms, and service centers.",
};

const recentSearches = [
  "4MP vs 5MP camera",
  "PoE budget calculator",
  "Hikvision service center Bhubaneswar",
  "night vision range",
  "WD Purple vs SkyHawk",
  "H.265 vs H.264 storage",
] as const;

const quickLinks = [
  {
    title: "Learning articles",
    description: "Encyclopedia, guides, glossary, and troubleshooting",
    href: "/learn",
    icon: BookOpen,
    count: "65+ articles",
  },
  {
    title: "Products",
    description: "Cameras, NVRs, DVRs, storage, cables, and kits",
    href: "/products",
    icon: Package,
    count: "12 products",
  },
  {
    title: "Buying guides",
    description: "Step-by-step decision guides",
    href: "/learn/guides",
    icon: FileText,
    count: "8 guides",
  },
  {
    title: "Service centers",
    description: "Verified installers across Odisha",
    href: "/service",
    icon: MapPin,
    count: "6 verified",
  },
] as const;

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Search everything
      </h1>
      <p className="mt-3 text-center text-base text-slate-500">
        Articles, products, guides, glossary terms, calculators, and service
        centers
      </p>

      {/* Search input */}
      <div className="mt-8">
        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Try 'IP camera vs analog', '4MP outdoor', 'Cuttack installer'..."
            autoFocus
            className="w-full rounded-card border border-slate-200 bg-white py-4 pl-12 pr-4 text-base text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
          />
        </div>
      </div>

      {/* Recent searches */}
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Popular searches
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {recentSearches.map((term) => (
            <button
              key={term}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Browse by category
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickLinks.map(
            ({ title, description, href, icon: Icon, count }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm"
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-950 group-hover:text-primary-700">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {description}
                  </p>
                  <p className="mt-1 text-xs text-primary-700">{count}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Search tips */}
      <div className="mt-12 rounded-card border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-950">Search tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-500">
          <li>
            • Search by <strong className="text-slate-700">product model number</strong> (e.g., &quot;DS-2CD1043G2-I&quot;) for exact matches
          </li>
          <li>
            • Use <strong className="text-slate-700">plain language</strong> — &quot;outdoor camera for shop&quot; works as well as technical terms
          </li>
          <li>
            • Include <strong className="text-slate-700">your district name</strong> to find local service centers
          </li>
          <li>
            • Glossary terms link to full explanations — try &quot;PoE&quot; or &quot;WDR&quot;
          </li>
        </ul>
      </div>
    </div>
  );
}
