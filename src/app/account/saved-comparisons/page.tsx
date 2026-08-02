import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Comparisons — Account",
  description: "Re-open saved product comparison matrices.",
};

import { getSavedComparisonsForUser } from "@/features/users/repositories/saved-items-repository";

export default async function AccountSavedComparisonsPage() {
  const savedComparisons = await getSavedComparisonsForUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/account" className="hover:text-primary-700">
          Account
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">Saved Comparisons</span>
      </nav>

      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Saved Product Comparisons
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Re-open side-by-side spec matrices previously generated.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {savedComparisons.map((c) => (
          <Card key={c.id} className="p-6 flex items-center justify-between">
            <div>
              <Badge tone="primary" className="mb-1">
                {c.product_ids.length} Products Compared
              </Badge>
              <h2 className="text-base font-bold text-slate-950">{c.name}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Saved on {new Date(c.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>

            <Link href={`/compare?ids=${c.product_ids.join(",")}`}>
              <Button variant="primary" size="sm">
                Open Matrix <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
