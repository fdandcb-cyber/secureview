"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

type BrandRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  is_active: boolean;
};

const initialBrands: BrandRow[] = [
  { id: "1", slug: "hikvision", name: "Hikvision", description: "Global security camera manufacturer.", is_active: true },
  { id: "2", slug: "dahua", name: "Dahua Technology", description: "Video-centric AIoT solution provider.", is_active: true },
  { id: "3", slug: "cp-plus", name: "CP Plus", description: "Popular surveillance brand across India.", is_active: true },
  { id: "4", slug: "tp-link", name: "TP-Link Tapo", description: "Smart home security and PoE networking hardware.", is_active: true },
  { id: "5", slug: "western-digital", name: "Western Digital", description: "Surveillance hard drive manufacturer (WD Purple).", is_active: true },
];

export default function AdminBrandsPage() {
  const [brands] = useState<BrandRow[]>(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Brand Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage supported equipment brands and partner statuses.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" /> Add Brand
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={filtered}
        columns={[
          { header: "Brand Name", accessorKey: "name", cell: (r) => <span className="font-bold text-slate-900">{r.name}</span> },
          { header: "Slug", accessorKey: "slug", cell: (r) => <span className="font-mono text-xs text-slate-500">{r.slug}</span> },
          { header: "Description", accessorKey: "description" },
          {
            header: "Status",
            cell: (r) => (
              <Badge tone={r.is_active ? "success" : "neutral"}>
                {r.is_active ? "Active" : "Inactive"}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}
