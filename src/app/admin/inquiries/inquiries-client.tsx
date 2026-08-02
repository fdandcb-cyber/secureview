"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Filter, CheckCircle2 } from "lucide-react";
import type { ContactInquiry } from "@/features/inquiries/repositories/inquiry-repository";

export function AdminInquiriesClient({
  initialInquiries,
}: {
  initialInquiries: ContactInquiry[];
}) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleToggleStatus = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === "resolved" ? "new" : "resolved" }
          : i
      )
    );
  };

  const filtered = inquiries.filter(
    (i) => statusFilter === "all" || i.status === statusFilter
  );

  const statusTones = {
    new: "danger" as const,
    in_progress: "warning" as const,
    resolved: "success" as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900">
              Customer Contact & Inquiries Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track incoming leads, quote follow-ups, service directory requests, and resolution statuses.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={filtered}
        columns={[
          {
            header: "Contact Name",
            cell: (r) => (
              <div>
                <span className="font-bold text-slate-900 block">{r.name}</span>
                <span className="text-xs text-slate-500 font-mono">{r.phone}</span>
              </div>
            ),
          },
          { header: "Type", cell: (r) => <Badge tone="primary">{r.inquiry_type}</Badge> },
          {
            header: "Message",
            cell: (r) => (
              <span className="text-xs text-slate-700 max-w-sm block truncate">
                {r.message}
              </span>
            ),
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
            header: "Action",
            className: "text-right",
            cell: (r) => (
              <Button
                size="sm"
                variant={r.status === "resolved" ? "secondary" : "primary"}
                onClick={() => handleToggleStatus(r.id)}
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                {r.status === "resolved" ? "Reopen" : "Mark Resolved"}
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
