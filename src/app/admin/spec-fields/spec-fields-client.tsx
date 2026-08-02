"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type SpecFieldRow = {
  id: string;
  category: string;
  key: string;
  label: string;
  explainer: string;
  type: string;
  isDefault: boolean;
};

const initialSpecFields: SpecFieldRow[] = [
  { id: "1", category: "Cameras", key: "resolution_mp", label: "Resolution (MP)", explainer: "Total megapixels captured per image.", type: "number", isDefault: true },
  { id: "2", category: "Cameras", key: "night_vision_range_m", label: "Night Vision (m)", explainer: "Maximum effective night vision distance in complete darkness.", type: "number", isDefault: true },
  { id: "3", category: "Cameras", key: "poe_supported", label: "PoE Supported", explainer: "Receives power + data on single Cat6 cable.", type: "boolean", isDefault: true },
  { id: "4", category: "Recorders", key: "channels", label: "Channel Count", explainer: "Number of camera video streams supported simultaneously.", type: "number", isDefault: true },
  { id: "5", category: "Storage", key: "capacity_tb", label: "Capacity (TB)", explainer: "Raw storage capacity of the hard drive.", type: "number", isDefault: true },
];

export function AdminSpecFieldsClient() {
  const [fields] = useState<SpecFieldRow[]>(initialSpecFields);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Data-Driven Specification Fields</h1>
          <p className="text-xs text-slate-500 mt-1">
            Category-scoped parameters with required plain-language explainers.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" /> Add Spec Field
        </Button>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={fields}
        columns={[
          { header: "Category", accessorKey: "category", cell: (r) => <Badge tone="neutral">{r.category}</Badge> },
          { header: "Field Key", accessorKey: "key", cell: (r) => <span className="font-mono font-bold text-xs text-slate-900">{r.key}</span> },
          { header: "Display Label", accessorKey: "label" },
          { header: "Plain-Language Explainer", accessorKey: "explainer", cell: (r) => <span className="text-xs text-slate-600 italic">&ldquo;{r.explainer}&rdquo;</span> },
          { header: "Data Type", accessorKey: "type", cell: (r) => <span className="font-mono text-xs text-slate-500 uppercase">{r.type}</span> },
        ]}
      />
    </div>
  );
}
