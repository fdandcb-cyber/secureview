import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Languages,
  Wrench,
  Video,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learn — CCTV & Security Knowledge Base",
  description:
    "Understand CCTV cameras, DVRs, NVRs, PoE, storage, and security system design — explained in plain language with tables, checklists, and calculators.",
};

const categories = [
  {
    title: "Buying Guides",
    description:
      "Practical, step-by-step guides to choosing the right equipment for your property and budget.",
    href: "/learn/guides",
    icon: FileText,
    count: 8,
    readTime: "8-10 min read",
  },
  {
    title: "Glossary",
    description:
      "Every CCTV and security term explained in plain language — from IP ratings to ONVIF to WDR.",
    href: "/learn/glossary",
    icon: Languages,
    count: 45,
    readTime: "5 min scan",
  },
  {
    title: "Troubleshooting",
    description:
      "Common problems and proven solutions — no video signal, night vision issues, remote access failures, and more.",
    href: "/learn/troubleshooting",
    icon: Wrench,
    count: 12,
    readTime: "6 min guide",
  },
] as const;

const featuredArticles = [
  {
    title: "IP Cameras vs Analog: Which Is Right for You?",
    summary:
      "Resolution, cabling, cost, and future-proofing compared side by side — with honest trade-offs, not just the premium option.",
    category: "Camera Basics",
    readTime: "7 min",
    href: "/learn/guides",
  },
  {
    title: "DVR vs NVR: Understanding the Core Difference",
    summary:
      "One processes video at the camera, the other at the recorder. Here's why that matters for your image quality, cable runs, and budget.",
    category: "Recorders",
    readTime: "5 min",
    href: "/learn/guides",
  },
  {
    title: "PoE Explained: Power + Data on One Cable",
    summary:
      "How Power over Ethernet simplifies installation, what the budget limits are, and why distance matters.",
    category: "Networking",
    readTime: "6 min",
    href: "/learn/guides",
  },
  {
    title: "How Much Storage Do You Actually Need?",
    summary:
      "Recording resolution × frame rate × cameras × days — with the formula shown, not just a magic number.",
    category: "Storage",
    readTime: "4 min",
    href: "/learn/guides",
  },
  {
    title: "Night Vision: IR vs Starlight vs Color Night",
    summary:
      "What 0.001 lux actually means, why IR distance specs are optimistic, and when color night vision is worth the premium.",
    category: "Camera Technology",
    readTime: "6 min",
    href: "/learn/guides",
  },
  {
    title: "Weatherproofing: IP66, IP67, IK10 Decoded",
    summary:
      "Environmental ratings explained — what survives Odisha monsoons, what doesn't, and what the ratings actually test.",
    category: "Installation",
    readTime: "4 min",
    href: "/learn/guides",
  },
] as const;

const cctvTopicTable = [
  {
    topic: "Camera Technology",
    analogy: "IP Camera vs Analog HD",
    bestFor: "IP for 4K clarity; Analog for retrofitting existing coax wiring",
    keySpecToVerify: "Sensor resolution (MP) & Low-light Lux rating",
  },
  {
    topic: "Video Recorder",
    analogy: "NVR (Network) vs DVR (Digital)",
    bestFor: "NVR for IP cameras; DVR for BNC coaxial cameras",
    keySpecToVerify: "Channel decoding limit & SATA HDD bay count",
  },
  {
    topic: "Power Infrastructure",
    analogy: "PoE Switch vs 12V Power Adapter",
    bestFor: "PoE (802.3af/at) delivers power + data on single Cat6 cable",
    keySpecToVerify: "Total PoE wattage budget vs peak camera load",
  },
  {
    topic: "Recording Storage",
    analogy: "Surveillance HDD vs Desktop HDD",
    bestFor: "Surveillance drives (WD Purple/SkyHawk) built for continuous write",
    keySpecToVerify: "H.265 compression & CMR 24/7 continuous rating",
  },
] as const;

export default function LearnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalPage",
    name: "CCTV & Security Knowledge Hub",
    description: "Encyclopedia, buying guides, technical glossary, and troubleshooting solutions for CCTV security technology.",
    url: "http://localhost:3000/learn",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
            Knowledge Base Hub
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            5 min overall scan
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Learn CCTV Technology Before You Buy
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
          Every specification explained in plain language. No jargon walls, no
          marketing spin — just structured technical reference tables, guides,
          and calculators to guide your property security decisions.
        </p>
      </section>

      {/* Category cards */}
      <section aria-label="Browse by category" className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map(
            ({ title, description, href, icon: Icon, count, readTime }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-card border border-slate-200 bg-white p-6 transition hover:border-primary-600 hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-primary-700"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {count} items • {readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-slate-950 group-hover:text-primary-700">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:underline">
                  Browse Section
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            )
          )}
        </div>
      </section>

      {/* SEO Table: Core CCTV Technology Overview */}
      <section className="mt-14 rounded-card border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
              Technical Reference Matrix
            </span>
            <h2 className="text-xl font-bold text-slate-950 mt-1">
              Core CCTV System Components Decoded
            </h2>
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            <Clock className="h-3.5 w-3.5" /> 2 min read table
          </span>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-1/4">System Module</th>
                <th className="py-3.5 px-4 w-1/4">Technology Comparison</th>
                <th className="py-3.5 px-4 w-1/3">Best Fit Scenario</th>
                <th className="py-3.5 px-4">Key Spec to Verify</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {cctvTopicTable.map((row) => (
                <tr key={row.topic} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-4 font-semibold text-slate-950 bg-slate-50/30">
                    {row.topic}
                  </td>
                  <td className="py-4 px-4 font-medium text-primary-700">
                    {row.analogy}
                  </td>
                  <td className="py-4 px-4 text-slate-700">
                    {row.bestFor}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-900 bg-slate-50/30">
                    {row.keySpecToVerify}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Featured articles */}
      <section className="mt-14">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Start Here — Essential Buying & Technical Guides
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fundamental principles every buyer should review before ordering hardware.
            </p>
          </div>
          <Link
            href="/learn/guides"
            className="text-sm font-semibold text-primary-700 hover:underline flex items-center gap-1"
          >
            View all guides →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredArticles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="group rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-50 border border-primary-600/20 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} read
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-950 group-hover:text-primary-700">
                {article.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {article.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Checklist Summary */}
      <section className="mt-14 rounded-card border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-950 mb-3">
          4 Core Rules for CCTV System Design
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
          <li className="flex items-start gap-3 p-3 rounded-control bg-slate-50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>1. Match Camera Resolution to Distance:</strong> Use 4MP+ for gate entries and cash counters; 2MP is sufficient for small indoor rooms.
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-control bg-slate-50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>2. Use H.265+ Codec Compression:</strong> Cuts video storage requirements in half compared to legacy H.264 codecs.
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-control bg-slate-50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>3. Never Skip PoE Headroom:</strong> Ensure total PoE switch wattage exceeds combined camera peak consumption by 15-20%.
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-control bg-slate-50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>4. Buy Surveillance-Grade HDDs:</strong> Insist on WD Purple or Seagate SkyHawk CMR drives engineered for 24/7 continuous writing.
            </div>
          </li>
        </ul>
      </section>

      {/* Video curation teaser */}
      <section className="mt-14 rounded-card border border-slate-200 bg-primary-50 p-8">
        <div className="flex items-start gap-4">
          <Video
            className="mt-0.5 h-6 w-6 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Curated Installation & Review Videos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 max-w-2xl">
              Real-world footage from verified installers — night vision
              comparisons, actual installation walkthroughs, and troubleshooting
              demos organized by intent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
