import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Practical, step-by-step guides to choosing the right CCTV equipment — cameras, recorders, storage, cables, and complete systems.",
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
    readTime: "8 min",
    href: "/learn/guides/online-marketplace-risks",
    featured: true,
  },
  {
    title: "How to Choose the Right CCTV Camera for Your Property",
    summary:
      "Indoor vs outdoor, dome vs bullet, resolution requirements, night vision needs, and weatherproofing — matched to your actual use case, not the most expensive option.",
    category: "Camera Selection",
    readTime: "10 min",
    href: "/learn/guides",
  },
  {
    title: "DVR vs NVR: Which Recorder Do You Need?",
    summary:
      "Analog vs IP, coaxial vs Ethernet, resolution limits, channel counts, and when a hybrid makes sense. The core decision explained without the jargon.",
    category: "Recorders",
    readTime: "7 min",
    href: "/learn/guides",
  },
  {
    title: "Understanding PoE: Power + Data on One Cable",
    summary:
      "802.3af vs 802.3at vs 802.3bt, per-port vs total budget, why distance matters, and how to calculate your actual PoE load including peak draw.",
    category: "Networking",
    readTime: "6 min",
    href: "/learn/guides",
  },
  {
    title: "CCTV Storage: How Much Do You Actually Need?",
    summary:
      "Resolution × frame rate × cameras × days, with codec efficiency (H.264 vs H.265) factored in. The formula exposed, not just a number.",
    category: "Storage",
    readTime: "5 min",
    href: "/learn/guides",
  },
  {
    title: "Cable Quality Matters More Than You Think",
    summary:
      "CCA vs pure copper, Cat5e vs Cat6, RG59 vs RG6, maximum run lengths, and why the cable in a 'combo kit' might be the weakest link.",
    category: "Installation",
    readTime: "6 min",
    href: "/learn/guides",
  },
  {
    title: "Inverter & UPS Sizing for CCTV Systems",
    summary:
      "Watts vs VA, battery Ah calculations, inverter efficiency losses, and what to actually back up — recorder, cameras, PoE switch, and (maybe) a monitor.",
    category: "Power",
    readTime: "7 min",
    href: "/learn/guides",
  },
  {
    title: "Complete System Planning: From Property to Purchase",
    summary:
      "A start-to-finish walkthrough: assess your property, count camera positions, check coverage overlap, size storage and power, verify compatibility, and generate a quote.",
    category: "System Design",
    readTime: "12 min",
    href: "/learn/guides",
  },
];

export default function GuidesPage() {
  const featured = guides.find((g) => g.featured);
  const remaining = guides.filter((g) => !g.featured);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Buying Guides
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Make informed decisions
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Each guide walks through real decisions with trade-offs explained — not
        just &quot;buy the most expensive one.&quot; Start with the one most
        relevant to where you are in the process.
      </p>

      {/* Featured guide */}
      {featured && (
        <Link
          href={featured.href}
          className="group mt-8 block rounded-card border border-primary-600 bg-primary-50 p-6 transition hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-semibold text-white">
              Featured
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary-700">
              {featured.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {featured.readTime} read
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-950 group-hover:text-primary-700">
            {featured.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {featured.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">
            Read guide
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      )}

      {/* Other guides */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {remaining.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="group rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {guide.readTime}
              </span>
            </div>
            <h2 className="mt-3 text-sm font-semibold text-slate-950 group-hover:text-primary-700">
              {guide.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              {guide.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
