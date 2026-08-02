import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  Package,
  HardDrive,
  Cable,
  Headphones,
  FileSearch,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Marketplace Risks: What to Check Before Buying CCTV",
  description:
    "Seller authenticity, warranty eligibility, cable and HDD quality, combo kit pitfalls, and after-sales gaps — an honest guide to buying security equipment from any online marketplace.",
};

const channelComparison = [
  {
    factor: "Brand Warranty Claim",
    marketplace: "Often rejected if seller lacks authorized partner status",
    verifiedDealer: "100% honored by brand local service centers (Bhubaneswar/Cuttack)",
  },
  {
    factor: "Hard Disk Drive Grade",
    marketplace: "Kit often bundled with desktop HDDs (WD Blue) prone to early failure",
    verifiedDealer: "Surveillance-grade CMR drives (WD Purple / Seagate SkyHawk) specified",
  },
  {
    factor: "Cabling Material",
    marketplace: "Frequently includes cheap CCA (Copper Clad Aluminum) cables",
    verifiedDealer: "Pure Oxygen-Free Copper (OFC) Cat6 cable specified for PoE",
  },
  {
    factor: "After-Sales Support",
    marketplace: "Box seller only; no local physical installation or troubleshooting",
    verifiedDealer: "On-site installation, network setup, and district repair support",
  },
] as const;

const risks = [
  {
    icon: ShieldAlert,
    title: "Seller authenticity and brand authorization",
    description:
      "Many marketplace sellers are not authorized by the brand they're selling. This matters because warranty claims, firmware updates, and technical support from the manufacturer often require proof of purchase from an authorized channel. A seller listing 'Hikvision' products may be genuine — but the warranty path may be unclear or non-existent.",
    checkItem:
      "Ask the seller for their brand authorization letter or check the manufacturer's website for authorized online sellers.",
  },
  {
    icon: Package,
    title: "Old stock, discontinued revisions, or region-mismatched models",
    description:
      "Marketplace inventory management means old stock, hardware revisions that have been superseded, and models intended for other regions (with different firmware, power specs, or language settings) can end up in the same listing. A 'DS-2CD1043G0-I' might be a 2019 revision or a 2023 one — same model number, different hardware.",
    checkItem:
      "Check the manufacture date (usually on the box label) and firmware version. Cross-reference the specific revision on the manufacturer's current product page.",
  },
  {
    icon: FileSearch,
    title: "Warranty eligibility depends on channel, not just brand",
    description:
      "This is the one most buyers discover too late. A genuine Hikvision or Dahua camera purchased from a non-authorized seller may be refused warranty service by the brand's official service center. The serial number is valid, the product is real — but the purchase channel isn't recognized. This is a structural channel policy, not a scam.",
    checkItem:
      "Before purchasing, check with the brand's service center in your area whether they will honor warranty for products bought from that specific seller.",
  },
  {
    icon: Cable,
    title: "Bundled cable quality: CCA vs pure copper",
    description:
      "Many 'combo kits' and bundled camera sets include Copper Clad Aluminum (CCA) cables instead of pure copper. CCA is cheaper and works for short runs, but has higher resistance, more signal degradation over distance, and is not recommended for PoE installations. The listing often doesn't specify — it just says 'network cable included.'",
    checkItem:
      "Look for explicit 'pure copper' or 'OFC (Oxygen-Free Copper)' mentions. If the listing doesn't specify, assume CCA. For runs over 30 meters or PoE, insist on pure copper Cat5e or Cat6.",
  },
  {
    icon: HardDrive,
    title: "Hard disk grade: desktop vs surveillance-rated",
    description:
      "Surveillance hard drives (WD Purple, Seagate SkyHawk) are designed for 24/7 write operations, multiple simultaneous video streams, and vibration tolerance. Desktop drives (WD Blue, Seagate Barracuda) are not. A 'bundled 1TB HDD' in a kit listing may be a desktop-grade drive that will fail significantly earlier under continuous recording load.",
    checkItem:
      "Verify the exact HDD model number in the listing. 'WD10PURZ' = Purple (surveillance). 'WD10EZEX' = Blue (desktop). If the listing just says '1TB HDD' without a model, ask before buying.",
  },
  {
    icon: Package,
    title: "Combo kits assembled for price, not compatibility",
    description:
      "A kit listing might pair a 4MP camera with an NVR that only decodes 3MP per channel, or include a PoE switch with insufficient budget for the cameras at full feature load (IR + heater). These aren't defective combinations — they 'work' — but they force the system to downscale or disable features the buyer thought they were getting.",
    checkItem:
      "Cross-check: NVR decoding resolution ≥ camera resolution, PoE budget ≥ sum of all camera peak power draws, HDD bays and capacity support your desired recording duration.",
  },
  {
    icon: Headphones,
    title: "After-sales support: installation, configuration, troubleshooting",
    description:
      "A marketplace purchase is a product transaction, not a service relationship. If you need help with installation, network configuration, remote viewing setup, or troubleshooting — there's typically no one to call. The seller sells boxes, not ongoing support. For a first-time CCTV buyer, this gap is often the biggest real-world cost.",
    checkItem:
      "Decide before purchasing whether you need installation support. If yes, buying from or through a local installer/dealer may be worth the premium — the service is the product.",
  },
] as const;

const checklist = [
  "Is the seller authorized by the brand? (Check manufacturer's website)",
  "What is the exact model number, hardware revision, and manufacture date?",
  "Will the brand's local service center honor warranty for this seller?",
  "Are cables pure copper (OFC) or CCA? Is this specified?",
  "Is the included HDD surveillance-rated (Purple/SkyHawk) or desktop-grade?",
  "Does the NVR's decode capacity match or exceed the camera resolution?",
  "Is the PoE budget sufficient for all cameras at peak power draw?",
  "Do you need installation/configuration support, and is it included?",
  "Is the firmware region and language setting correct for India?",
  "What is the return/replacement policy if the product is DOA or mismatched?",
] as const;

import { BRAND } from "@/config/brand";

export default function MarketplaceRisksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Before You Buy CCTV from an Online Marketplace: 7 Verification Checks",
    description: "Honest guide explaining seller authenticity, warranty eligibility, cable/HDD quality, and after-sales gaps for online marketplace purchases.",
    author: {
      "@type": "Organization",
      name: `${BRAND.siteName} Technical Editorial`,
    },
    url: `${BRAND.siteUrl}/learn/guides/online-marketplace-risks`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-primary-700">
          Learn
        </Link>
        <span>/</span>
        <Link href="/learn/guides" className="hover:text-primary-700">
          Guides
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">Marketplace Risks</span>
      </nav>

      <article>
        <header>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-warning-500/10 border border-warning-500/30 px-3 py-1 text-xs font-semibold text-amber-700">
              Buying Smart
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="h-3.5 w-3.5" /> 8 min read
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Before You Buy CCTV from an Online Marketplace
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Amazon, Flipkart, and other marketplaces are convenient and often
            price-competitive. This guide isn&apos;t telling you not to buy
            there — it&apos;s telling you what to verify first, because these
            are genuine decision risks that matter more for security equipment
            than for most product categories.
          </p>
        </header>

        {/* SEO Comparison Table: Marketplace vs Verified Dealer */}
        <section className="mt-8 rounded-card border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
              Channel Comparison: Marketplace Listing vs. Verified Dealer Channel
            </h2>
            <span className="text-xs text-slate-500">⏱ 2 min table scan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[550px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-2.5 px-3 w-1/4">Evaluation Factor</th>
                  <th className="py-2.5 px-3 w-1/3">Online Marketplace Listing</th>
                  <th className="py-2.5 px-3 w-1/3">Verified Local Channel (Odisha)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {channelComparison.map((r) => (
                  <tr key={r.factor} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-bold text-slate-950 bg-slate-50/30">
                      {r.factor}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {r.marketplace}
                    </td>
                    <td className="py-3 px-3 font-medium text-emerald-700">
                      {r.verifiedDealer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 rounded-card border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-950">A note on framing:</strong> We
              present these as decision risks to check for, not blanket
              accusations against any marketplace or seller. Most marketplace
              sellers are legitimate businesses. The issue is structural — the
              marketplace model optimizes for product discovery and price
              comparison, not for the service-layer context that security
              equipment specifically needs.
            </p>
          </div>
        </div>

        {/* Risk sections */}
        <div className="mt-10 space-y-8">
          {risks.map(
            ({ icon: Icon, title, description, checkItem }, index) => (
              <section
                key={title}
                className="rounded-card border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50">
                    <Icon
                      className="h-5 w-5 text-primary-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">
                      {index + 1}. {title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {description}
                    </p>
                    <div className="mt-4 flex items-start gap-2 rounded-control bg-emerald-50 border border-emerald-200 px-4 py-3">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-semibold text-slate-950">
                        What to check:{" "}
                        <span className="font-normal text-slate-700">
                          {checkItem}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )
          )}
        </div>

        {/* Summary checklist */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-slate-950">
            10-Point Pre-Purchase Verification Checklist
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Run through these items before placing an order from any online seller:
          </p>
          <div className="mt-6 rounded-card border border-slate-200 bg-white p-6">
            <ol className="space-y-3">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700 font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-card border border-slate-200 bg-primary-50 p-8">
          <h2 className="text-base font-bold text-slate-950">
            Want help choosing the right system?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Our comparison engine shows real spec differences, our calculators
            size your actual needs, and our service directory connects you to
            verified installers in your Odisha district.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Compare products
            </Link>
            <Link
              href="/plan/calculators"
              className="inline-flex items-center rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700"
            >
              Run calculators
            </Link>
            <Link
              href="/service"
              className="inline-flex items-center rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700"
            >
              Find local service
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
