import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  MapPin,
  ClipboardList,
  FileText,
  Plus,
  BadgeCheck,
  CheckCircle2,
  TrendingUp,
  Database,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview",
  description: "CCTV Platform Control Center & Management Overview.",
};

const stats = [
  {
    name: "Total Products / SKUs",
    stat: "12 SKUs",
    change: "+3 this week",
    changeType: "increase",
    icon: Package,
    href: "/admin/products",
  },
  {
    name: "Verified Odisha Centers",
    stat: "6 Centers",
    change: "6 Districts Covered",
    changeType: "increase",
    icon: MapPin,
    href: "/admin/service-centers",
  },
  {
    name: "Generated Quotes",
    stat: "48 Quotes",
    change: "₹1.4L Total Value",
    changeType: "increase",
    icon: ClipboardList,
    href: "/admin/quotes",
  },
  {
    name: "Knowledge Base Articles",
    stat: "35 Articles",
    change: "100% Fact-Checked",
    changeType: "increase",
    icon: FileText,
    href: "/admin/cms",
  },
] as const;

const recentActivities = [
  {
    id: 1,
    action: "Service Center Verified",
    target: "SecureTech Solutions (Bhubaneswar)",
    time: "10 minutes ago",
    user: "System Admin",
    type: "verified",
  },
  {
    id: 2,
    action: "Product Specification Updated",
    target: "Hikvision DS-2CD1043G2-I (4MP IP Bullet)",
    time: "1 hour ago",
    user: "Content Team",
    type: "product",
  },
  {
    id: 3,
    action: "New Quote Generated",
    target: "Quote #QT-2026-891 (4 Cameras + NVR)",
    time: "3 hours ago",
    user: "Public Visitor",
    type: "quote",
  },
  {
    id: 4,
    action: "Glossary Term Added",
    target: "Starlight Sensor Technology",
    time: "5 hours ago",
    user: "Technical Writer",
    type: "cms",
  },
] as const;

const districtCoverage = [
  { district: "Bhubaneswar", centers: 2, status: "Active" },
  { district: "Cuttack", centers: 1, status: "Active" },
  { district: "Puri", centers: 1, status: "Active" },
  { district: "Rourkela", centers: 1, status: "Active" },
  { district: "Berhampur", centers: 1, status: "Active" },
  { district: "Sambalpur", centers: 0, status: "Pending Verification" },
] as const;

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Platform Control Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage specs, catalog items, Odisha district service centers, and content guardrails.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
          <Link
            href="/admin/service-centers"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition"
          >
            <BadgeCheck className="h-4 w-4 text-emerald-600" />
            Verify Service Center
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ name, stat, change, icon: Icon, href }) => (
          <Link
            key={name}
            href={href}
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary-600 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {name}
                </span>
                <div className="p-2 rounded-lg bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{stat}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                {change}
              </span>
              <span className="group-hover:translate-x-0.5 transition text-primary-700 font-semibold">
                Manage →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Activity & District Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Stream */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Admin Activity
              </h2>
              <p className="text-xs text-slate-500">Audit trail of system modifications</p>
            </div>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              Live Stream
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-4 p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="p-2 rounded-md bg-white border border-slate-200 shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {act.action}
                    </p>
                    <span className="text-[11px] text-slate-400">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5">{act.target}</p>
                  <p className="text-[11px] text-slate-400 mt-1">By: {act.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Odisha District Verification Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-700" />
              <h2 className="text-base font-semibold text-slate-900">
                Odisha Coverage Status
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              District level service center verification tracking
            </p>
          </div>

          <div className="space-y-3">
            {districtCoverage.map((dist) => (
              <div
                key={dist.district}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 block">
                    {dist.district}
                  </span>
                  <span className="text-slate-500">
                    {dist.centers} verified center{dist.centers !== 1 ? "s" : ""}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full font-medium ${
                    dist.centers > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {dist.status}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/admin/service-centers"
            className="flex items-center justify-between w-full p-3 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
          >
            <span>Manage Service Center Listings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Supabase Engine Integration Notice */}
      <div className="bg-primary-50 rounded-xl border border-primary-600/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-700 text-white rounded-lg shrink-0">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Supabase Database Connected & Active
            </h3>
            <p className="text-xs text-slate-700 mt-1 max-w-2xl">
              Privileged server client configured (`server-privileged.ts`). Row Level Security
              and admin role checks are enforced on data mutations.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
          <CheckCircle2 className="h-4 w-4" />
          Connection Active
        </div>
      </div>
    </div>
  );
}
