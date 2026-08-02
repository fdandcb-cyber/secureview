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
    quoteNumber: "QT-2026-890",
    customerName: "Sunita Patnaik",
    district: "Cuttack",
    itemCount: 8,
    subtotal: "₹52,000",
    gst: "₹9,360",
    total: "₹61,360",
    status: "accepted",
    createdAt: "2026-07-31 11:15",
  },
  {
    id: "qt-1003",
    quoteNumber: "QT-2026-889",
    customerName: "Anil Sahoo",
    district: "Puri",
    itemCount: 2,
    subtotal: "₹12,500",
    gst: "₹2,250",
    total: "₹14,750",
    status: "sent",
    createdAt: "2026-07-30 17:45",
  },
];

export default function AdminQuotesPage() {
  const [quotes] = useState<QuoteRecord[]>(initialQuotes);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = selectedStatus === "all" || q.status === selectedStatus;
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusTones: Record<QuoteStatus, "neutral" | "primary" | "success" | "warning"> = {
    draft: "neutral",
    sent: "warning",
    accepted: "success",
    expired: "neutral",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Quote & Specification Operations
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            View customer quotes, adjust line-item pricing, log internal notes, or convert quotes directly to orders.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by Quote #, Customer, or District..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Status Filter:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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

      {/* Datatable */}
      <DataTable
        keyExtractor={(row) => row.id}
        data={filteredQuotes}
        columns={[
          {
            header: "Quote Ref",
            accessorKey: "quoteNumber",
            cell: (r) => (
              <span className="font-mono text-xs font-bold text-primary-700">
                {r.quoteNumber}
              </span>
            ),
          },
          { header: "Customer Name", accessorKey: "customerName" },
          { header: "District", accessorKey: "district" },
          { header: "Items", cell: (r) => `${r.itemCount} items` },
          {
            header: "Total Payable",
            cell: (r) => <span className="font-bold text-slate-950">{r.total}</span>,
          },
          {
            header: "Status",
            cell: (r) => (
              <Badge tone={statusTones[r.status]}>
                {r.status.toUpperCase()}
              </Badge>
            ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (r) => (
              <Link href={`/admin/quotes/${r.id}`}>
                <Button size="sm" variant="secondary">
                  <Eye className="h-3.5 w-3.5 mr-1" /> View & Edit
                </Button>
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
