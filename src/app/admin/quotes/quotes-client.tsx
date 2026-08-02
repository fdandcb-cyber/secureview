"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList, Search, Filter, Eye } from "lucide-react";

type QuoteStatus = "draft" | "sent" | "accepted" | "expired";

type QuoteRecord = {
  id: string;
  quoteNumber: string;
  customerName: string;
  district: string;
  itemCount: number;
  subtotal: string;
  gst: string;
  total: string;
  status: QuoteStatus;
  createdAt: string;
};

const initialQuotes: QuoteRecord[] = [
  {
    id: "default-quote",
    quoteNumber: "QT-2026-891",
    customerName: "Rakesh Mohanty",
    district: "Bhubaneswar",
    itemCount: 4,
    subtotal: "₹24,100",
    gst: "₹4,338",
    total: "₹28,438",
    status: "draft",
    createdAt: "2026-08-01 14:30",
  },
  {
    id: "qt-1002",
    quoteNumber: "QT-2026-892",
    customerName: "Sunita Patnaik",
    district: "Cuttack",
    itemCount: 8,
    subtotal: "₹52,000",
    gst: "₹9,360",
    total: "₹61,360",
    status: "accepted",
    createdAt: "2026-07-31 11:15",
  },
];

export function AdminQuotesClient() {
  const [quotes] = useState<QuoteRecord[]>(initialQuotes);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = quotes.filter((q) => {
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusTones = {
    draft: "neutral" as const,
    sent: "warning" as const,
    accepted: "success" as const,
    expired: "danger" as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900">
              Quotes & Order Intent Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review user-generated quotes, line-item pricing breakdowns, and convert quotes to orders.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search quote number, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={filtered}
        columns={[
          { header: "Quote #", accessorKey: "quoteNumber", cell: (r) => <span className="font-bold font-mono text-slate-900">{r.quoteNumber}</span> },
          { header: "Customer Name", accessorKey: "customerName" },
          { header: "District", accessorKey: "district" },
          { header: "Items", accessorKey: "itemCount", cell: (r) => <span>{r.itemCount} Items</span> },
          { header: "Total Value", accessorKey: "total", cell: (r) => <span className="font-bold text-slate-950">{r.total}</span> },
          {
            header: "Status",
            cell: (r) => <Badge tone={statusTones[r.status]}>{r.status.toUpperCase()}</Badge>,
          },
          {
            header: "Action",
            className: "text-right",
            cell: (r) => (
              <Link href={`/admin/quotes/${r.id}`}>
                <Button size="sm" variant="secondary">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View Quote Details
                </Button>
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
