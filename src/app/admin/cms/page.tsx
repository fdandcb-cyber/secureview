"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Eye,
  Edit,
  Trash2,
  Clock,
  Sparkles,
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
    author: "Technical Writer",
    lastUpdated: "2026-07-28",
  },
  {
    id: "3",
    title: "DVR vs NVR: Understanding the Core Difference",
    category: "Recorders",
    readTime: "5 min",
    status: "Published",
    author: "Technical Writer",
    lastUpdated: "2026-07-25",
  },
  {
    id: "4",
    title: "AI Draft: Understanding 4K Camera Bitrate Sizing",
    category: "Networking",
    readTime: "4 min",
    status: "Needs AI Review",
    author: "AI Advisor Draft Engine",
    lastUpdated: "2 hours ago",
  },
  {
    id: "5",
    title: "Understanding Fiber Optic Cable Runs for High-Rise CCTV",
    category: "Cabling",
    readTime: "6 min",
    status: "Draft",
    author: "Field Installer Reviewer",
    lastUpdated: "Yesterday",
  },
];

export default function AdminCMSPage() {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [selectedTab, setSelectedTab] = useState<"articles" | "ai-review">("articles");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter((a) => {
    if (selectedTab === "ai-review") {
      return a.status === "Needs AI Review";
    }
    return a.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const approveAIArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Published" } : a))
    );
  };

  const deleteArticle = (id: string) => {
    if (confirm("Delete this content entry?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Knowledge Base & CMS Guardrail Control
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage encyclopedia articles, buying guides, glossary terms, and AI draft review workflow.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm">
          <Plus className="h-4 w-4" />
          Create Knowledge Entry
        </button>
      </div>

      {/* AI Guardrail Policy Banner */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-start gap-3">
        <Bot className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-semibold block text-amber-950">
            Blueprint §12 AI Guardrail Enforcement:
          </span>
          AI generated drafts must pass human admin review before publishing to production.
          AI is strictly forbidden from directly updating product specs, warranties, or service center statuses without human verification.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab("articles")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
            selectedTab === "articles"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          All Knowledge Content ({articles.length})
        </button>
        <button
          onClick={() => setSelectedTab("ai-review")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
            selectedTab === "ai-review"
              ? "border-amber-600 text-amber-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          AI Review Queue ({articles.filter((a) => a.status === "Needs AI Review").length})
        </button>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search content by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-primary-600"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Author</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Updated</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredArticles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-900 block">{article.title}</span>
                  <span className="text-xs text-slate-400">{article.readTime} read</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {article.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{article.author}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      article.status === "Published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : article.status === "Needs AI Review"
                        ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500">{article.lastUpdated}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {article.status === "Needs AI Review" && (
                      <button
                        onClick={() => approveAIArticle(article.id)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-500 transition"
                      >
                        Approve & Publish
                      </button>
                    )}
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredArticles.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                  No content items in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
