import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Buying Guides — Practical CCTV Decision Support",
  description:
    "Step-by-step guides for choosing security cameras, recorders, storage drives, PoE switches, power backup UPS, and cabling.",
};

const guides: Array<{
  title: string;
  summary: string;
  category: string;
  readTime: string;
  href: string;
  featured?: boolean;
}> = [
  {
    title: "Online Marketplace Risks: What to Check Before You Buy",
    summary:
      "Seller authenticity, warranty eligibility, cable/HDD quality, and after-sales gaps — an honest, non-alarmist guide to buying CCTV equipment from Amazon, Flipkart, or any online marketplace.",
    category: "Buying Smart",
    readTime: "8 min read",
    href: "/learn/guides/online-marketplace-risks",
    featured: true,
  },
  {
    title: "How to Choose the Right CCTV Camera for Your Property",
    summary:
      "Indoor vs outdoor, dome vs bullet, resolution requirements, night vision needs, and weatherproofing — matched to your actual use case, not the most expensive option.",
    category: "Camera Selection",
    readTime: "10 min read",
    href: "/learn/guides",
  },
  {
    title: "DVR vs NVR: Which Recorder Do You Need?",
    summary:
      "Analog vs IP, coaxial vs Ethernet, resolution limits, channel counts, and when a hybrid makes sense. The core decision explained without the jargon.",
    category: "Recorders",
    readTime: "7 min read",
    href: "/learn/guides",
  },
  {
    title: "Understanding PoE: Power + Data on One Cable",
    summary:
      "802.3af vs 802.3at vs 802.3bt, per-port vs total budget, why distance matters, and how to calculate your actual PoE load including peak draw.",
    category: "Networking",
    readTime: "6 min read",
    href: "/learn/guides",
  },
  {
    title: "CCTV Storage: How Much Do You Actually Need?",
    summary:
      "Resolution × frame rate × cameras × days, with codec efficiency (H.264 vs H.265) factored in. The formula exposed, not just a number.",
    category: "Storage",
    readTime: "5 min read",
    href: "/learn/guides",
  },
  {
    title: "Cable Quality Matters More Than You Think",
    summary:
      "CCA vs pure copper, Cat5e vs Cat6, RG59 vs RG6, maximum run lengths, and why the cable in a 'combo kit' might be the weakest link.",
    category: "Installation",
    readTime: "6 min read",
    href: "/learn/guides",
  },
  {
    title: "Inverter & UPS Sizing for CCTV Systems",
    summary:
      "Watts vs VA, battery Ah calculations, inverter efficiency losses, and what to actually back up — recorder, cameras, PoE switch, and (maybe) a monitor.",
    category: "Power Backup",
    readTime: "7 min read",
    href: "/learn/guides",
  },
  {
    title: "Complete System Planning: From Property to Purchase",
    summary:
      "A start-to-finish walkthrough: assess your property, count camera positions, check coverage overlap, size storage and power, verify compatibility, and generate a quote.",
    category: "System Design",
    readTime: "12 min read",
    href: "/learn/guides",
  },
];

const propertyRecommendationMatrix = [
  {
    property: "Residential Home / Flat",
    recommendedKit: "4× 4MP IP Dome/Bullet + 4ch PoE NVR + 2TB HDD",
    keyPriority: "Front gate coverage, parking, night vision color clarity",
    avgCost: "₹22,000 – ₹28,000",
  },
  {
    property: "Retail Shop / Store",
    recommendedKit: "4-8× 4MP IP Cameras with Built-in Mic + 8ch NVR",
    keyPriority: "Billing counter audio, entrance face ID, 30-day recording",
    avgCost: "₹32,000 – ₹45,000",
  },
  {
    property: "Commercial Warehouse",
    recommendedKit: "8-16× 4MP/8MP Varifocal IP Bullet Cameras + 16ch NVR",
    keyPriority: "Loading bay coverage, long cable runs (Cat6), 60-day HDD storage",
    avgCost: "₹65,000 – ₹1,10,000",
  },
  {
    property: "Farm / Open Property",
    recommendedKit: "PTZ 25× Optical Zoom + Solar/UPS Backup + 4G Router",
    keyPriority: "Perimeter intrusion, long distance IR (100m+), weatherproof IP67",
    avgCost: "₹45,000 – ₹85,000",
  },
] as const;

export default function GuidesPage() {
  const featured = guides.find((g) => g.featured);
  const remaining = guides.filter((g) => !g.featured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CCTV Buying Guides",
    description: "Step-by-step decision guides for selecting cameras, recorders, storage, cabling, and power backup.",
    url: "http://localhost:3000/learn/guides",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
          Buying Guides Library
        </p>
        <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <Clock className="h-3.5 w-3.5" /> 8 guides available
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Make Informed Security Decisions
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Each guide walks through real decisions with trade-offs explained — not
        just &quot;buy the most expensive one.&quot; Start with the topic most
        relevant to your property type.
      </p>

      {/* Featured guide */}
      {featured && (
        <Link
          href={featured.href}
          className="group mt-8 block rounded-card border border-primary-600 bg-primary-50/70 p-6 transition hover:shadow-md"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-semibold text-white">
              Featured Guide
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary-700 border border-primary-200">
              {featured.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {featured.readTime}
            </span>
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-primary-700">
            {featured.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {featured.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:underline">
            Read complete guide →
          </span>
        </Link>
      )}

      {/* Property Recommendation Matrix Table */}
      <section className="mt-10 rounded-card border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
              Quick Property Reference Table
            </span>
            <h2 className="text-lg font-bold text-slate-950 mt-0.5">
              CCTV System Sizing by Property Type
            </h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            ⏱ 2 min table scan
          </span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-1/4">Property Type</th>
                <th className="py-3 px-4 w-1/3">Recommended Hardware Setup</th>
                <th className="py-3 px-4">Primary Priority Focus</th>
                <th className="py-3 px-4">Est. Budget Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {propertyRecommendationMatrix.map((r) => (
                <tr key={r.property} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-950 bg-slate-50/30">
                    {r.property}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-primary-700">
                    {r.recommendedKit}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {r.keyPriority}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50/30">
                    {r.avgCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Remaining guides grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {remaining.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="group rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-50 border border-primary-600/20 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {guide.readTime}
                </span>
              </div>
              <h2 className="mt-3 text-base font-semibold text-slate-950 group-hover:text-primary-700">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {guide.summary}
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-primary-700 group-hover:underline">
              Read guide →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
