import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Products (Wishlist) — Account",
  description: "Your bookmarked security cameras, recorders, and accessories.",
};

const savedProducts = [
  {
    id: "1",
    slug: "hikvision-ds-2cd1043g2-i",
    name: "Hikvision DS-2CD1043G2-I",
    brand: "Hikvision",
    category: "4MP IP Bullet",
    price: "₹3,200",
    specs: "4MP · 2.8mm · IP67 · 30m IR · PoE",
  },
  {
    id: "2",
    slug: "dahua-dh-ipc-hdw1439t1-a-led",
    name: "Dahua DH-IPC-HDW1439T1-A-LED",
    brand: "Dahua",
    category: "Full Color IP Dome",
    price: "₹3,800",
    specs: "4MP · Full-Color LED · Built-in Mic",
  },
  {
    id: "3",
    slug: "hikvision-ds-7604nxi-k1-4p",
    name: "Hikvision DS-7604NXI-K1/4P",
    brand: "Hikvision",
    category: "4ch PoE NVR",
    price: "₹6,500",
    specs: "4ch · 4K decode · 4 PoE ports · 1 SATA",
  },
];

export default function AccountSavedProductsPage() {
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
                <Badge tone="neutral">{p.brand}</Badge>
                <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <h2 className="mt-3 text-sm font-bold text-slate-950">{p.name}</h2>
              <p className="mt-1 text-xs text-slate-500">{p.specs}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-bold text-slate-950">{p.price}</span>
              <Link href={`/products/${p.slug}`}>
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
