import type { Metadata } from "next";
import Link from "next/link";
import { getQuote } from "@/features/quotes/repositories/quote-repository";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowRight, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Quotes — Account",
  description: "View and manage your saved CCTV property quotes.",
};

export default async function AccountQuotesPage() {
  const quote = await getQuote("default-quote");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/account" className="hover:text-primary-700">
          Account
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">Saved Quotes</span>
      </nav>

      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Your Saved Property Quotes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Re-open saved quotes, print specifications, or convert directly to an order.
          </p>
        </div>
        <Link href="/plan/quote">
          <Badge tone="primary">+ Create New Quote</Badge>
        </Link>
      </div>

      <div className="space-y-4">
        <Card key={quote.id} className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-primary-700 block">
                REF #: {quote.id.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500">
                Created on {new Date(quote.created_at).toLocaleDateString("en-IN")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Badge tone="warning">{quote.status.toUpperCase()}</Badge>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-medium">
            Note: {quote.notes || "Residential Surveillance Setup"}
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-950">
              Total: ₹{quote.totalInr.toLocaleString("en-IN")} (18% GST Included)
            </span>

            <div className="flex items-center gap-2">
              <Link href={`/plan/quote/${quote.id}/print`} target="_blank">
                <Button size="sm" variant="secondary">
                  <Printer className="h-3.5 w-3.5 mr-1" /> Printable View
                </Button>
              </Link>
              <Link href="/plan/quote">
                <Button size="sm" variant="primary">
                  Open & Convert →
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
