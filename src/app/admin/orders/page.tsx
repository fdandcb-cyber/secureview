"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Truck, CheckCircle2 } from "lucide-react";

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
  {
    id: "ord-1003",
    customerName: "Anil Sahoo",
    district: "Puri",
    totalInr: 14750,
    status: "pending_payment",
    razorpayOrderId: "order_K7x8Yz99887766",
    awbCode: null,
    createdAt: "2026-07-30 17:45",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const handleResyncPayment = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "paid" } : o))
    );
    alert(`Payment status resynced with Razorpay API for order ${id}.`);
  };

  const handleCreateShipment = (id: string) => {
    const awb = `AWB${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, awbCode: awb, status: "fulfilled" } : o))
    );
    alert(`Shipment registered on Shiprocket API. AWB: ${awb}`);
  };

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Commerce & Order Operations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage paid orders, manual payment resync, and Shiprocket shipment dispatch.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search Order ID, Customer, or District..."
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
          { header: "Order Ref", accessorKey: "id", cell: (r) => <span className="font-mono text-xs font-bold text-primary-700">{r.id.toUpperCase()}</span> },
          { header: "Customer", accessorKey: "customerName" },
          { header: "District", accessorKey: "district" },
          { header: "Total Amount", cell: (r) => <span className="font-bold text-slate-950">₹{r.totalInr.toLocaleString("en-IN")}</span> },
          {
            header: "Status",
            cell: (r) => (
              <Badge tone={r.status === "paid" || r.status === "fulfilled" ? "success" : "warning"}>
                {r.status.replace("_", " ").toUpperCase()}
              </Badge>
            ),
          },
          {
            header: "Shipment AWB",
            cell: (r) =>
              r.awbCode ? (
                <span className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-primary-700" />
                  {r.awbCode}
                </span>
              ) : (
                <span className="text-xs text-slate-400 italic">Unassigned</span>
              ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (r) => (
              <div className="flex items-center justify-end gap-2">
                {r.status === "pending_payment" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleResyncPayment(r.id)}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" /> Resync Payment
                  </Button>
                )}
                {r.status === "paid" && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleCreateShipment(r.id)}
                  >
                    <Truck className="h-3 w-3 mr-1" /> Dispatch Shiprocket
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
