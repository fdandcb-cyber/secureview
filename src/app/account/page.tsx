import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  GitCompare,
  Calculator,
  ClipboardList,
  Package,
  ShieldCheck,
  MessageSquare,
  LogIn,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Your Account",
  description:
    "Manage your saved comparisons, calculations, quotes, orders, and warranty tracking — all in one place.",
};

const dashboardSections = [
  {
    title: "Saved Comparisons",
    description: "Product comparisons you've saved for reference",
    icon: GitCompare,
    count: 0,
    href: "/compare",
    emptyText: "No saved comparisons yet",
    cta: "Compare products",
  },
  {
    title: "Saved Calculations",
    description: "Storage, PoE, and UPS calculator results",
    icon: Calculator,
    count: 0,
    href: "/plan/calculators",
    emptyText: "No saved calculations yet",
    cta: "Run a calculator",
  },
  {
    title: "My Quotes",
    description: "Generated quotes with version history",
    icon: ClipboardList,
    count: 0,
    href: "/plan/quote",
    emptyText: "No quotes generated yet",
    cta: "Build a quote",
  },
  {
    title: "Order History",
    description: "Past orders, shipping status, and invoices",
    icon: Package,
    count: 0,
    href: "/products",
    emptyText: "No orders yet",
    cta: "Browse products",
  },
  {
    title: "Warranty Tracker",
    description: "Track warranty expiry and claim status for your equipment",
    icon: ShieldCheck,
    count: 0,
    href: "/service/warranty",
    emptyText: "No warranties registered yet",
    cta: "Learn about warranty",
  },
  {
    title: "Messages",
    description: "Service center communications and support tickets",
    icon: MessageSquare,
    count: 0,
    href: "/contact",
    emptyText: "No messages",
    cta: "Contact us",
  },
] as const;

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Login prompt */}
      <div className="rounded-card border border-primary-600/20 bg-primary-50 p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-700">
            <User className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-slate-950">
              Your Account
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Sign in to save comparisons, calculations, and quotes — and track
              your orders and warranty status. Your data stays private and is
              never shared with third parties.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button className="inline-flex items-center gap-2 rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600">
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
            <button className="inline-flex items-center rounded-control border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700">
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard sections */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardSections.map(
          ({ title, description, icon: Icon, count, href, emptyText, cta }) => (
            <div
              key={title}
              className="rounded-card border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <Icon
                  className="h-6 w-6 text-primary-700"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                {count > 0 && (
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                    {count}
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{description}</p>

              {count === 0 ? (
                <div className="mt-6">
                  <div className="flex h-24 items-center justify-center rounded-control bg-slate-50">
                    <p className="text-sm text-slate-400">{emptyText}</p>
                  </div>
                  <Link
                    href={href}
                    className="mt-3 inline-block text-sm font-medium text-primary-700 hover:underline"
                  >
                    {cta} →
                  </Link>
                </div>
              ) : (
                <Link
                  href={href}
                  className="mt-4 inline-block text-sm font-medium text-primary-700 hover:underline"
                >
                  View all →
                </Link>
              )}
            </div>
          )
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-10 rounded-card border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-950">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-control border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
          >
            <GitCompare className="h-4 w-4" />
            Compare products
          </Link>
          <Link
            href="/plan/calculators"
            className="inline-flex items-center gap-2 rounded-control border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
          >
            <Calculator className="h-4 w-4" />
            Run calculators
          </Link>
          <Link
            href="/plan/quote"
            className="inline-flex items-center gap-2 rounded-control border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
          >
            <ClipboardList className="h-4 w-4" />
            Build a quote
          </Link>
          <Link
            href="/service"
            className="inline-flex items-center gap-2 rounded-control border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Find service centers
          </Link>
        </div>
      </div>
    </div>
  );
}
