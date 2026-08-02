import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Your Contact Inquiries — Account",
  description: "Track status of submitted support tickets and messages.",
};

const userInquiries = [
  {
    id: "inq-101",
    type: "quote-follow-up",
    message: "Requested technical review for 8-camera commercial warehouse quote in Bhubaneswar.",
    status: "in-progress",
    createdAt: "2026-08-01 15:30",
  },
];

export default function AccountInquiriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/account" className="hover:text-primary-700">
          Account
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">Contact Inquiries</span>
      </nav>

      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Your Submitted Support Messages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track inquiries submitted through our contact form and Odisha support status.
          </p>
        </div>
        <Link href="/contact">
          <Badge tone="primary">+ Submit New Message</Badge>
        </Link>
      </div>

      <div className="space-y-4">
        {userInquiries.map((i) => (
          <Card key={i.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <Badge tone="primary">{i.type.toUpperCase()}</Badge>
              <Badge tone="warning">STATUS: {i.status.toUpperCase()}</Badge>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">&ldquo;{i.message}&rdquo;</p>
            <span className="text-[11px] text-slate-400 block pt-2 border-t border-slate-100">
              Submitted on {i.createdAt}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
