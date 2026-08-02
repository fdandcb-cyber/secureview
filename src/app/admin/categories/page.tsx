"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
};

const initialCategories: CategoryRow[] = [
  { id: "1", slug: "cameras", name: "Cameras", description: "Security cameras including IP, Analog, Dome, Bullet", sort_order: 1 },
  { id: "2", slug: "recorders", name: "Recorders (NVR / DVR)", description: "Network and Digital video recorders", sort_order: 2 },
  { id: "3", slug: "storage", name: "Surveillance Storage", description: "24/7 surveillance-rated hard drives", sort_order: 3 },
  { id: "4", slug: "cabling", name: "Accessories & Cabling", description: "Cat6 cables, BNC connectors, PoE switches", sort_order: 4 },
];

export default function AdminCategoriesPage() {
  const [categories] = useState<CategoryRow[]>(initialCategories);
  const [searchTerm] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Category Hierarchy</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage product categories and spec scope definitions.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={filtered}
        columns={[
          { header: "Category Name", accessorKey: "name", cell: (r) => <span className="font-bold text-slate-900">{r.name}</span> },
          { header: "Slug", accessorKey: "slug", cell: (r) => <span className="font-mono text-xs text-slate-500">{r.slug}</span> },
          { header: "Description", accessorKey: "description" },
          { header: "Sort Order", accessorKey: "sort_order", cell: (r) => <Badge tone="neutral">Order #{r.sort_order}</Badge> },
        ]}
      />
    </div>
  );
}
