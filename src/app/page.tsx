import Link from "next/link";
import {
  ShieldCheck,
  Calculator,
  MapPin,
  GitCompare,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const entryPoints = [
  {
    title: "Start with your property",
    description:
      "Answer a few questions about your space and priorities. Get 2-3 sensible system options, not one forced pick.",
    href: "/plan",
    icon: ShieldCheck,
    readTime: "3 min wizard",
  },
  {
    title: "Run the numbers",
    description:
      "Storage duration, PoE budget, and inverter/UPS load — calculated from your actual setup, with the formula shown.",
    href: "/plan/calculators",
    icon: Calculator,
    readTime: "2 min calculate",
  },
  {
    title: "Compare before you decide",
    description:
      "See real specification differences side by side, explained in plain language, not marketing copy.",
    href: "/compare",
    icon: GitCompare,
    readTime: "4 min compare",
  },
  {
    title: "Find real local service",
    description:
      "Verified installers and service centers across Odisha districts — checked, not just listed.",
    href: "/service",
    icon: MapPin,
    readTime: "1 min directory",
  },
] as const;

const comparisonTable = [
  {
    feature: "Resolution Capacity",
    ip: "Up to 4K (8MP) & 12MP per camera",
    analog: "Limited to 2MP – 5MP HD-over-Coax",
    verdict: "IP systems offer significantly higher detail for identification",
  },
  {
    feature: "Cabling & Distance",
    ip: "Single Cat6 Ethernet (PoE up to 100m)",
    analog: "Coaxial cable + separate power lines",
    verdict: "IP reduces cable clutter and simplifies long runs",
  },
  {
    feature: "Night Vision Performance",
    ip: "Starlight & Smart Full-Color IR/LED",
    analog: "Basic IR LED array (B&W at night)",
    verdict: "IP delivers better low-light performance & color clarity",
  },
  {
    feature: "Audio & Smart Analytics",
    ip: "Built-in mic + Motion/Human AI detection",
    analog: "External audio wiring required; basic motion",
    verdict: "IP provides intelligent filtering and direct audio stream",
  },
  {
    feature: "Upfront Budget",
    ip: "Slightly higher initial hardware cost",
    analog: "Lower upfront entry price",
    verdict: "Analog is cheaper initially; IP is more future-proof",
  },
] as const;

const decisionSteps = [
  {
    step: "1",
    title: "Define Property Bounds & Coverage Zones",
    detail: "Map out key entry doors, gates, billing counters, and cash boxes. Identify outdoor areas needing monsoon IP67 weatherproofing.",
  },
  {
    step: "2",
    title: "Choose System Architecture (IP vs. Analog)",
    detail: "Evaluate whether single Cat6 PoE cabling or traditional 3+1 coaxial cabling best fits your existing building structure.",
  },
  {
    step: "3",
    title: "Calculate Storage & Power Requirements",
    detail: "Use continuous recording formulas (Resolution × FPS × Codec) to size surveillance-grade HDDs (WD Purple / SkyHawk) and UPS backup runtime.",
  },
  {
    step: "4",
    title: "Verify Brand Warranty & Seller Channel",
    detail: "Confirm the seller's serial authorization status so local brand service centers in Odisha honor warranty claims without hassle.",
  },
  {
    step: "5",
    title: "Connect with Verified Local Installers",
    detail: "Ensure on-site physical installation, cable terminating, and mobile remote access setup are handled by verified district technicians.",
  },
] as const;

const faqs = [
  {
    q: "What is the primary difference between IP and Analog CCTV systems?",
    a: "IP (Internet Protocol) cameras encode video digitally on the camera itself and transmit data + power over a single Ethernet Cat6 cable (PoE). Analog cameras transmit raw video signals over coaxial cable to a central DVR where encoding occurs.",
  },
  {
    q: "How many days of video recording can a 2TB hard drive store?",
    a: "For 4 cameras recording continuously at 4MP resolution using H.265 compression at 15 FPS, a 2TB surveillance hard drive provides approximately 14 to 18 days of recording.",
  },
  {
    q: "Why is a surveillance-rated HDD (WD Purple / Seagate SkyHawk) required?",
    a: "Surveillance hard drives are engineered for 24/7 continuous write operations across multiple camera streams. Standard desktop hard drives (like WD Blue) are designed for intermittent read/write cycles and fail significantly sooner under security recording workloads.",
  },
  {
    q: "Are online marketplace CCTV purchases eligible for brand warranty in Odisha?",
    a: "Warranty eligibility depends on seller channel authorization. If bought from an unauthorized online seller, official brand service centers in Bhubaneswar or Cuttack may reject warranty claims even if the serial number is genuine.",
  },
] as const;

import { BRAND } from "@/config/brand";

export default function HomePage() {
  // Schema Markup for AI crawlers & Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${BRAND.siteName} — CCTV & Security Technology Platform`,
    url: BRAND.siteUrl,
    description:
      `Educational CCTV decision platform helping buyers in ${BRAND.officeLocation} and Odisha select, calculate, and compare security technology with verified district service centers.`,
    publisher: {
      "@type": "Organization",
      name: BRAND.siteName,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div>
      {/* Inject Structured Schema Data for SEO & AI Parsing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section with Quick Stats & Reading Time */}
        <section className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-primary-50 border border-primary-600/20 px-3 py-1 text-xs font-semibold text-primary-700">
              Odisha-First • India Scalable
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              3 min overall read
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl leading-tight">
            Understand CCTV technology <br className="hidden sm:inline" />
            <span className="text-primary-700">before you spend a rupee.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Most CCTV buying decisions are made blindly from marketplace listings with
            unclear warranty terms, unverified cable quality, and no local support when
            installation fails. We explain specifications in plain language, calculate
            what your property actually needs, and connect you with verified local service centers across Odisha.
          </p>
        </section>

        {/* Action Entry Points */}
        <section
          aria-label="Get started"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {entryPoints.map(({ title, description, href, icon: Icon, readTime }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-card border border-slate-200 bg-white p-6 transition hover:border-primary-600 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-primary-700"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {readTime}
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
                Explore
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </section>

        {/* SEO Comparison Table: IP vs Analog Systems */}
        <section className="rounded-card border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                SEO & Technical Reference Table
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                IP Camera vs. Analog CCTV: Side-by-Side Comparison
              </h2>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full shrink-0">
              <Clock className="h-3.5 w-3.5" /> 2 min table read
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-1/4">Evaluation Feature</th>
                  <th className="py-3.5 px-4 w-1/3">IP System (PoE / Ethernet)</th>
                  <th className="py-3.5 px-4 w-1/3">Analog HD System (Coaxial)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonTable.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4 font-semibold text-slate-950 bg-slate-50/30">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-medium">
                      {row.ip}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {row.analog}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-control bg-primary-50 border border-primary-600/20 text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-950">Summary Recommendation:</strong> For new installations in residential properties, commercial offices, or shops, IP camera systems over Cat6 PoE are strongly recommended due to superior clarity, single-cable power delivery, and smart motion filtering.
          </div>
        </section>

        {/* Numbered Step-by-Step Decision Journey */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                Decision Framework
              </span>
              <h2 className="text-2xl font-bold text-slate-950 mt-1">
                5-Step CCTV Selection Guide
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> 3 min guide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {decisionSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-card border border-slate-200 bg-white p-5 flex flex-col justify-between transition hover:border-primary-600"
              >
                <div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-sm">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-950">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Bullet Point Checklist */}
        <section className="rounded-card border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950 mb-2">
            Key Verification Checklist Before Purchasing
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Check these critical parameters before finalizing any security camera equipment order:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-control bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block">Pure Copper Cabling (OFC):</strong>
                Avoid CCA (Copper Clad Aluminum) cables for runs over 30m or PoE installations to prevent voltage drop.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-control bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block">Surveillance HDD Grade:</strong>
                Confirm hard drives are rated WD Purple or Seagate SkyHawk engineered for continuous 24/7 writing.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-control bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block">Monsoon IP67 Weatherproofing:</strong>
                Ensure outdoor cameras carry IP66 or IP67 ratings to withstand heavy rain and humidity in Odisha.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-control bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block">PoE Power Budget Headroom:</strong>
                Verify NVR or switch wattage exceeds camera peak consumption (IR LEDs active at night) by at least 15%.
              </div>
            </div>
          </div>
        </section>

        {/* AI & Search Engine FAQ Accordion */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl font-bold text-slate-950 mt-1">
              Common CCTV & Security Questions Answered
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-card border border-slate-200 bg-white p-5 transition [&_summary::-webkit-details-marker]:none"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-950 text-base">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary-700 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 pl-8 border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Marketplace Warning Banner */}
        <section className="rounded-card border border-slate-200 bg-primary-50 p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-primary-700 shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Before buying from Amazon, Flipkart, or online marketplaces
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 max-w-3xl">
                Warranty eligibility, serial number verification, cable quality, and local after-sales support vary significantly by seller. We wrote an honest, non-alarmist guide detailing what to check before ordering.
              </p>
              <Link
                href="/learn/guides/online-marketplace-risks"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
              >
                Read what to check before buying online →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
