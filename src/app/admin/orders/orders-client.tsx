"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Truck } from "lucide-react";

type OrderRow = {
  id: string;
  customerName: string;
  district: string;
  totalInr: number;
  status: "pending_payment" | "paid" | "fulfilled" | "cancelled";
  razorpayOrderId: string;
  awbCode: string | null;
  createdAt: string;
};

const initialOrders: OrderRow[] = [
  {
    id: "ord-1001",
    customerName: "Rakesh Mohanty",
    district: "Bhubaneswar",
    totalInr: 28438,
    status: "paid",
    razorpayOrderId: "order_K7x8Yz12345678",
    awbCode: "AWB88991122",
    createdAt: "2026-08-01 14:30",
  },
  {
    id: "ord-1002",
    customerName: "Sunita Patnaik",
    district: "Cuttack",
    totalInr: 61360,
    status: "fulfilled",
    razorpayOrderId: "order_K7x8Yz87654321",
    awbCode: "AWB99003344",
    createdAt: "2026-07-31 11:15",
  },
];

export function AdminOrdersClient() {
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleResyncPayment = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "paid" } : o))
    );
  };

  const statusTones = {
    pending_payment: "warning" as const,
    paid: "primary" as const,
    fulfilled: "success" as const,
    cancelled: "danger" as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">E-Commerce Orders & Fulfillment</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track customer payments (Razorpay) and shipment tracking status (Shiprocket).
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
        >
          <option value="all">All Orders</option>
          <option value="pending_payment">Pending Payment</option>
          <option value="paid">Paid</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <DataTable
        keyExtractor={(row) => row.id}
        data={filtered}
        columns={[
          { header: "Order ID", accessorKey: "id", cell: (r) => <span className="font-bold text-slate-900">{r.id}</span> },
          { header: "Customer", accessorKey: "customerName" },
          { header: "District", accessorKey: "district" },
          { header: "Total", cell: (r) => <span className="font-bold text-slate-950">₹{r.totalInr.toLocaleString("en-IN")}</span> },
          {
            header: "Payment Status",
            cell: (r) => <Badge tone={statusTones[r.status]}>{r.status.toUpperCase()}</Badge>,
          },
          {
            header: "Tracking AWB",
            cell: (r) => (
              <span className="font-mono text-xs text-slate-500 flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-slate-400" />
                {r.awbCode ?? "Pending Dispatch"}
              </span>
            ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (r) => (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleResyncPayment(r.id)}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Resync Status
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
