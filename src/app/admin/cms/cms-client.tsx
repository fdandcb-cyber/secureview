"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

type ContentStatus = "Published" | "Draft" | "Needs AI Review";

type ArticleItem = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  status: ContentStatus;
  author: string;
  lastUpdated: string;
};

const initialArticles: ArticleItem[] = [
  {
    id: "1",
    title: "Online Marketplace Risks: What to Check Before You Buy",
    category: "Buying Smart",
    readTime: "8 min",
    status: "Published",
    author: "Editorial Team",
    lastUpdated: "2026-08-01",
  },
  {
    id: "2",
    title: "IP Cameras vs Analog: Which Is Right for You?",
    category: "Camera Basics",
    readTime: "7 min",
    status: "Published",
    author: "Technical Team",
    lastUpdated: "2026-07-28",
  },
];

export function AdminCMSClient() {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900">Knowledge Base & Glossary CMS</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish educational guides, plain-language specs explainers, and glossary definitions.
          </p>
        </div>
        <button
          onClick={() => {
            const newArt: ArticleItem = {
              id: `art-${Date.now()}`,
              title: "New CCTV Decision Guide",
              category: "Guides",
              readTime: "5 min",
              status: "Draft",
              author: "Editorial",
              lastUpdated: new Date().toISOString().split("T")[0],
            };
            setArticles([newArt, ...articles]);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition"
        >
          <Plus className="h-4 w-4" /> Create Article
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-primary-600"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {filtered.length} articles indexed
        </span>
      </div>

      <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {filtered.map((art) => (
          <div key={art.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-50 text-primary-700">
                  {art.category}
                </span>
                <span className="text-[11px] text-slate-400">· {art.readTime} read</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{art.title}</h3>
              <p className="text-[11px] text-slate-400">
                Author: {art.author} · Updated {art.lastUpdated}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {art.status}
              </span>
              <button
                onClick={() => setArticles(articles.filter((a) => a.id !== art.id))}
                className="p-1 text-slate-400 hover:text-danger-600 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
