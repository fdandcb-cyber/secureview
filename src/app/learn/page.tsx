import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Languages,
  Wrench,
  Video,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learn — CCTV & Security Knowledge Base",
  description:
    "Understand CCTV cameras, DVRs, NVRs, PoE, storage, and security system design — explained in plain language, not marketing copy.",
};

const categories = [
  {
    title: "Buying Guides",
    description:
      "Practical, step-by-step guides to choosing the right equipment for your property and budget.",
    href: "/learn/guides",
    icon: FileText,
    count: 8,
  },
  {
    title: "Glossary",
    description:
      "Every CCTV and security term explained in plain language — from IP ratings to ONVIF to WDR.",
    href: "/learn/glossary",
    icon: Languages,
    count: 45,
  },
  {
    title: "Troubleshooting",
    description:
      "Common problems and proven solutions — no video signal, night vision issues, remote access failures, and more.",
    href: "/learn/troubleshooting",
    icon: Wrench,
    count: 12,
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

export default function LearnPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
          Knowledge Base
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Learn before you buy
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
          Every specification explained in plain language. No jargon walls, no
          marketing spin — just the information you need to make a confident
          decision about your security system.
        </p>
      </section>

      {/* Category cards */}
      <section aria-label="Browse by category" className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map(
            ({ title, description, href, icon: Icon, count }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-card border border-slate-200 bg-white p-6 transition hover:border-primary-600 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-primary-700"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <span className="text-xs font-medium text-slate-500">
                    {count} articles
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-950">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">
                  Browse
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Featured articles */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold text-slate-950">
          Start here — most useful topics
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          The fundamentals most buyers need, explained once and referenced
          everywhere else on the platform.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredArticles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="group rounded-card border border-slate-200 bg-white p-5 transition hover:border-primary-600 hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                  {article.category}
                </span>
                <span className="text-xs text-slate-500">
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

      {/* Video curation teaser */}
      <section className="mt-14 rounded-card border border-slate-200 bg-primary-50 p-8">
        <div className="flex items-start gap-4">
          <Video
            className="mt-0.5 h-6 w-6 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Curated installation & review videos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Real-world footage from verified installers — night vision
              comparisons, actual installation walkthroughs, and troubleshooting
              demos. Organized by what you&apos;re trying to learn, not by
              upload date.
            </p>
            <p className="mt-3 text-sm font-medium text-primary-700">
              Coming soon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
