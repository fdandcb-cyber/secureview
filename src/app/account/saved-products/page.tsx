import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Products (Wishlist) — Account",
  description: "Your bookmarked security cameras, recorders, and accessories.",
};



import { getSavedProductsForUser } from "@/features/users/repositories/saved-items-repository";

export default async function AccountSavedProductsPage() {
  const savedProducts = await getSavedProductsForUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/account" className="hover:text-primary-700">
          Account
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">Saved Products</span>
      </nav>

      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Bookmarked Products (Wishlist)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quick access to your saved camera SKUs and equipment models.
          </p>
        </div>
        <Badge tone="primary">{savedProducts.length} Items Saved</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savedProducts.map((p) => (
          <Card key={p.id} className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Badge tone="neutral">{p.model_number}</Badge>
                <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <h2 className="mt-3 text-sm font-bold text-slate-950">{p.name}</h2>
              <p className="mt-1 text-xs text-slate-500">Product ID: {p.product_id}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-bold text-slate-950">
                ₹{p.base_price_inr.toLocaleString("en-IN")}
              </span>
              <Link href={`/products/${p.product_id}`}>
                <Button size="sm" variant="secondary">
                  View Specs →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
