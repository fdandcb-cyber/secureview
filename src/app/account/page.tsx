import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  User,
  ShoppingBag,
  ClipboardList,
  Bookmark,
  GitCompare,
  MessageSquare,
  MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Account Overview — SecureView",
  description: "Customer account dashboard, profile settings, orders, quotes, wishlists, and inquiries.",
};

const accountNavCards = [
  {
    title: "Order History & Tracking",
    description: "Track equipment shipments, view invoices, and payment statuses.",
    href: "/account/orders",
    icon: ShoppingBag,
    badge: "1 Active Order",
  },
  {
    title: "Saved Quotes",
    description: "Re-open saved property quotes and convert directly to orders.",
    href: "/account/quotes",
    icon: ClipboardList,
    badge: "1 Draft Quote",
  },
  {
    title: "Saved Products (Wishlist)",
    description: "Bookmarked camera models, recorders, and accessories.",
    href: "/account/saved-products",
    icon: Bookmark,
    badge: "3 Saved SKUs",
  },
  {
    title: "Saved Comparisons",
    description: "Re-open past side-by-side product spec matrices.",
    href: "/account/saved-comparisons",
    icon: GitCompare,
    badge: "2 Matrix Snapshots",
  },
  {
    title: "Contact Inquiries",
    description: "Track submitted support messages and resolution statuses.",
    href: "/account/inquiries",
    icon: MessageSquare,
    badge: "1 Active Ticket",
  },
] as const;

export default function AccountOverviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Header */}
      <Card className="p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold text-xl">
              RM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                  Rakesh Mohanty
                </h1>
                <Badge tone="success">Verified Customer</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                connectzsalesandservices@gmail.com • +91 94370 12345
              </p>
            </div>
          </div>

          <Link href="/account/orders">
            <Badge tone="primary">View Active Orders →</Badge>
          </Link>
        </div>

        {/* Saved Addresses */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Default Delivery Address
          </span>
          <div className="p-4 rounded-control bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start justify-between">
            <div>
              <p className="font-bold text-slate-950">Rakesh Mohanty (+91 94370 12345)</p>
              <p className="text-slate-600 mt-0.5">
                Plot 102, Saheed Nagar, Near SBI Main Branch, Bhubaneswar, Odisha - 751007
              </p>
            </div>
            <Badge tone="neutral">Primary</Badge>
          </div>
        </div>
      </Card>

      {/* Account Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {accountNavCards.map(({ title, description, href, icon: Icon, badge }) => (
          <Link key={href} href={href} className="group block">
            <Card className="h-full p-6 transition hover:border-primary-600 hover:shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-primary-700" />
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                </div>
                <h2 className="mt-4 text-base font-bold text-slate-950 group-hover:text-primary-700">
                  {title}
                </h2>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {description}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-700 group-hover:underline">
                Open Section
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
