"use client";

import Link from "next/link";
import {
  FileText,
  Languages,
  Wrench,
  ChevronRight,
  Clock,
} from "lucide-react";
import type { KnowledgeArticle } from "@/features/knowledge/repositories/knowledge-repository";

const categories = [
  {
    title: "Buying Guides",
    description:
      "Practical, step-by-step guides to choosing the right equipment for your property and budget.",
    href: "/learn/guides",
    icon: FileText,
  },
  {
    title: "Glossary",
    description:
      "Every CCTV and security term explained in plain language — from IP ratings to ONVIF to WDR.",
    href: "/learn/glossary",
    icon: Languages,
  },
  {
    title: "Troubleshooting",
    description:
      "Common problems and proven solutions — no video signal, night vision issues, remote access failures.",
    href: "/learn/troubleshooting",
    icon: Wrench,
  },
] as const;

export function LearnClient({ articles }: { articles: KnowledgeArticle[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Hero */}
      <div className="max-w-3xl space-y-3">
        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
          Knowledge Base & Technical Guides
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          CCTV & Security Knowledge Center
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Plain-language technical guides, spec explainers, and local installer checklists.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary-600 transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="h-10 w-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-primary-700 transition">
                {title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="text-xs font-semibold text-primary-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Explore {title} <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Published Articles List */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-950">Featured Decision Guides</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/learn/guides/${art.slug}`}
              className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                  {art.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {art.read_time_minutes} min read
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-950 group-hover:text-primary-700 transition">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.body_markdown}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
